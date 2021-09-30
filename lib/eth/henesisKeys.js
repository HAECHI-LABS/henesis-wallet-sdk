"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HenesisKeys = void 0;
const __1 = require("../");
const url_1 = require("../utils/url");
const utils_1 = require("./utils");
class HenesisKeys {
    constructor(client) {
        this.baseUrl = "/henesis-keys";
        this.client = client;
    }
    getHenesisKey() {
        return this.client.get(`${this.baseUrl}/me`);
    }
    async getHenesisKeyBalance() {
        const response = await this.client.get(`${this.baseUrl}/balance`);
        const { coinId, coinType, amount, spendableAmount, name, symbol, decimals, } = response;
        return {
            coinId: coinId,
            coinType: coinType,
            amount: __1.BNConverter.hexStringToBN(String(amount)),
            spendableAmount: __1.BNConverter.hexStringToBN(String(spendableAmount)),
            name,
            symbol,
            decimals,
        };
    }
    async getTransactionHistories(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`${this.baseUrl}/histories${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((data) => utils_1.convertTransactionHistoryDTO(data)),
        };
    }
    async getTransactionHistoriesCsv(createdAtGte, createdAtLt) {
        const queryString = url_1.makeQueryString({
            createdAtGte: createdAtGte,
            createdAtLt: createdAtLt,
        });
        return await this.client.get(`${this.baseUrl}/histories/csv?${queryString}`);
    }
}
exports.HenesisKeys = HenesisKeys;
//# sourceMappingURL=henesisKeys.js.map