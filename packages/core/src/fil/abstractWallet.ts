import { Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import { Key, Keychains } from "../types";
import { Client } from "../httpClient";
import {
  SimplifiedWalletInternalDTO,
  TransactionDTO,
} from "../__generate__/fil";

export type FilTransaction = TransactionDTO;

export interface FilAbstractWalletData extends WalletData {
  blockchain: BlockchainType;
}

export interface FilWalletData extends FilAbstractWalletData {
  accountKey: Key;
  transactionId?: string | null;
  error?: string | null;
}

export type FilSimplifiedWalletInternal = SimplifiedWalletInternalDTO;

export abstract class FilAbstractWallet extends Wallet<FilTransaction> {
  protected data: FilWalletData;

  protected constructor(
    client: Client,
    data: FilWalletData,
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
