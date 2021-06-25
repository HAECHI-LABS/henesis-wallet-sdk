import { Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import { Client } from "../httpClient";
import {
  AccountKeyDTO,
  SimplifiedWalletDTO,
  TransactionDTO,
} from "../__generate__/fil";
import { FilKeychains } from "./keychains";
import BN from "bn.js";

export const FilGasLimit = {
  PROPOSE: new BN(4800000),
};

export interface FilTransaction
  extends Omit<
    TransactionDTO,
    | "nonce"
    | "amount"
    | "gasLimit"
    | "gasFeeCap"
    | "gasPremium"
    | "gasUsed"
    | "feeAmount"
  > {
  nonce: BN;
  amount: BN;
  gasLimit?: BN;
  gasFeeCap?: BN;
  gasPremium?: BN;
  gasUsed?: BN;
  feeAmount?: BN;
}

export type FilAccountKey = AccountKeyDTO;

export type FilSimplifiedWallet = SimplifiedWalletDTO;

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
  confirmation?: string | null;
  transaction?: TransactionDTO;
}

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
