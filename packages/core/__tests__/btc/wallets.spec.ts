import { BtcWallets } from '../../src/btc/wallets';
import { HttpClient } from '../../src/httpClient';
import { BtcKeyChains } from '../../src/btc/keychains';
import { Env } from "../../src";

describe.skip('BtcWallets', () => {
  describe('#createMasterWallet()', () => {
    it('should create master wallet', async () => {
      const wallets = new BtcWallets(
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new BtcKeyChains(),
      );

      const masterWallet = await wallets.createMasterWallet(
        'wallet-test2',
        'passphrase',
      );

      console.log(masterWallet.getData());
    });
  });
});
