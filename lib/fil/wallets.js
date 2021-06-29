"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilWallets = exports.FilRecoveryKit = void 0;
const aes_js_1 = __importDefault(require("aes-js"));
const js_base64_1 = require("js-base64");
const wallet_1 = require("./wallet");
const wallets_1 = require("../wallets");
const wallet_2 = require("./wallet");
const recoverykit_1 = require("../recoverykit");
const common_1 = require("../utils/common");
const utils_1 = require("./fil-core-lib/utils");
const url_1 = require("../utils/url");
class FilRecoveryKit extends recoverykit_1.RecoveryKit {
    constructor(name, blockchain, henesisKey, accountKey, backupKey, encryptedPassphrase, encryptionKey, env) {
        super(name, blockchain, henesisKey, accountKey, backupKey, encryptedPassphrase, encryptionKey, env);
        this.accountKey = accountKey;
    }
    getAccountKey() {
        return this.accountKey;
    }
}
exports.FilRecoveryKit = FilRecoveryKit;
class FilWallets extends wallets_1.Wallets {
    constructor(client, keychains, env, blockchain, feeWallets) {
        super(env, client, keychains);
        this.blockchain = blockchain;
        this.feeWallets = feeWallets;
    }
    async createRecoveryKit(name, passphrase) {
        const accountKey = this.keychains.createWithChainCode(passphrase);
        const backupKey = this.keychains.create(passphrase);
        const encryptionKeyBuffer = this.createEncryptionKey(passphrase);
        const feeWallet = await this.feeWallets.getFeeWallet();
        const henesisKey = feeWallet.defaultFeeWallet;
        const aes = new aes_js_1.default.ModeOfOperation.ctr(encryptionKeyBuffer);
        const encryptedPassphrase = aes_js_1.default.utils.hex.fromBytes(aes.encrypt(aes_js_1.default.utils.utf8.toBytes(passphrase)));
        return new FilRecoveryKit(name, this.blockchain, henesisKey, accountKey, backupKey, js_base64_1.Base64.encode(encryptedPassphrase), aes_js_1.default.utils.hex.fromBytes(encryptionKeyBuffer), this.env);
    }
    verifyAddress(address) {
        common_1.checkNullAndUndefinedParameter({ address });
        try {
            utils_1.addressAsBytes(address);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async getMasterWallet(id) {
        const masterWalletData = await this.client.get(`${this.baseUrl}/${id}`);
        return new wallet_1.FilMasterWallet(this.client, wallet_2.convertWalletData(masterWalletData), this.keychains);
    }
    async getMasterWallets(options) {
        const queryString = url_1.makeQueryString(options);
        const masterWalletDataList = await this.client.get(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);
        return masterWalletDataList.map((walletData) => {
            return new wallet_1.FilMasterWallet(this.client, wallet_2.convertWalletData(walletData), this.keychains);
        });
    }
    async createMasterWalletWithKit(recoveryKit) {
        const accountKey = recoveryKit.getAccountKey();
        const backupKey = recoveryKit.getBackupKey();
        const masterWalletData = await this.client.post(this.baseUrl, {
            name: recoveryKit.getName(),
            encryptionKey: recoveryKit.getEncryptionKey(),
            accountKey: {
                address: accountKey.address,
                pub: accountKey.pub,
                keyFile: accountKey.keyFile,
                chainCode: accountKey.chainCode,
            },
            backupKey: {
                pub: backupKey.pub,
                keyFile: backupKey.keyFile,
            },
        });
        return new wallet_1.FilMasterWallet(this.client, wallet_2.convertWalletData(masterWalletData), this.keychains);
    }
    async retryCreateMasterWallet(masterWalletId) {
        common_1.checkNullAndUndefinedParameter({ masterWalletId });
        const response = await this.client.post(`${this.baseUrl}/${masterWalletId}/recreate`);
        return new wallet_1.FilMasterWallet(this.client, wallet_2.convertWalletData(response), this.keychains);
    }
}
exports.FilWallets = FilWallets;
//# sourceMappingURL=wallets.js.map