import nock from 'nock';
import { SDK } from '../src';
import { BNConverter } from '../src/utils';

const baseUrl = 'http://localhost:8080';
describe('Events', () => {
  describe('#getCallEvents()', () => {
    it('should return array of events', async () => {
      const walletId = 'e6f6a6dd37d73ea0a506e6b669017d3f';
      const response = {
        pagination: {
          nextUrl:
            'http://localhost:8080/api/v1/transactions?blockchain=ETHEREUM?page=1?size=15',
          previousUrl: null,
          totalCount: 2,
        },
        results: [
          {
            createdAt: '1',
            status: '1',
            toAddress: '1',
            transactionHash: '1',
            confirmation: '0x0',
          },
          {
            createdAt: '2',
            status: '2',
            toAddress: '2',
            transactionHash: '2',
            confirmation: '0x1',
          },
        ],
      };

      nock(baseUrl)
        .get(`/api/v1/call-events?wallet_id=${walletId}`)
        .reply(200, response);

      const sdk = new SDK({
        accessToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImhhZWNoaUBoYWVjaGkuaW8iLCJpZCI6IjQ5ODAzZmJmMGEyYTJjM2FiM2EwYWJhOGI5OGRiYjJhIiwidHlwZSI6IlNIT1JUIiwiaXNzIjoid2FsbGV0LWRldiIsImlhdCI6MTU4NTcxODU0NiwiZXhwIjoxNTg2MDc4NTQ2fQ.Ixk0uUUIMnZLVyDA9BRPy_zyqoqtza7m-cNalbhVqlzv2ZDhh4FvPI6NOOHo_rlJYgd9iXkkoZGfJqD5DMfNng',
        secret: 'secret',
        url: 'http://localhost:8080/api/v1',
      });

      const eventsWithPagination = await sdk.events.getCallEvents({
        walletId: 'e6f6a6dd37d73ea0a506e6b669017d3f',
      });
      expect(eventsWithPagination.results.length).toEqual(2);
      eventsWithPagination.results.forEach((item, index) => {
        response.results[index].confirmation = BNConverter.hexStringToBN(
          response.results[index].confirmation,
        ) as any;
        expect(item).toEqual(response.results[index]);
      });
    });
  });
  describe('#getValueTransferEvents()', () => {
    it('should return array of events', async () => {
      const walletId = 'e6f6a6dd37d73ea0a506e6b669017d3f';
      const response = {
        pagination: {
          nextUrl:
            'http://localhost:8080/api/v1/transactions?blockchain=ETHEREUM?page=1?size=15',
          previousUrl: null,
          totalCount: 2,
        },
        results: [
          {
            createdAt: '1',
            status: '1',
            toAddress: '1',
            transactionHash: '1',
            amount: '0x2',
            coinSymbol: 'Hib',
            from: '0x21',
            to: '0x2333',
            transferType: 'WITHDRAWAL',
            walletId: 'id1',
            confirmation: '0x3',
          },
          {
            createdAt: '2',
            status: '2',
            toAddress: '2',
            transactionHash: '2',
            amount: '0x2',
            coinSymbol: 'Hib',
            from: '0x21',
            to: '0x2333',
            transferType: 'WITHDRAWAL',
            walletId: 'id1',
            confirmation: '0x3',
          },
        ],
      };

      nock(baseUrl)
        .get(`/api/v1/value-transfer-events?wallet_id=${walletId}`)
        .reply(200, response);

      const sdk = new SDK({
        accessToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImhhZWNoaUBoYWVjaGkuaW8iLCJpZCI6IjQ5ODAzZmJmMGEyYTJjM2FiM2EwYWJhOGI5OGRiYjJhIiwidHlwZSI6IlNIT1JUIiwiaXNzIjoid2FsbGV0LWRldiIsImlhdCI6MTU4NTcxODU0NiwiZXhwIjoxNTg2MDc4NTQ2fQ.Ixk0uUUIMnZLVyDA9BRPy_zyqoqtza7m-cNalbhVqlzv2ZDhh4FvPI6NOOHo_rlJYgd9iXkkoZGfJqD5DMfNng',
        secret: 'secret',
        url: 'http://localhost:8080/api/v1',
      });
      const eventsWithPagination = await sdk.events.getValueTransferEvents({
        walletId: 'e6f6a6dd37d73ea0a506e6b669017d3f',
      });
      expect(eventsWithPagination.results.length).toEqual(2);
      eventsWithPagination.results.forEach((item, index) => {
        response.results[index].amount = BNConverter.hexStringToBN(
          response.results[index].amount,
        ) as any;
        response.results[index].confirmation = BNConverter.hexStringToBN(
          response.results[index].confirmation,
        ) as any;
        expect(item).toEqual(response.results[index]);
      });
    });
  });
});
