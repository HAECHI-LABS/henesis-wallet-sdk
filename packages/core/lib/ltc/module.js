"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LtcModule = void 0;
const wallets_1 = require("./wallets");
const keychains_1 = require("./keychains");
const transfers_1 = require("./transfers");
const utils_1 = require("./utils");
class LtcModule {
    constructor(options) {
        this.utils = {
            isLegacyAddress: utils_1.isLegacyAddress,
            isNewAddress: utils_1.isNewAddress,
            convertToLegacyAddress: utils_1.convertToLegacyAddress,
            convertToNewAddress: utils_1.convertToNewAddress,
        };
        this.client = options.client;
        this.keychains = new keychains_1.LtcKeyChains(options.env);
        this.wallets = new wallets_1.LtcWallets(options.env, this.client, this.keychains);
        this.transfers = new transfers_1.LtcTransfers(this.client);
    }
}
exports.LtcModule = LtcModule;
//# sourceMappingURL=module.js.map