import { RecoveryKit } from "../recoverykit";
import { BlockchainType } from "../blockchain";
import { Key, KeyWithPriv } from "../types";
import { Env } from "../sdk";

export class BtcRecoveryKit extends RecoveryKit {
  private readonly walletId: string;

  constructor(
    name: string,
    blockchain: BlockchainType,
    henesisKey: Key,
    accountKey: KeyWithPriv,
    backupKey: KeyWithPriv,
    encryptedPassphrase: string,
    encryptionKey: string,
    env: Env,
    walletId: string
  ) {
    super(name, blockchain, henesisKey, accountKey, backupKey, encryptedPassphrase, encryptionKey, env);
    this.walletId = walletId;
  }

  get getWalletId(): string {
    return this.walletId;
  }
}