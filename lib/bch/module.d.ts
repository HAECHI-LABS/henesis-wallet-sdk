import { ModuleOptions } from "../module";
import { BchWallets } from "./wallets";
import { BchKeyChains } from "./keychains";
import { BchTransfers } from "./transfers";
export declare class BchModule {
    readonly wallets: BchWallets;
    readonly keychains: BchKeyChains;
    readonly transfers: BchTransfers;
    private readonly client;
    constructor(options: ModuleOptions);
}
