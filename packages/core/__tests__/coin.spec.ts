import BN from 'bn.js';

import { Erc20 } from '../src/coin';
import { BlockchainType } from '../src/blockchain';

describe('Erc20', () => {
  let erc20: Erc20;
  const evtToken = {
    id: 3,
    name: '엔바토',
    symbol: 'EVT',
    address: '0x5457d04fc5ad31921c2254df528932a22d757d22',
    desc: '',
    blockchain: BlockchainType.Klaytn,
  };

  beforeEach(() => {
    erc20 = new Erc20(evtToken);
  });

  describe('#getAddress()', () => {
    it('should return the address of erc20 contract', () => {
      expect(erc20.getAddress()).toEqual('0x5457d04fc5ad31921c2254df528932a22d757d22');
    });
  });

  describe('#getName()', () => {
    it('should return the name of erc20 contract', () => {
      expect(erc20.getName()).toEqual('엔바토');
    });
  });

  describe('#buildData()', () => {
    it('should return encoded hex data', () => {
      const data = erc20.buildData('0x280460de5d4488DDA8e29dFb947a8D4574203E3F', new BN(5));
      expect(data).toEqual('0xf5537ede0000000000000000000000005457d04fc5ad31921c2254df528932a22d757d22000000000000000000000000280460de5d4488dda8e29dfb947a8d4574203e3f0000000000000000000000000000000000000000000000000000000000000005');
    });
  });
});
