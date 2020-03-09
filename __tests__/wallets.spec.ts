import nock from 'nock';
import { SDK } from '../src';
import { MasterWallet} from '../src/wallet';

const baseUrl = 'http://localhost:8080';
describe('Wallets', ()=>{
  describe('#createMasterWallet()', () => {
    jest.setTimeout(5000000);
    it('should be able to create master wallet', async () => {
      const sdk = new SDK({
        accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImZiMTg2YzQ0MzAxNTc3YTQ2ZDFiNjYwZThmNGQ5NTNjIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4MjY5NDI5MCwiZXhwIjoxNTgzMDU0MjkwfQ.BAFBndRyB9-KHlI-RNKHrXKs08f6HngUvqfZ8_iD9hAp_Hx_tqofL2CbHrSov_Ct-oLUADY9N9Z64lvZN4hCRA',
        secret: 'secret',
      });

      const masterWallet: MasterWallet = await sdk.wallets.createMasterWallet('klaytn_test_masterWallet', 'klaytn', 'password');
      const user = await masterWallet.createUserWallet('usertest', 'password');
      console.log(user);
    });
  });
});
