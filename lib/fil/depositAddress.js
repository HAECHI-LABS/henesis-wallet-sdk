"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilDepositAddress = exports.convertDepositAddressData = void 0;
const abstractWallet_1 = require("./abstractWallet");
const wallet_1 = require("../wallet");
const blockchain_1 = require("../blockchain");
const utils_1 = require("./utils");
const bn_js_1 = __importDefault(require("bn.js"));
const common_1 = require("../utils/common");
const types_1 = require("./fil-core-lib/types");
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
    async transfer(to, amount, passphrase, otpCode, metadata) {
        const rawTransaction = await this.client.post(`${this.baseUrl}/transactions/build`, this.createBuildTransactionRequest(to, amount, otpCode));
        const key = this.keychains.derive(this.data.accountKey, passphrase, this.depositAddressData.childNumber);
        const signedTransaction = this.signRawTransaction(rawTransaction, key, passphrase, false);
        const transferData = await this.client.post(`${this.baseUrl}/transactions`, {
            transaction: utils_1.convertSignedTransactionToRawSignedTransactionDTO(signedTransaction),
            otpCode: otpCode,
            metadata: metadata,
        });
        return utils_1.convertDtoToTransfer(transferData);
    }
    createBuildTransactionRequest(to, amount, otpCode) {
        return {
            version: 0,
            to: to,
            from: this.getAddress(),
            value: common_1.BNConverter.bnToHexString(amount),
            gasLimit: common_1.BNConverter.bnToHexString(new bn_js_1.default(0)),
            gasPremium: null,
            method: types_1.MethodTransfer,
            params: null,
            otpCode: otpCode,
        };
    }
}
exports.FilDepositAddress = FilDepositAddress;
//# sourceMappingURL=depositAddress.js.map