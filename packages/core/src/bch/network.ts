import { Network } from "bitcoinjs-lib";

// ref: https://github.com/pokkst/bitcoincashj/blob/master/core/src/main/java/org/bitcoinj/params/MainNetParams.java
export const bitcoinCashMainnet: Network = {
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

// ref: https://github.com/pokkst/bitcoincashj/blob/master/core/src/main/java/org/bitcoinj/params/TestNet3Params.java
export const bitcoinCashTestnet: Network = {
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

// ref: https://github.com/pokkst/bitcoincashj/blob/master/core/src/main/java/org/bitcoinj/params/TestNet3Params.java
export const bitcoinCashRegTestnet: Network = {
  ...bitcoinCashTestnet,
};
