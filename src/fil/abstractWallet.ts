import { Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import { Key, Keychains } from "../types";
import { Client } from "../httpClient";
import {
  SimplifiedWalletInternalDTO,
  TransactionDTO,
} from "../__generate__/fil";

export type FilTransaction = TransactionDTO;

export interface FilWalletData extends WalletData {
  blockchain: BlockchainType;
}

export interface FilMasterWalletData extends FilWalletData {
  accountKey: Key;
  transactionId?: string | null;
  error?: string | null;
}

export type FilSimplifiedWalletInternal = SimplifiedWalletInternalDTO;

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
