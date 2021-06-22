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
        new FilKeychains(Env.Local),
        Env.Local,
        BlockchainType.FILECOIN,
        new FilFeeWallets(client)
      );
      const wallet = await wallets.getWallet('22223cb66afe86babd2a37a31afbcccc');
      const flush = await wallet.flush(['44423cb66afe86babd2a37a31afbcddd'], 'password');
      console.log(flush);
    })
  })

  describe.skip('#createDepositAddress()', () => {
    it('should create deposit address', async () => {
      const client = new HttpClient({
        accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6InByb2R1Y3RAaGFlY2hpLmlvIiwiaWQiOiI0OTgwM2ZiZjBhMmEyYzNhYjNhMGFiYThiOThkYmIyYSIsInR5cGUiOiJMT05HIiwibG9uZ1R5cGUiOnRydWUsImlzcyI6ImhlbmVzaXMtd2FsbGV0LWRldiIsImlhdCI6MTYyMDA0MTYzMywiZXhwIjoxNjUxNTc3NjMzfQ.iP_uFvsQUymdBJFjAmH8VyVnWdpfoGTazGXkllob7b2qjcEKK13pymn3QxNkMAt5IXN7uVQ35EJsRgf7MEMUbQ',
        secret: 'f2sGpgMbhBavVihRyrFp4trhHP7RdOplYDhxY3pGn+c=',
        url: 'https://dev.wallet.henesis.io/api/v2/fil',
        env: Env.Dev,
      }) as any;
      const wallets = new FilWallets(
        client,
        new FilKeychains(Env.Dev),
        Env.Dev,
        BlockchainType.FILECOIN,
        new FilFeeWallets(client)
      );
      const wallet = await wallets.getWallet('d6c86b80ce2e7029a8efb99c4a13773c');
      const depositAddressData = await wallet.createDepositAddress(`deposit-address-test-${Math.random()}`, 'password');
      console.log(depositAddressData);

      const depositAddress = await wallet.getDepositAddress(depositAddressData.getId());
      expect(depositAddress.getAddress()).toEqual(depositAddressData.getAddress());
    })
  });
})
