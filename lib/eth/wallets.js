"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthWallets = void 0;
const aes_js_1 = __importDefault(require("aes-js"));
const js_base64_1 = require("js-base64");
const blockchain_1 = require("../blockchain");
const recoverykit_1 = require("../recoverykit");
const wallet_1 = require("./wallet");
const wallets_1 = require("../wallets");
const keychains_1 = require("./keychains");
const hash_1 = require("./eth-core-lib/hash");
const url_1 = require("../utils/url");
const common_1 = require("../utils/common");
const wallet_2 = require("../utils/wallet");
class EthWallets extends wallets_1.Wallets {
    constructor(client, keychains, env, henesisKey, blockchain) {
        super(env, client, keychains);
        this.henesisKey = henesisKey;
        this.blockchain = blockchain;
    }
    async getMasterWallet(id) {
        const walletData = await this.client.get(`${this.baseUrl}/${id}`);
        if (!wallet_2.isLessThanWalletV4(walletData.version)) {
            throw new Error("This wallet is not a compatible version. Please use the v3 APIs.");
        }
        return new wallet_1.EthMasterWallet(this.client, wallet_1.transformMasterWalletData(walletData), this.keychains, this.blockchain);
    }
    async getWallet(id) {
        const walletData = await this.client.get(`${this.baseUrl}/${id}`);
        if (wallet_2.isLessThanWalletV4(walletData.version)) {
            throw new Error("This wallet is not a compatible version. Please use the v2 APIs.");
        }
        return new wallet_1.EthWallet(this.client, wallet_1.transformMasterWalletData(walletData), this.keychains, this.blockchain);
    }
    async getWallets(options) {
        const queryString = url_1.makeQueryString(options);
        const walletDatas = await this.client.get(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);
        return walletDatas
            .filter((walletData) => !wallet_2.isLessThanWalletV4(walletData.version))
            .map((walletData) => {
            return new wallet_1.EthWallet(this.client, wallet_1.transformMasterWalletData(walletData), this.keychains, this.blockchain);
        });
    }
    async getAllWallets(options) {
        const queryString = url_1.makeQueryString(options);
        const walletDatas = await this.client.get(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);
        return walletDatas.map((walletData) => {
            const { version } = walletData;
            if (wallet_2.isLessThanWalletV4(version)) {
                return new wallet_1.EthMasterWallet(this.client, wallet_1.transformMasterWalletData(walletData), this.keychains, this.blockchain);
            }
            return new wallet_1.EthWallet(this.client, wallet_1.transformMasterWalletData(walletData), this.keychains, this.blockchain);
        });
    }
    async getMasterWallets(options) {
        const queryString = url_1.makeQueryString(options);
        const walletDatas = await this.client.get(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);
        return walletDatas
            .filter((walletData) => wallet_2.isLessThanWalletV4(walletData.version))
            .map((walletData) => new wallet_1.EthMasterWallet(this.client, wallet_1.transformMasterWalletData(walletData), this.keychains, this.blockchain));
    }
    async createRecoveryKit(name, passphrase) {
        const accountKey = this.keychains.create(passphrase);
        const backupKey = this.keychains.create(passphrase);
        const encryptionKeyBuffer = this.createEncryptionKey(passphrase);
        const henesisKey = await this.henesisKey.getHenesisKey();
        const aes = new aes_js_1.default.ModeOfOperation.ctr(encryptionKeyBuffer);
        const encryptedPassphrase = aes_js_1.default.utils.hex.fromBytes(aes.encrypt(aes_js_1.default.utils.utf8.toBytes(passphrase)));
        return new recoverykit_1.RecoveryKit(name, this.blockchain, henesisKey, accountKey, backupKey, js_base64_1.Base64.encode(encryptedPassphrase), aes_js_1.default.utils.hex.fromBytes(encryptionKeyBuffer), this.env);
    }
    async createMasterWalletWithKit(recoveryKit) {
        const walletData = await this.client.post(this.baseUrl, {
            name: recoveryKit.getName(),
            accountKey: this.removePrivateKey(recoveryKit.getAccountKey()),
            backupKey: this.removeKeyFile(this.removePrivateKey(recoveryKit.getBackupKey())),
            encryptionKey: recoveryKit.getEncryptionKey(),
        });
        return new wallet_1.EthMasterWallet(this.client, wallet_1.transformMasterWalletData(walletData), this.keychains, this.blockchain);
    }
    async createMasterWallet(name, passphrase, gasPrice) {
        common_1.checkNullAndUndefinedParameter({ name, passphrase });
        const accountKey = this.keychains.create(passphrase);
        const backupKey = this.keychains.create(passphrase);
        const encryptionKeyBuffer = this.createEncryptionKey(passphrase);
        const walletData = await this.client.post(this.baseUrl, {
            name,
            blockchain: this.blockchain,
            accountKey: this.removePrivateKey(accountKey),
            backupKey: this.removeKeyFile(this.removePrivateKey(backupKey)),
            encryptionKey: aes_js_1.default.utils.hex.fromBytes(encryptionKeyBuffer),
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
        });
        return new wallet_1.EthMasterWallet(this.client, wallet_1.transformMasterWalletData(walletData), this.keychains, this.blockchain);
    }
    async retryCreateMasterWallet(walletId, gasPrice) {
        common_1.checkNullAndUndefinedParameter({ walletId });
        const response = await this.client.post(`${this.baseUrl}/${walletId}/recreate`, {
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
        });
        return new wallet_1.EthMasterWallet(this.client, wallet_1.transformMasterWalletData(response), this.keychains, this.blockchain);
    }
    verifyAddress(address) {
        if (!/^(0x|0X)?[0-9a-fA-F]{40}$/i.test(address)) {
            return false;
        }
        const lowerCaseAddress = address.toLowerCase();
        const checksumAddress = keychains_1.toChecksum(lowerCaseAddress);
        const addressHash = hash_1.keccak256s(lowerCaseAddress.slice(2));
        for (let i = 0; i < 40; i++) {
            if ((parseInt(addressHash[i + 2], 16) > 7 &&
                lowerCaseAddress[i + 2].toUpperCase() !== checksumAddress[i + 2]) ||
                (parseInt(addressHash[i + 2], 16) <= 7 &&
                    lowerCaseAddress[i + 2].toLowerCase() !== checksumAddress[i + 2])) {
                return false;
            }
        }
        return true;
    }
    async createInactiveMasterWallet(name) {
        common_1.checkNullAndUndefinedParameter({ name });
        const params = {
            name,
            encryptionKey: this.createDummyEncryptionKey(),
        };
        const masterWalletResponse = await this.client.post(`${this.baseUrl}?type=inactive`, params);
        const { id, name: walletName, blockchain, henesisKey, status, createdAt, updatedAt, } = masterWalletResponse;
        return {
            id,
            name: walletName,
            blockchain: blockchain_1.transformBlockchainType(blockchain),
            henesisKey,
            status,
            createdAt,
            updatedAt,
        };
    }
    async createWalletWithKit(recoveryKit) {
        const walletData = await this.client.post(this.baseUrl, {
            name: recoveryKit.getName(),
            accountKey: recoveryKit.getAccountKey(),
            backupKey: this.removeKeyFile(recoveryKit.getBackupKey()),
            encryptionKey: recoveryKit.getEncryptionKey(),
        });
        return new wallet_1.EthWallet(this.client, wallet_1.transformMasterWalletData(walletData), this.keychains, this.blockchain);
    }
    async createWallet(name, passphrase, gasPrice) {
        common_1.checkNullAndUndefinedParameter({ name, passphrase });
        const accountKey = this.keychains.create(passphrase);
        const backupKey = this.keychains.create(passphrase);
        const encryptionKeyBuffer = this.createEncryptionKey(passphrase);
        const walletData = await this.client.post(this.baseUrl, {
            name,
            blockchain: this.blockchain,
            accountKey: this.removePrivateKey(accountKey),
            backupKey: this.removeKeyFile(this.removePrivateKey(backupKey)),
            encryptionKey: aes_js_1.default.utils.hex.fromBytes(encryptionKeyBuffer),
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
        });
        return new wallet_1.EthWallet(this.client, wallet_1.transformMasterWalletData(walletData), this.keychains, this.blockchain);
    }
    async retryCreateWallet(walletId, gasPrice) {
        common_1.checkNullAndUndefinedParameter({ walletId });
        const response = await this.client.post(`${this.baseUrl}/${walletId}/recreate`, {
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
        });
        return new wallet_1.EthWallet(this.client, wallet_1.transformMasterWalletData(response), this.keychains, this.blockchain);
    }
    async createInactiveWallet(name) {
        common_1.checkNullAndUndefinedParameter({ name });
        const params = {
            name,
            encryptionKey: this.createDummyEncryptionKey(),
        };
        const masterWalletResponse = await this.client.post(`${this.baseUrl}?type=inactive`, params);
        const { id, name: walletName, blockchain, henesisKey, status, createdAt, updatedAt, } = masterWalletResponse;
        return {
            id,
            name: walletName,
            blockchain: blockchain_1.transformBlockchainType(blockchain),
            henesisKey,
            status,
            createdAt,
            updatedAt,
        };
    }
}
exports.EthWallets = EthWallets;
//# sourceMappingURL=wallets.js.map