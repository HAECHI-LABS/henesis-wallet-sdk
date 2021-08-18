import { Network } from "bitcoinjs-lib";

// copied from https://github.com/bitcoinjs/bitcoinjs-lib/pull/1095/files
export const litecoinMainnet: Network = {
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

export const litecoinTestnet: Network = {
  messagePrefix: "\x19Litecoin Signed Message:\n",
  bech32: "ltc",
  // copied from https://github.com/litecoin-project/litecore-lib/blob/segwit/lib/networks.js#L155
  bip32: {
    public: 0x0436f6e1,
    private: 0x0436ef7d,
  },
  pubKeyHash: 0x6f,
  scriptHash: 0x3a,
  wif: 0xef,
};
