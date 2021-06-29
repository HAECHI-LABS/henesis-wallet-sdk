"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtcKeyChains = void 0;
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const bitcoinjs_lib_2 = require("bitcoinjs-lib");
const sjcl_1 = __importDefault(require("../eth/eth-core-lib/sjcl"));
const crypto_1 = __importDefault(require("crypto"));
const eth_1 = require("../eth");
const common_1 = require("../utils/common");
class BtcKeyChains {
    constructor(env) {
        this.env = env;
    }
    create(password) {
        const ecPair = bitcoinjs_lib_1.ECPair.makeRandom({
            network: 3 ? bitcoinjs_lib_2.networks.bitcoin : bitcoinjs_lib_2.networks.testnet,
            compressed: true,
        });
        return {
            keyFile: this.encryptECPair(ecPair, password),
            priv: `0x${ecPair.privateKey.toString("hex")}`,
            pub: `0x${ecPair.publicKey.toString("hex")}`,
        };
    }
    sign(key, password, hexPayload) {
        const ecPair = this.decryptECPair(key, password);
        return ecPair.sign(Buffer.from(hexPayload, "hex")).toString("hex");
    }
    changePassword(key, password, newPassword) {
        const ecPair = this.decryptECPair(key, password);
        return {
            keyFile: this.encryptECPair(ecPair, newPassword),
            priv: `0x${ecPair.privateKey.toString("hex")}`,
            pub: `0x${ecPair.publicKey.toString("hex")}`,
        };
    }
    decrypt(key, password) {
        try {
            return `0x${sjcl_1.default.decrypt(password, key.keyFile)}`;
        }
        catch (error) {
            if (error.message.includes("ccm: tag doesn't match") ||
                error.message.includes("sjcl.exception.invalid is not a constructor")) {
                error.message = `password error - ${error.message}`;
            }
            else if (error.message === "sjcl.exception.corrupt is not a constructor") {
                error.message = "password error";
            }
            throw error;
        }
    }
    encryptECPair(ecPair, password) {
        return this.encryptRawPrivateKey(ecPair.privateKey.toString("hex"), password);
    }
    encryptRawPrivateKey(privateKey, password) {
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
        return sjcl_1.default.encrypt(password, privateKey, encryptOptions);
    }
    decryptECPair(key, password) {
        const decryptedKey = this.decrypt(key, password);
        return bitcoinjs_lib_1.ECPair.fromPrivateKey(Buffer.from(common_1.BNConverter.remove0x(decryptedKey), "hex"), {
            compressed: true,
            network: 3 ? bitcoinjs_lib_2.networks.bitcoin : bitcoinjs_lib_2.networks.testnet,
        });
    }
}
exports.BtcKeyChains = BtcKeyChains;
//# sourceMappingURL=keychains.js.map