import { Accounts } from "./accounts";
import { Organizations } from "./organizations";
import { HttpClient, Client, enhancedBlockchainClient } from "./httpClient";
import { EthModule, KlayModule } from "./eth";
import { FilModule } from "./fil";
import { baseUrls } from "./utils/url";
import { BtcModule } from "./btc";
import { BlockchainType } from "./blockchain";
import { WithdrawalApprovals } from "./withdrawalApprovals";
import { Billings } from "./billings";
import { Notices } from "./notices";
import { CoinListings } from "./coinListings";

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

export class SDK {
  public readonly accounts: Accounts;

  public readonly notices: Notices;

  public readonly billings: Billings;

  public readonly organizations: Organizations;

  public readonly coinListings: CoinListings;

  public readonly withdrawalApproval: WithdrawalApprovals;

  public readonly eth: EthModule;

  public readonly klay: KlayModule;

  public readonly fil: FilModule;

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
      env,
    }) as any;
    this.withdrawalApproval = new WithdrawalApprovals(this.client);
    this.accounts = new Accounts(this.client);
    this.notices = new Notices(this.client);
    this.billings = new Billings(this.client);
    this.organizations = new Organizations(this.client);
    this.coinListings = new CoinListings(this.client);
    this.klay = new KlayModule({
      env: env,
      client: enhancedBlockchainClient(this.client, BlockchainType.KLAYTN),
      blockchain: BlockchainType.KLAYTN,
    });
    this.eth = new EthModule({
      env: env,
      client: enhancedBlockchainClient(this.client, BlockchainType.ETHEREUM),
      blockchain: BlockchainType.ETHEREUM,
    });
    this.fil = new FilModule({
      env: env,
      client: enhancedBlockchainClient(this.client, BlockchainType.FILECOIN),
      blockchain: BlockchainType.FILECOIN,
    });
    this.btc = new BtcModule({
      env: env,
      client: enhancedBlockchainClient(this.client, BlockchainType.BITCOIN),
    });
  }
}
