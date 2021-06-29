"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalApprovals = exports.WithdrawalApprovalStatus = void 0;
const url_1 = require("./utils/url");
const accounts_1 = require("./__generate__/accounts");
const lodash_1 = __importDefault(require("lodash"));
const common_1 = require("./utils/common");
const blockchain_1 = require("./blockchain");
exports.WithdrawalApprovalStatus = accounts_1.WithdrawalApprovalStatus;
class WithdrawalApprovals {
    constructor(client) {
        this.baseUrl = "/withdrawal-approvals";
        this.client = client;
    }
    async getWithdrawalApprovalById(withdrawalApprovalId) {
        const data = await this.client.get(`${this.baseUrl}/${withdrawalApprovalId}`);
        return Object.assign(Object.assign({}, lodash_1.default.omit(data, "approvedBy")), { amount: common_1.BNConverter.hexStringToBN(data.amount), blockchain: blockchain_1.transformBlockchainType(data.blockchain) });
    }
    async getWithdrawalApprovals(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((data) => {
                return Object.assign(Object.assign({}, lodash_1.default.omit(data, "approvedBy")), { amount: common_1.BNConverter.hexStringToBN(data.amount), blockchain: blockchain_1.transformBlockchainType(data.blockchain) });
            }),
        };
    }
}
exports.WithdrawalApprovals = WithdrawalApprovals;
//# sourceMappingURL=withdrawalApprovals.js.map