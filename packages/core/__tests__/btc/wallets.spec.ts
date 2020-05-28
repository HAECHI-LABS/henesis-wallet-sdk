import { BTCWallets } from '../../src/btc/wallets';
import { HttpClient } from '../../src/httpClient';
import { DefaultBTCKeyChains } from '../../src/btc/keychains';

describe('BTCWallets', () => {
  describe('#createMasterWallet()', () => {
    it('should create master wallet', async () => {
      const wallets = new BTCWallets(
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2',
        }) as any,
        new DefaultBTCKeyChains(),
      );

      const masterWallet = await wallets.createMasterWallet(
        'wallet-test2',
        'passphrase',
      );

      console.log(masterWallet.getData());
    });
  });
});
