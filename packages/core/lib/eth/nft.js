"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nft = void 0;
const web3_1 = __importDefault(require("web3"));
const Wallet_json_1 = __importDefault(require("../contracts/Wallet.json"));
class Nft {
    constructor(nftData) {
        this.nftData = nftData;
        this.walletContract = new new web3_1.default().eth.Contract(Wallet_json_1.default);
    }
    getName() {
        return this.nftData.name;
    }
    getAddress() {
        return this.nftData.address;
    }
}
exports.Nft = Nft;
//# sourceMappingURL=nft.js.map