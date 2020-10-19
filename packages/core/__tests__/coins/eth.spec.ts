import BN from "bn.js";
import { Eth } from "../../src/eth";
import { CoinDTO, Blockchain } from "../../src/__generate__/eth";
import {
  WalletWithdrawalPolicyDTO,
} from "../../src/__generate__/btc";

describe("Eth", () => {
  let eth: Eth;
  const coinData: CoinDTO = {
    id: 1,
    name: "이더리움",
    symbol: "ETH",
    address: null,
    desc: "",
    blockchain: Blockchain.ETHEREUM,
    decimals: 18,
    attributes: [],
  };
  beforeEach(() => {
    eth = new Eth(coinData);
  });

  describe("#getName()", () => {
    it("should return ethereum", () => {
      expect(eth.getName()).toEqual("eth");
    });
  });

  describe("#buildData()", () => {
    it("should return encoded hex data", () => {
      const data = eth.buildTransferData(
        "0x280460de5d4488DDA8e29dFb947a8D4574203E3F",
        new BN(5)
      );
      expect(data).toEqual(
        "0xe9bb84c2000000000000000000000000280460de5d4488dda8e29dfb947a8d4574203e3f0000000000000000000000000000000000000000000000000000000000000005"
      );
    });
  });
});
