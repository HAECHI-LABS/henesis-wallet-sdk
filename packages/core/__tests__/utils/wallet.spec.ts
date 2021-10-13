import { parseVersion } from "../../src/utils/wallet";

describe('wallet.spec.ts', () => {
  describe('#parseVersion', () => {
    it('should return version number without prefix', () => {
      expect(parseVersion("v4")).toEqual(4);
    });
  });
});
