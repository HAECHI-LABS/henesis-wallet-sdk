import nock from 'nock';
import { SDK } from '../src';
import { EthereumKeychains } from '../src/keychains';
import { BNConverter } from '../src/utils';
import { MockEthLikeWallet } from '../__mocks__/wallet.mock';
import {EthLikeWallet, MasterWallet, WalletStatus} from "../src/wallet";
import {MultiSigPayload} from "../src/transactions";

const baseUrl = 'http://localhost:8080';
describe('Wallet', () => {
  const password = 'password';
  const encryptedPassphrase = 'NGNlNDA3ZWQ4ZGRjYWNlMA==';
  const keyWithPriv = {
    address: '0xb0A6d9b21F45aCC64365CDBb523405411c3b050F',
    pub: '0x4d5cfc604d29a96298c1851899e9ca3d2a6337ead83bb3e9cfd822dc81ac87574f0b7aa725df739e0770b677db12bf9e19c46b7b55fd1ef75aaabe2a054e50a0',
    priv: '0xf276c114c14b6ac782a2de88d3d1a0157a11cf805c3d73bd4ae4fe54751da2ff',
    keyFile: '{"iv":"htWaAhMGgfR1ehOdvdmmOw==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"rdvBsRRtKXg=","ct":"vXtrIIxU+iPiZ4gOXOht/EsWRJSljW6WLCWn10eFysvLRwUrFLzB9Jq25XuW3+OBwT9wJttcdWQyfJjruG+vKCCKWWhLmeoTLQw="}',
  };
  let keychain: EthereumKeychains;

  beforeAll(() => {
    keychain = new EthereumKeychains();
  });

  describe('EthLikeWallet', () => {
    let wallet: EthLikeWallet;
    beforeEach(() => {
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
        (wallet as any).masterWalletData = {
          blockchain: 'ETHEREUM',
          accountKey: keyWithPriv,
        };
        const multiSigPayload: MultiSigPayload = {
          walletAddress: '0xbcbc740cbeb5a6e6fcea548725e82b10b6edd9e3',
          toAddress: '0x6732c278C58FC90542cce498981844A073D693d7',
          value: BNConverter.hexStringToBN('0x0'),
          walletNonce: BNConverter.hexStringToBN('0x0'),
          hexData: '0xc801bf9b000000000000000000000000000000000000000000000000000000000000006400000000000000000000000026064a2e2b568d9a6d01b93d039d1da9cf2a58cd',
        };
        const expectedSignature = '0x'
          + '011bb0cfe4641dbba9269e681d710183a99cc1a7b0c341e40324425fc78b8936' // r
          + '41db2742192de9f405769abe8d856f7a7232c6f96fd7c4c20938c39ac9e787a0' // s
          + '1b'; // v
        expect((wallet as any).signPayload(multiSigPayload, password)).toEqual(expectedSignature);
      });
    });
  });

  describe('MasterWallet', () => {
    let wallet: MasterWallet;
    beforeAll(() => {
      wallet = new MasterWallet(
        null,
        {
          blockchain: 'ETHEREUM',
        } as any,
        keychain,
      );
    });

    describe('#verifyPassphrase()', () => {
      beforeAll(() => {
        (wallet as any).masterWalletData = {
          blockchain: 'ETHEREUM',
          accountKey: keyWithPriv,
        };
      });

      it('should return true when passphrase is valid', () => {
        const isValid = wallet.verifyPassphrase(password);
        expect(isValid).toEqual(true);
      });

      it('should return false when passphrase is invalid', () => {
        const isValid = wallet.verifyPassphrase(`invalid${password}`);
        expect(isValid).toEqual(false);
      });
    });

    describe('#verifyEncryptedPassphrase()', () => {
      beforeAll(() => {
        (wallet as any).masterWalletData = {
          blockchain: 'ETHEREUM',
          accountKey: keyWithPriv,
          encryptionKey: '867f70cf1ade02cff3752599a3a53dc4af34c7a669815ae5d513554e1c8cf252',
        };
      });

      it('should return true when passphrase is valid', () => {
        const isValid = wallet.verifyEncryptedPassphrase(encryptedPassphrase);
        expect(isValid).toEqual(true);
      });

      it('should return false when passphrase is invalid', () => {
        let isValid;
        try {
          isValid = wallet.verifyEncryptedPassphrase(`invalid${encryptedPassphrase}`);
        } catch (e) {
          expect(isValid).toEqual(undefined);
        }
      });
    });

    describe('#createUserWallet()', () => {
      it('should be able to create user wallet when salt is not given', async () => {
        const masterWalletResponse = {
          id: 'b338377ef0fb54c3a3110a37f67caef1',
          name: 'test-wallet',
          address: '0xbcbc740cbeb5a6e6fcea548725e82b10b6edd9e3',
          blockchain: 'ETHEREUM',
          status: 'INACTIVE',
          encryptionKey: '83b80190a2c2322d69c7b498d259243ea8cd46b40b411f81614adb2685c2ba78',
          backupKey: {
            address: '0xb0a6d9b21f45acc64365cdbb523405411c3b050f',
            pub: '0x4d5cfc604d29a96298c1851899e9ca3d2a6337ead83bb3e9cfd822dc81ac87574f0b7aa725df739e0770b677db12bf9e19c46b7b55fd1ef75aaabe2a054e50a0',
            keyFile: '{"iv":"htWaAhMGgfR1ehOdvdmmOw==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"rdvBsRRtKXg=","ct":"vXtrIIxU+iPiZ4gOXOht/EsWRJSljW6WLCWn10eFysvLRwUrFLzB9Jq25XuW3+OBwT9wJttcdWQyfJjruG+vKCCKWWhLmeoTLQw="}',
          },
          accountKey: {
            address: '0x86e8779d5554f0c1863764c601a1fc0025f5e56f',
            pub: '0xd37016171e6af94894d4b86434a210d19da591a175e9149b7f57f90d7820006bbf82a0393490de07cc868e863bd2c1556c799d73174fe1b91eb3428ed914b24d',
            keyFile: '{"iv":"LiViH3kLTNvmq0osD00WLw==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"mvHVy1IfAgw=","ct":"+njIB3NPHrjIKupdVeq4xIAazhgpWYtda8vLJ1HcKG5+kvZQJFwfl7/QBQZKpMnPnnfK6khM1dSUtrh5sJ+knABnsoU2ZoBXfh0="}',
          },
          createdAt: '1587391943874',
          updatedAt: '1587391943874',
        };

        const nonceResponse = {
          nonce: '0x0',
        };
        const userWalletResponse = {
          address: '0xc6d286f3e6b43dd410bd1a79e224adb27d3a83d2',
          blockchain: 'KLAYTN',
          created_at: '1583837537277',
          id: '39e16b3eab64f4d595a6cd6ca4035703',
          name: 'klaytn_test',
          status: 'ACTIVE',
          updated_at: '1583837537277',
        };
        nock(baseUrl)
          .get('/api/v1/wallets/b338377ef0fb54c3a3110a37f67caef1')
          .reply(200, masterWalletResponse);
        nock(baseUrl)
          .get('/api/v1/wallets/b338377ef0fb54c3a3110a37f67caef1/nonce')
          .reply(200, nonceResponse);
        nock(baseUrl)
          .post('/api/v1/wallets/b338377ef0fb54c3a3110a37f67caef1/user-wallets')
          .reply(200, userWalletResponse);

        const sdk = new SDK({
          accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImhhZWNoaUBoYWVjaGkuaW8iLCJpZCI6IjQ5ODAzZmJmMGEyYTJjM2FiM2EwYWJhOGI5OGRiYjJhIiwidHlwZSI6IlNIT1JUIiwiaXNzIjoid2FsbGV0LWRldiIsImlhdCI6MTU4NTcxODU0NiwiZXhwIjoxNTg2MDc4NTQ2fQ.Ixk0uUUIMnZLVyDA9BRPy_zyqoqtza7m-cNalbhVqlzv2ZDhh4FvPI6NOOHo_rlJYgd9iXkkoZGfJqD5DMfNng',
          secret: 'secret',
          url: 'http://localhost:8080/api/v1',
        });
        wallet = await sdk.wallets.getMasterWallet('b338377ef0fb54c3a3110a37f67caef1');
        const userWallet = await wallet.createUserWallet('klaytn_test', password);
        expect(userWallet.getAddress()).toEqual('0xc6d286f3e6b43dd410bd1a79e224adb27d3a83d2');
        expect(userWallet.getData().status).toEqual(WalletStatus.Active);
      });
    });
  });
});
