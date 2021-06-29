"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthKeychains = exports.bytesToWord = exports.toChecksum = exports.decodeSignature = exports.encodeSignature = void 0;
const crypto_1 = __importDefault(require("crypto"));
const elliptic_1 = __importDefault(require("elliptic"));
const hash_1 = require("./eth-core-lib/hash");
const bytes_1 = __importDefault(require("./eth-core-lib/bytes"));
const sjcl_1 = __importDefault(require("./eth-core-lib/sjcl"));
const nat_1 = require("./eth-core-lib/nat");
const blockchain_1 = require("../blockchain");
const error_1 = require("../error");
const secp256k1 = new elliptic_1.default.ec("secp256k1");
const BASE_V_VALUE = 27;
exports.encodeSignature = ([v, r, s]) => bytes_1.default.flatten([r, s, v]);
exports.decodeSignature = (hex) => [
    bytes_1.default.slice(64, bytes_1.default.length(hex), hex),
    bytes_1.default.slice(0, 32, hex),
    bytes_1.default.slice(32, 64, hex),
];
exports.toChecksum = (address) => {
    const addressHash = hash_1.keccak256s(address.slice(2));
    let checksumAddress = "0x";
    for (let i = 0; i < 40; i++) {
        checksumAddress +=
            parseInt(addressHash[i + 2], 16) > 7
                ? address[i + 2].toUpperCase()
                : address[i + 2];
    }
    return checksumAddress;
};
exports.bytesToWord = (bytes) => bytes.reduce((num, byte) => num * 0x100 + byte, 0);
class EthKeychains {
    constructor(blockchain) {
        this.blockchain = blockchain;
    }
    create(password) {
        const entropy = crypto_1.default.randomBytes(512 / 8);
        const innerHex = hash_1.keccak256(bytes_1.default.concat(bytes_1.default.random(32), entropy || bytes_1.default.random(32)));
        const middleHex = bytes_1.default.concat(bytes_1.default.concat(bytes_1.default.random(32), innerHex), bytes_1.default.random(32));
        const privateKey = hash_1.keccak256(middleHex);
        const buffer = Buffer.from(privateKey.slice(2), "hex");
        const ecKey = secp256k1.keyFromPrivate(buffer);
        const publicKey = `0x${ecKey.getPublic(false, "hex").slice(2)}`;
        const publicHash = hash_1.keccak256(publicKey);
        const address = exports.toChecksum(`0x${publicHash.slice(-40)}`);
        const keyFile = this.encryptPrivToKeyFile(privateKey, password);
        return {
            address,
            pub: publicKey,
            priv: privateKey,
            keyFile,
        };
    }
    changePassword(key, password, newPassword) {
        const priv = this.decrypt(key, password);
        const ecKey = secp256k1.keyFromPrivate(Buffer.from(priv.slice(2), "hex"));
        const publicKey = `0x${ecKey.getPublic(false, "hex").slice(2)}`;
        const publicHash = hash_1.keccak256(publicKey);
        const address = exports.toChecksum(`0x${publicHash.slice(-40)}`);
        const newKeyFile = this.encryptPrivToKeyFile(priv, newPassword);
        return {
            address,
            pub: publicKey,
            priv,
            keyFile: newKeyFile,
        };
    }
    decrypt(key, password) {
        try {
            return sjcl_1.default.decrypt(password, key.keyFile);
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
    sign(key, password, hexPayload) {
        const hashedMessage = hash_1.keccak256(this.payloadToPrefixedMessage(hexPayload));
        const priv = this.decrypt(key, password);
        const signature = secp256k1
            .keyFromPrivate(Buffer.from(priv.slice(2), "hex"))
            .sign(Buffer.from(hashedMessage.slice(2), "hex"), { canonical: true });
        return exports.encodeSignature([
            nat_1.fromString(bytes_1.default.fromNumber(BASE_V_VALUE + signature.recoveryParam)),
            bytes_1.default.pad(32, bytes_1.default.fromNat(`0x${signature.r.toString(16)}`)),
            bytes_1.default.pad(32, bytes_1.default.fromNat(`0x${signature.s.toString(16)}`)),
        ]);
    }
    recoverAddressFromSignature(hexPayload, signature) {
        const vals = exports.decodeSignature(signature);
        const vrs = {
            v: bytes_1.default.toNumber(vals[0]),
            r: vals[1].slice(2),
            s: vals[2].slice(2),
        };
        const ecPublicKey = secp256k1.recoverPubKey(Buffer.from(hash_1.keccak256(this.payloadToPrefixedMessage(hexPayload)).slice(2), "hex"), vrs, vrs.v < 2 ? vrs.v : 1 - (vrs.v % 2));
        const publicKey = `0x${ecPublicKey.encode("hex", false).slice(2)}`;
        const publicHash = hash_1.keccak256(publicKey);
        return exports.toChecksum(`0x${publicHash.slice(-40)}`);
    }
    encryptPrivToKeyFile(privateKey, password) {
        const randomSalt = crypto_1.default.randomBytes(8);
        const randomIV = crypto_1.default.randomBytes(16);
        const encryptOptions = {
            iter: 10000,
            ks: 256,
            salt: [
                exports.bytesToWord(randomSalt.slice(0, 4)),
                exports.bytesToWord(randomSalt.slice(4)),
            ],
            iv: [
                exports.bytesToWord(randomIV.slice(0, 4)),
                exports.bytesToWord(randomIV.slice(4, 8)),
                exports.bytesToWord(randomIV.slice(8, 12)),
                exports.bytesToWord(randomIV.slice(12, 16)),
            ],
        };
        return sjcl_1.default.encrypt(password, privateKey, encryptOptions);
    }
    payloadToPrefixedMessage(hexPayload) {
        const hashedPayload = hash_1.keccak256(hexPayload);
        const payloadBuffer = Buffer.from(hashedPayload.slice(2), "hex");
        const preambleBuffer = Buffer.from(`\u0019${this.blockchainPrefix(this.blockchain)} Signed Message:\n${payloadBuffer.length}`);
        return Buffer.concat([preambleBuffer, payloadBuffer]);
    }
    blockchainPrefix(blockchain) {
        switch (blockchain) {
            case blockchain_1.BlockchainType.ETHEREUM:
                return "Ethereum";
            case blockchain_1.BlockchainType.KLAYTN:
                return "Klaytn";
            default:
                throw new Error(`cannot resolve blockchain for sign`);
        }
    }
}
exports.EthKeychains = EthKeychains;
//# sourceMappingURL=keychains.js.map