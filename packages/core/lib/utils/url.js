"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeQueryString = exports.makePrefixPathByBlockchainType = exports.removePrefixApi = exports.baseUrls = void 0;
const blockchain_1 = require("../blockchain");
const string_1 = require("./string");
exports.baseUrls = new Map();
exports.baseUrls.set(0, "http://localhost:8080/api/v2");
exports.baseUrls.set(2, "https://test.wallet.henesis.io/api/v2");
exports.baseUrls.set(1, "https://dev.wallet.henesis.io/api/v2");
exports.baseUrls.set(3, "https://wallet.henesis.io/api/v2");
exports.removePrefixApi = (url) => {
    return url.replace("/api/v2", "");
};
exports.makePrefixPathByBlockchainType = (blockchain) => {
    if (!blockchain) {
        return "";
    }
    const blockchainByType = {
        [blockchain_1.BlockchainType.ETHEREUM]: "/eth",
        [blockchain_1.BlockchainType.KLAYTN]: "/klay",
        [blockchain_1.BlockchainType.BITCOIN]: "/btc",
        [blockchain_1.BlockchainType.LITECOIN]: "/ltc",
        [blockchain_1.BlockchainType.FILECOIN]: "/fil",
        [blockchain_1.BlockchainType.BINANCE_SMART_CHAIN]: "/bsc",
    };
    return blockchainByType[blockchain];
};
exports.makeQueryString = (options) => {
    if (!options) {
        return "";
    }
    return Object.keys(options)
        .filter((key) => options[key] !== undefined && options[key] !== null)
        .map((key) => `${string_1.toSnakeCase(key)}=${options[key]}`)
        .join("&");
};
//# sourceMappingURL=url.js.map