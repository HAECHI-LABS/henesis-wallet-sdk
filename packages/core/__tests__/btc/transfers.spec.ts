import {HttpClient} from "../../src/httpClient";
import {BtcTransfers} from "../../src/btc/transfers";

describe.skip('BtcTransfer', () => {
  jest.setTimeout(50000);
  describe('#', () => {
    it('should get transfers', async () => {
      const transfers = new BtcTransfers(
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
      );

      const transferPagination = await transfers.getTransfers({
        walletId: 'a3c2f4128427658ec4dcb668ec799c65'
      });

      console.log(transferPagination.pagination);
      console.log(transferPagination.results);
    });
  });
});
