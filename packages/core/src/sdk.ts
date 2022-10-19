import { Accounts } from "./accounts";
import { Organizations } from "./organizations";
import {
  Client,
  enhancedBlockchainClient,
  enhancedPrefixClient,
  HttpClient,
} from "./httpClient";
import { BscModule, EthModule, KlayModule, PolygonModule } from "./eth";
import { FilModule } from "./fil";
import { baseUrls } from "./utils/url";
import { BtcModule } from "./btc";
import { BlockchainType } from "./blockchain";
import { WithdrawalApprovals } from "./withdrawalApprovals";
import { Billings } from "./billings";
import { Notices } from "./notices";
import { CoinListings } from "./coinListings";
import { LtcModule } from "./ltc";
import { BchModule } from "./bch";

export const enum Env {
  Local,
  Dev,
  Test,
  Prod,
  GardenTest,
}

export interface SDKOptions {
  accessToken: string;
  secret: string;
  url?: string;
  env?: Env;
  origin?: {
    forwardedFor: string;
    remoteAddress: string;
  };
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

  public readonly bsc: BscModule;

  public readonly polygon: PolygonModule;

  public readonly fil: FilModule;

  public readonly btc: BtcModule;

  public readonly ltc: LtcModule;

  public readonly bch: BchModule;

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
      origin: params.origin ?? { forwardedFor: "", remoteAddress: "" },
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
    this.bsc = new BscModule({
      env: env,
      client: enhancedBlockchainClient(
        this.client,
        BlockchainType.BINANCE_SMART_CHAIN
      ),
      blockchain: BlockchainType.BINANCE_SMART_CHAIN,
    });
    this.polygon = new PolygonModule({
      env: env,
      client: enhancedBlockchainClient(this.client, BlockchainType.POLYGON),
      blockchain: BlockchainType.POLYGON,
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
    this.ltc = new LtcModule({
      env: env,
      client: enhancedBlockchainClient(this.client, BlockchainType.LITECOIN),
    });
    this.bch = new BchModule({
      env: env,
      client: enhancedBlockchainClient(
        this.client,
        BlockchainType.BITCOIN_CASH
      ),
    });
  }
}
