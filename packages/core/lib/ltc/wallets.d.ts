import { Client } from "../httpClient";
import { LtcMasterWallet } from "./wallet";
import { Wallets, WalletSearchOptions } from "../wallets";
import { Keychains } from "../types";
import { Env } from "../sdk";
import { LtcRecoveryKit } from "./recoveryKit";
import { InactiveWallet } from "../wallet";
export declare class LtcWallets extends Wallets<LtcMasterWallet> {
    constructor(env: Env, client: Client, keychains: Keychains);
    createMasterWallet(name: string, passphrase: string): Promise<LtcMasterWallet>;
    getWallet(id: string): Promise<LtcMasterWallet>;
    verifyAddress(address: string): boolean;
    getMasterWallets(options?: WalletSearchOptions): Promise<LtcMasterWallet[]>;
    createRecoveryKit(name: string, passphrase: string): Promise<LtcRecoveryKit>;
    createMasterWalletWithKit(recoveryKit: LtcRecoveryKit): Promise<LtcMasterWallet>;
    createInactiveMasterWallet(name: string): Promise<InactiveWallet>;
}
