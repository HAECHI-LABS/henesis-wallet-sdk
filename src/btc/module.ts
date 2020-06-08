import { Client } from '../httpClient';
import { ModuleOptions } from '../module';
import { BtcWallets } from "./wallets";
import { BtcKeychains, DefaultBtcKeyChains } from "./keychains";
import { BtcEvents } from "./events";

export class BtcModule {
  private readonly wallets: BtcWallets;

  public readonly events: BtcEvents;
  
  private readonly keychains: BtcKeychains;
  
  private readonly client: Client;

  constructor(options: ModuleOptions) {
    this.client = options.client;
    this.keychains = new DefaultBtcKeyChains();
    this.wallets = new BtcWallets(this.client, this.keychains);
    this.events = new BtcEvents(this.client);
  }
}
