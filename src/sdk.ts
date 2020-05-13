import { BlockchainType } from './blockchain';
import { Accounts } from "./accounts";
import { Organizations } from "./organizations";
import { HttpClient } from "./httpClient";

export const enum Env {
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
  public readonly accounts: Accounts;

  public readonly organizations: Organizations;

  private readonly client: Client;

  constructor(params: SDKOptions) {
    let env = Env.Prod;
    if (params.env !== undefined && params.env !== null) {
      env = params.env;
    }

    this.client = new HttpClient({
      secret: params.secret,
      accessToken: params.accessToken,
      url: params.url,
      env,
    }) as any;

    this.accounts = new Accounts(this.client);
    this.organizations = new Organizations(this.client);
  }

  public sdk(blockchain: BlockchainType) {

  }
}
