"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilFeeWallets = void 0;
class FilFeeWallets {
    constructor(client) {
        this.client = client;
    }
    async getFeeWallet() {
        return null;
    }
    async getFeeWalletBalance() {
        return null;
    }
    async getFeeHistories() {
        throw new Error("this feature is not supported yet");
    }
}
exports.FilFeeWallets = FilFeeWallets;
//# sourceMappingURL=feeWallets.js.map