import { Accounts } from "./accounts";
import { Organizations } from "./organizations";
import { HttpClient } from "./httpClient";
import { EthModule, KlayModule } from "./eth";
import { baseUrls } from "./url";
import { BtcModule } from "./btc";

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

  public readonly eth: EthModule;

  public readonly klay: KlayModule;

  public readonly btc: BtcModule;

  private readonly client: Client;

  constructor(params: SDKOptions) {
    let env = Env.Prod;
    if (params.env !== undefined && params.env !== null) {
      env = params.env;
    }

    let baseUrl = baseUrls.get(params.env);
    if (params.url !== null && params.url !== undefined) {
      baseUrl = params.url;
    }

    this.client = new HttpClient({
      secret: params.secret,
      accessToken: params.accessToken,
      url: baseUrl,
    }) as any;
    this.accounts = new Accounts(this.client);
    this.organizations = new Organizations(this.client);
    this.klay = new KlayModule({
      env: env,
      client: this.client
    });
    this.eth = new EthModule({
      env: env,
      client: this.client
    });
    this.btc = new BtcModule({
      env: env,
      client: this.client
    });
  }
}
