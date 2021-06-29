"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BatchRequest {
    constructor(batchRequest) {
        this.batchRequest = batchRequest;
        this.payloads = [];
    }
    add(payload) {
        this.payloads.push(payload);
    }
    addAll(payloads) {
        this.payloads.push(...payloads);
    }
    async execute() {
        return await this.batchRequest(this.payloads);
    }
}
exports.default = BatchRequest;
//# sourceMappingURL=batch.js.map