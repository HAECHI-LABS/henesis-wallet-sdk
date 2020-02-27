import {Accounts} from "./accounts";
import {HttpClient} from "./httpClient";
import pjson from '../package.json';

export interface SDKOptions {
  accessToken: string;
  secret: string;
  env?: string;
}

export interface Client {
  get<T = any>(url: string): Promise<T>;

  delete<T = any>(url: string): Promise<T>;

  options<T = any>(url: string): Promise<T>;

  post<T = any>(url: string, data?: any): Promise<T>;

  put<T = any>(url: string, data?: any): Promise<T>;

  patch<T = any>(url: string, data?: any): Promise<T>;
}

export interface SDK {

}

export class SDK {
  private readonly sdkVersion: string;
  public readonly wallets: any;
  public readonly accounts: Accounts;
  private readonly client: Client;

  // todo: validation params;
  constructor(params: SDKOptions) {
    this.sdkVersion = pjson.version;
    this.client = new HttpClient({
      secret: params.secret,
      accessToken: params.accessToken,
      sdkVersion: this.sdkVersion,
    }) as any;

    this.accounts = new Accounts(this.client);
  }
}