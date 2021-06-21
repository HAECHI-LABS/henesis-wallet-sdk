import { FilWallet } from "./wallet";
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
}
export declare class FilWallets extends Wallets<FilWallet> {
    private readonly blockchain;
    private readonly feeWallets;
    protected readonly keychains: FilKeychains;
    constructor(client: Client, keychains: FilKeychains, env: Env, blockchain: BlockchainType, feeWallets: FilFeeWallets);
    createRecoveryKit(name: string, passphrase: string): Promise<FilRecoveryKit>;
    verifyAddress(address: string): boolean;
    getWallet(id: string): Promise<FilWallet>;
    getWallets(options?: WalletSearchOptions): Promise<FilWallet[]>;
    createWalletWithKit(recoveryKit: FilRecoveryKit): Promise<FilWallet>;
    retryCreateWallet(walletId: string): Promise<FilWallet>;
}
