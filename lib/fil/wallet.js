"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilWallet = exports.convertWalletData = void 0;
const abstractWallet_1 = require("./abstractWallet");
const depositAddress_1 = require("./depositAddress");
const common_1 = require("../utils/common");
const blockchain_1 = require("../blockchain");
const wallet_1 = require("../wallet");
const url_1 = require("../utils/url");
exports.convertWalletData = (data) => {
    return Object.assign(Object.assign({}, data), { blockchain: blockchain_1.BlockchainType.FILECOIN, status: wallet_1.convertWalletStatus(data.status) });
};
class FilWallet extends abstractWallet_1.FilAbstractWallet {
    constructor(client, data, keychains) {
        super(client, data, keychains, `/wallets/${data.id}`);
    }
    async changeName(name) {
        common_1.checkNullAndUndefinedParameter({ name });
        const request = {
            name,
        };
        const walletData = await this.client.patch(`${this.baseUrl}/name`, request);
        this.data.name = walletData.name;
    }
    getAccountKey() {
        return this.data.accountKey;
    }
    getAddress() {
        return this.data.address;
    }
    getData() {
        return this.data;
    }
    async getBalance() {
        const response = await this.client.get(`${this.baseUrl}/balance`);
        return [
            {
                coinId: null,
                symbol: "FIL",
                amount: common_1.BNConverter.hexStringToBN(String(response.balance)),
                spendableAmount: common_1.BNConverter.hexStringToBN(String(response.spendableBalance)),
                coinType: "FIL",
                name: "Filecoin",
                decimals: 18,
            },
        ];
    }
    getEncryptionKey() {
        return this.data.encryptionKey;
    }
    getId() {
        return this.data.id;
    }
    updateAccountKey(key) {
        this.data.accountKey = key;
    }
    async createDepositAddress(name, passphrase, otpCode) {
        const wallet = await this.client.get(this.baseUrl);
        const depositAddressKey = this.keychains.derive(this.getAccountKey(), passphrase, wallet.nextChildNumber);
        const depositAddressData = await this.client.post(`${this.baseUrl}/deposit-addresses`, {
            name: name,
            childNumber: wallet.nextChildNumber,
            pub: depositAddressKey.pub,
            otpCode: otpCode,
        });
        return new depositAddress_1.FilDepositAddress(this.client, this.data, this.keychains, depositAddressData);
    }
    async getDepositAddresses(options) {
        const queryString = url_1.makeQueryString(options);
        const depositAddressDataList = await this.client.get(`${this.baseUrl}/deposit-addresses${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: depositAddressDataList.pagination,
            results: depositAddressDataList.results.map((data) => new depositAddress_1.FilDepositAddress(this.client, this.data, this.keychains, depositAddress_1.convertDepositAddressData(data))),
        };
    }
    async getDepositAddress(depositAddressId) {
        const depositAddressData = await this.client.get(`${this.baseUrl}/deposit-addresses/${depositAddressId}`);
        return new depositAddress_1.FilDepositAddress(this.client, this.data, this.keychains, depositAddress_1.convertDepositAddressData(depositAddressData));
    }
    async transfer(to, amount, passphrase, otpCode) {
        return null;
    }
    async flush(targets, passphrase) {
        return null;
    }
    async getFlushes() {
        throw new Error("this feature is not supported yet");
    }
    async getFlush() {
        throw new Error("this feature is not supported yet");
    }
    async getInternalFlushes() {
        throw new Error("this feature is not supported yet");
    }
    async getInternalFlush() {
        throw new Error("this feature is not supported yet");
    }
    async retryCreateDepositAddress(walletId, gasPrice) {
        throw new Error("unimplemented method");
    }
    async approve(params) {
        throw new Error("this feature is not supported yet");
    }
    async reject(params) {
        throw new Error("this feature is not supported yet");
    }
}
exports.FilWallet = FilWallet;
//# sourceMappingURL=wallet.js.map