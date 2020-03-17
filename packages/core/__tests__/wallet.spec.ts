import nock from 'nock';
import BN from 'bn.js';
import { SDK } from '../src';
import { MultiSigPayload } from '../src/coin';
import { EthLikeWallet } from '../src/wallet';
import { MockEthLikeWallet } from '../__mocks__/wallet.mock';
import { EthereumKeychains } from '../src/keychains';

const baseUrl = 'http://localhost:8080';
describe('Wallet', () => {
  describe('EthLikeWallet', () => {
    let wallet: EthLikeWallet;
    let keychain: EthereumKeychains;
    beforeEach(() => {
      keychain = new EthereumKeychains();
      wallet = new MockEthLikeWallet(
        null,
        {
          blockchain: 'ETHEREUM',
        } as any,
        keychain,
      );
    });

    describe('#signPayload()', () => {
      it('should return valid signature', () => {
        const keyWithPriv = {
          address: '0x954811D579c16D79b8797066f41DFb846a169a0F',
          pub: '0x48ad86c7fda903b00bb10c046aa9fdaa64f4aebd2b768ff269946d87230d735b1c2020478776bf176d7d46f87a404b3f6e3301d4cf6ca79b59247704f90c9e60',
          priv: '0x68de31542f68c785056a977c838517c9db1902ea6d10794c322e32440d1f5497',
          keyFile:
            '{"iv":"1lsvVj19dYI3Rkf7g9MLMw==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"79Hft/yrA7Y=","ct":"vSYilJIDPPeZzRq15Q7MoE9AvqZ2wtQc6S2vDPfbFOzdYQTfy8cdZbPSmIcdNnrCK6hZndUCtD3QJewPgqixz1cyOjUcGQjWjqo="}',
        };
        (wallet as any).keychains = keychain;
        (wallet as any).masterWalletData = {
          blockchain: "ETHEREUM",
          accountKey: keyWithPriv,
        };
        const multiSigPayload: MultiSigPayload = {
          walletAddress: '0x4F79BB2A91F88054710e24328c77f557d14e14AF',
          toAddress: '0x6732c278C58FC90542cce498981844A073D693d7',
          value: new BN(0),
          walletNonce: new BN(0),
          hexData: '0xc801bf9b000000000000000000000000000000000000000000000000000000000000006400000000000000000000000026064a2e2b568d9a6d01b93d039d1da9cf2a58cd',
        };
        const expectedSignature = '0x'
          + '2042cf1aca32120e43f5dc193492e2d343f49d61460f0a9213cdc377a94a70d0' // r
          + '067e7c583b03c0a8aabac4b5254b590d1476eaf8a465fdf55927d202a261ab60' // s
          + '1c'; // v
        expect((wallet as any).signPayload(multiSigPayload, 'password')).toEqual(expectedSignature);
      });
    });

    describe('#createUserWallet()', () => {
      it('should be able to create user wallet when salt is not given', async ()=>{
        const masterWalletResponse = {
          id: '20a5fa879bcb14a5c7b1e654961c3599',
          name: 'my_wallet',
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
            '{"iv":"BEySd1ljOn4Sbb6BKTqlNQ==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"T85A09XexMM=","ct":"qvjhYYQXObQB4ta49b6iDwLX1+aynHOM1zhdC0bIozvW9e6MmrZaRa1N+0MxjAX/fPJQYia0KJGCEgoXfSGRCF0wWhGDBM9jK9Q="}' 
          },
          accountKey:
          {
            address: '0xc6d286f3e6b43dd410bd1a79e224adb27d3a83d2',
            pub:
            '0x2a514115f574b9becbb7b43c4dabf2165b97cd64f492787171f54a81e8aa7b3e72cb42335a8e0a5bc774a0dc7ec2c29f74b6b239fabecce655d714dbc2f9ae03',
            keyFile:
            '{"iv":"gw6l4gKz7k3BjTOP23FOCA==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"UFHEh0shodQ=","ct":"tWPRVQIY6JGIt2uM7Pw/5nn+M4hZAIBjLfIXnxecl6VzHDzMdC0wa0jjsHUEOJCaNXWHiDcRTLl1Iwm1ql42toj9jdVUHTbL6bQ="}' 
          }
        };
        const nonceResponse = {
          nonce: '0'
        };
        const userWalletResponse = {
            address: "0xc6d286f3e6b43dd410bd1a79e224adb27d3a83d2",
            blockchain: "KLAYTN",
            created_at: "1583837537277",
            id: "39e16b3eab64f4d595a6cd6ca4035703",
            name: "klaytn_test",
            "status": "ACTIVE",
            updated_at: "1583837537277"
        }
        nock(baseUrl)
          .get('/api/v1/wallets/20a5fa879bcb14a5c7b1e654961c3599')
          .reply(200, masterWalletResponse);
        nock(baseUrl)
          .get('/api/v1/wallets/20a5fa879bcb14a5c7b1e654961c3599/nonce')
          .reply(200, nonceResponse);
        nock(baseUrl)
          .post('/api/v1/wallets/20a5fa879bcb14a5c7b1e654961c3599/user-wallets')
          .reply(200, userWalletResponse);

      const sdk = new SDK({
        accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQwOGMyMWQ0OGM4MGNiMDNkM2U3NWMwMTUxMTRiZTkzIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4Mzc5OTY5MSwiZXhwIjoxNTg0MTU5NjkxfQ.RoGvobumJV0iBmN-0j23pgl8QlC5I02rfOVYQxL3HlYcxXRn8IUfghfQt-MvEoHG6hgIVfqzhfdLFsQqP_NgmQ',
        secret: 'secret',
      });
        const wallet = await sdk.wallets.getMasterWallet('20a5fa879bcb14a5c7b1e654961c3599');
        const userWallet = await wallet.createUserWallet('klaytn_test', 'password');
        expect(userWallet.getAddress()).toEqual('0xc6d286f3e6b43dd410bd1a79e224adb27d3a83d2');
      });
    });
  });
});
