import { Client } from "../httpClient";
import { Env } from "../sdk";
import { BlockchainType } from "../blockchain";
import { FilWallets } from "./wallets";
import { FilKeychains } from "./keychains";
import { FilFeeWallets } from "./feeWallets";
import { FilTransfers } from "./transfers";
export interface ModuleOptions {
    client: Client;
    env: Env;
    blockchain: BlockchainType;
}
export declare class FilModule {
    private readonly client;
    readonly keychains: FilKeychains;
    readonly wallets: FilWallets;
    readonly feeWallets: FilFeeWallets;
    readonly transfers: FilTransfers;
    constructor(options: ModuleOptions);
}
