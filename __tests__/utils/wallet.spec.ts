import { isLessThanWalletV4 } from '../../src/utils/wallet';

describe('wallet.spec.ts', () => {
  describe('#isLessThanWalletV4', () => {
    it('should return false when wallet version is v4', () => {
      expect(isLessThanWalletV4("v4")).toEqual(false);
    });
    it('should return true when wallet version is v3', () => {
      expect(isLessThanWalletV4("v3")).toEqual(true);
    });
  });
});
