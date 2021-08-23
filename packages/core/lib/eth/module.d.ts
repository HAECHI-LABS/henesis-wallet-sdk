import { EthWallets } from "./wallets";
import { Keychains } from "../types";
import { EthEvents } from "./events";
import { GasUsages } from "./gasUsages";
import { Transactions } from "./transactions";
import { Env } from "../sdk";
import { Client } from "../httpClient";
import { BlockchainType } from "../blockchain";
import { HenesisKeys } from "./henesisKeys";
import { Coins } from "./coins";
import { GasPrice } from "./gasPrice";
import { Nfts } from "./nfts";
export interface ModuleOptions {
    client: Client;
    env: Env;
    blockchain: BlockchainType;
}
export declare class EthModule {
    readonly wallets: EthWallets;
    readonly keychains: Keychains;
    readonly henesisKeys: HenesisKeys;
    readonly events: EthEvents;
    readonly gasPrice: GasPrice;
    readonly gasUsages: GasUsages;
    readonly transactions: Transactions;
    readonly coins: Coins;
    readonly nfts: Nfts;
    private readonly client;
    constructor(options: ModuleOptions);
}
export declare class KlayModule extends EthModule {
}
