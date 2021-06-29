"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinListings = void 0;
const blockchain_1 = require("./blockchain");
const url_1 = require("./utils/url");
class CoinListings {
    constructor(client) {
        this.baseUrl = "/organizations";
        this.client = client;
    }
    async cancelCoinListingRequest(requestId) {
        await this.client.post(`${this.baseUrl}/coin-listing-requests/${requestId}/cancel`);
    }
    async createCoinListingRequest(request) {
        const response = await this.client.post(`${this.baseUrl}/coin-listing-requests`, request);
        return Object.assign(Object.assign({}, response), { blockchain: blockchain_1.transformBlockchainType(response.blockchain) });
    }
    async getCoinContract(request) {
        const queryString = url_1.makeQueryString(request);
        const response = await this.client.get(`${this.baseUrl}/coin-contract${queryString ? `?${queryString}` : ""}`);
        return Object.assign(Object.assign({}, response), { blockchain: blockchain_1.transformBlockchainType(response.blockchain) });
    }
    async getCoinListingRequests() {
        const response = await this.client.get(`${this.baseUrl}/coin-listing-requests`);
        return response.map((item) => {
            return Object.assign(Object.assign({}, item), { blockchain: blockchain_1.transformBlockchainType(item.blockchain) });
        });
    }
}
exports.CoinListings = CoinListings;
//# sourceMappingURL=coinListings.js.map