import BN from 'bn.js';
import { Client } from './sdk';
import {
  Balance, Secret, Token, Key,
} from './types';

import { Account } from './accounts';
import { Blockchain } from "./blockchain";

export interface Organization {
  accessToken: string;
  henesisEthKey: Key;
  henesisKlayKey: Key;
  id: string;
  name: string;
  secret: string;
}

export class Organizations {
  private readonly client: Client;

  private readonly baseUrl = '/organizations';

  private readonly DEFAULT_TOKEN_EXPIRED_TIME = 3600;

  constructor(client: Client) {
    this.client = client;
  }

  public async getOrganizationBalance(blockchain: Blockchain): Promise<Balance> {
    const balance = await this.client.get(`${this.baseUrl}/balance?blockchain=${blockchain}`);
    balance.amount = new BN(`${balance.amount}`);
    return balance;
  }

  public async getOrganization(): Promise<Organization> {
    return await this.client.get<Organization>(`${this.baseUrl}/me`);
  }

  public async getAccounts(): Promise<Account[]> {
    return await this.client.get<Account[]>(`${this.baseUrl}/accounts`);
  }

  public async createSecret(email: string, password: string): Promise<Secret> {
    return this.client.post<Secret>(`${this.baseUrl}/secret`, { email, password });
  }

  public async createAccessToken(expiresIn?: number): Promise<Token> {
    const requestExpiresIn = expiresIn || this.DEFAULT_TOKEN_EXPIRED_TIME;
    return this.client.post<Token>(`${this.baseUrl}/token`, { expiresIn: requestExpiresIn });
  }
  // todo public async changeAccountRole()
}
