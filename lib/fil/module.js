"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilModule = void 0;
const wallets_1 = require("./wallets");
const keychains_1 = require("./keychains");
const feeWallets_1 = require("./feeWallets");
const transfers_1 = require("./transfers");
class FilModule {
    constructor(options) {
        this.client = options.client;
        this.keychains = new keychains_1.FilKeychains(options.env);
        this.feeWallets = new feeWallets_1.FilFeeWallets(this.client);
        this.wallets = new wallets_1.FilWallets(this.client, this.keychains, options.env, options.blockchain, this.feeWallets);
        this.transfers = new transfers_1.FilTransfers(this.client);
    }
}
exports.FilModule = FilModule;
//# sourceMappingURL=module.js.map