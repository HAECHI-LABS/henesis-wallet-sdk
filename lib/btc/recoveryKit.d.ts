import { RecoveryKit } from "../recoverykit";
import { BlockchainType } from "../blockchain";
import { Key, KeyWithPriv } from "../types";
import { Env } from "../sdk";
export declare class BtcRecoveryKit extends RecoveryKit {
    private readonly walletId;
    constructor(name: string, blockchain: BlockchainType, henesisKey: Key, accountKey: KeyWithPriv, backupKey: KeyWithPriv, encryptedPassphrase: string, encryptionKey: string, env: Env, walletId: string);
    getWalletId(): string;
}
