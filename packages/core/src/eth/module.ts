import { EthWallets } from "./wallets";
import { Keychains } from "../types";
import { EthEvents } from "./events";
import { Gasusages } from "./gasusages";
import { Transactions } from "./transactions";
import { Env } from "../sdk";
import { Client } from "../httpClient";
import { EthKeychains } from "./keychains";
import { BlockchainType } from "../blockchain";
import { HenesisKeys } from "./henesisKeys";
import { Coins } from "./coins";
import { GasPrice } from "./gasPrice";

export interface ModuleOptions {
  client: Client;
  env: Env;
  blockchain: BlockchainType;
}

export class EthModule {
  public readonly wallets: EthWallets;

  public readonly keychains: Keychains;

  public readonly henesisKeys: HenesisKeys;

  public readonly events: EthEvents;

  public readonly gasPrice: GasPrice;

  public readonly gasusages: Gasusages;

  public readonly transactions: Transactions;

  public readonly coins: Coins;

  private readonly client: Client;

  constructor(options: ModuleOptions) {
    this.client = options.client;
    this.keychains = new EthKeychains(options.blockchain);
    this.henesisKeys = new HenesisKeys(this.client);
    this.wallets = new EthWallets(
      this.client,
      this.keychains,
      options.env,
      this.henesisKeys,
      options.blockchain
    );
    this.events = new EthEvents(this.client);
    this.gasPrice = new GasPrice(this.client);
    this.gasusages = new Gasusages(this.client);
    this.transactions = new Transactions(this.client);
    this.coins = new Coins(this.client);
  }
}

export class KlayModule extends EthModule {}
