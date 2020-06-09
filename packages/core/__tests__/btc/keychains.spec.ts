import { DefaultBtcKeyChains } from '../../src/btc/keychains';
import { KeyWithPriv } from '../../src/types';

describe('DefaultBtcKeyChains', () => {
  const keychains = new DefaultBtcKeyChains();

  describe('#create()', () => {
    it('should create key correctly', () => {
      const key: KeyWithPriv = keychains.create('password');
      console.log(key);
    });
  });
});
