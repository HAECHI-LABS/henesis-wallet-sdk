import { Accounts } from "src/accounts";
import { Organizations } from "src/organizations";
import { HttpClient, Client, enhancedBlockchainClient } from "src/httpClient";
import { EthModule, KlayModule } from "@eth/index";
import { baseUrls } from "@utils/url";
import { BtcModule } from "@btc/index";
import { BlockchainType } from "src/blockchain";
import { WithdrawalApprovals } from "src/withdrawalApprovals";

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

  public readonly organizations: Organizations;

  public readonly withdrawalApproval: WithdrawalApprovals;

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
      env,
    }) as any;
    this.withdrawalApproval = new WithdrawalApprovals(this.client);
    this.accounts = new Accounts(this.client);
    this.organizations = new Organizations(this.client);
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
    this.btc = new BtcModule({
      env: env,
      client: enhancedBlockchainClient(this.client, BlockchainType.BITCOIN),
    });
  }
}
