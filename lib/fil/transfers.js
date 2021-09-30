"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilTransfers = void 0;
const utils_1 = require("./utils");
const url_1 = require("../utils/url");
class FilTransfers {
    constructor(client) {
        this.client = client;
    }
    async getTransfer(id) {
        const response = await this.client.get(`/transfers/${id}`);
        return utils_1.convertDtoToTransfer(response);
    }
    async getTransfers(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`/transfers${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((t) => {
                return utils_1.convertDtoToTransfer(t);
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
exports.FilTransfers = FilTransfers;
//# sourceMappingURL=transfers.js.map