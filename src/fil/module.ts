import { Client } from "../httpClient";
import { Env } from "../sdk";
import { BlockchainType } from "../blockchain";
import { Keychains } from "../types";
import { FilWallets } from "./wallets";
import { FilKeychains } from "./keychains";

export interface ModuleOptions {
  client: Client;
  env: Env;
  blockchain: BlockchainType;
}

export class FilModule {
  public readonly wallets: FilWallets;

  public readonly keychains: Keychains;

  private readonly client: Client;

  constructor(options: ModuleOptions) {
    this.client = options.client;
    this.keychains = new FilKeychains();
    this.wallets = new FilWallets(
      this.client,
      this.keychains,
      options.env,
      options.blockchain
    );
  }
}
