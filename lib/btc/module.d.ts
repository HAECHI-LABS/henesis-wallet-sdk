import { ModuleOptions } from "../module";
import { BtcWallets } from "./wallets";
import { BtcKeyChains } from "./keychains";
import { BtcTransfers } from "./transfers";
export declare class BtcModule {
    readonly wallets: BtcWallets;
    readonly keychains: BtcKeyChains;
    readonly transfers: BtcTransfers;
    private readonly client;
    constructor(options: ModuleOptions);
}
