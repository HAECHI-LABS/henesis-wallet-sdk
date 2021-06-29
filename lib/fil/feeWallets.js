"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilFeeWallets = void 0;
const utils_1 = require("./utils");
class FilFeeWallets {
    constructor(client) {
        this.client = client;
    }
    async getFeeWallet() {
        return await this.client.get(`/fee-wallets/me`);
    }
    async getFeeWalletBalance() {
        const response = await this.client.get(`/fee-wallets/balance`);
        return {
            defaultFeeWallet: utils_1.convertBalanceDtoToFilBalance(response.defaultFeeWallet),
            proposalFeeWallets: response.proposalFeeWallets.map((item) => {
                return Object.assign({ id: item.id }, utils_1.convertBalanceDtoToFilBalance(item));
            }),
        };
    }
    async getFeeHistories() {
        throw new Error("this feature is not supported yet");
    }
}
exports.FilFeeWallets = FilFeeWallets;
//# sourceMappingURL=feeWallets.js.map