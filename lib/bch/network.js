"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitcoinCashRegTestnet = exports.bitcoinCashTestnet = exports.bitcoinCashMainnet = void 0;
exports.bitcoinCashMainnet = {
    messagePrefix: "\x19Bitcoin Signed Message:\n",
    bech32: "bc",
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
};
exports.bitcoinCashTestnet = {
    messagePrefix: "\x19Bitcoin Signed Message:\n",
    bech32: "bc",
    bip32: {
        public: 0x043587cf,
        private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
};
exports.bitcoinCashRegTestnet = Object.assign({}, exports.bitcoinCashTestnet);
//# sourceMappingURL=network.js.map