"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coins = void 0;
const coin_1 = require("./coin");
class Coins {
    constructor(client) {
        this.client = client;
    }
    async getCoin(ticker) {
        const coinData = await this.client.get(`/coins/${ticker}`);
        return this.resolveCoin(coinData);
    }
    async getCoins(flag) {
        const coinData = await this.client.get(`/coins?flag=${flag}`);
        return coinData.map((coinDatum) => this.resolveCoin(coinDatum));
    }
    resolveCoin(coinData) {
        if (coinData.symbol.toString() == "ETH") {
            return new coin_1.Eth(coinData);
        }
        if (coinData.symbol.toString() == "KLAY") {
            return new coin_1.Klay(coinData);
        }
        if (coinData.attributes.includes(coin_1.AttributesEnum.NONSTANDARDRETURNTYPE)) {
            return new coin_1.NonStandardReturnTypeErc20(coinData);
        }
        return new coin_1.StandardErc20(coinData);
    }
}
exports.Coins = Coins;
//# sourceMappingURL=coins.js.map