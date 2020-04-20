import BN from 'bn.js';
import { BNConverter } from '../../src/utils';

describe('BNConverter', () => {
  describe('#add0x()', () => {
    it('should add 0x', () => {
      expect(BNConverter.add0x('123')).toEqual('0x123');
    });
    it('should return same string when the hex string already starts with 0x', () => {
      expect(BNConverter.add0x('0x123')).toEqual('0x123');
    });
  });

  describe('#remove0x()', () => {
    it('should remove 0x', () => {
      expect(BNConverter.remove0x('0x123')).toEqual('123');
    });
    it('should return the same string when the hex string does not starts with 0x', () => {
      expect(BNConverter.remove0x('123')).toEqual('123');
    });
  });

  describe('#bnToHexString()', () => {
    it('should return the hex string', () => {
      expect(BNConverter.bnToHexString(new BN(291, 16))).toEqual('0x123');
    });
  });

  describe('#hexStringToBN()', () => {
    it('should return bn', () => {
      expect(BNConverter.hexStringToBN('0x123').toNumber()).toEqual(291);
    });
  });
});
