"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BchModule = void 0;
const wallets_1 = require("./wallets");
const keychains_1 = require("./keychains");
const transfers_1 = require("./transfers");
class BchModule {
    constructor(options) {
        this.client = options.client;
        this.keychains = new keychains_1.BchKeyChains(options.env);
        this.wallets = new wallets_1.BchWallets(options.env, this.client, this.keychains);
        this.transfers = new transfers_1.BchTransfers(this.client);
    }
}
exports.BchModule = BchModule;
//# sourceMappingURL=module.js.map