import nock from 'nock';
import { Wallets } from '../src/wallets';
import { Client } from '../src/sdk';
import { HttpClient } from '../src/httpClient';
import { EthereumKeychain, Keychain } from '../src/keychain';
import { Wallet } from '../src/wallet';

const baseUrl = 'http://localhost:8080';

describe('wallets', () => {
  let client: Client;
  let keychain: Keychain;
  beforeEach(() => {
    client = new HttpClient({
      secret: 'secret',
      accessToken: 'accessToken',
    }) as any;
    keychain = new EthereumKeychain();
  });

  describe('#createMasterWallet()', () => {
    it('success create master wallet', async () => {
      const response = {
        id: '20a5fa879bcb14a5c7b1e654961c3599',
        name: 'my_wallet',
        address: '0xzdasyoz3uz6ik4spnkzbzihiwbgoglazf3n1ihax',
        blockchain: 'ethereum',
        created_at: '2020-02-25 22:57:21',
        updated_at: '2020-02-25 22:57:21',
        backup_key: {
          address: '0xz19cff3cad9a374392a203b93bfeef4e06f04a44',
          xpub: '0xz0ebb4ba4351cc4be33b1098a17310e228e707b984766fb54b059f3d25b333ae60047b7ddb931a96a167225bf55a7d036328ada3b7745abdb9b5ee77fc55431f1c',
        },
        account_key: {
          address: '0xzdab3d3ad3c5c69c976529bf03d2d51c49e67624',
          pub: '0xz95888a0f0d54cd6faca708c47dd71e5cea741eb13a77493ef30cbae9e3c594f3836cc4d84ccaa41459537b0d345e6423c08b7a0033d7f030deb9acfe442a256',
        },
      };
      nock(baseUrl)
        .post('/api/v1/wallets')
        .reply(200, response);
      const wallets = new Wallets(client, keychain);
      const wallet: Wallet = await wallets.createMasterWallet('my_wallet', 'ethereum', 'password');
      // TODO wallet 구현되면 obj비
      console.log(wallet);
    });
  });
  describe('#getMasterWallet()', () => {
    it('success get master wallet', async () => {
      const response = {
        id: '20a5fa879bcb14a5c7b1e654961c3599',
        name: 'my_wallet',
        address: '0xzdasyoz3uz6ik4spnkzbzihiwbgoglazf3n1ihax',
        blockchain: 'ethereum',
        created_at: '2020-02-25 22:57:21',
        updated_at: '2020-02-25 22:57:21',
        backup_key: {
          address: '0xz19cff3cad9a374392a203b93bfeef4e06f04a44',
          xpub: '0xz0ebb4ba4351cc4be33b1098a17310e228e707b984766fb54b059f3d25b333ae60047b7ddb931a96a167225bf55a7d036328ada3b7745abdb9b5ee77fc55431f1c',
        },
        account_key: {
          address: '0xzdab3d3ad3c5c69c976529bf03d2d51c49e67624',
          pub: '0xz95888a0f0d54cd6faca708c47dd71e5cea741eb13a77493ef30cbae9e3c594f3836cc4d84ccaa41459537b0d345e6423c08b7a0033d7f030deb9acfe442a256',
        },
      };
      nock(baseUrl)
        .get('/api/v1/wallets/20a5fa879bcb14a5c7b1e654961c3599')
        .reply(200, response);
      const wallets = new Wallets(client, keychain);
      const wallet: Wallet = await wallets.getMasterWallet('20a5fa879bcb14a5c7b1e654961c3599');
      // TODO wallet 구현되면 obj비
      console.log(wallet);
    });
  });
  describe('#getAllMasterWallets()', () => {
    it('success get all master wallets', async () => {
      const response = [
        {
          id: '20a5fa879bcb14a5c7b1e654961c3599',
          name: 'my_wallet',
          address: '0xzdasyoz3uz6ik4spnkzbzihiwbgoglazf3n1ihax',
          type: 'ETHEREUM',
          blockchain: 'ethereum',
          created_at: '2020-02-25 22:57:21',
          updated_at: '2020-02-25 22:57:21',
          backup_key: {
            address: '0xz19cff3cad9a374392a203b93bfeef4e06f04a44',
            pub: '0xz0ebb4ba4351cc4be33b1098a17310e228e707b984766fb54b059f3d25b333ae60047b7ddb931a96a167225bf55a7d036328ada3b7745abdb9b5ee77fc55431f1c',
          },
          account_key: {
            address: '0xzdab3d3ad3c5c69c976529bf03d2d51c49e67624',
            pub: '0xz95888a0f0d54cd6faca708c47dd71e5cea741eb13a77493ef30cbae9e3c594f3836cc4d84ccaa41459537b0d345e6423c08b7a0033d7f030deb9acfe442a256',
          },
        },
        {
          id: '20a5fa879bcb14a5c7b1e654961c3599',
          name: 'my_wallet',
          address: '0xzdasyoz3uz6ik4spnkzbzihiwbgoglazf3n1ihax',
          type: 'ETHEREUM',
          blockchain: 'ethereum',
          created_at: '2020-02-25 22:57:21',
          updated_at: '2020-02-25 22:57:21',
          backup_key: {
            address: '0xz19cff3cad9a374392a203b93bfeef4e06f04a44',
            pub: '0xz0ebb4ba4351cc4be33b1098a17310e228e707b984766fb54b059f3d25b333ae60047b7ddb931a96a167225bf55a7d036328ada3b7745abdb9b5ee77fc55431f1c',
          },
          account_key: {
            address: '0xzdab3d3ad3c5c69c976529bf03d2d51c49e67624',
            pub: '0xz95888a0f0d54cd6faca708c47dd71e5cea741eb13a77493ef30cbae9e3c594f3836cc4d84ccaa41459537b0d345e6423c08b7a0033d7f030deb9acfe442a256',
          },
        },
      ];
      nock(baseUrl)
        .get('/api/v1/wallets')
        .reply(200, response);
      const wallets = new Wallets(client, keychain);
      const allWallets: Wallet[] = await wallets.getAllMasterWallets();
      // TODO wallet 구현되면 obj비
      console.log(allWallets);
    });
  });
});
