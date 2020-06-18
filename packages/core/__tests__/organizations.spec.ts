import nock from 'nock';
import { SDK } from '../src';
import { Organization } from '../src/organizations';
import { Account, Role } from '../src/accounts';
import { Secret } from '../src/types';

const baseUrl = 'http://localhost:8080';

describe('Organizations', () => {
  describe('#getOrganization()', () => {
    it('success return an organization', async () => {
      const response = {
        id: '575a431dc73615a9e65648180bbd4fbb',
        name: 'haechi-labs',
        secret: '119Es7Czo6yM4cYfS8IxTRhLfuDwDmN4rl0RK3ivuGI=',
        henesis_eth_key: {
          address: '0x4ef3ba60c8710f45371835cddafabf33daa83e1d',
          pub:
            '0x31bd93d049fefed19b640c8069046c223126505754b9a57f5df43a89b104d92c8d4be4f51a6b5bb08a3ec6c2ff022e8ff018bad52ee05fa81b4eeae16a0e2db1',
        },
        henesis_klay_key: {
          address: '0xc3722901042c2580bfceda3ee10da7de584d79e8',
          pub:
            '0x00867c08c6d1b1335c22d2bb79fa1bff14c6485c33431d773f55325d683c8b9d243c783dc3b35cef99ea0b9181c33981586f1461b2b6d5458441a485e0c038350a',
        },
      };
      const expectedReturn = {
        id: '575a431dc73615a9e65648180bbd4fbb',
        name: 'haechi-labs',
        secret: '119Es7Czo6yM4cYfS8IxTRhLfuDwDmN4rl0RK3ivuGI=',
        henesisEthKey: {
          address: '0x4ef3ba60c8710f45371835cddafabf33daa83e1d',
          pub:
            '0x31bd93d049fefed19b640c8069046c223126505754b9a57f5df43a89b104d92c8d4be4f51a6b5bb08a3ec6c2ff022e8ff018bad52ee05fa81b4eeae16a0e2db1',
        },
        henesisKlayKey: {
          address: '0xc3722901042c2580bfceda3ee10da7de584d79e8',
          pub:
            '0x00867c08c6d1b1335c22d2bb79fa1bff14c6485c33431d773f55325d683c8b9d243c783dc3b35cef99ea0b9181c33981586f1461b2b6d5458441a485e0c038350a',
        },
      };
      nock(baseUrl)
        .get('/api/v1/organizations/me')
        .reply(200, response);
      const sdk = new SDK({
        accessToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImhhZWNoaUBoYWVjaGkuaW8iLCJpZCI6IjQ5ODAzZmJmMGEyYTJjM2FiM2EwYWJhOGI5OGRiYjJhIiwidHlwZSI6IlNIT1JUIiwiaXNzIjoid2FsbGV0LWRldiIsImlhdCI6MTU4NTcxODU0NiwiZXhwIjoxNTg2MDc4NTQ2fQ.Ixk0uUUIMnZLVyDA9BRPy_zyqoqtza7m-cNalbhVqlzv2ZDhh4FvPI6NOOHo_rlJYgd9iXkkoZGfJqD5DMfNng',
        secret: 'secret',
        url: 'http://localhost:8080/api/v1',
      });
      const organization: Organization = await sdk.organizations.getOrganization();
      expect(organization).toEqual(expectedReturn);
    });
  });
  describe('#getAccounts()', () => {
    it('success get accounts from an organization', async () => {
      const response = [
        {
          email: 'haechi@haechi.io',
          roles: ['HAECHI'],
          id: '49803fbf0a2a2c3ab3a0aba8b98dbb2a',
          first_name: 'dev',
          last_name: 'haechi',
        },
      ];
      const expectedReturn = [
        {
          email: 'haechi@haechi.io',
          roles: ['HAECHI'],
          id: '49803fbf0a2a2c3ab3a0aba8b98dbb2a',
          firstName: 'dev',
          lastName: 'haechi',
        },
      ];
      nock(baseUrl)
        .get('/api/v1/organizations/accounts')
        .reply(200, response);
      const sdk = new SDK({
        accessToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImhhZWNoaUBoYWVjaGkuaW8iLCJpZCI6IjQ5ODAzZmJmMGEyYTJjM2FiM2EwYWJhOGI5OGRiYjJhIiwidHlwZSI6IlNIT1JUIiwiaXNzIjoid2FsbGV0LWRldiIsImlhdCI6MTU4NTcxODU0NiwiZXhwIjoxNTg2MDc4NTQ2fQ.Ixk0uUUIMnZLVyDA9BRPy_zyqoqtza7m-cNalbhVqlzv2ZDhh4FvPI6NOOHo_rlJYgd9iXkkoZGfJqD5DMfNng',
        secret: 'secret',
        url: 'http://localhost:8080/api/v1',
      });
      const accounts: Account[] = await sdk.organizations.getAccounts();
      expect(accounts).toEqual(expectedReturn);
    });
  });

  describe('#createSecret()', () => {
    it('success create secret', async () => {
      const response = {
        secret: '111',
      };
      nock(baseUrl)
        .post('/api/v1/organizations/secret')
        .reply(200, response);
      const sdk = new SDK({
        accessToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImhhZWNoaUBoYWVjaGkuaW8iLCJpZCI6IjQ5ODAzZmJmMGEyYTJjM2FiM2EwYWJhOGI5OGRiYjJhIiwidHlwZSI6IlNIT1JUIiwiaXNzIjoid2FsbGV0LWRldiIsImlhdCI6MTU4NTcxODU0NiwiZXhwIjoxNTg2MDc4NTQ2fQ.Ixk0uUUIMnZLVyDA9BRPy_zyqoqtza7m-cNalbhVqlzv2ZDhh4FvPI6NOOHo_rlJYgd9iXkkoZGfJqD5DMfNng',
        secret: 'secret',
        url: 'http://localhost:8080/api/v1',
      });
      const secret: Secret = await sdk.organizations.createSecret();
      expect(secret).toEqual(response);
    });
  });
  describe('#changeAccountRole()', () => {
    it('success change account role', async () => {
      const accountId = '49803fbf0a2a2c3ab3a0aba8b98dbb2a';
      const response = {
        id: '49803fbf0a2a2c3ab3a0aba8b98dbb2a',
        email: 'haechi@haechi.io',
        firstName: 'dev',
        lastName: 'haechi',
        organizationId: '575a431dc73615a9e65648180bbd4fbb',
        accessToken: 'token',
        roles: [Role.VIEWER],
      };
      nock(baseUrl)
        .patch(`/api/v1/organizations/accounts/${accountId}`)
        .reply(200, response);
      const sdk = new SDK({
        accessToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImhhZWNoaUBoYWVjaGkuaW8iLCJpZCI6IjQ5ODAzZmJmMGEyYTJjM2FiM2EwYWJhOGI5OGRiYjJhIiwidHlwZSI6IlNIT1JUIiwiaXNzIjoid2FsbGV0LWRldiIsImlhdCI6MTU4NTcxODU0NiwiZXhwIjoxNTg2MDc4NTQ2fQ.Ixk0uUUIMnZLVyDA9BRPy_zyqoqtza7m-cNalbhVqlzv2ZDhh4FvPI6NOOHo_rlJYgd9iXkkoZGfJqD5DMfNng',
        secret: 'secret',
        url: 'http://localhost:8080/api/v1',
      });
      const account: Account = await sdk.organizations.changeAccountRole(
        accountId,
        Role.VIEWER,
      );
      expect(account).toEqual(response);
    });
  });
});
