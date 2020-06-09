import { BtcWallets } from '../../src/btc/wallets';
import { HttpClient } from '../../src/httpClient';
import BN from 'bn.js';
import { BtcTransaction } from '../../src/btc/wallet';
import { DefaultBtcKeyChains } from '../../src/btc/keychains';

describe('BtcMasterWallet', () => {
  jest.setTimeout(50000);
  describe('#transfer()', () => {
    it('should transfer btc', async () => {
      const wallets = new BtcWallets(
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new DefaultBtcKeyChains(),
      );
      const wallet = await wallets.getWallet(
        'a3c2f4128427658ec4dcb668ec799c65',
      );
      const tx: BtcTransaction = await wallet.transfer(
        "BTC",
        'n4QVq9cL2FjAJzJ9ZTUJ6W5toF37ux2aN2',
        new BN(100, 'hex'),
        'passphrase',
      );

      console.log(tx);
    });
  });
  describe('#getBalance()', () => {
    it('should get balance of wallet', async () => {
      const wallets = new BtcWallets(
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new DefaultBtcKeyChains(),
      );
      const wallet = await wallets.getWallet(
        'a3c2f4128427658ec4dcb668ec799c65',
      );
      const response = await wallet.getBalance();
      console.log(response);
    });
  });

  describe('#getTransactions()', () => {
    it('should get transactions of wallet', async () => {
      const wallets = new BtcWallets(
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new DefaultBtcKeyChains(),
      );
      const wallet = await wallets.getWallet(
        'a3c2f4128427658ec4dcb668ec799c65',
      );
      const txs = await wallet.getTransactions();
      txs.results.forEach((tx) => {
        console.log(tx);
      });
    });
  });
});
