import BN from 'bn.js';
import { makeQueryString } from '../../src/utils/url';

describe('url.spec.ts', () => {
  describe('#makeQueryString', () => {
    it('should make makeQueryString', () => {
      expect(makeQueryString({ a: 1, b: 2 })).toEqual('a=1&b=2');
    });
    it('should make makeQueryString empty', () => {
      expect(makeQueryString({})).toEqual('');
    });
  });
});
