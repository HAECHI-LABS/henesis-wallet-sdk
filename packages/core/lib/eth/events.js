"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthEvents = void 0;
const common_1 = require("../utils/common");
const url_1 = require("../utils/url");
class EthEvents {
    constructor(client) {
        this.client = client;
    }
    async getCallEvents(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`/call-events${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((e) => {
                return Object.assign(Object.assign({}, e), { confirmation: common_1.BNConverter.hexStringToBN(e.confirmation) });
            }),
        };
    }
    async getValueTransferEvents(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`/value-transfer-events${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((e) => {
                return Object.assign(Object.assign({}, e), { amount: common_1.BNConverter.hexStringToBN(String(e.amount)), confirmation: common_1.BNConverter.hexStringToBN(String(e.confirmation)) });
            }),
        };
    }
    async getInternalCallEvents(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`/internal/call-events${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((e) => {
                return Object.assign(Object.assign({}, e), { transaction: this.convertSimplifiedTransaction(e.transaction), confirmation: common_1.BNConverter.hexStringToBN(e.confirmation) });
            }),
        };
    }
    async getInternalValueTransferEvents(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`/internal/value-transfer-events${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((e) => {
                return Object.assign(Object.assign({}, e), { transaction: this.convertSimplifiedTransaction(e.transaction), amount: common_1.BNConverter.hexStringToBN(String(e.amount)), confirmation: common_1.BNConverter.hexStringToBN(String(e.confirmation)) });
            }),
        };
    }
    convertSimplifiedTransaction(transaction) {
        return Object.assign(Object.assign({}, transaction), { blockNumber: transaction.blockNumber
                ? common_1.BNConverter.hexStringToBN(String(transaction.blockNumber))
                : null });
    }
}
exports.EthEvents = EthEvents;
//# sourceMappingURL=events.js.map