import { RecoveryKit } from "src/recoverykit";
import { BlockchainType } from "src/blockchain";
import { Key, KeyWithPriv } from "src/types";
import { Env } from "src/sdk";

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
    super(
      name,
      blockchain,
      henesisKey,
      accountKey,
      backupKey,
      encryptedPassphrase,
      encryptionKey,
      env
    );
    this.walletId = walletId;
  }

  getWalletId(): string {
    return this.walletId;
  }
}
