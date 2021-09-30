"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LtcTransfers = exports.TransferType = exports.TransferStatus = void 0;
const url_1 = require("../utils/url");
const ltc_1 = require("../__generate__/ltc");
exports.TransferStatus = ltc_1.TransferStatus;
exports.TransferType = ltc_1.TransferType;
const utils_1 = require("./utils");
class LtcTransfers {
    constructor(client) {
        this.client = client;
    }
    async getTransfer(id) {
        const response = await this.client.get(`/transfers/${id}`);
        return utils_1.convertTransferDTO(response);
    }
    async getTransfers(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`/transfers${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((t) => {
                return utils_1.convertTransferDTO(t);
            }),
        };
    }
    async getInternalTransfer(id) {
        const response = await this.client.get(`/internal/transfers/${id}`);
        return utils_1.convertTransferInternalDTO(response);
    }
    async getInternalTransfers(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`/internal/transfers${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((t) => {
                return utils_1.convertTransferInternalDTO(t);
            }),
        };
    }
}
exports.LtcTransfers = LtcTransfers;
//# sourceMappingURL=transfers.js.map