import { FilMasterWallet } from "./wallet";
import { Wallets } from "../wallets";
import { HenesisKeys } from "./henesisKeys";
import { BlockchainType } from "../blockchain";
import { Client } from "../httpClient";
import { Keychains } from "../types";
import { Env } from "../sdk";
import { transformMasterWalletData } from "./wallet";
import { MasterWalletDTO } from "../__generate__/fil";
import { RecoveryKit } from "../recoverykit";
import { checkNullAndUndefinedParameter } from "../utils/common";

export class FilWallets extends Wallets<FilMasterWallet> {
  private readonly henesisKey: HenesisKeys;
  private readonly blockchain: BlockchainType;

  constructor(
    client: Client,
    keychains: Keychains,
    env: Env,
    henesisKey: HenesisKeys,
    blockchain: BlockchainType
  ) {
    super(env, client, keychains);
    this.henesisKey = henesisKey;
    this.blockchain = blockchain;
  }

  async getMasterWallet(id: string): Promise<FilMasterWallet> {
    const walletData = await this.client.get<NoUndefinedField<MasterWalletDTO>>(
      `${this.baseUrl}/${id}`
    );
    return new FilMasterWallet(
      this.client,
      transformMasterWalletData(walletData),
      this.keychains
    );
  }

  // TODO: implement me
  createMasterWalletWithKit(
    recoveryKit: RecoveryKit
  ): Promise<FilMasterWallet> {
    return Promise.resolve(undefined);
  }

  // TODO: implement me
  createRecoveryKit(name: string, passphrase: string): Promise<RecoveryKit> {
    return Promise.resolve(undefined);
  }

  // TODO: implement me
  getMasterWallets(): Promise<FilMasterWallet[]> {
    return Promise.resolve([]);
  }

  // TODO: implement me
  verifyAddress(address: string): boolean {
    return false;
  }

  async retryCreateMasterWallet(walletId: string) {
    checkNullAndUndefinedParameter({ walletId });
    const response = await this.client.post<MasterWalletDTO>(
      `${this.baseUrl}/${walletId}/recreate`
    );
    return new FilMasterWallet(
      this.client,
      transformMasterWalletData(response),
      this.keychains
    );
  }
}
