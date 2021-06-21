"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilDepositAddress = exports.convertDepositAddressData = void 0;
const abstractWallet_1 = require("./abstractWallet");
const common_1 = require("../utils/common");
const wallet_1 = require("../wallet");
const blockchain_1 = require("../blockchain");
exports.convertDepositAddressData = (data) => {
    return Object.assign(Object.assign({}, data), { blockchain: blockchain_1.BlockchainType.FILECOIN, status: wallet_1.convertWalletStatus(wallet_1.WalletStatus.ACTIVE) });
};
class FilDepositAddress extends abstractWallet_1.FilAbstractWallet {
    constructor(client, data, keychains, depositAddressData) {
        super(client, data, keychains, `/wallets/${data.id}/deposit-addresses/${depositAddressData.id}`);
        this.depositAddressData = depositAddressData;
    }
    async changeName(name) {
        const request = {
            name,
        };
        const response = await this.client.patch(`${this.baseUrl}/name`, request);
        this.depositAddressData.name = response.name;
    }
    getAccountKey() {
        throw new Error("unimplemented method");
    }
    getAddress() {
        return this.depositAddressData.address;
    }
    getData() {
        return this.depositAddressData;
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
        throw new Error("unimplemented method");
    }
    getId() {
        return this.depositAddressData.id;
    }
    updateAccountKey(key) {
        throw new Error("unimplemented method");
    }
}
exports.FilDepositAddress = FilDepositAddress;
//# sourceMappingURL=depositAddress.js.map