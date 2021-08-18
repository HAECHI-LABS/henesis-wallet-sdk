"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LtcWallets = void 0;
const wallet_1 = require("./wallet");
const wallets_1 = require("../wallets");
const aes_js_1 = __importDefault(require("aes-js"));
const url_1 = require("../utils/url");
const blockchain_1 = require("../blockchain");
const js_base64_1 = require("js-base64");
const recoveryKit_1 = require("./recoveryKit");
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const __1 = require("..");
const network_1 = require("./network");
class LtcWallets extends wallets_1.Wallets {
    constructor(env, client, keychains) {
        super(env, client, keychains);
    }
    async createMasterWallet(name, passphrase) {
        const accountKeyWithPriv = this.keychains.create(passphrase);
        const backupKetWithPriv = this.keychains.create(passphrase);
        const encryptionKeyBuffer = this.createEncryptionKey(passphrase);
        const data = await this.client.post(this.baseUrl, {
            name,
            encryptionKey: aes_js_1.default.utils.hex.fromBytes(encryptionKeyBuffer),
            accountKey: {
                keyFile: accountKeyWithPriv.keyFile,
                pub: accountKeyWithPriv.pub,
            },
            backupKey: {
                pub: backupKetWithPriv.pub,
            },
        });
        return new wallet_1.LtcMasterWallet(wallet_1.transformWalletData(data), this.client, this.keychains, this.env);
    }
    async getWallet(id) {
        const data = await this.client.get(`${this.baseUrl}/${id}`);
        return new wallet_1.LtcMasterWallet(wallet_1.transformWalletData(data), this.client, this.keychains, this.env);
    }
    verifyAddress(address) {
        __1.checkNullAndUndefinedParameter({ address });
        try {
            bitcoinjs_lib_1.address.toOutputScript(address, this.env === 3 ? network_1.litecoinMainnet : network_1.litecoinTestnet);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async getMasterWallets(options) {
        const queryString = url_1.makeQueryString(options);
        const walletDatas = await this.client.get(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);
        return walletDatas.map((wallet) => new wallet_1.LtcMasterWallet(wallet_1.transformWalletData(wallet), this.client, this.keychains, this.env));
    }
    async createRecoveryKit(name, passphrase) {
        const accountKey = this.keychains.create(passphrase);
        const backupKey = this.keychains.create(passphrase);
        const encryptionKeyBuffer = this.createEncryptionKey(passphrase);
        const params = {
            name,
            encryptionKey: aes_js_1.default.utils.hex.fromBytes(encryptionKeyBuffer),
        };
        const masterWalletResponse = await this.client.post(`${this.baseUrl}?type=inactive`, params);
        const aes = new aes_js_1.default.ModeOfOperation.ctr(encryptionKeyBuffer);
        const encryptedPassphrase = aes_js_1.default.utils.hex.fromBytes(aes.encrypt(aes_js_1.default.utils.utf8.toBytes(passphrase)));
        return new recoveryKit_1.LtcRecoveryKit(name, blockchain_1.BlockchainType.LITECOIN, masterWalletResponse.henesisKey, accountKey, backupKey, js_base64_1.Base64.encode(encryptedPassphrase), aes_js_1.default.utils.hex.fromBytes(encryptionKeyBuffer), this.env, masterWalletResponse.id);
    }
    async createMasterWalletWithKit(recoveryKit) {
        const accountKey = recoveryKit.getAccountKey();
        const backupKey = this.removeKeyFile(recoveryKit.getBackupKey());
        const params = {
            accountKey: {
                pub: accountKey.pub,
                keyFile: accountKey.keyFile,
            },
            backupKey: {
                pub: backupKey.pub,
                keyFile: backupKey.keyFile,
            },
        };
        const walletId = recoveryKit.getWalletId();
        const wallet = await this.client.post(`${this.baseUrl}/${walletId}/activate`, params);
        return new wallet_1.LtcMasterWallet(wallet_1.transformWalletData(wallet), this.client, this.keychains, this.env);
    }
    async createInactiveMasterWallet(name) {
        __1.checkNullAndUndefinedParameter({ name });
        const params = {
            name,
            encryptionKey: this.createDummyEncryptionKey(),
        };
        const masterWalletResponse = await this.client.post(`${this.baseUrl}?type=inactive`, params);
        const { id, name: walletName, status, createdAt } = masterWalletResponse;
        return {
            id,
            name: walletName,
            blockchain: blockchain_1.BlockchainType.LITECOIN,
            henesisKey: {
                pub: masterWalletResponse.henesisKey.pub,
                keyFile: undefined,
            },
            status,
            createdAt,
        };
    }
}
exports.LtcWallets = LtcWallets;
//# sourceMappingURL=wallets.js.map