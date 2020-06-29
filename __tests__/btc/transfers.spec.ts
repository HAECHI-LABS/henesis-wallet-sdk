import {HttpClient} from "../../src/httpClient";
import {BtcTransfers} from "../../src/btc/transfers";

describe.skip('BtcTransfer', () => {
  jest.setTimeout(50000);
  describe('#getTransfers()', () => {
    it('should get transfers', async () => {
      const transfers = new BtcTransfers(
        new HttpClient({
          accessToken: 'accessToken',
          secret: 'secret',
          url: 'http://localhost:8080/api/v2/btc',
        }) as any,
      );

      const transferPagination = await transfers.getTransfers({
        walletId: '61898f8d5b4c69bbd7f7b9216e5d5bff'
      });

      console.log(transferPagination);
    });
  });
});
