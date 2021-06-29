"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Billings = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const url_1 = require("./utils/url");
const blockchain_1 = require("./blockchain");
class Billings {
    constructor(client) {
        this.baseUrl = "/organizations";
        this.client = client;
    }
    async getInvoice(request) {
        const { orgId } = request;
        const queryString = url_1.makeQueryString({});
        return Promise.resolve({
            id: "1",
            orgName: "test",
            billingPolicy: "test",
            totalCharge: 0,
            defaultCharge: 0,
            withdrawalCharge: 0,
            withdrawalFeeRate: 0,
            tokenListingCharge: 0,
            vat: 0,
            mainnets: [
                {
                    blockchain: blockchain_1.BlockchainType.BITCOIN,
                },
            ],
            startDate: String(new Date().valueOf()),
            endDate: String(new Date().valueOf()),
            createdAt: String(new Date().valueOf()),
            tokens: [
                {
                    coinId: 1,
                    coinType: "test",
                    amount: new bn_js_1.default(0),
                    name: "이더리움",
                    symbol: "ETH",
                    decimals: 18,
                },
            ],
        });
    }
    async getInvoiceExternalWithdrawals(request) {
        const { orgId } = request, rest = __rest(request, ["orgId"]);
        const queryString = url_1.makeQueryString(rest);
        return Promise.resolve({
            results: [
                {
                    id: "1",
                    invoiceId: "1",
                    wallet: {
                        id: "1",
                        name: "test",
                        blockchain: blockchain_1.BlockchainType.ETHEREUM,
                    },
                    amount: "0",
                    coin: {
                        symbol: "ETH",
                        decimals: 18,
                    },
                    withdrawalTime: String(new Date().valueOf()),
                    charge: 0,
                    source: "based on upbit",
                },
            ],
            pagination: {
                totalCount: 1,
                nextUrl: "",
                previousUrl: "",
            },
        });
    }
    async getInvoiceTokenListingUsage(request) {
        const { orgId } = request, rest = __rest(request, ["orgId"]);
        const queryString = url_1.makeQueryString(rest);
        return Promise.resolve([
            {
                invoiceId: "1",
                coin: {
                    coinId: 1,
                    coinType: "test",
                    amount: new bn_js_1.default(0),
                    name: "이더리움",
                    symbol: "ETH",
                    decimals: 18,
                },
                charge: 0,
            },
        ]);
    }
    async getInvoiceMainnetUsage(request) {
        const { orgId } = request, rest = __rest(request, ["orgId"]);
        const queryString = url_1.makeQueryString(rest);
        return Promise.resolve([
            {
                invoiceId: "1",
                blockchain: blockchain_1.BlockchainType.ETHEREUM,
                charge: 0,
            },
        ]);
    }
}
exports.Billings = Billings;
//# sourceMappingURL=billings.js.map