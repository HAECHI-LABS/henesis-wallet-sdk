import { HttpClient } from '../../src/httpClient';
import { BtcKeyChains } from '../../src/btc/keychains';
import { Env } from "../../src";
import { BchWallets } from "../../src/bch/wallets";

describe.skip('BchWallets', () => {
    it('should return false when address is not from testnet', async () => {
      const wallets = new BchWallets(
        Env.Test,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
          env: Env.Local,
        }) as any,
        new BtcKeyChains(Env.Test),
      );

      expect(wallets.verifyAddress('bchtest:pp7zq5cy7tz6xsteesfydnlrna47zxm4xq')).toEqual(false);
    });
  });
});
