import nock from 'nock';
import { SDK } from '../src';
import { CoinData } from '../src/coin';
import { BlockchainType, CoinAttribute } from '../src/types';

const baseUrl = 'http://localhost:8080';
describe('Coins', () => {
  const sdk = new SDK({
    accessToken:
      'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQwOGMyMWQ0OGM4MGNiMDNkM2U3NWMwMTUxMTRiZTkzIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4Mzc5OTY5MSwiZXhwIjoxNTg0MTU5NjkxfQ.RoGvobumJV0iBmN-0j23pgl8QlC5I02rfOVYQxL3HlYcxXRn8IUfghfQt-MvEoHG6hgIVfqzhfdLFsQqP_NgmQ',
    secret: 'secret',
    url: 'http://localhost:8080/api/v1',
  });

  describe('#getCoin()', () => {
    it('should be called normally', async () => {
      const coinResponse: CoinData = {
        id: 5,
        name: '엔바토',
        symbol: 'EVT',
        decimals: 18,
        address: '0x8a904f0fb443d62b6a2835483b087abecf93a137',
        desc: '',
        blockchain: BlockchainType.Ethereum,
        attributes: [CoinAttribute.ERC20_STANDARD],
      };

      nock(baseUrl)
        .get('/api/v1/coins/EVT?blockchain=ETHEREUM')
        .reply(200, coinResponse);

      expect(
        (await sdk.coins.getCoin('EVT', BlockchainType.Ethereum)).getCoinData(),
      ).toEqual(coinResponse);
    });
  });

  describe('#getCoins()', () => {
    it('should be called normally', async () => {
      const coinsResponse: CoinData[] = [
        {
          id: 1,
          name: '클레이튼',
          symbol: 'KLAY',
          decimals: 18,
          address: null,
          desc: '',
          blockchain: BlockchainType.Klaytn,
          attributes: [],
        },
        {
          id: 2,
          name: '이더리움',
          symbol: 'ETH',
          decimals: 18,
          address: null,
          desc: '',
          blockchain: BlockchainType.Ethereum,
          attributes: [],
        },
        {
          id: 3,
          name: '엔바토',
          symbol: 'EVT',
          decimals: 18,
          address: '0x5457d04fc5ad31921c2254df528932a22d757d22',
          desc: '',
          blockchain: BlockchainType.Klaytn,
          attributes: [CoinAttribute.ERC20_STANDARD],
        },
      ];

      nock(baseUrl).get('/api/v1/coins').reply(200, coinsResponse);

      expect((await sdk.coins.getCoins()).map((c) => c.getCoinData())).toEqual(
        coinsResponse,
      );
    });
  });
});
