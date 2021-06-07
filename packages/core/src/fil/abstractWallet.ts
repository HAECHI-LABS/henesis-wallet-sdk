import { Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import { Client } from "../httpClient";
import {
  AccountKeyDTO,
  SimplifiedWalletInternalDTO,
  TransactionDTO,
} from "../__generate__/fil";
import { FilKeychains } from "./keychains";

export type FilTransaction = TransactionDTO;

export type FilAccountKey = AccountKeyDTO;

export interface FilAbstractWalletData extends WalletData {
  blockchain: BlockchainType;
  orgId: string;
  whitelistActivated?: boolean;
  error?: string | null;
}

export interface FilWalletData extends FilAbstractWalletData {
  accountKey: FilAccountKey;
  transactionId?: string | null;
  error?: string | null;
}

export type FilSimplifiedWalletInternal = SimplifiedWalletInternalDTO;

export abstract class FilAbstractWallet extends Wallet<FilTransaction> {
  protected data: FilWalletData;
  protected keychains: FilKeychains;

  protected readonly blockchain: BlockchainType;

  protected constructor(
    client: Client,
    data: FilWalletData,
    keychains: FilKeychains,
    baseUrl: string
  ) {
    super(client, keychains, baseUrl);
    this.data = data;
    this.blockchain = BlockchainType.FILECOIN;
  }

  getChain(): BlockchainType {
    return this.data.blockchain;
  }
}
