import nock from 'nock';
import { SDK } from '../src';
import { MasterWallet } from '../src/wallet';
import { Blockchain } from '../src/blockchain';

const baseUrl = 'http://localhost:8080';
describe('Wallets', () => {
  describe('#createMasterWallet()', () => {
    jest.setTimeout(5000000);
    it('should be able to create master wallet', async () => {
      const response = {
        id: '39e16b3eab64f4d595a6cd6ca4035703',
        name: 'klaytn_test_masterWallet',
        address: '0x6b8efffae6dd7773a7c5c87e971a40b201bf78c8',
        blockchain: 'KLAYTN',
        createdAt: '1583837537277',
        updatedAt: '1583837537277',
        backupKey:
        {
          address: '0x716ba9752bbf769428dcd59352e4c16f64a2a856',
          pub:
          '0xf1c6031a12cc0c2f15ac409833ed03685420f30f30dd077aba52ee61b0e39133821e20c7f4089b55f8a4c7a650c0da41f80e6de7ef9e1f4de0eb3ebf09b360f6',
          keyFile:
          '{"iv":"BEySd1ljOn4Sbb6BKTqlNQ==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"T85A09XexMM=","ct":"qvjhYYQXObQB4ta49b6iDwLX1+aynHOM1zhdC0bIozvW9e6MmrZaRa1N+0MxjAX/fPJQYia0KJGCEgoXfSGRCF0wWhGDBM9jK9Q="}',
        },
        accountKey:
        {
          address: '0xc6d286f3e6b43dd410bd1a79e224adb27d3a83d2',
          pub:
          '0x2a514115f574b9becbb7b43c4dabf2165b97cd64f492787171f54a81e8aa7b3e72cb42335a8e0a5bc774a0dc7ec2c29f74b6b239fabecce655d714dbc2f9ae03',
          keyFile:
          '{"iv":"gw6l4gKz7k3BjTOP23FOCA==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"UFHEh0shodQ=","ct":"tWPRVQIY6JGIt2uM7Pw/5nn+M4hZAIBjLfIXnxecl6VzHDzMdC0wa0jjsHUEOJCaNXWHiDcRTLl1Iwm1ql42toj9jdVUHTbL6bQ="}',
        },
      };

      const sdk = new SDK({
        accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQwOGMyMWQ0OGM4MGNiMDNkM2U3NWMwMTUxMTRiZTkzIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4Mzc5OTY5MSwiZXhwIjoxNTg0MTU5NjkxfQ.RoGvobumJV0iBmN-0j23pgl8QlC5I02rfOVYQxL3HlYcxXRn8IUfghfQt-MvEoHG6hgIVfqzhfdLFsQqP_NgmQ',
        secret: 'secret',
        url: 'http://localhost:8080/api/v1',
      });

      nock(baseUrl)
        .post('/api/v1/wallets')
        .reply(200, response);
      const keysResponse = {
        access_token: 'string',
        henesis_eth_key:
          {
            address: '0x716ba9752bbf769428dcd59352e4c16f64a2a856',
            pub:
            '0xf1c6031a12cc0c2f15ac409833ed03685420f30f30dd077aba52ee61b0e39133821e20c7f4089b55f8a4c7a650c0da41f80e6de7ef9e1f4de0eb3ebf09b360f6',
            keyFile:
            '{"iv":"BEySd1ljOn4Sbb6BKTqlNQ==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"T85A09XexMM=","ct":"qvjhYYQXObQB4ta49b6iDwLX1+aynHOM1zhdC0bIozvW9e6MmrZaRa1N+0MxjAX/fPJQYia0KJGCEgoXfSGRCF0wWhGDBM9jK9Q="}',
          },
        henesis_klay_key:
          {
            address: '0xc6d286f3e6b43dd410bd1a79e224adb27d3a83d2',
            pub:
            '0x2a514115f574b9becbb7b43c4dabf2165b97cd64f492787171f54a81e8aa7b3e72cb42335a8e0a5bc774a0dc7ec2c29f74b6b239fabecce655d714dbc2f9ae03',
            keyFile:
            '{"iv":"gw6l4gKz7k3BjTOP23FOCA==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"UFHEh0shodQ=","ct":"tWPRVQIY6JGIt2uM7Pw/5nn+M4hZAIBjLfIXnxecl6VzHDzMdC0wa0jjsHUEOJCaNXWHiDcRTLl1Iwm1ql42toj9jdVUHTbL6bQ="}',
          },
        id: '39e16b3eab64f4d595a6cd6ca4035703',
        name: 'haechi',
        secret: 'secret',
      };
      nock(baseUrl)
        .get('/api/v1/organizations/me')
        .reply(200, keysResponse);
      const masterWallet: MasterWallet = await sdk.wallets.createMasterWallet('klaytn_test_masterWallet', Blockchain.Klaytn, 'password');
      expect(masterWallet.getAddress()).toEqual(response.address);
    });
  });

  describe('#getMasterWallets()', () => {
    jest.setTimeout(5000000);
    it('should return array of master wallets', async () => {
      const response = [
        {
          id: '20a5fa879bcb14a5c7b1e654961c3599',
          name: 'my_wallet',
          address: '0xzdasyoz3uz6ik4spnkzbzihiwbgoglazf3n1ihax',
          blockchain: 'KLAYTN',
          createdAt: '1583837537277',
          updatedAt: '1583837537277',
          backupKey:
          {
            address: '0x716ba9752bbf769428dcd59352e4c16f64a2a856',
            pub:
            '0xf1c6031a12cc0c2f15ac409833ed03685420f30f30dd077aba52ee61b0e39133821e20c7f4089b55f8a4c7a650c0da41f80e6de7ef9e1f4de0eb3ebf09b360f6',
            keyFile:
            '{"iv":"BEySd1ljOn4Sbb6BKTqlNQ==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"T85A09XexMM=","ct":"qvjhYYQXObQB4ta49b6iDwLX1+aynHOM1zhdC0bIozvW9e6MmrZaRa1N+0MxjAX/fPJQYia0KJGCEgoXfSGRCF0wWhGDBM9jK9Q="}',
          },
          accountKey:
          {
            address: '0xc6d286f3e6b43dd410bd1a79e224adb27d3a83d2',
            pub:
            '0x2a514115f574b9becbb7b43c4dabf2165b97cd64f492787171f54a81e8aa7b3e72cb42335a8e0a5bc774a0dc7ec2c29f74b6b239fabecce655d714dbc2f9ae03',
            keyFile:
            '{"iv":"gw6l4gKz7k3BjTOP23FOCA==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"UFHEh0shodQ=","ct":"tWPRVQIY6JGIt2uM7Pw/5nn+M4hZAIBjLfIXnxecl6VzHDzMdC0wa0jjsHUEOJCaNXWHiDcRTLl1Iwm1ql42toj9jdVUHTbL6bQ="}',
          },
        },
        {
          id: '20a5fa879bcb14a5c7b1e654961c3599',
          name: 'my_wallet',
          address: '0xzdasyoz3uz6ik4spnkzbzihiwbgoglazf3n1ihax',
          blockchain: 'KLAYTN',
          createdAt: '1583837537278',
          updatedAt: '1583837537278',
          backupKey:
          {
            address: '0x716ba9752bbf769428dcd59352e4c16f64a2a856',
            pub:
            '0xf1c6031a12cc0c2f15ac409833ed03685420f30f30dd077aba52ee61b0e39133821e20c7f4089b55f8a4c7a650c0da41f80e6de7ef9e1f4de0eb3ebf09b360f6',
            keyFile:
            '{"iv":"BEySd1ljOn4Sbb6BKTqlNQ==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"T85A09XexMM=","ct":"qvjhYYQXObQB4ta49b6iDwLX1+aynHOM1zhdC0bIozvW9e6MmrZaRa1N+0MxjAX/fPJQYia0KJGCEgoXfSGRCF0wWhGDBM9jK9Q="}',
          },
          accountKey:
          {
            address: '0xc6d286f3e6b43dd410bd1a79e224adb27d3a83d2',
            pub:
            '0x2a514115f574b9becbb7b43c4dabf2165b97cd64f492787171f54a81e8aa7b3e72cb42335a8e0a5bc774a0dc7ec2c29f74b6b239fabecce655d714dbc2f9ae03',
            keyFile:
            '{"iv":"gw6l4gKz7k3BjTOP23FOCA==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"UFHEh0shodQ=","ct":"tWPRVQIY6JGIt2uM7Pw/5nn+M4hZAIBjLfIXnxecl6VzHDzMdC0wa0jjsHUEOJCaNXWHiDcRTLl1Iwm1ql42toj9jdVUHTbL6bQ="}',
          },
        },
      ];


      nock(baseUrl)
        .get('/api/v1/wallets')
        .reply(200, response);

      const sdk = new SDK({
        accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQwOGMyMWQ0OGM4MGNiMDNkM2U3NWMwMTUxMTRiZTkzIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4Mzc5OTY5MSwiZXhwIjoxNTg0MTU5NjkxfQ.RoGvobumJV0iBmN-0j23pgl8QlC5I02rfOVYQxL3HlYcxXRn8IUfghfQt-MvEoHG6hgIVfqzhfdLFsQqP_NgmQ',
        secret: 'secret',
        url: 'http://localhost:8080/api/v1',
      });

      const masterWallet = await sdk.wallets.getMasterWallets();
      expect(masterWallet.length).toEqual(2);
    });
  });
});
