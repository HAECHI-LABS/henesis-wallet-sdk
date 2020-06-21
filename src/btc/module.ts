import { Client } from "../httpClient";
import { ModuleOptions } from "../module";
import { BtcWallets } from "./wallets";
import { BtcKeyChains } from "./keychains";
import { BtcEvents } from "./events";

export class BtcModule {
  public readonly wallets: BtcWallets;

  public readonly keychains: BtcKeyChains;

  public readonly events: BtcEvents;

  private readonly client: Client;

  constructor(options: ModuleOptions) {
    this.client = options.client;
    this.keychains = new BtcKeyChains();
    this.wallets = new BtcWallets(this.client, this.keychains);
    this.events = new BtcEvents(this.client);
  }
}
