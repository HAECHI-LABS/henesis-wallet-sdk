import BN from 'bn.js';

import { Erc20 } from '../src/coin';

describe('Erc20', () => {
  let erc20: Erc20;
  beforeEach(() => {
    erc20 = new Erc20('erc20', '0x280460de5d4488DDA8e29dFb947a8D4574203E3F');
  });

  describe('#getAddress()', () => {
    it('should return the address of erc20 contract', () => {
      expect(erc20.getAddress()).toEqual('0x280460de5d4488DDA8e29dFb947a8D4574203E3F');
    });
  });

  describe('#getName()', () => {
    it('should return the name of erc20 contract', () => {
      expect(erc20.getName()).toEqual('erc20');
    });
  });

  describe('#buildData()', () => {
    it('should return encoded hex data', () => {
      const data = erc20.buildData('0x280460de5d4488DDA8e29dFb947a8D4574203E3F', new BN(5));
      expect(data).toEqual('0xf5537ede000000000000000000000000280460de5d4488dda8e29dfb947a8d4574203e3f000000000000000000000000280460de5d4488dda8e29dfb947a8d4574203e3f0000000000000000000000000000000000000000000000000000000000000005');
    });
  });
});
