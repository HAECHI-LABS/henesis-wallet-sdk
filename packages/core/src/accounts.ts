import { Client } from './sdk';
import { Key } from './keychain';

export interface Secret {
  secret: string;
}

export interface Token {
  accessToken: string;
}

export interface Account {
  id: string;
  email: string;
  name: string;
  organization: string;
  accessToken: string;
}

export interface AccountWithKey extends Account {
  henesisEthKey: Key;
  henesisKlayKey: Key;
}

export class Accounts {
  private readonly client: Client;

  private readonly baseUrl = '/accounts';

  constructor(client: Client) {
    this.client = client;
  }

  public get(): Promise<AccountWithKey> {
    return this.client
      .get<AccountWithKey>(`${this.baseUrl}/me`);
  }

  public login(email: string, password: string): Promise<Account> {
    return this.client
      .post<Account>(`${this.baseUrl}/login`, {
        email,
        password,
      });
  }

  public secret(email: string, password: string): Promise<Secret> {
    return this.client
      .post<Secret>(`${this.baseUrl}/secret`, {
        email,
        password,
      });
  }

  public token(expiresIn: number): Promise<Token> {
    return this.client
      .post<Token>(`${this.baseUrl}/token`, {
        expiresIn,
      });
  }
}
