import nock from 'nock';
import { SDK } from '../src';
import { BlockchainType } from '../src/blockchain';
import { PaginationOptions } from '../src/types';

const baseUrl = 'http://localhost:8080';
describe('Transactions', () => {
  describe('#getTransaction()', () => {
    it('should return valid transaction', async () => {
      const blockchain: BlockchainType = BlockchainType.Ethereum;
      const transactionId: string = 'e4a1e5f66a32dc50b66fb3229aed0202';
      const response = {
        id: 'e4a1e5f66a32dc50b66fb3229aed0202',
        blockchain: 'ETHEREUM',
        sender: '0x4ef3ba60c8710f45371835cddafabf33daa83e1d',
        hash: '0xc36e5acf20f5c09ee4db9608d6e5820db80dbd13e8c0232f7bb503113f365a56',
        error: null,
        status: 'CONFIRMED',
        keyId: '52e779750bb1330d2f23439c6da821ee',
        signedMultiSigPayload: {
          signature: '0xda4828aed7c4f78a63abf16c4722360e665bd9bf029e16f029e4ebd422cc286a0417f44b24ca77f2ec9303fa2d6abfe424dedf42f3dbdcc30eb3a909c0347aa21c',
          payload: {
            value: '0x0',
            walletAddress: '0xa3aaaecd815703e60f505fcb10d2d38bf769c305',
            toAddress: '0x20f3933c0d62609b5538b457e6006c25e2d5670e',
            walletNonce: '0x71bd58e13a6a128d0c76c02c04a9b1de964e99bab70a426366ebb9cedc857970',
            hexData: '0xa9059cbb000000000000000000000000eca3bf7b4344114f5fe6084e7c08d49bcca7c907000000000000000000000000000000000000000000000000016345785d8a0000',
          },
        },
        rawTransaction: {
          nonce: '0x58',
          to: '0xa3aaaecd815703e60f505fcb10d2d38bf769c305',
          value: '0x0',
          data: '0x4867ba1500000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000a3aaaecd815703e60f505fcb10d2d38bf769c30500000000000000000000000020f3933c0d62609b5538b457e6006c25e2d5670e000000000000000000000000000000000000000000000000000000000000000071bd58e13a6a128d0c76c02c04a9b1de964e99bab70a426366ebb9cedc85797000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000041da4828aed7c4f78a63abf16c4722360e665bd9bf029e16f029e4ebd422cc286a0417f44b24ca77f2ec9303fa2d6abfe424dedf42f3dbdcc30eb3a909c0347aa21c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044a9059cbb000000000000000000000000eca3bf7b4344114f5fe6084e7c08d49bcca7c907000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000',
          gasPrice: '0x2540be400',
          gasLimit: '0x419ce0',
        },
      };

      nock(baseUrl)
        .get(`/api/v1/transactions/${transactionId}?blockchain=${blockchain}`)
        .reply(200, response);

      const sdk = new SDK(
        {
          accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQwOGMyMWQ0OGM4MGNiMDNkM2U3NWMwMTUxMTRiZTkzIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4Mzc5OTY5MSwiZXhwIjoxNTg0MTU5NjkxfQ.RoGvobumJV0iBmN-0j23pgl8QlC5I02rfOVYQxL3HlYcxXRn8IUfghfQt-MvEoHG6hgIVfqzhfdLFsQqP_NgmQ',
          secret: 'secret',
          url: 'http://localhost:8080/api/v1',
        },
      );

      const transaction = await sdk.transactions.getTransaction(blockchain, transactionId);
      expect(transaction).toEqual(response);
    });
  });

  describe('#getTransactions()', () => {
    it('should return valid transactions', async () => {
      const blockchain: BlockchainType = BlockchainType.Ethereum;
      const paginationOptions: PaginationOptions = {
        page: 0,
        size: 10,
      };
      const response = {
        pagination: {
          nextUrl: 'http://localhost:8080/api/v1/transactions?blockchain=ETHEREUM?page=1?size=10',
          previousUrl: null,
          totalCount: 1,
        },
        results: [
          {
            id: 'e4a1e5f66a32dc50b66fb3229aed0202',
            blockchain: 'ETHEREUM',
            sender: '0x4ef3ba60c8710f45371835cddafabf33daa83e1d',
            hash: '0xc36e5acf20f5c09ee4db9608d6e5820db80dbd13e8c0232f7bb503113f365a56',
            error: null,
            status: 'CONFIRMED',
            keyId: '52e779750bb1330d2f23439c6da821ee',
            signedMultiSigPayload: {
              signature: '0xda4828aed7c4f78a63abf16c4722360e665bd9bf029e16f029e4ebd422cc286a0417f44b24ca77f2ec9303fa2d6abfe424dedf42f3dbdcc30eb3a909c0347aa21c',
              payload: {
                value: '0x0',
                walletAddress: '0xa3aaaecd815703e60f505fcb10d2d38bf769c305',
                toAddress: '0x20f3933c0d62609b5538b457e6006c25e2d5670e',
                walletNonce: '0x71bd58e13a6a128d0c76c02c04a9b1de964e99bab70a426366ebb9cedc857970',
                hexData: '0xa9059cbb000000000000000000000000eca3bf7b4344114f5fe6084e7c08d49bcca7c907000000000000000000000000000000000000000000000000016345785d8a0000',
              },
            },
            rawTransaction: {
              nonce: '0x58',
              to: '0xa3aaaecd815703e60f505fcb10d2d38bf769c305',
              value: '0x0',
              data: '0x4867ba1500000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000a3aaaecd815703e60f505fcb10d2d38bf769c30500000000000000000000000020f3933c0d62609b5538b457e6006c25e2d5670e000000000000000000000000000000000000000000000000000000000000000071bd58e13a6a128d0c76c02c04a9b1de964e99bab70a426366ebb9cedc85797000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000041da4828aed7c4f78a63abf16c4722360e665bd9bf029e16f029e4ebd422cc286a0417f44b24ca77f2ec9303fa2d6abfe424dedf42f3dbdcc30eb3a909c0347aa21c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044a9059cbb000000000000000000000000eca3bf7b4344114f5fe6084e7c08d49bcca7c907000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000',
              gasPrice: '0x2540be400',
              gasLimit: '0x419ce0',
            },
          },
        ],
      };

      nock(baseUrl)
        .get(`/api/v1/transactions?size=${paginationOptions.size}&blockchain=${blockchain}`)
        .reply(200, response);

      const sdk = new SDK(
        {
          accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQwOGMyMWQ0OGM4MGNiMDNkM2U3NWMwMTUxMTRiZTkzIiwiaXNzIjoidHhtYW5hZ2VyLWRldiIsImlhdCI6MTU4Mzc5OTY5MSwiZXhwIjoxNTg0MTU5NjkxfQ.RoGvobumJV0iBmN-0j23pgl8QlC5I02rfOVYQxL3HlYcxXRn8IUfghfQt-MvEoHG6hgIVfqzhfdLFsQqP_NgmQ',
          secret: 'secret',
          url: 'http://localhost:8080/api/v1',
        },
      );

      const transactionsWithPagination = await sdk.transactions.getTransactions(blockchain, paginationOptions);
      expect(transactionsWithPagination).toEqual(response);
    });
  });
});
