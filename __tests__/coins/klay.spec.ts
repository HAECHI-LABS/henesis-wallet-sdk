import BN from 'bn.js';
import { Klay } from '../../src/eth/coin';

describe('Klay', () => {
  let klay: Klay;
  beforeEach(() => {
    klay = new Klay();
  });

  describe('#getName()', () => {
    it('should return ethereum', () => {
      expect(klay.getName()).toEqual('klay');
    });
  });

  describe('#buildData()', () => {
    it('should return encoded hex data', () => {
      const data = klay.buildData(
        '0x280460de5d4488DDA8e29dFb947a8D4574203E3F',
        new BN(5),
      );
      expect(data).toEqual(
        '0x9cbaca3b000000000000000000000000280460de5d4488dda8e29dfb947a8d4574203e3f0000000000000000000000000000000000000000000000000000000000000005',
      );
    });
  });
});