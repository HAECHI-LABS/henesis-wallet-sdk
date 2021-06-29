"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasPrice = void 0;
const __1 = require("..");
class GasPrice {
    constructor(client) {
        this.client = client;
        this.baseUrl = "/gas-price";
    }
    async getGasPrice() {
        const response = await this.client.get(`${this.baseUrl}`);
        return __1.BNConverter.hexStringToBN(response.gasPrice);
    }
}
exports.GasPrice = GasPrice;
//# sourceMappingURL=gasPrice.js.map