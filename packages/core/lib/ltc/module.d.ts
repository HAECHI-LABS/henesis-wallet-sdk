import { ModuleOptions } from "../module";
import { LtcWallets } from "./wallets";
import { LtcKeyChains } from "./keychains";
import { LtcTransfers } from "./transfers";
export declare class LtcModule {
    readonly wallets: LtcWallets;
    readonly keychains: LtcKeyChains;
    readonly transfers: LtcTransfers;
    private readonly client;
    constructor(options: ModuleOptions);
}
