"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nfts = void 0;
const nft_1 = require("./nft");
class Nfts {
    constructor(client) {
        this.client = client;
    }
    async getAllNfts() {
        const nftDataList = await this.client.get(`/nfts`);
        return nftDataList.map((nftData) => new nft_1.Nft(nftData));
    }
    async getNft(nftId) {
        const nftData = await this.client.get(`/nfts/${nftId}`);
        return new nft_1.Nft(nftData);
    }
    async syncMetadata(nftId, tokenOnchainId) {
        const syncedNftItem = await this.client.post(`/nfts/${nftId}/sync-metadata`, {
            tokenOnchainId: tokenOnchainId,
        });
        return syncedNftItem;
    }
}
exports.Nfts = Nfts;
//# sourceMappingURL=nfts.js.map