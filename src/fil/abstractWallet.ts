import { Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import { Key, Keychains } from "../types";
import { Client } from "../httpClient";

export interface FilTransaction {}

export interface FilWalletData extends WalletData {
  blockchain: BlockchainType;
}

export interface FilMasterWalletData extends FilWalletData {
  accountKey: Key;
  transactionId?: string | null;
  error?: string | null;
}

export abstract class FilWallet extends Wallet<FilTransaction> {
  protected data: FilMasterWalletData;

  protected constructor(
    client: Client,
    data: FilMasterWalletData,
    keychains: Keychains,
    baseUrl: string
  ) {
    super(client, keychains, baseUrl);
    this.data = data;
  }

  getChain(): BlockchainType {
    return this.data.blockchain;
  }
}
