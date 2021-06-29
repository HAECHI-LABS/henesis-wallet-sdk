"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtcModule = void 0;
const wallets_1 = require("./wallets");
const keychains_1 = require("./keychains");
const transfers_1 = require("./transfers");
class BtcModule {
    constructor(options) {
        this.client = options.client;
        this.keychains = new keychains_1.BtcKeyChains(options.env);
        this.wallets = new wallets_1.BtcWallets(options.env, this.client, this.keychains);
        this.transfers = new transfers_1.BtcTransfers(this.client);
    }
}
exports.BtcModule = BtcModule;
//# sourceMappingURL=module.js.map