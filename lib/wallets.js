"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallets = void 0;
const web3_1 = __importDefault(require("web3"));
const pbkdf2_1 = __importDefault(require("pbkdf2"));
const lodash_1 = __importDefault(require("lodash"));
class Wallets {
    constructor(env, client, keychains) {
        this.baseUrl = "/wallets";
        this.env = env;
        this.client = client;
        this.keychains = keychains;
    }
    createEncryptionKey(p) {
        const randomHex = web3_1.default.utils.randomHex(32);
        return pbkdf2_1.default.pbkdf2Sync(p, randomHex, 1, 256 / 8, "sha512");
    }
    removePrivateKey(key) {
        return {
            address: key.address,
            pub: key.pub,
            keyFile: key.keyFile,
        };
    }
    removeKeyFile(key) {
        return lodash_1.default.omit(key, "keyFile");
    }
    createDummyEncryptionKey() {
        let dummyKey = "";
        const length = 64;
        for (let i = 0; i < length; i++) {
            dummyKey += "f";
        }
        return dummyKey;
    }
}
exports.Wallets = Wallets;
//# sourceMappingURL=wallets.js.map