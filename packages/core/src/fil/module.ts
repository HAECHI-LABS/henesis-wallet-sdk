import { Client } from "../httpClient";
import { Env } from "../sdk";
import { BlockchainType } from "../blockchain";
import { Keychains } from "../types";
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

  public readonly keychains: Keychains;

  public readonly wallets: FilWallets;

  public readonly feeWallets: FilFeeWallets;

  public readonly transfers: FilTransfers;

  constructor(options: ModuleOptions) {
    this.client = options.client;
    this.keychains = new FilKeychains();
    this.wallets = new FilWallets(
      this.client,
      this.keychains,
      options.env,
      options.blockchain
    );
    this.feeWallets = new FilFeeWallets(this.client);
    this.transfers = new FilTransfers(this.client);
  }
}
