import { FilWallet } from "./wallet";
import { Wallets, WalletSearchOptions } from "../wallets";
import { BlockchainType } from "../blockchain";
import { Client } from "../httpClient";
import { Keychains } from "../types";
import { Env } from "../sdk";
import { transformWalletData } from "./wallet";
import { WalletDTO } from "../__generate__/fil";
import { RecoveryKit } from "../recoverykit";
import { checkNullAndUndefinedParameter } from "../utils/common";

export class FilWallets extends Wallets<FilWallet> {
  private readonly blockchain: BlockchainType;

  constructor(
    client: Client,
    keychains: Keychains,
    env: Env,
    blockchain: BlockchainType
  ) {
    super(env, client, keychains);
    this.blockchain = blockchain;
  }

  // TODO: implement me
  createRecoveryKit(name: string, passphrase: string): Promise<RecoveryKit> {
    return Promise.resolve(undefined);
  }

  // TODO: implement me
  verifyAddress(address: string): boolean {
    return false;
  }

  async getWallet(id: string): Promise<FilWallet> {
    const walletData = await this.client.get<NoUndefinedField<WalletDTO>>(
      `${this.baseUrl}/${id}`
    );
    return new FilWallet(
      this.client,
      transformWalletData(walletData),
      this.keychains
    );
  }

  // TODO: implement me
  getWallets(options?: WalletSearchOptions): Promise<FilWallet[]> {
    return Promise.resolve([]);
  }

  // TODO: implement me
  createWalletWithKit(recoveryKit: RecoveryKit): Promise<FilWallet> {
    return Promise.resolve(undefined);
  }

  async retryCreateWallet(walletId: string) {
    checkNullAndUndefinedParameter({ walletId });
    const response = await this.client.post<WalletDTO>(
      `${this.baseUrl}/${walletId}/recreate`
    );
    return new FilWallet(
      this.client,
      transformWalletData(response),
      this.keychains
    );
  }
}
