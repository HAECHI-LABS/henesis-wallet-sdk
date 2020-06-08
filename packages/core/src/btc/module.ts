import { Client } from '../httpClient';
import { ModuleOptions } from '../module';
import { BtcWallets } from "./wallets";
import { BtcKeychains, DefaultBtcKeyChains } from "./keychains";

export class BtcModule {
  private readonly client: Client;

  private readonly wallets: BtcWallets;

  private readonly keychains: BtcKeychains;

  constructor(options: ModuleOptions) {
    this.client = options.client;

    this.keychains = new DefaultBtcKeyChains();
    this.wallets = new BtcWallets(this.client, this.keychains);
  }
}
