import { BtcWallets } from "../../src/btc/wallets";
import { HttpClient } from "../../src/httpClient";
import BN from "bn.js";
import { BtcTransaction } from "../../src/btc/wallet";
import { BtcKeyChains } from "../../src/btc/keychains";
import { Env } from "../../src";
import { Transfer } from "../../src/btc/transfers";

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
          env: Env.Local,
        }) as any,
        new BtcKeyChains(Env.Local),
      );
      const wallet = await wallets.getWallet(
        '61898f8d5b4c69bbd7f7b9216e5d5bff',
      );
      const transfer: Transfer = await wallet.transfer(
        '2MuNo2ZeuAnzztUL1UAbGxjdW1oYAWvrqnX',
        new BN(10000),
        'passphrase',
      );

      console.log(transfer);
    });
  });

  describe('#getEstimatedFee()', () => {
    it('should get estimated fee', async () => {
      const wallets = new BtcWallets(
        Env.Local,
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
          env: Env.Local,
        }) as any,
        new BtcKeyChains(Env.Local),
      );
      const wallet = await wallets.getWallet(
        '61898f8d5b4c69bbd7f7b9216e5d5bff',
      );
      const response = await wallet.getEstimatedFee();
      console.log(parseInt(response.estimatedFee, 16));
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
          env: Env.Local,
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
          env: Env.Local,
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
          env: Env.Local,
        }) as any,
        new BtcKeyChains(Env.Local),
      );
      const wallet = await wallets.getWallet(
        '61898f8d5b4c69bbd7f7b9216e5d5bff',
      );
      const response = await wallet.getBalance();
      console.log(response[0].amount.toNumber());
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
          env: Env.Local,
        }) as any,
        new BtcKeyChains(Env.Local),
      );
      const wallet = await wallets.getWallet(
        '61898f8d5b4c69bbd7f7b9216e5d5bff',
      );

    });
  });
});
