"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.litecoinTestnet = exports.litecoinMainnet = void 0;
exports.litecoinMainnet = {
    messagePrefix: "\x19Litecoin Signed Message:\n",
    bech32: "ltc",
    bip32: {
        public: 0x019da462,
        private: 0x019d9cfe,
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
};
exports.litecoinTestnet = {
    messagePrefix: "\x19Litecoin Signed Message:\n",
    bech32: "ltc",
    bip32: {
        public: 0x0436f6e1,
        private: 0x0436ef7d,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0x3a,
    wif: 0xef,
};
//# sourceMappingURL=network.js.map