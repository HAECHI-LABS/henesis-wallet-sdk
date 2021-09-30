"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainType = exports.transformBlockchainType = void 0;
exports.transformBlockchainType = (blockchain) => {
    const byBlockchain = {
        ETHEREUM: BlockchainType.ETHEREUM,
        KLAYTN: BlockchainType.KLAYTN,
        BITCOIN: BlockchainType.BITCOIN,
        LITECOIN: BlockchainType.LITECOIN,
        FILECOIN: BlockchainType.FILECOIN,
        BINANCE_SMART_CHAIN: BlockchainType.BINANCE_SMART_CHAIN,
        BITCOIN_CASH: BlockchainType.BITCOIN_CASH,
    };
    return byBlockchain[blockchain];
};
var BlockchainType;
(function (BlockchainType) {
    BlockchainType["ETHEREUM"] = "ETHEREUM";
    BlockchainType["KLAYTN"] = "KLAYTN";
    BlockchainType["BITCOIN"] = "BITCOIN";
    BlockchainType["LITECOIN"] = "LITECOIN";
    BlockchainType["FILECOIN"] = "FILECOIN";
    BlockchainType["BINANCE_SMART_CHAIN"] = "BINANCE_SMART_CHAIN";
    BlockchainType["BITCOIN_CASH"] = "BITCOIN_CASH";
})(BlockchainType = exports.BlockchainType || (exports.BlockchainType = {}));
//# sourceMappingURL=blockchain.js.map