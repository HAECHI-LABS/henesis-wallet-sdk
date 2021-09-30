"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BscModule = exports.KlayModule = exports.EthModule = void 0;
const wallets_1 = require("./wallets");
const events_1 = require("./events");
const gasUsages_1 = require("./gasUsages");
const transactions_1 = require("./transactions");
const keychains_1 = require("./keychains");
const henesisKeys_1 = require("./henesisKeys");
const coins_1 = require("./coins");
const gasPrice_1 = require("./gasPrice");
const nfts_1 = require("./nfts");
class EthModule {
    constructor(options) {
        this.client = options.client;
        this.keychains = new keychains_1.EthKeychains(options.blockchain);
        this.henesisKeys = new henesisKeys_1.HenesisKeys(this.client);
        this.wallets = new wallets_1.EthWallets(this.client, this.keychains, options.env, this.henesisKeys, options.blockchain);
        this.events = new events_1.EthEvents(this.client);
        this.gasPrice = new gasPrice_1.GasPrice(this.client);
        this.gasUsages = new gasUsages_1.GasUsages(this.client);
        this.transactions = new transactions_1.Transactions(this.client);
        this.coins = new coins_1.Coins(this.client);
        this.nfts = new nfts_1.Nfts(this.client);
    }
}
exports.EthModule = EthModule;
class KlayModule extends EthModule {
}
exports.KlayModule = KlayModule;
class BscModule extends EthModule {
}
exports.BscModule = BscModule;
//# sourceMappingURL=module.js.map