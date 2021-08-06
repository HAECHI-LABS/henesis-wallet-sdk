// FIXME: the code is copied from btc and changed only btc->ltc
// we need to check the code line by line later.

import { Client } from "../httpClient";
import { ModuleOptions } from "../module";
import { LtcWallets } from "./wallets";
import { LtcKeyChains } from "./keychains";
import { LtcTransfers } from "./transfers";

export class LtcModule {
  public readonly wallets: LtcWallets;

  public readonly keychains: LtcKeyChains;

  public readonly transfers: LtcTransfers;

  private readonly client: Client;

  constructor(options: ModuleOptions) {
    this.client = options.client;
    this.keychains = new LtcKeyChains(options.env);
    this.wallets = new LtcWallets(options.env, this.client, this.keychains);
    this.transfers = new LtcTransfers(this.client);
  }
}
