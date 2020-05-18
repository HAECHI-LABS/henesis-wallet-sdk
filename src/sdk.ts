import { BlockchainType } from "./blockchain";
import { Accounts } from "./accounts";
import { Organizations } from "./organizations";
import { HttpClient } from "./httpClient";
import { KlayModule } from "./eth";
import { baseUrls } from "./url";

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

  private readonly modules = new Map<BlockchainType, any>();

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
    this.modules.set(
      BlockchainType.Klaytn, new KlayModule({
        env: env,
        client: this.client
      })
    );
    this.modules.set(
      BlockchainType.Klaytn, new KlayModule({
        env: env,
        client: this.client
      })
    );
  }


  public blockchain(blockchain: BlockchainType) {
    return this.modules.get(blockchain)
  }
}
