"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthDepositAddress = exports.transformDepositAddressData = void 0;
const blockchain_1 = require("../blockchain");
const common_1 = require("../utils/common");
const url_1 = require("../utils/url");
const abstractWallet_1 = require("./abstractWallet");
const wallet_1 = require("../wallet");
exports.transformDepositAddressData = (data) => {
    return Object.assign(Object.assign({}, data), { blockchain: blockchain_1.transformBlockchainType(data.blockchain), status: wallet_1.convertWalletStatus(data.status) });
};
class EthDepositAddress extends abstractWallet_1.EthLikeWallet {
    constructor(client, data, keychains, depositWalletData, blockchain) {
        super(client, data, keychains, blockchain, `/wallets/${data.id}/user-wallets/${depositWalletData.id}`);
        this.depositWalletData = depositWalletData;
    }
    async getBalance(flag, symbol) {
        const queryString = url_1.makeQueryString({ flag, symbol });
        const balances = await this.client.get(`${this.baseUrl}/balance${queryString ? `?${queryString}` : ""}`);
        return balances.map((balance) => {
            var _a, _b;
            return ({
                coinId: balance.coinId,
                symbol: balance.symbol,
                amount: common_1.BNConverter.hexStringToBN(String((_a = balance.amount) !== null && _a !== void 0 ? _a : "0x0")),
                coinType: balance.coinType,
                spendableAmount: common_1.BNConverter.hexStringToBN(String((_b = balance.spendableAmount) !== null && _b !== void 0 ? _b : "0x0")),
                name: balance.name,
                decimals: balance.decimals,
            });
        });
    }
    getAddress() {
        return this.depositWalletData.address;
    }
    getData() {
        return this.depositWalletData;
    }
    getId() {
        return this.depositWalletData.id;
    }
    async changeName(name) {
        const request = {
            name,
        };
        const depositWalletData = await this.client.patch(`${this.baseUrl}/name`, request);
        this.depositWalletData.name = depositWalletData.name;
    }
    transfer(coin, to, amount, passphrase, otpCode, gasPrice, gasLimit) {
        throw new Error("unimplemented method");
    }
    contractCall(contractAddress, value, data, passphrase, otpCode, gasPrice, gasLimit) {
        throw new Error("unimplemented method");
    }
    changePassphrase(passphrase, newPassphrase, otpCode) {
        throw new Error("unimplemented method");
    }
    restorePassphrase(encryptedPassphrase, newPassphrase, otpCode) {
        throw new Error("unimplemented method");
    }
    verifyEncryptedPassphrase(encryptedPassphrase) {
        throw new Error("unimplemented method");
    }
    verifyPassphrase(passphrase) {
        throw new Error("unimplemented method");
    }
    getEncryptionKey() {
        return null;
    }
    getAccountKey() {
        throw new Error("unimplemented method");
    }
    updateAccountKey(key) {
        throw new Error("unimplemented method");
    }
    transferNft() {
        throw new Error("unimplemented method");
    }
    sendNftTransaction() {
        throw new Error("unimplemented method");
    }
}
exports.EthDepositAddress = EthDepositAddress;
//# sourceMappingURL=depositAddress.js.map