"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthMasterWallet = exports.EthWallet = exports.transformMasterWalletData = void 0;
const web3_1 = __importDefault(require("web3"));
const wallet_1 = require("../wallet");
const blockchain_1 = require("../blockchain");
const Wallet_json_1 = __importDefault(require("../contracts/Wallet.json"));
const common_1 = require("../utils/common");
const url_1 = require("../utils/url");
const depositAddress_1 = require("./depositAddress");
const userWallet_1 = require("./userWallet");
const abstractWallet_1 = require("./abstractWallet");
exports.transformMasterWalletData = (data) => {
    return Object.assign(Object.assign({}, data), { blockchain: blockchain_1.transformBlockchainType(data.blockchain), status: wallet_1.convertWalletStatus(data.status) });
};
class EthWallet extends abstractWallet_1.EthLikeWallet {
    constructor(client, data, keychains, blockchain) {
        super(client, data, keychains, blockchain, `/wallets/${data.id}`);
        this.walletContract = new new web3_1.default().eth.Contract(Wallet_json_1.default);
    }
    getEncryptionKey() {
        return this.data.encryptionKey;
    }
    getAccountKey() {
        return this.data.accountKey;
    }
    updateAccountKey(key) {
        this.data.accountKey = key;
    }
    async activate(accountKey, backupKey) {
        const params = {
            accountKey: {
                pub: accountKey.pub,
                address: abstractWallet_1.getAddressFromCompressedPub(accountKey.pub),
                keyFile: undefined,
            },
            backupKey: {
                pub: backupKey.pub,
                address: abstractWallet_1.getAddressFromCompressedPub(backupKey.pub),
                keyFile: undefined,
            },
            gasPrice: undefined,
        };
        const masterWallet = await this.client.post(`${this.baseUrl}/activate`, params);
        const { id, name: walletName, blockchain, address, status, createdAt, updatedAt, } = masterWallet;
        return {
            id,
            name: walletName,
            blockchain: blockchain_1.transformBlockchainType(blockchain),
            address,
            status,
            createdAt,
            updatedAt,
        };
    }
    async createDepositAddress(name, passphrase, gasPrice, salt, otpCode) {
        if (salt === undefined || salt == null) {
            salt = web3_1.default.utils.toBN(web3_1.default.utils.randomHex(32));
        }
        let signedMultiSigPayloadDTO = null;
        if (this.getVersionNumber() < 3 && passphrase === undefined) {
            const multiSigPayload = {
                hexData: this.walletContract.methods.createUserWallet(salt).encodeABI(),
                walletNonce: this.getNonce(),
                value: common_1.BNConverter.hexStringToBN("0x0"),
                toAddress: this.getAddress(),
                walletAddress: this.getAddress(),
            };
            signedMultiSigPayloadDTO = abstractWallet_1.convertSignedMultiSigPayloadToDTO(this.signPayload(multiSigPayload, passphrase));
        }
        const depositAddressParams = {
            name,
            salt: common_1.BNConverter.bnToHexString(salt),
            signedMultiSigPayload: signedMultiSigPayloadDTO,
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
            otpCode,
        };
        const depositAddressData = await this.client.post(`${this.baseUrl}/user-wallets`, depositAddressParams);
        return new depositAddress_1.EthDepositAddress(this.client, this.data, this.keychains, depositAddress_1.transformDepositAddressData(depositAddressData), this.blockchain);
    }
    async getDepositAddress(walletId) {
        const userWalletData = await this.client.get(`${this.baseUrl}/user-wallets/${walletId}`);
        return new depositAddress_1.EthDepositAddress(this.client, this.data, this.keychains, depositAddress_1.transformDepositAddressData(userWalletData), this.blockchain);
    }
    async getBalance(flag, symbol) {
        const queryString = url_1.makeQueryString({ flag, symbol });
        const balances = await this.client.get(`${this.baseUrl}/balance${queryString ? `?${queryString}` : ""}`);
        return balances.map((balance) => {
            var _a, _b, _c;
            return ({
                coinId: balance.coinId,
                symbol: balance.symbol,
                amount: common_1.BNConverter.hexStringToBN(String((_a = balance.amount) !== null && _a !== void 0 ? _a : "0x0")),
                coinType: balance.coinType,
                spendableAmount: common_1.BNConverter.hexStringToBN(String((_b = balance.spendableAmount) !== null && _b !== void 0 ? _b : "0x0")),
                name: balance.name,
                aggregatedAmount: common_1.BNConverter.hexStringToBN(String((_c = balance.aggregatedAmount) !== null && _c !== void 0 ? _c : "0x0")),
                decimals: balance.decimals,
            });
        });
    }
    getAddress() {
        return this.data.address;
    }
    getData() {
        return this.data;
    }
    async getDepositAddresses(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`${this.baseUrl}/user-wallets${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((data) => new depositAddress_1.EthDepositAddress(this.client, this.data, this.keychains, depositAddress_1.transformDepositAddressData(data), this.blockchain)),
        };
    }
    async retryCreateDepositAddress(walletId, gasPrice) {
        common_1.checkNullAndUndefinedParameter({ walletId });
        const response = await this.client.post(`${this.baseUrl}/user-wallets/${walletId}/recreate`, { gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined });
        return new depositAddress_1.EthDepositAddress(this.client, this.data, this.keychains, depositAddress_1.transformDepositAddressData(response), this.blockchain);
    }
    getId() {
        return this.data.id;
    }
    async changeName(name) {
        common_1.checkNullAndUndefinedParameter({ name });
        const request = {
            name,
        };
        const masterWalletData = await this.client.patch(`${this.baseUrl}/name`, request);
        this.data.name = masterWalletData.name;
    }
    async flush(flushTargets, gasPrice, gasLimit, metadata) {
        const request = {
            targets: flushTargets,
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
            gasLimit: gasLimit ? common_1.BNConverter.bnToHexString(gasLimit) : undefined,
            metadata,
        };
        const response = await this.client.post(`${this.baseUrl}/flush`, request);
        return Object.assign(Object.assign({}, response), { blockchain: blockchain_1.transformBlockchainType(response.blockchain) });
    }
    async getFlushTransactions(option) {
        const queryString = url_1.makeQueryString(option);
        const response = await this.client.get(`${this.baseUrl}/flush-transactions${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: response.pagination,
            results: response.results.map((result) => {
                var _a;
                return Object.assign(Object.assign({}, result), { fee: common_1.BNConverter.hexStringToBN(String((_a = result.fee) !== null && _a !== void 0 ? _a : "0x0")), blockchain: blockchain_1.transformBlockchainType(result.blockchain), transfers: result.transfers.map((transfer) => {
                        var _a;
                        return Object.assign(Object.assign({}, transfer), { amount: common_1.BNConverter.hexStringToBN(String((_a = transfer.amount) !== null && _a !== void 0 ? _a : "0x0")) });
                    }) });
            }),
        };
    }
    async getFlushTransaction(transactionId) {
        var _a;
        const response = await this.client.get(`${this.baseUrl}/flush-transactions/${transactionId}`);
        return Object.assign(Object.assign({}, response), { fee: common_1.BNConverter.hexStringToBN(String((_a = response.fee) !== null && _a !== void 0 ? _a : "0x0")), blockchain: blockchain_1.transformBlockchainType(response.blockchain), transfers: response.transfers.map((transfer) => {
                var _a;
                return Object.assign(Object.assign({}, transfer), { amount: common_1.BNConverter.hexStringToBN(String((_a = transfer.amount) !== null && _a !== void 0 ? _a : "0x0")) });
            }) });
    }
    async approve(params) {
        const wallet = params.userWalletId
            ? await this.getDepositAddress(params.userWalletId)
            : this;
        const coin = await this.coins.getCoin(params.coinSymbol);
        const multiSigPayload = await coin.buildTransferMultiSigPayload(wallet, params.toAddress, params.amount);
        const request = {
            signedMultiSigPayload: abstractWallet_1.convertSignedMultiSigPayloadToDTO(this.signPayload(multiSigPayload, params.passphrase)),
            otpCode: params.otpCode,
        };
        const response = await this.client.post(`${this.withdrawalApprovalUrl}/${params.id}/approve`, request);
        return Object.assign(Object.assign({}, response), { blockchain: blockchain_1.transformBlockchainType(response.blockchain) });
    }
    async reject(params) {
        const request = {
            otpCode: params.otpCode,
        };
        await this.client.post(`${this.withdrawalApprovalUrl}/${params.id}/reject`, request);
    }
    async transferNft(nft, tokenOnchainId, to, passphrase, otpCode, gasPrice, gasLimit, metadata) {
        const n = typeof nft === "number" ? await this.nfts.getNft(nft) : nft;
        return this.sendNftTransaction(await this.buildTransferNftPayload(n, tokenOnchainId, this, to, passphrase), n, tokenOnchainId, otpCode, gasPrice, gasLimit || this.DEFAULT_NFT_TRANSFER_GAS_LIMIT, metadata);
    }
    async sendNftTransaction(signedMultiSigPayload, nft, tokenOnchainId, otpCode, gasPrice, gasLimit, metadata) {
        const request = {
            nftId: nft.getId(),
            tokenOnchainId,
            signedMultiSigPayload: abstractWallet_1.convertSignedMultiSigPayloadToDTO(signedMultiSigPayload),
            gasPrice: common_1.BNConverter.bnToHexStringOrElseNull(gasPrice),
            gasLimit: common_1.BNConverter.bnToHexStringOrElseNull(gasLimit),
            otpCode,
            metadata,
        };
        const response = await this.client.post(`/wallets/${this.getId()}/nft/transactions`, request);
        return Object.assign(Object.assign({}, response), { blockchain: blockchain_1.transformBlockchainType(response.blockchain) });
    }
}
exports.EthWallet = EthWallet;
class EthMasterWallet extends abstractWallet_1.EthLikeWallet {
    constructor(client, data, keychains, blockchain) {
        super(client, data, keychains, blockchain, `/wallets/${data.id}`);
        this.walletContract = new new web3_1.default().eth.Contract(Wallet_json_1.default);
    }
    getEncryptionKey() {
        return this.data.encryptionKey;
    }
    getAccountKey() {
        return this.data.accountKey;
    }
    updateAccountKey(key) {
        this.data.accountKey = key;
    }
    async activate(accountKey, backupKey) {
        const params = {
            accountKey: {
                pub: accountKey.pub,
                address: abstractWallet_1.getAddressFromCompressedPub(accountKey.pub),
                keyFile: undefined,
            },
            backupKey: {
                pub: backupKey.pub,
                address: abstractWallet_1.getAddressFromCompressedPub(backupKey.pub),
                keyFile: undefined,
            },
            gasPrice: undefined,
        };
        const masterWallet = await this.client.post(`${this.baseUrl}/activate`, params);
        const { id, name: walletName, address, status, createdAt, updatedAt, } = masterWallet;
        return {
            id,
            name: walletName,
            blockchain: blockchain_1.transformBlockchainType(masterWallet.blockchain),
            address,
            status,
            createdAt,
            updatedAt,
        };
    }
    async createUserWallet(name, passphrase, gasPrice, salt, otpCode) {
        if (salt === undefined || salt == null) {
            salt = web3_1.default.utils.toBN(web3_1.default.utils.randomHex(32));
        }
        let signedMultiSigPayloadDTO = null;
        if (this.getVersionNumber() < 3) {
            const multiSigPayload = {
                hexData: this.walletContract.methods.createUserWallet(salt).encodeABI(),
                walletNonce: this.getNonce(),
                value: common_1.BNConverter.hexStringToBN("0x0"),
                toAddress: this.getAddress(),
                walletAddress: this.getAddress(),
            };
            signedMultiSigPayloadDTO = abstractWallet_1.convertSignedMultiSigPayloadToDTO(this.signPayload(multiSigPayload, passphrase));
        }
        const userWalletParams = {
            name,
            salt: common_1.BNConverter.bnToHexString(salt),
            signedMultiSigPayload: signedMultiSigPayloadDTO,
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
            otpCode,
        };
        const userWalletData = await this.client.post(`${this.baseUrl}/user-wallets`, userWalletParams);
        return new userWallet_1.EthUserWallet(this.client, this.data, this.keychains, userWallet_1.transformUserWalletData(userWalletData), this.blockchain);
    }
    async getUserWallet(walletId) {
        const userWalletData = await this.client.get(`${this.baseUrl}/user-wallets/${walletId}`);
        return new userWallet_1.EthUserWallet(this.client, this.data, this.keychains, userWallet_1.transformUserWalletData(userWalletData), this.blockchain);
    }
    async getBalance(flag, symbol) {
        const queryString = url_1.makeQueryString({ flag, symbol });
        const balances = await this.client.get(`${this.baseUrl}/balance${queryString ? `?${queryString}` : ""}`);
        return balances.map((balance) => {
            var _a, _b, _c;
            return ({
                coinId: balance.coinId,
                symbol: balance.symbol,
                amount: common_1.BNConverter.hexStringToBN(String((_a = balance.amount) !== null && _a !== void 0 ? _a : "0x0")),
                coinType: balance.coinType,
                spendableAmount: common_1.BNConverter.hexStringToBN(String((_b = balance.spendableAmount) !== null && _b !== void 0 ? _b : "0x0")),
                name: balance.name,
                aggregatedAmount: common_1.BNConverter.hexStringToBN(String((_c = balance.aggregatedAmount) !== null && _c !== void 0 ? _c : "0x0")),
                decimals: balance.decimals,
            });
        });
    }
    getAddress() {
        return this.data.address;
    }
    getData() {
        return this.data;
    }
    async getUserWallets(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`${this.baseUrl}/user-wallets${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((data) => new userWallet_1.EthUserWallet(this.client, this.data, this.keychains, userWallet_1.transformUserWalletData(data), this.blockchain)),
        };
    }
    async retryCreateUserWallet(walletId, gasPrice) {
        common_1.checkNullAndUndefinedParameter({ walletId });
        const response = await this.client.post(`${this.baseUrl}/user-wallets/${walletId}/recreate`, { gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined });
        return new userWallet_1.EthUserWallet(this.client, this.data, this.keychains, userWallet_1.transformUserWalletData(response), this.blockchain);
    }
    getId() {
        return this.data.id;
    }
    async changeName(name) {
        common_1.checkNullAndUndefinedParameter({ name });
        const request = {
            name,
        };
        const masterWalletData = await this.client.patch(`${this.baseUrl}/name`, request);
        this.data.name = masterWalletData.name;
    }
    async flushWithTargets(flushTargets, gasPrice, gasLimit, metadata) {
        const request = {
            targets: flushTargets,
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
            gasLimit: gasLimit ? common_1.BNConverter.bnToHexString(gasLimit) : undefined,
            metadata,
        };
        const response = await this.client.post(`${this.baseUrl}/flush`, request);
        return Object.assign(Object.assign({}, response), { blockchain: blockchain_1.transformBlockchainType(response.blockchain) });
    }
    async flush(coin, userWalletIds, passphrase, otpCode, gasPrice, gasLimit, metadata) {
        if (userWalletIds.length > 50 || userWalletIds.length == 0) {
            throw new Error(`only 1 ~ 50 accounts can be flushed at a time`);
        }
        const c = typeof coin === "string" ? await this.coins.getCoin(coin) : coin;
        const userWallets = await this.getUserWallets({
            ids: userWalletIds,
            size: userWalletIds.length,
        });
        const userWalletAddresses = userWallets.results.map((userWallet) => userWallet.getAddress());
        if (userWalletIds.length != userWalletAddresses.length) {
            throw new Error(`your input user wallet id count is ${userWalletIds.length}. but matched user wallet count is ${userWalletAddresses.length}`);
        }
        const multiSigPayload = {
            hexData: c.buildFlushData(this, userWalletAddresses),
            walletNonce: this.getNonce(),
            value: common_1.BNConverter.hexStringToBN("0x0"),
            toAddress: this.getAddress(),
            walletAddress: this.getAddress(),
        };
        return this.sendTransaction(this.signPayload(multiSigPayload, passphrase), this.getId(), otpCode, gasPrice, gasLimit || this.DEFAULT_CONTRACT_CALL_GAS_LIMIT, metadata);
    }
    async approve(params) {
        const wallet = params.userWalletId
            ? await this.getUserWallet(params.userWalletId)
            : this;
        const coin = await this.coins.getCoin(params.coinSymbol);
        const multiSigPayload = await coin.buildTransferMultiSigPayload(wallet, params.toAddress, params.amount);
        const request = {
            signedMultiSigPayload: abstractWallet_1.convertSignedMultiSigPayloadToDTO(this.signPayload(multiSigPayload, params.passphrase)),
            otpCode: params.otpCode,
        };
        const response = await this.client.post(`${this.withdrawalApprovalUrl}/${params.id}/approve`, request);
        return Object.assign(Object.assign({}, response), { blockchain: blockchain_1.transformBlockchainType(response.blockchain) });
    }
    async reject(params) {
        const request = {
            otpCode: params.otpCode,
        };
        await this.client.post(`${this.withdrawalApprovalUrl}/${params.id}/reject`, request);
    }
    async transferNft(nft, tokenOnchainId, to, passphrase, otpCode, gasPrice, gasLimit, metadata) {
        const n = typeof nft === "number" ? await this.nfts.getNft(nft) : nft;
        return this.sendNftTransaction(await this.buildTransferNftPayload(n, tokenOnchainId, this, to, passphrase), n, tokenOnchainId, otpCode, gasPrice, gasLimit || this.DEFAULT_NFT_TRANSFER_GAS_LIMIT, metadata);
    }
    async sendNftTransaction(signedMultiSigPayload, nft, tokenOnchainId, otpCode, gasPrice, gasLimit, metadata) {
        const request = {
            nftId: nft.getId(),
            tokenOnchainId,
            signedMultiSigPayload: abstractWallet_1.convertSignedMultiSigPayloadToDTO(signedMultiSigPayload),
            gasPrice: common_1.BNConverter.bnToHexStringOrElseNull(gasPrice),
            gasLimit: common_1.BNConverter.bnToHexStringOrElseNull(gasLimit),
            otpCode,
            metadata,
        };
        const response = await this.client.post(`/wallets/${this.getId()}/nft/transactions`, request);
        return Object.assign(Object.assign({}, response), { blockchain: blockchain_1.transformBlockchainType(response.blockchain) });
    }
}
exports.EthMasterWallet = EthMasterWallet;
//# sourceMappingURL=wallet.js.map