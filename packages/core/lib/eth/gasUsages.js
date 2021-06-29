"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasUsages = exports.MethodName = void 0;
const blockchain_1 = require("../blockchain");
const common_1 = require("../utils/common");
var MethodName;
(function (MethodName) {
    MethodName["TRANSFER"] = "transfer";
    MethodName["TRANSFER_ERC20"] = "transferErc20";
    MethodName["CREATE_MASTER_WALLET"] = "createMasterWallet";
})(MethodName = exports.MethodName || (exports.MethodName = {}));
class GasUsages {
    constructor(client) {
        this.client = client;
        this.baseUrl = "/method-gas-usages";
    }
    async getMethodGasUsages(methodName) {
        const balance = await this.client.get(`${this.baseUrl}?name=${methodName}`);
        return {
            id: balance.id,
            name: balance.name,
            blockchain: blockchain_1.transformBlockchainType(balance.blockchain),
            estimatedGasConsumption: common_1.BNConverter.hexStringToBN(String(balance.estimatedGasConsumption)),
        };
    }
}
exports.GasUsages = GasUsages;
//# sourceMappingURL=gasUsages.js.map