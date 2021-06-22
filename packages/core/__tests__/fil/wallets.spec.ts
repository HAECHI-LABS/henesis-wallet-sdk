import {HttpClient} from "../../src/httpClient";
import {Env} from "../../src";
import {FilWallets} from "../../src/fil/wallets";
import {FilKeychains} from "../../src/fil/keychains";
import {BlockchainType} from "../../src/blockchain";
import {FilFeeWallets} from "../../src/fil/feeWallets";

describe('FilWallets', () => {
  describe('#verifyAddress()', () => {
    it('should return true when address is valid', async () => {
      const client = new HttpClient({
        accessToken: 'accessToken',
        secret: 'secret',
        url: 'http://localhost:8080/api/v2/fil',
        env: Env.Local,
      }) as any;
      const wallets = new FilWallets(
        client,
        new FilKeychains(Env.Local),
        Env.Local,
        BlockchainType.FILECOIN,
        new FilFeeWallets(client)
      );

      expect(wallets.verifyAddress('f1lbltetimfvmo252wuq7i3244zvrkr5lvd5cof5a')).toEqual(true);
    })
  })

  describe.skip('#createWallet()', () => {
    it('should create wallet', async () => {
      const client = new HttpClient({
        accessToken: 'accessToken',
        secret: 'secret',
        url: 'http://localhost:8080/api/v2/fil',
        env: Env.Local,
      }) as any;
      const wallets = new FilWallets(
        client,
        new FilKeychains(Env.Local),
        Env.Local,
        BlockchainType.FILECOIN,
        new FilFeeWallets(client)
      );

      const recoveryKit = await wallets.createRecoveryKit('test-wallet', 'password');
      const wallet = await wallets.createWalletWithKit(recoveryKit);
      console.log(wallet);
    })
  })
})
