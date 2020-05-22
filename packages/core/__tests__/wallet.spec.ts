import nock from 'nock';
import BN from 'bn.js';
import { SDK } from '../src';
import { EthereumKeychains } from '../src/keychains';
import { BNConverter } from '../src/utils';
import { MockEthLikeWallet } from '../__mocks__/wallet.mock';
import {
  EthLikeWallet,
  MasterWallet,
  Transaction,
  WalletStatus,
} from '../src/wallet';
import { MultiSigPayload, SignedMultiSigPayload } from '../src/transactions';
import { HttpClient } from '../src/httpClient';
import { BlockchainType } from '../src/blockchain';
import { Env } from '../src/sdk';

const baseUrl = 'http://localhost:8080';
describe('Wallet', () => {
  const password = 'password';
  const encryptedPassphrase = 'MWNmZWVjNTFhNzFlMTdhMQ==';
  const keyWithPriv = {
    address: '0xb0A6d9b21F45aCC64365CDBb523405411c3b050F',
    pub:
      '0x4d5cfc604d29a96298c1851899e9ca3d2a6337ead83bb3e9cfd822dc81ac87574f0b7aa725df739e0770b677db12bf9e19c46b7b55fd1ef75aaabe2a054e50a0',
    priv: '0xf276c114c14b6ac782a2de88d3d1a0157a11cf805c3d73bd4ae4fe54751da2ff',
    keyFile:
      '{"iv":"htWaAhMGgfR1ehOdvdmmOw==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"rdvBsRRtKXg=","ct":"vXtrIIxU+iPiZ4gOXOht/EsWRJSljW6WLCWn10eFysvLRwUrFLzB9Jq25XuW3+OBwT9wJttcdWQyfJjruG+vKCCKWWhLmeoTLQw="}',
  };
  let keychain: EthereumKeychains;

  beforeAll(() => {
    keychain = new EthereumKeychains();
  });

  describe('EthLikeWallet', () => {
    const client = new HttpClient({
      accessToken: 'TemporaryToken',
      secret: 'WdiZiGKU3TPvRHRAprQ1ScBV3cNBd6b8QDmFlhSxM8k=',
      env: Env.Local,
    }) as any;

    let wallet: EthLikeWallet;
    beforeEach(() => {
      wallet = new MockEthLikeWallet(
        client,
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
          hexData:
            '0xc801bf9b000000000000000000000000000000000000000000000000000000000000006400000000000000000000000026064a2e2b568d9a6d01b93d039d1da9cf2a58cd',
        };
        const expectedSignature =
          '0x' +
          '011bb0cfe4641dbba9269e681d710183a99cc1a7b0c341e40324425fc78b8936' + // r
          '41db2742192de9f405769abe8d856f7a7232c6f96fd7c4c20938c39ac9e787a0' + // s
          '1b'; // v
        expect((wallet as any).signPayload(multiSigPayload, password)).toEqual(
          expectedSignature,
        );
      });
    });

    describe('Transaction', () => {
      const blockchain: BlockchainType = BlockchainType.Ethereum;
      const signedMultiSig: SignedMultiSigPayload = {
        signature:
          '0x50fc48b8644bf9ae0548b3da40ecdac1a38d118ddb5effa0d56efd3e666143b83339e806e8f947f37070f5f19b0f9e1d6e09732b46ae8f8cca42b0439fc1b43c1c',
        multiSigPayload: {
          value: new BN(0),
          walletAddress: '0x763de619d35763a7628a7c68b5f06f19ec4e63e0',
          toAddress: '0x763de619d35763a7628a7c68b5f06f19ec4e63e0',
          walletNonce: new BN(0),
          hexData:
            '0x9cbaca3b0000000000000000000000008be6d4f20abfdf82836ea0119c3aa34427ff79840000000000000000000000000000000000000000000000000000000000302e31',
        },
      };
      const walletId: string = 'cae4f6e4a393b7e7fe270044a2896d40';
      const otpCode: string = '000000';
      const gasPrice: BN = new BN(0);
      const gasLimit: BN = new BN(0);
      const accountId: string = '49803fbf0a2a2c3ab3a0aba8b98dbb2a';

      describe('#sendTransaction()', () => {
        it('should be called normally', async () => {
          const sendTransactionResponse: Transaction = {
            id: '7b7404851d3cc06135b147612b0a1d02',
            blockchain,
            walletId,
            accountId,
            hash:
              '0xff2526c36b171ae02d0244bf00750a40f44b4a922d5684751ca88a329d837094',
            status: 'REQUESTED',
          };

          nock(baseUrl)
            .post('/api/v1/wallets/transactions')
            .reply(200, sendTransactionResponse);

          const sendTx = await (wallet as any).sendTransaction(
            blockchain,
            signedMultiSig,
            walletId,
            otpCode,
            gasPrice,
            gasLimit,
          );
          expect(sendTx).toEqual(sendTransactionResponse);
          expect(sendTx.walletId).toEqual(walletId);
          expect(sendTx.blockchain).toEqual(blockchain);
        });
      });

      describe('#sendBatchTransaction()', () => {
        it('should be called normally', async () => {
          const batchSignedMultiSig: SignedMultiSigPayload[] = [
            {
              signature:
                '0xda4828aed7c4f78a63abf16c4722360e665bd9bf029e16f029e4ebd422cc286a0417f44b24ca77f2ec9303fa2d6abfe424dedf42f3dbdcc30eb3a909c0347aa21c',
              multiSigPayload: {
                value: new BN(0),
                walletAddress: '0xa3aaaecd815703e60f505fcb10d2d38bf769c305',
                toAddress: '0x20f3933c0d62609b5538b457e6006c25e2d5670e',
                walletNonce: new BN(0),
                hexData:
                  '0xa9059cbb000000000000000000000000eca3bf7b4344114f5fe6084e7c08d49bcca7c907000000000000000000000000000000000000000000000000016345785d8a0000',
              },
            },
            {
              signature:
                '0xda4828aed7c4f78a63abf16c4722360e665bd9bf029e16f029e4ebd422cc286a0417f44b24ca77f2ec9303fa2d6abfe424dedf42f3dbdcc30eb3a909c0347aa21c',
              multiSigPayload: {
                value: new BN(0),
                walletAddress: '0xb1d58c6b60a147558573f6a53748b7ab6c62b6e7',
                toAddress: '0x20f3933c0d62609b5538b457e6006c25e2d5670e',
                walletNonce: new BN(0),
                hexData:
                  '0xa9059cbb000000000000000000000000eca3bf7b4344114f5fe6084e7c08d49bcca7c907000000000000000000000000000000000000000000000000016345785d8a0000',
              },
            },
            {
              signature:
                '0xda4828aed7c4f78a63abf16c4722360e665bd9bf029e16f029e4ebd422cc286a0417f44b24ca77f2ec9303fa2d6abfe424dedf42f3dbdcc30eb3a909c0347aa21c',
              multiSigPayload: {
                value: new BN(0),
                walletAddress: '0xec797359f9f0734aecd27fd729b0598f029b258f',
                toAddress: '0x20f3933c0d62609b5538b457e6006c25e2d5670e',
                walletNonce: new BN(0),
                hexData:
                  '0xa9059cbb000000000000000000000000eca3bf7b4344114f5fe6084e7c08d49bcca7c907000000000000000000000000000000000000000000000000016345785d8a0000',
              },
            },
          ];
          const sendBatchTransactionResponse: Transaction[] = [
            {
              id: 'e4a1e5f66a32dc50b66fb3229aed0202',
              blockchain: BlockchainType.Ethereum,
              walletId,
              accountId: '49803fbf0a2a2c3ab3a0aba8b98dbb2a',
              hash:
                '0xc36e5acf20f5c09ee4db9608d6e5820db80dbd13e8c0232f7bb503113f365a56',
              status: WalletStatus.Active,
            },
            {
              id: 'e4a1e5f66a32dc50b66fb3229aed0202',
              blockchain: BlockchainType.Ethereum,
              walletId,
              accountId: '49803fbf0a2a2c3ab3a0aba8b98dbb2a',
              hash:
                '0xc36e5acf20f5c09ee4db9608d6e5820db80dbd13e8c0232f7bb503113f365a56',
              status: WalletStatus.Inactive,
            },
            {
              id: 'e4a1e5f66a32dc50b66fb3229aed0202',
              blockchain: BlockchainType.Ethereum,
              walletId,
              accountId: '49803fbf0a2a2c3ab3a0aba8b98dbb2a',
              hash:
                '0xc36e5acf20f5c09ee4db9608d6e5820db80dbd13e8c0232f7bb503113f365a56',
              status: WalletStatus.Active,
            },
          ];

          nock(baseUrl)
            .post('/api/v1/wallets/batch-transactions')
            .reply(200, sendBatchTransactionResponse);

          const sendBatchTx = await (wallet as any).sendBatchTransaction(
            blockchain,
            batchSignedMultiSig,
            walletId,
            otpCode,
            gasPrice,
            gasLimit,
          );
          expect(sendBatchTx).toEqual(sendBatchTransactionResponse);
        });
      });

      describe('#replaceTransaction()', () => {
        it('should be called normally', async () => {
          const transactionIdPayload: string =
            'e4a1e5f66a32dc50b66fb3229aed0202';
          const otpCodePayload: string = '000000';

          const replaceTransactionResponse: Transaction = {
            id: '2c08cf4beb195c582535d197aa40c498',
            blockchain: BlockchainType.Ethereum,
            walletId: '39e16b3eab64f4d595a6cd6ca4035703',
            accountId: '49803fbf0a2a2c3ab3a0aba8b98dbb2a',
            hash:
              '0xc36e5acf20f5c09ee4db9608d6e5820db80dbd13e8c0232f7bb503113f365a56',
            status: WalletStatus.Active,
          };

          nock(baseUrl)
            .post('/api/v1/wallets/transactions')
            .reply(200, replaceTransactionResponse);

          const replaceTx = await wallet.replaceTransaction(
            transactionIdPayload,
            otpCodePayload,
          );
          expect(replaceTx).toEqual(replaceTransactionResponse);
        });
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

      it('should return true when passphrase is valid', async () => {
        const isValid = await wallet.verifyPassphrase(password);
        expect(isValid).toEqual(true);
      });

      it('should return false when passphrase is invalid', async () => {
        const isValid = await wallet.verifyPassphrase(`invalid${password}`);
        expect(isValid).toEqual(false);
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
          encryptionKey:
            '83b80190a2c2322d69c7b498d259243ea8cd46b40b411f81614adb2685c2ba78',
          backupKey: {
            address: '0xb0a6d9b21f45acc64365cdbb523405411c3b050f',
            pub:
              '0x4d5cfc604d29a96298c1851899e9ca3d2a6337ead83bb3e9cfd822dc81ac87574f0b7aa725df739e0770b677db12bf9e19c46b7b55fd1ef75aaabe2a054e50a0',
            keyFile:
              '{"iv":"htWaAhMGgfR1ehOdvdmmOw==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"rdvBsRRtKXg=","ct":"vXtrIIxU+iPiZ4gOXOht/EsWRJSljW6WLCWn10eFysvLRwUrFLzB9Jq25XuW3+OBwT9wJttcdWQyfJjruG+vKCCKWWhLmeoTLQw="}',
          },
          accountKey: {
            address: '0x86e8779d5554f0c1863764c601a1fc0025f5e56f',
            pub:
              '0xd37016171e6af94894d4b86434a210d19da591a175e9149b7f57f90d7820006bbf82a0393490de07cc868e863bd2c1556c799d73174fe1b91eb3428ed914b24d',
            keyFile:
              '{"iv":"LiViH3kLTNvmq0osD00WLw==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"mvHVy1IfAgw=","ct":"+njIB3NPHrjIKupdVeq4xIAazhgpWYtda8vLJ1HcKG5+kvZQJFwfl7/QBQZKpMnPnnfK6khM1dSUtrh5sJ+knABnsoU2ZoBXfh0="}',
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
          accessToken:
            'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImhhZWNoaUBoYWVjaGkuaW8iLCJpZCI6IjQ5ODAzZmJmMGEyYTJjM2FiM2EwYWJhOGI5OGRiYjJhIiwidHlwZSI6IlNIT1JUIiwiaXNzIjoid2FsbGV0LWRldiIsImlhdCI6MTU4NTcxODU0NiwiZXhwIjoxNTg2MDc4NTQ2fQ.Ixk0uUUIMnZLVyDA9BRPy_zyqoqtza7m-cNalbhVqlzv2ZDhh4FvPI6NOOHo_rlJYgd9iXkkoZGfJqD5DMfNng',
          secret: 'secret',
          url: 'http://localhost:8080/api/v1',
        });
        wallet = await sdk.wallets.getMasterWallet(
          'b338377ef0fb54c3a3110a37f67caef1',
        );
        const userWallet = await wallet.createUserWallet(
          'klaytn_test',
          password,
        );
        expect(userWallet.getAddress()).toEqual(
          '0xc6d286f3e6b43dd410bd1a79e224adb27d3a83d2',
        );
        expect(userWallet.getData().status).toEqual(WalletStatus.Active);
      });
    });
  });
});
