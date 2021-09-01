import { Client } from "../httpClient";
import { ModuleOptions } from "../module";
import { BchWallets } from "./wallets";
import { BchKeyChains } from "./keychains";
import { BchTransfers } from "./transfers";

export class BchModule {
  public readonly wallets: BchWallets;

  public readonly keychains: BchKeyChains;

  public readonly transfers: BchTransfers;

  private readonly client: Client;

  constructor(options: ModuleOptions) {
    this.client = options.client;
    this.keychains = new BchKeyChains(options.env);
    this.wallets = new BchWallets(options.env, this.client, this.keychains);
    this.transfers = new BchTransfers(this.client);
  }
}
