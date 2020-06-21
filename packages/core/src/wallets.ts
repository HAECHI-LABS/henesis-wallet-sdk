import { MasterWalletSearchOptions } from "./eth";
import { RecoveryKit } from "./recoverykit";
import { EthMasterWallet } from "./eth/wallet";
import { Client } from "./httpClient";
import { Keychains } from "./types";

export abstract class Wallets<T> {
  protected readonly baseUrl = "/wallets";

  protected readonly client: Client;

  protected readonly keychains: Keychains;

  protected constructor(client: Client, keychains: Keychains) {
    this.client = client;
    this.keychains = keychains;
  }

  abstract verifyAddress(address: string): boolean;

  abstract getMasterWallets(
    options?: MasterWalletSearchOptions
  ): Promise<T[]>

  abstract createRecoveryKit(
    name: string,
    passphrase: string
  ): Promise<RecoveryKit>

  abstract createMasterWalletWithKit(
    recoveryKit: RecoveryKit
  ): Promise<EthMasterWallet>
}
