"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = exports.formatMultiSigPayload = exports.TransactionStatus = void 0;
const url_1 = require("../utils/url");
const eth_1 = require("../__generate__/eth");
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("./utils");
exports.TransactionStatus = eth_1.TransactionStatus;
const common_1 = require("../utils/common");
const bytes_1 = __importDefault(require("./eth-core-lib/bytes"));
exports.formatMultiSigPayload = (multiSigPayload) => {
    return `0x${multiSigPayload.walletAddress
        .toLowerCase()
        .slice(2)}${multiSigPayload.toAddress.toLowerCase().slice(2)}${bytes_1.default.pad(32, bytes_1.default.fromNat(`0x${multiSigPayload.value.toString(16)}`)).slice(2)}${bytes_1.default.pad(32, bytes_1.default.fromNat(`0x${multiSigPayload.walletNonce.toString(16)}`)).slice(2)}${multiSigPayload.hexData.slice(2)}`;
};
class Transactions {
    constructor(client) {
        this.client = client;
    }
    mappingDetailedRawTransactionDTOToDetailedRawTransaction(detailedRawTransactionDTO) {
        return Object.assign(Object.assign({}, utils_1.convertRawTransactionDTO(detailedRawTransactionDTO)), { fee: detailedRawTransactionDTO.fee
                ? common_1.BNConverter.hexStringToBN(String(detailedRawTransactionDTO.fee))
                : null });
    }
    async getRawTransaction(transactionHash) {
        const response = await this.client.get(`/raw-transactions/${transactionHash}`);
        return this.mappingDetailedRawTransactionDTOToDetailedRawTransaction(response);
    }
    async getTransaction(transactionId) {
        const response = await this.client.get(`/transactions/${transactionId}`);
        return utils_1.convertTransactionDTO(response);
    }
    async getTransactions(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`/transactions${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: lodash_1.default.map(data.results, (result) => utils_1.convertTransactionDTO(result)),
        };
    }
}
exports.Transactions = Transactions;
//# sourceMappingURL=transactions.js.map