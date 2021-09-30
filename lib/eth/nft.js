"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nft = void 0;
const web3_1 = __importDefault(require("web3"));
const Wallet_json_1 = __importDefault(require("../contracts/Wallet.json"));
const common_1 = require("../utils/common");
class Nft {
    constructor(nftData) {
        this.nftData = nftData;
        this.walletContract = new new web3_1.default().eth.Contract(Wallet_json_1.default);
    }
    async buildTransferMultiSigPayloadTemplate(wallet) {
        return {
            walletNonce: wallet.getNonce(),
            value: common_1.BNConverter.hexStringToBN("0x0"),
            walletAddress: wallet.getAddress(),
        };
    }
    getId() {
        return this.nftData.id;
    }
    getName() {
        return this.nftData.name;
    }
    getAddress() {
        return this.nftData.address;
    }
    getSymbol() {
        return this.nftData.symbol;
    }
    async buildTransferMultiSigPayload(wallet, to, tokenOnchainId) {
        return Object.assign(Object.assign({}, (await this.buildTransferMultiSigPayloadTemplate(wallet))), { hexData: this.walletContract.methods
                .transferNFT({
                token: this.getAddress(),
                to: to,
                tokenId: parseInt(tokenOnchainId),
            })
                .encodeABI(), toAddress: wallet.getAddress() });
    }
}
exports.Nft = Nft;
//# sourceMappingURL=nft.js.map