import { Client } from "../httpClient";
import { Env } from "../sdk";
import { BlockchainType } from "../blockchain";
import { FilWallets } from "./wallets";
import { FilKeychains } from "./keychains";
import { FilFeeWallets } from "./feeWallets";
import { FilTransfers } from "./transfers";

export interface ModuleOptions {
  client: Client;
  env: Env;
  blockchain: BlockchainType;
}

export class FilModule {
  private readonly client: Client;

  public readonly keychains: FilKeychains;

  public readonly wallets: FilWallets;

  public readonly feeWallets: FilFeeWallets;

  public readonly transfers: FilTransfers;

  constructor(options: ModuleOptions) {
    this.client = options.client;
    this.keychains = new FilKeychains(options.env);
    this.feeWallets = new FilFeeWallets(this.client);
    this.wallets = new FilWallets(
      this.client,
      this.keychains,
      options.env,
      options.blockchain,
      this.feeWallets
    );
    this.transfers = new FilTransfers(this.client);
  }
}
