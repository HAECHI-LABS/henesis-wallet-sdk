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
class FilRecoveryKit extends recoverykit_1.RecoveryKit {
    constructor(name, blockchain, henesisKey, accountKey, backupKey, encryptedPassphrase, encryptionKey, env) {
        super(name, blockchain, henesisKey, accountKey, backupKey, encryptedPassphrase, encryptionKey, env);
        this.accountKey = accountKey;
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
    async getWallet(id) {
        const walletData = await this.client.get(`${this.baseUrl}/${id}`);
        return new wallet_1.FilWallet(this.client, wallet_2.convertWalletData(walletData), this.keychains);
    }
    async getWallets(options) {
        const walletDataList = await this.client.get(`${this.baseUrl}`);
        return walletDataList.map((walletData) => {
            return new wallet_1.FilWallet(this.client, wallet_2.convertWalletData(walletData), this.keychains);
        });
    }
    async createWalletWithKit(recoveryKit) {
        const walletData = await this.client.post(this.baseUrl, {
            name: recoveryKit.getName(),
            encryptionKey: recoveryKit.getEncryptionKey(),
            accountKey: recoveryKit.getAccountKey(),
            backupKey: recoveryKit.getBackupKey(),
        });
        return new wallet_1.FilWallet(this.client, wallet_2.convertWalletData(walletData), this.keychains);
    }
    async retryCreateWallet(walletId) {
        common_1.checkNullAndUndefinedParameter({ walletId });
        const response = await this.client.post(`${this.baseUrl}/${walletId}/recreate`);
        return new wallet_1.FilWallet(this.client, wallet_2.convertWalletData(response), this.keychains);
    }
}
exports.FilWallets = FilWallets;
//# sourceMappingURL=wallets.js.map