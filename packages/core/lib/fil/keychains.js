"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilKeychains = void 0;
const utils_1 = require("./fil-core-lib/utils");
const sjcl_1 = __importDefault(require("../eth/eth-core-lib/sjcl"));
const error_1 = require("../error");
const crypto_1 = __importDefault(require("crypto"));
const eth_1 = require("../eth");
const common_1 = require("../utils/common");
const base32Encode = require("base32-encode");
const elliptic = require("elliptic");
const ec = new elliptic.ec("secp256k1");
const secp256k1 = require("secp256k1");
const bip32 = require("bip32");
const bip39 = require("bip39");
class FilKeychains {
    constructor(env) {
        this.env = env;
    }
    changePassword(key, password, newPassword) {
        const seed = this.decrypt(key, password);
        const priv = bip32.fromSeed(Buffer.from(seed, "hex")).privateKey;
        const ecKey = ec.keyFromPrivate(priv);
        const privateKey = `0x${ecKey.getPrivate("hex")}`;
        const publicKey = `0x${ecKey.getPublic(false, "hex").slice(2)}`;
        const address = this.getAddress(ecKey.getPublic(false, "hex"));
        const newKeyFile = this.encryptValueToKeyFile(seed, newPassword);
        return {
            address,
            pub: publicKey,
            priv: privateKey,
            keyFile: newKeyFile,
            chainCode: key.chainCode,
        };
    }
    create(password) {
        const seed = this.generateRandomSeed();
        const privBuffer = bip32.fromSeed(seed).privateKey;
        const keyPair = ec.keyFromPrivate(privBuffer);
        const privateKey = `0x${keyPair.getPrivate("hex")}`;
        const publicKey = `0x${keyPair.getPublic(false, "hex").slice(2)}`;
        const address = this.getAddress(keyPair.getPublic(false, "hex"));
        const keyFile = this.encryptValueToKeyFile(keyPair.getPrivate("hex"), password);
        return {
            address,
            pub: publicKey,
            priv: privateKey,
            keyFile,
        };
    }
    createWithChainCode(password) {
        const seed = this.generateRandomSeed();
        const privBuffer = bip32.fromSeed(seed).privateKey;
        const chainCode = `0x${bip32.fromSeed(seed).chainCode.toString("hex")}`;
        const keyPair = ec.keyFromPrivate(privBuffer);
        const privateKey = `0x${keyPair.getPrivate("hex")}`;
        const publicKey = `0x${keyPair.getPublic(false, "hex").slice(2)}`;
        const address = this.getAddress(keyPair.getPublic(false, "hex"));
        const keyFile = this.encryptValueToKeyFile(seed.toString("hex"), password);
        return {
            address,
            pub: publicKey,
            priv: privateKey,
            keyFile,
            chainCode: chainCode,
        };
    }
    derive(key, password, childNumber) {
        const seed = this.decrypt(key, password);
        const hdKey = bip32.fromSeed(Buffer.from(seed, "hex"));
        const childKey = hdKey.derive(childNumber);
        const childKeyPair = ec.keyFromPrivate(childKey.privateKey);
        const privateKey = `0x${childKeyPair.getPrivate("hex")}`;
        const publicKey = `0x${childKeyPair.getPublic(false, "hex").slice(2)}`;
        const address = this.getAddress(childKeyPair.getPublic(false, "hex"));
        const keyFile = this.encryptValueToKeyFile(childKeyPair.getPrivate("hex"), password);
        return {
            address,
            pub: publicKey,
            priv: privateKey,
            keyFile,
        };
    }
    deriveFromPublicKey(key, childNumber) {
        const compressedPublicKey = secp256k1.publicKeyConvert(Buffer.from(`04${common_1.HexConverter.remove0x(key.pub)}`, "hex"), true);
        const hdKey = bip32.fromPublicKey(Buffer.from(compressedPublicKey), Buffer.from(common_1.HexConverter.remove0x(key.chainCode), "hex"));
        const childKey = hdKey.derive(childNumber);
        const childKeyPair = ec.keyFromPublic(childKey.publicKey);
        const publicKey = common_1.HexConverter.add0x(childKeyPair.getPublic(false, "hex").slice(2));
        const address = this.getAddress(childKeyPair.getPublic(false, "hex"));
        return {
            address: address,
            pub: publicKey,
        };
    }
    decrypt(key, password, fromSeed) {
        try {
            const decryptedKeyFile = sjcl_1.default.decrypt(password, key.keyFile);
            if (fromSeed != null && fromSeed == true) {
                return this.privateKeyFromSeed(decryptedKeyFile);
            }
            return decryptedKeyFile;
        }
        catch (error) {
            if (error.message.includes("ccm: tag doesn't match")) {
                error.message = `password error - ${error.message}`;
            }
            else if (error.message === "sjcl.exception.corrupt is not a constructor") {
                throw new error_1.PasswordInvalidError();
            }
            throw error;
        }
    }
    sign(key, password, hexPayload, fromSeed) {
        const privateKey = utils_1.tryToPrivateKeyBuffer(this.decrypt(key, password, fromSeed));
        const messageDigest = utils_1.getDigest(Buffer.from(hexPayload, "hex"));
        const signature = secp256k1.ecdsaSign(messageDigest, privateKey);
        return Buffer.concat([
            Buffer.from(signature.signature),
            Buffer.from([signature.recid]),
        ]).toString("base64");
    }
    privateKeyFromSeed(seed) {
        const privBuffer = bip32.fromSeed(Buffer.from(seed, "hex")).privateKey;
        const keyPair = ec.keyFromPrivate(privBuffer);
        return `0x${keyPair.getPrivate("hex")}`;
    }
    encryptValueToKeyFile(value, password) {
        const randomSalt = crypto_1.default.randomBytes(8);
        const randomIV = crypto_1.default.randomBytes(16);
        const encryptOptions = {
            iter: 10000,
            ks: 256,
            salt: [
                eth_1.bytesToWord(randomSalt.slice(0, 4)),
                eth_1.bytesToWord(randomSalt.slice(4)),
            ],
            iv: [
                eth_1.bytesToWord(randomIV.slice(0, 4)),
                eth_1.bytesToWord(randomIV.slice(4, 8)),
                eth_1.bytesToWord(randomIV.slice(8, 12)),
                eth_1.bytesToWord(randomIV.slice(12, 16)),
            ],
        };
        return sjcl_1.default.encrypt(password, value, encryptOptions);
    }
    getAddress(publicKey) {
        const buffer = Buffer.from(publicKey, "hex");
        const payload = utils_1.getPayloadSecp256K1(buffer);
        const checksum = utils_1.getChecksum(Buffer.concat([Buffer.from("01", "hex"), payload]));
        const prefix = this.env == 3 ? "f1" : "t1";
        return (prefix +
            base32Encode(new Uint8Array(Buffer.concat([payload, checksum])), "RFC4648", {
                padding: false,
            }).toLowerCase());
    }
    generateRandomSeed() {
        const mnemonic = bip39.generateMnemonic(256);
        return bip39.mnemonicToSeedSync(mnemonic);
    }
}
exports.FilKeychains = FilKeychains;
//# sourceMappingURL=keychains.js.map