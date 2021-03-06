import { Client } from "../httpClient";
import { ModuleOptions } from "../module";
import { BtcWallets } from "./wallets";
import { BtcKeyChains } from "./keychains";
import { BtcTransfers } from "./transfers";

export class BtcModule {
  public readonly wallets: BtcWallets;

  public readonly keychains: BtcKeyChains;

  public readonly transfers: BtcTransfers;

  private readonly client: Client;

  constructor(options: ModuleOptions) {
    this.client = options.client;
    this.keychains = new BtcKeyChains(options.env);
    this.wallets = new BtcWallets(options.env, this.client, this.keychains);
    this.transfers = new BtcTransfers(this.client);
  }
}
