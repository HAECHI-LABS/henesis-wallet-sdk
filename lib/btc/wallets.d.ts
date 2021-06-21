import { Client } from "../httpClient";
import { BtcMasterWallet } from "./wallet";
import { Wallets, WalletSearchOptions } from "../wallets";
import { Keychains } from "../types";
import { Env } from "../sdk";
import { BtcRecoveryKit } from "./recoveryKit";
import { InactiveWallet } from "../wallet";
export declare class BtcWallets extends Wallets<BtcMasterWallet> {
    constructor(env: Env, client: Client, keychains: Keychains);
    createMasterWallet(name: string, passphrase: string): Promise<BtcMasterWallet>;
    getWallet(id: string): Promise<BtcMasterWallet>;
    verifyAddress(address: string): boolean;
    getMasterWallets(options?: WalletSearchOptions): Promise<BtcMasterWallet[]>;
    createRecoveryKit(name: string, passphrase: string): Promise<BtcRecoveryKit>;
    createMasterWalletWithKit(recoveryKit: BtcRecoveryKit): Promise<BtcMasterWallet>;
    createInactiveMasterWallet(name: string): Promise<InactiveWallet>;
}
