import { HttpClient } from "../../src/httpClient";
import { Env } from "../../src";
import { FilFeeWallets, FilKeychains, FilWallets } from "../../src/fil";
import { BlockchainType } from "../../src/blockchain";

describe('FilWallet', () => {
  describe.skip('#flush()', () => {
    it('should flush fil', async () => {
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
      const wallet = await wallets.getWallet('22223cb66afe86babd2a37a31afbcccc');
      const flush = await wallet.flush(['44423cb66afe86babd2a37a31afbcddd'], 'password');
      console.log(flush);
    })
  })
})
