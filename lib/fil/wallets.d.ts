import { FilMasterWallet } from "./wallet";
import { Wallets, WalletSearchOptions } from "../wallets";
import { BlockchainType } from "../blockchain";
import { Client } from "../httpClient";
import { Env } from "../sdk";
import { RecoveryKit } from "../recoverykit";
import { FilFeeWallets } from "./feeWallets";
import { FilKeychains, FilKeyWithPriv } from "./keychains";
import { Key, KeyWithPriv } from "../types";
export declare class FilRecoveryKit extends RecoveryKit {
    accountKey: FilKeyWithPriv;
    constructor(name: string, blockchain: BlockchainType, henesisKey: Key, accountKey: FilKeyWithPriv, backupKey: KeyWithPriv, encryptedPassphrase: string, encryptionKey: string, env: Env);
    getAccountKey(): FilKeyWithPriv;
}
export declare class FilWallets extends Wallets<FilMasterWallet> {
    private readonly blockchain;
    private readonly feeWallets;
    protected readonly keychains: FilKeychains;
    constructor(client: Client, keychains: FilKeychains, env: Env, blockchain: BlockchainType, feeWallets: FilFeeWallets);
    createRecoveryKit(name: string, passphrase: string): Promise<FilRecoveryKit>;
    verifyAddress(address: string): boolean;
    getMasterWallet(id: string): Promise<FilMasterWallet>;
    getMasterWallets(options?: WalletSearchOptions): Promise<FilMasterWallet[]>;
    createMasterWalletWithKit(recoveryKit: FilRecoveryKit): Promise<FilMasterWallet>;
    retryCreateMasterWallet(masterWalletId: string): Promise<FilMasterWallet>;
}
