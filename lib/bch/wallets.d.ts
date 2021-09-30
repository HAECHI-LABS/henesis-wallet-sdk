import { Client } from "../httpClient";
import { BchMasterWallet } from "./wallet";
import { Wallets, WalletSearchOptions } from "../wallets";
import { Keychains } from "../types";
import { Env } from "../sdk";
import { BchRecoveryKit } from "./recoveryKit";
import { InactiveWallet } from "../wallet";
export declare class BchWallets extends Wallets<BchMasterWallet> {
    constructor(env: Env, client: Client, keychains: Keychains);
    createMasterWallet(name: string, passphrase: string): Promise<BchMasterWallet>;
    getWallet(id: string): Promise<BchMasterWallet>;
    verifyAddress(address: string): boolean;
    getMasterWallets(options?: WalletSearchOptions): Promise<BchMasterWallet[]>;
    createRecoveryKit(name: string, passphrase: string): Promise<BchRecoveryKit>;
    createMasterWalletWithKit(recoveryKit: BchRecoveryKit): Promise<BchMasterWallet>;
    createInactiveMasterWallet(name: string): Promise<InactiveWallet>;
}
