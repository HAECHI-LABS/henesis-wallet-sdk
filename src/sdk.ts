import { Accounts } from './accounts';
import { Organizations } from './organizations';
import { HttpClient } from './httpClient';
import { EthModule, KlayModule } from './eth';
import { baseUrls, makePrefixPathByBlockchainType } from './url';
import { BtcModule } from './btc';
import { BlockchainType } from './blockchain';

export const enum Env {
  Local,
  Dev,
  Test,
  Prod,
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

const enhancedBlockchainClient = (client: Client, blockchain: BlockchainType): Client => {
  const prefixPath = makePrefixPathByBlockchainType(blockchain);
  return {
    get<T = any>(url: string): Promise<T> {
      return client.get(`${url}${prefixPath}`);
    },
    delete<T = any>(url: string): Promise<T> {
      return client.delete(`${url}${prefixPath}`);
    },
    options<T = any>(url: string): Promise<T> {
      return client.delete(`${url}${prefixPath}`);
    },
    post<T = any>(url: string, data?: any): Promise<T> {
      return client.post(`${url}${prefixPath}`, data);
    },
    put<T = any>(url: string, data?: any): Promise<T> {
      return client.put(`${url}${prefixPath}`, data);
    },
    patch<T = any>(url: string, data?: any): Promise<T> {
      return client.patch(`${url}${prefixPath}`, data);
    },
  };
};

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
      client: enhancedBlockchainClient(this.client, BlockchainType.Klaytn)
    });
    this.eth = new EthModule({
      env: env,
      client: enhancedBlockchainClient(this.client, BlockchainType.Ethereum)
    });
    this.btc = new BtcModule({
      env: env,
      client: enhancedBlockchainClient(this.client, BlockchainType.BITCOIN)
    });
  }
}
