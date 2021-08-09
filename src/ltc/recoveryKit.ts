// FIXME: the code is copied from btc and changed only btc->ltc
// we need to check the code line by line later.

import { RecoveryKit } from "../recoverykit";
import { BlockchainType } from "../blockchain";
import { Key, KeyWithPriv } from "../types";
import { Env } from "../sdk";

export class LtcRecoveryKit extends RecoveryKit {
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
