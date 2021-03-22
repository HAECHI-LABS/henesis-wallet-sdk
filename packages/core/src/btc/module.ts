import { Client } from "src/httpClient";
import { ModuleOptions } from "src/module";
import { BtcWallets } from "@btc/wallets";
import { BtcKeyChains } from "@btc/keychains";
import { BtcTransfers } from "@btc/transfers";

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
