import BN from 'bn.js';
import { Client } from './sdk';
import { Balance, Secret, Token, Key } from './types';

import { Account, Role } from './accounts';
import { BlockchainType } from './blockchain';
import { BNConverter } from './utils';

export interface Organization {
  henesisEthKey: Key;
  henesisKlayKey: Key;
  id: string;
  name: string;
  secret: string;
}

export class Organizations {
  private readonly client: Client;

  private readonly baseUrl = '/organizations';

  constructor(client: Client) {
    this.client = client;
  }

  public async getOrganizationBalance(
    blockchain: BlockchainType,
  ): Promise<Balance> {
    const balance = await this.client.get(
      `${this.baseUrl}/balance?blockchain=${blockchain}`,
    );
    balance.amount = BNConverter.hexStringToBN(balance.amount);
    return balance;
  }

  public async getOrganization(): Promise<Organization> {
    return await this.client.get<Organization>(`${this.baseUrl}/me`);
  }

  public async getAccounts(): Promise<Account[]> {
    return await this.client.get<Account[]>(`${this.baseUrl}/accounts`);
  }

  public async createSecret(): Promise<Secret> {
    return this.client.post<Secret>(`${this.baseUrl}/secret`);
  }

  public async changeAccountRole(
    accountId: string,
    role: Role,
    otpCode?: string,
  ): Promise<Account> {
    return this.client.patch<Account>(`${this.baseUrl}/accounts/${accountId}`, {
      role,
      otpCode,
    });
  }
}