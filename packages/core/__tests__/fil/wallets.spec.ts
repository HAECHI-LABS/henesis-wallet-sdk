import {HttpClient} from "../../lib/httpClient";
import {Env} from "../../src";
import {FilWallets} from "../../lib/fil/wallets";
import {FilKeychains} from "../../lib/fil/keychains";
import {BlockchainType} from "../../lib/blockchain";
import {FilFeeWallets} from "../../lib/fil/feeWallets";

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
        new FilKeychains(),
        Env.Local,
        BlockchainType.FILECOIN,
        new FilFeeWallets(client)
      );

      expect(wallets.verifyAddress('f1lbltetimfvmo252wuq7i3244zvrkr5lvd5cof5a')).toEqual(true);
    })
  })
})
