import { BTCWallets } from '../../src/btc/wallets';
import { HttpClient } from '../../src/httpClient';
import BN from 'bn.js';
import { Transaction } from '../../src/btc/wallet';
import { DefaultBtcKeyChains } from "../../src/btc/keychains";

describe('BTCMasterWallet', () => {
  jest.setTimeout(50000);
  describe('#transfer()', () => {
    it('should transfer btc', async () => {
      const wallets = new BTCWallets(
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2',
        }) as any,
        new DefaultBtcKeyChains(),
      );
      const wallet = await wallets.getWallet(
        'a3c2f4128427658ec4dcb668ec799c65',
      );
      const tx: Transaction = await wallet.transfer(
        'n4QVq9cL2FjAJzJ9ZTUJ6W5toF37ux2aN2',
        new BN(100, 'hex'),
        'passphrase',
      );

      console.log(tx);
    });
  });
  describe('#getBalance()', () => {
    it('should get balance of wallet', async () => {
      const wallets = new BTCWallets(
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2',
        }) as any,
        new DefaultBtcKeyChains(),
      );
      const wallet = await wallets.getWallet(
        'a3c2f4128427658ec4dcb668ec799c65',
      );
      const { balance } = await wallet.getBalance();
      console.log(balance);
    });
  });

  describe('#getTransactions()', () => {
    it('should get transactions of wallet', async () => {
      const wallets = new BTCWallets(
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2',
        }) as any,
        new DefaultBtcKeyChains(),
      );
      const wallet = await wallets.getWallet(
        'a3c2f4128427658ec4dcb668ec799c65',
      );
      const txs = await wallet.getTransactions();
      txs.results.forEach(tx =>{
        console.log(tx);
      });
    });
  });
});
