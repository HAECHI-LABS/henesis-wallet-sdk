"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilAbstractWallet = void 0;
const wallet_1 = require("../wallet");
const blockchain_1 = require("../blockchain");
class FilAbstractWallet extends wallet_1.Wallet {
    constructor(client, data, keychains, baseUrl) {
        super(client, keychains, baseUrl);
        this.data = data;
        this.blockchain = blockchain_1.BlockchainType.FILECOIN;
    }
    getChain() {
        return this.data.blockchain;
    }
}
exports.FilAbstractWallet = FilAbstractWallet;
//# sourceMappingURL=abstractWallet.js.map