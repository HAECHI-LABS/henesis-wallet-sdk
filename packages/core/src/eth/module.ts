import { EthWallets } from "./wallets";
import { Keychains } from "../types";
import { EthEvents } from "./events";
import { Gasusages } from "./gasusages";
import { Transactions } from "./transactions";
import { Env } from "../sdk";
import { Client } from "../httpClient";
import { EthKeychains } from "./keychains";

export interface ModuleOptions {
  client: Client;
  env: Env;
}

export class EthModule {
  public readonly wallets: EthWallets;

  public readonly keychains: Keychains;

  public readonly events: EthEvents;

  public readonly gasusages: Gasusages;

  public readonly transactions: Transactions;

  private readonly client: Client;

  constructor(options: ModuleOptions) {
    this.client = options.client;
    this.keychains = new EthKeychains();
    this.wallets = new EthWallets(this.client, this.keychains, options.env);
    this.events = new EthEvents(this.client);
    this.gasusages = new Gasusages(this.client);
    this.transactions = new Transactions(this.client);
  }
}

export class KlayModule extends EthModule {}
