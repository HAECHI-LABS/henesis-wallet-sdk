import { Accounts } from './accounts';
import { HttpClient } from './httpClient';
import { Wallets } from './wallets';
import { EthereumKeychains, Keychains } from './keychains';
import { Events } from './events';
import { Organizations } from './organizations';
import { Gasusages } from './gasusages';
import { Transactions } from './transactions';

export enum Env {
  Local,
  Dev,
  Test,
  Prod
}

export interface SDKOptions {
  accessToken: string;
  secret: string;
  url?: string;
  env?: Env;
}


export interface Client {
  get<T = any>(url: string): Promise<T>;

  delete<T = any>(url: string): Promise<T>;

  options<T = any>(url: string): Promise<T>;

  post<T = any>(url: string, data?: any): Promise<T>;

  put<T = any>(url: string, data?: any): Promise<T>;

  patch<T = any>(url: string, data?: any): Promise<T>;
}

export class SDK {
  public readonly wallets: Wallets;

  public readonly accounts: Accounts;

  public readonly keychains: Keychains;

  public readonly events: Events;

  public readonly organizations: Organizations;

  public readonly gasusages: Gasusages;

  public readonly transactions: Transactions;

  private readonly client: Client;

  // todo: validation params;
  constructor(params: SDKOptions) {
    this.client = new HttpClient({
      secret: params.secret,
      accessToken: params.accessToken,
      url: params.url,
      env: params.env,
    }) as any;

    this.accounts = new Accounts(this.client);
    this.keychains = new EthereumKeychains();
    this.wallets = new Wallets(this.client, this.keychains);
    this.events = new Events(this.client);
    this.organizations = new Organizations(this.client);
    this.gasusages = new Gasusages(this.client);
    this.transactions = new Transactions(this.client);
  }
}
