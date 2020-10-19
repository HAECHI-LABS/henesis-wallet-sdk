import BN from 'bn.js';
import { Klay } from '../../src/coin';
import { BlockchainType } from '../../src/types';

describe('Klay', () => {
  let klay: Klay;
  const KlaytnCoin = {
    id: 1,
    name: '클레이튼',
    symbol: 'KLAY',
    decimals: 18,
    address: null,
    desc: '',
    blockchain: BlockchainType.Klaytn,
    attributes: [],
  };

  beforeEach(() => {
    klay = new Klay(KlaytnCoin);
  });

  describe('#getName()', () => {
    it('should return eth', () => {
      expect(klay.getName()).toEqual('klay');
    });
  });

  describe('#buildData()', () => {
    it('should return encoded hex data', () => {
      const data = klay.buildTransferData(
        '0x280460de5d4488DDA8e29dFb947a8D4574203E3F',
        new BN(5),
      );
      expect(data).toEqual(
        '0x9cbaca3b000000000000000000000000280460de5d4488dda8e29dfb947a8d4574203e3f0000000000000000000000000000000000000000000000000000000000000005',
      );
    });
  });
});
