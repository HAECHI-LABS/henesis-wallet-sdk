import { BchWallets } from '../../src/bch/wallets';
import { HttpClient } from '../../src/httpClient';
import { BchKeyChains } from '../../src/bch/keychains';
import { Env } from "../../src";

describe('BchWallets', () => {

  describe('#verifyAddress()', () => {
    it('should return true when address is valid', async () => {
      const wallets = new BchWallets(
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/bch',
          env: Env.Local,
        }) as any,
        new BchKeyChains(Env.Local),
      );

      expect(wallets.verifyAddress('2MvNDajCeC9qCqezstGXU436qmH4ajr4N2v')).toEqual(true);
    });

    it('should return false when address is invalid', async () => {
      const wallets = new BchWallets(
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/bch',
          env: Env.Local,
        }) as any,
        new BchKeyChains(Env.Local),
      );

      expect(wallets.verifyAddress('invalid')).toEqual(false);
    });
  });
});
