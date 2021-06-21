"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilTransfers = void 0;
const utils_1 = require("./utils");
class FilTransfers {
    constructor(client) {
        this.client = client;
    }
    async getTransfer(id) {
        const response = await this.client.get(`/transfers/${id}`);
        return utils_1.convertTransferDTO(response);
    }
    async getTransfers(options) {
        return null;
    }
    async getInternalTransfer() {
        return null;
    }
    async getInternalTransfers(options) {
        return null;
    }
}
exports.FilTransfers = FilTransfers;
//# sourceMappingURL=transfers.js.map