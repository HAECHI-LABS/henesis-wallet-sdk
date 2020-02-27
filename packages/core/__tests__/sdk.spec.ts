import {SDK} from "../src/sdk";
import {Token, Account, Secret} from "../src/accounts";
import nock from "nock";
import {Converter} from "../src/converter/converter";

const baseUrl = 'http://localhost:8080';

describe('SDK', () => {
  describe("accounts", () => {
    describe('#get()', () => {
      it('should return account with key', async () => {
        const response = {
          id: 'fb186c44301577a46d1b660e8f4d953c',
          email: 'haechi2@haechi.io',
          name: 'haechi',
          organization: 'haechi',
          secret:
            'MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEBh6KEagxayPRxQGwY7Q4tnMnUFi0+kEJI/+D1XrT14hZY+aCv1dFssq3tazxog+BYYgOGSqW0bswDHSkkbiuTw==',
          roles: {'0': 'USER'},
          access_token:
            'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImZiMTg2YzQ0MzAxNTc3YTQ2ZDFiNjYwZThmNGQ5NTNjIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4Mjc5MDAxNCwiZXhwIjoxNTgyNzkwMDE5fQ.7tH7mm8spEuokI5NDggSkLWJ1yJfBF8azpmt-8o9Jfhyoe4m7HdRc918NcxQotTiSBkz61inwsoHcdmU57PkQA',
          henesis_eth_key:
            {
              address: '0x51962e7ab62ead16fbd210df880df24ce2c15e08',
              xpub:
                '0x39e82c494f443278f7728209d5b4b3ed5dcdb6f28ba9c4f68e83f396c98718a384d41dceb7f7237a4584f62c733f41f163bb6de797a2eb40b424e5898da47141'
            },
          henesis_klay_key:
            {
              address: '0x51962e7ab62ead16fbd210df880df24ce2c15e08',
              xpub:
                '0x39e82c494f443278f7728209d5b4b3ed5dcdb6f28ba9c4f68e83f396c98718a384d41dceb7f7237a4584f62c733f41f163bb6de797a2eb40b424e5898da47141'
            }
        };

        nock(baseUrl)
          .get('/v1/accounts/me')
          .reply(200, response);

        const sdk = new SDK({
          accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImZiMTg2YzQ0MzAxNTc3YTQ2ZDFiNjYwZThmNGQ5NTNjIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4MjY5NDI5MCwiZXhwIjoxNTgzMDU0MjkwfQ.BAFBndRyB9-KHlI-RNKHrXKs08f6HngUvqfZ8_iD9hAp_Hx_tqofL2CbHrSov_Ct-oLUADY9N9Z64lvZN4hCRA",
          secret: "secret"
        });

        const account = await sdk.accounts.get();
        expect(account).toEqual(Converter.toCamelCase(response));
      });
    });

    describe('#login()', () => {
      it('should return account', async () => {
        const response = {
          id: 'fb186c44301577a46d1b660e8f4d953c',
          email: 'haechi2@haechi.io',
          name: 'haechi',
          organization: 'haechi',
          accessToken:
            'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImZiMTg2YzQ0MzAxNTc3YTQ2ZDFiNjYwZThmNGQ5NTNjIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4Mjc5MjAyNSwiZXhwIjoxNTgzMTUyMDI1fQ.g-3bWV4Ms2y5SyyqTHvLoT9h6k73hVPFywEdV4rvZbZjuCbcjsi7j4M8Soq08FC3FSmGiG4f7iK5p32Ji93EHw'
        };

        nock(baseUrl)
          .post('/v1/accounts/login')
          .reply(200, response);

        const sdk = new SDK({
          accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImZiMTg2YzQ0MzAxNTc3YTQ2ZDFiNjYwZThmNGQ5NTNjIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4MjY5NDI5MCwiZXhwIjoxNTgzMDU0MjkwfQ.BAFBndRyB9-KHlI-RNKHrXKs08f6HngUvqfZ8_iD9hAp_Hx_tqofL2CbHrSov_Ct-oLUADY9N9Z64lvZN4hCRA",
          secret: "secret"
        });

        const account: Account = await sdk.accounts.login("haechi2@haechi.io", "password");
        expect(account).toEqual(Converter.toCamelCase(response));
      });
    });

    describe('#token()', () => {
      it('should return account token', async () => {
        const response = { accessToken:
            'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImZiMTg2YzQ0MzAxNTc3YTQ2ZDFiNjYwZThmNGQ5NTNjIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4Mjc5MjE0NSwiZXhwIjoxNTgyNzkyMTUwfQ.HNUsTzZHMtD8K9Qw4m4uGsSwzEEvcchKG4bfH34S2t8wGg4nG2BA5I89PB3fWgZA6aCZO4i41dqLV9pjOm9qfw'
        };

        nock(baseUrl)
          .post('/v1/accounts/token')
          .reply(200, response);

        const sdk = new SDK({
          accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImZiMTg2YzQ0MzAxNTc3YTQ2ZDFiNjYwZThmNGQ5NTNjIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4MjY5NDI5MCwiZXhwIjoxNTgzMDU0MjkwfQ.BAFBndRyB9-KHlI-RNKHrXKs08f6HngUvqfZ8_iD9hAp_Hx_tqofL2CbHrSov_Ct-oLUADY9N9Z64lvZN4hCRA",
          secret: "secret"
        });
        const token: Token = await sdk.accounts.token(5000);
        expect(token).toEqual(Converter.toCamelCase(response));
      });
    });

    describe('#secret()', () => {
      it('should return account secret', async () => {
        const response = { secret:
            'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImZiMTg2YzQ0MzAxNTc3YTQ2ZDFiNjYwZThmNGQ5NTNjIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4Mjc5MjE0NSwiZXhwIjoxNTgyNzkyMTUwfQ.HNUsTzZHMtD8K9Qw4m4uGsSwzEEvcchKG4bfH34S2t8wGg4nG2BA5I89PB3fWgZA6aCZO4i41dqLV9pjOm9qfw'
        };

        nock(baseUrl)
          .post('/v1/accounts/secret')
          .reply(200, response);

        const sdk = new SDK({
          accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImZiMTg2YzQ0MzAxNTc3YTQ2ZDFiNjYwZThmNGQ5NTNjIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4MjY5NDI5MCwiZXhwIjoxNTgzMDU0MjkwfQ.BAFBndRyB9-KHlI-RNKHrXKs08f6HngUvqfZ8_iD9hAp_Hx_tqofL2CbHrSov_Ct-oLUADY9N9Z64lvZN4hCRA",
          secret: "secret"
        });
        const secret: Secret = await sdk.accounts.secret("haechi2@haechi.io", "password");
        expect(secret).toEqual(Converter.toCamelCase(response));
      });
    });
  });
});