"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilMasterWallet = exports.convertWalletData = void 0;
const abstractWallet_1 = require("./abstractWallet");
const depositAddress_1 = require("./depositAddress");
const common_1 = require("../utils/common");
const bn_js_1 = __importDefault(require("bn.js"));
const blockchain_1 = require("../blockchain");
const wallet_1 = require("../wallet");
const url_1 = require("../utils/url");
const ipld_dag_cbor_1 = __importDefault(require("ipld-dag-cbor"));
const data_1 = require("./fil-core-lib/data");
const utils_1 = require("./fil-core-lib/utils");
const types_1 = require("./fil-core-lib/types");
const utils_2 = require("./utils");
exports.convertWalletData = (data) => {
    return Object.assign(Object.assign({}, data), { blockchain: blockchain_1.BlockchainType.FILECOIN, status: wallet_1.convertWalletStatus(data.status) });
};
class FilMasterWallet extends abstractWallet_1.FilAbstractWallet {
    constructor(client, data, keychains) {
        super(client, data, keychains, `/wallets/${data.id}`);
        this.confirmation = common_1.BNConverter.hexStringToBnOrElseNull(data.confirmation);
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
        return [utils_2.convertMasterWalletBalanceDtoToFilBalance(response)];
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
    async createDepositAddress(name, otpCode) {
        const wallet = await this.client.get(this.baseUrl);
        const depositAddressKey = this.keychains.deriveFromPublicKey(this.getAccountKey(), wallet.nextChildNumber);
        const depositAddressData = await this.client.post(`${this.baseUrl}/deposit-addresses`, {
            name: name,
            childNumber: wallet.nextChildNumber,
            address: depositAddressKey.address,
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
    async transfer(to, amount, passphrase, otpCode, gasPremium, metadata) {
        const rawTransaction = await this.client.post(`${this.baseUrl}/transactions/build`, this.createBuildTransactionRequest(to, amount, otpCode, gasPremium));
        const signedTransaction = this.signRawTransaction(rawTransaction, this.getAccountKey(), passphrase, true);
        const transferData = await this.client.post(`${this.baseUrl}/transactions`, {
            toAddress: to,
            amount: common_1.BNConverter.bnToHexString(amount),
            proposalTransaction: utils_2.convertSignedTransactionToRawSignedTransactionDTO(signedTransaction),
            gasPremium: common_1.BNConverter.bnToHexStringOrElseNull(gasPremium),
            otpCode: otpCode,
            metadata: metadata,
        });
        return utils_2.convertDtoToTransfer(transferData);
    }
    async flush(targets, passphrase, gasPremium, metadata) {
        const rawFlushData = await this.client.post(`${this.baseUrl}/flushes/build`, {
            depositAddressIds: targets,
            gasPremium: common_1.BNConverter.bnToHexStringOrElseNull(gasPremium),
        });
        const flushTargets = rawFlushData.targets.map((rawFlushTransaction) => {
            return this.createFlushTarget(rawFlushTransaction, passphrase);
        });
        const flushData = await this.client.post(`${this.baseUrl}/flushes`, {
            targets: flushTargets.map(utils_2.convertFilFlushTargetToDto),
            metadata: metadata,
        });
        return utils_2.convertDtoToFlush(flushData);
    }
    async getFlushes(options) {
        const queryString = url_1.makeQueryString(options);
        const flushDataList = await this.client.get(`${this.baseUrl}/flushes${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: flushDataList.pagination,
            results: flushDataList.results.map(utils_2.convertDtoToFlush),
        };
    }
    async getFlush(flushId) {
        const flushData = await this.client.get(`${this.baseUrl}/flushes/${flushId}`);
        return utils_2.convertDtoToFlush(flushData);
    }
    async getInternalFlushes() {
        throw new Error("this feature is not supported yet");
    }
    async getInternalFlush() {
        throw new Error("this feature is not supported yet");
    }
    async approve(params) {
        throw new Error("this feature is not supported yet");
    }
    async reject(params) {
        throw new Error("this feature is not supported yet");
    }
    getConfirmation() {
        return this.confirmation;
    }
    createBuildTransactionRequest(to, amount, otpCode, gasPremium) {
        const msgParams = [
            utils_1.addressAsBytes(to),
            data_1.serializeBigNum(amount.toString(10)),
            0,
            Buffer.from([]),
        ];
        const serializedMsgParams = ipld_dag_cbor_1.default.util.serialize(msgParams);
        return {
            version: 0,
            to: this.getAddress(),
            from: this.getAccountKey().address,
            value: common_1.BNConverter.bnToHexString(new bn_js_1.default(0)),
            gasLimit: common_1.BNConverter.bnToHexString(new bn_js_1.default(0)),
            gasPremium: common_1.BNConverter.bnToHexStringOrElseNull(gasPremium),
            method: types_1.MethodMultisig.Propose,
            params: Buffer.from(serializedMsgParams).toString("base64"),
            otpCode: otpCode,
        };
    }
    createFlushTarget(rawFlushTransaction, passphrase) {
        const rawTransaction = rawFlushTransaction.rawTransaction;
        const depositAddressKey = this.keychains.derive(this.getAccountKey(), passphrase, rawFlushTransaction.childNumber);
        const signedTransaction = this.signRawTransaction(rawTransaction, depositAddressKey, passphrase, false);
        return {
            depositAddressId: rawFlushTransaction.depositAddressId,
            flushTransaction: signedTransaction,
        };
    }
}
exports.FilMasterWallet = FilMasterWallet;
//# sourceMappingURL=wallet.js.map