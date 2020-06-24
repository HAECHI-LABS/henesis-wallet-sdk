import { BtcWallets } from '../../src/btc/wallets';
import { HttpClient } from '../../src/httpClient';
import { BtcKeyChains } from '../../src/btc/keychains';
import { Env } from "../../src";

describe('BtcWallets', () => {
  describe.skip('#createMasterWallet()', () => {
    it('should create master wallet', async () => {
      const wallets = new BtcWallets(
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new BtcKeyChains(Env.Local),
      );

      const masterWallet = await wallets.createMasterWallet(
        'wallet-test2',
        'passphrase',
      );

      console.log(masterWallet.getData());
    });
  });

  describe('#verifyAddress()', () => {
    it('should return true when address is valid', async () => {
      const wallets = new BtcWallets(
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new BtcKeyChains(Env.Local),
      );

      expect(wallets.verifyAddress('2My2DEuwrF9XGb9vCHN9XQaNYgBya4kQNJo')).toEqual(true);
    });

    it('should return false when address is invalid', async () => {
      const wallets = new BtcWallets(
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new BtcKeyChains(Env.Local),
      );

      expect(wallets.verifyAddress('invalid')).toEqual(false);
    });

    it('should return false when address is not from mainnet', async () => {
      const wallets = new BtcWallets(
        Env.Prod,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new BtcKeyChains(Env.Prod),
      );

      expect(wallets.verifyAddress('2My2DEuwrF9XGb9vCHN9XQaNYgBya4kQNJo')).toEqual(false);
    });
  });
});
