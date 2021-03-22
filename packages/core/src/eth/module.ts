import { EthWallets } from "@eth/wallets";
import { Keychains } from "src/types";
import { EthEvents } from "@eth/events";
import { GasUsages } from "@eth/gasUsages";
import { Transactions } from "@eth/transactions";
import { Env } from "src/sdk";
import { Client } from "src/httpClient";
import { EthKeychains } from "@eth/keychains";
import { BlockchainType } from "src/blockchain";
import { HenesisKeys } from "@eth/henesisKeys";
import { Coins } from "@eth/coins";
import { GasPrice } from "@eth/gasPrice";

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

  public readonly gasUsages: GasUsages;

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
    this.gasUsages = new GasUsages(this.client);
    this.transactions = new Transactions(this.client);
    this.coins = new Coins(this.client);
  }
}

export class KlayModule extends EthModule {}
