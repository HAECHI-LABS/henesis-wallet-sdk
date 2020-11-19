import BN from 'bn.js';
import { Klay } from "../../src/eth/coin";
import { CoinDTO, Blockchain } from "../../src/__generate__/eth";
import { EthLikeWallet } from "../../src/eth/wallet";

describe('Klay', () => {
  let klay: Klay;
  const coinData: CoinDTO = {
    id: 1,
    name: '클레이튼',
    symbol: 'KLAY',
    address: null,
    desc: '',
    blockchain: Blockchain.KLAYTN,
    decimals: 18,
    attributes: [],
  };
  beforeEach(() => {
    klay = new Klay(coinData);
  });

  describe('#getName()', () => {
    it('should return ethereum', () => {
      expect(klay.getName()).toEqual('klay');
    });
  });

  describe('#buildData()', () => {
    it("should has encoded hex data", async () => {
      const mockWallet = {} as EthLikeWallet;
      mockWallet.getAddress = jest.fn();
      mockWallet.getNonce = jest.fn();

      const data = await klay.buildTransferMultiSigPayload(
        mockWallet,
        "0x280460de5d4488DDA8e29dFb947a8D4574203E3F",
        new BN(5)
      );
      expect(data.hexData).toEqual(
        "0x9cbaca3b000000000000000000000000280460de5d4488dda8e29dfb947a8d4574203e3f0000000000000000000000000000000000000000000000000000000000000005"
      );
    });
  });
});
