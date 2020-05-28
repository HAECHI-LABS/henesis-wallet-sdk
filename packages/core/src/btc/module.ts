import { Client } from '../httpClient';
import { ModuleOptions } from '../module';
import { BTCWallets } from "./wallets";
import { BtcKeychains, DefaultBtcKeyChains } from "./keychains";

export class BtcModule {
  private readonly client: Client;

  private readonly wallets: BTCWallets;

  private readonly keychains: BtcKeychains;

  constructor(options: ModuleOptions) {
    this.client = options.client;

    this.keychains = new DefaultBtcKeyChains();
    this.wallets = new BTCWallets(this.client, this.keychains);
  }
}
