"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilDepositAddress = exports.convertDepositAddressData = void 0;
const abstractWallet_1 = require("./abstractWallet");
const wallet_1 = require("../wallet");
const blockchain_1 = require("../blockchain");
const utils_1 = require("./utils");
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
        return [utils_1.convertBalanceDtoToFilBalance(response)];
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