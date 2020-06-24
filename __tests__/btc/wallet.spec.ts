import { BtcWallets } from "../../src/btc/wallets";
import { HttpClient } from "../../src/httpClient";
import BN from "bn.js";
import { BtcTransaction } from "../../src/btc/wallet";
import { BtcKeyChains } from "../../src/btc/keychains";
import { Env } from "../../src";

describe.skip('BtcMasterWallet', () => {
  jest.setTimeout(50000);
  describe('#transfer()', () => {
    it('should transfer btc', async () => {
      const wallets = new BtcWallets(
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new BtcKeyChains(Env.Local),
      );
      const wallet = await wallets.getWallet(
        '61898f8d5b4c69bbd7f7b9216e5d5bff',
      );
      const tx: BtcTransaction = await wallet.transfer(
        'BTC',
        '2MvPC2ir2mxwjL3cc4LUosPQqu45YnQknSt',
        new BN(1000),
        'passphrase',
      );

      console.log(tx);
    });
  });

  describe('#depositAddress()', () => {
    it('should create depositAddress', async () => {
      const wallets = new BtcWallets(
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new BtcKeyChains(Env.Local),
      );
      const wallet = await wallets.getWallet(
        '61898f8d5b4c69bbd7f7b9216e5d5bff',
      );
      const createDeposit = await wallet.createDepositAddress('deposit-address-btc');
      console.log(createDeposit);
    });

    it('should get depositAddress', async () => {
      const wallets = new BtcWallets(
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new BtcKeyChains(Env.Local),
      );
      const wallet = await wallets.getWallet(
        '61898f8d5b4c69bbd7f7b9216e5d5bff',
      );
      const depositAddress = await wallet.getDepositAddress('abcd');
      console.log(depositAddress);
    });
  });

  describe('#getBalance()', () => {
    it('should get balance of wallet', async () => {
      const wallets = new BtcWallets(
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new BtcKeyChains(Env.Local),
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
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
        new BtcKeyChains(Env.Local),
      );
      const wallet = await wallets.getWallet(
        'a3c2f4128427658ec4dcb668ec799c65',
      );
      const txs = await wallet.getTransactions();
      txs.results.forEach(tx => {
        console.log(tx);
      });
    });
  });
});