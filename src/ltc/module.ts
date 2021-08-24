import { Client } from "../httpClient";
import { ModuleOptions } from "../module";
import { LtcWallets } from "./wallets";
import { LtcKeyChains } from "./keychains";
import { LtcTransfers } from "./transfers";
import {
  isLegacyAddress,
  isNewAddress,
  convertToLegacyAddress,
  convertToNewAddress,
} from "./utils";

export class LtcModule {
  public readonly wallets: LtcWallets;

  public readonly keychains: LtcKeyChains;

  public readonly transfers: LtcTransfers;

  private readonly client: Client;

  private readonly utils = {
    isLegacyAddress,
    isNewAddress,
    convertToLegacyAddress,
    convertToNewAddress,
  };

  constructor(options: ModuleOptions) {
    this.client = options.client;
    this.keychains = new LtcKeyChains(options.env);
    this.wallets = new LtcWallets(options.env, this.client, this.keychains);
    this.transfers = new LtcTransfers(this.client);
  }
}
