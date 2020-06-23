import * as BN from "bn.js";
import { BlockchainType } from "../blockchain";
import { Pagination, PaginationOptions, Timestamp } from "../types";
import { Client } from "../httpClient";
import { makeQueryString } from "../utils/url";

export interface Transaction {
  id: string;
  blockchain: BlockchainType;
  sender: string;
  keyId: string;
  hash: string;
  error: string;
  signedMultiSigPayload: SignedMultiSigPayload;
  rawTransaction: RawTransaction;
  status: TransactionStatus;
}

export interface TransactionPaginationOptions extends PaginationOptions {
  address?: string;
  toAddress?: string;
  fromAddress?: string;
  transactionHash?: string;
  start?: Timestamp;
  end?: Timestamp;
  status?: TransactionStatus;
  keyId?: string;
}

export interface MultiSigPayload {
  walletAddress: string;
  toAddress: string;
  value: BN;
  walletNonce: BN;
  hexData: string;
}

export interface SignedMultiSigPayload {
  signature: string;
  multiSigPayload: MultiSigPayload;
}

export interface RawTransaction {
  nonce: BN;
  gasPrice: BN;
  gasLimit: BN;
  to: string;
  value: BN;
  data: string;
}

export enum TransactionStatus {
  REQUESTED = "REQUESTED",
  PENDING = "PENDING",
  FAILED = "FAILED",
  MINED = "MINED",
  REVERTED = "REVERTED",
  CONFIRMED = "CONFIRMED",
  REPLACED = "REPLACED",
}

export class Transactions {
  private readonly client: Client;

  private readonly baseUrl;

  constructor(client: Client) {
    this.client = client;
    this.baseUrl = "/transactions";
  }

  public async getTransaction(transactionId: string): Promise<Transaction> {
    return await this.client.get<Transaction>(
      `${this.baseUrl}/${transactionId}`
    );
  }

  public async getTransactions(
    options?: TransactionPaginationOptions
  ): Promise<Pagination<Transaction>> {
    const queryString: string = makeQueryString(options);
    const data: Pagination<Transaction> = await this.client.get<
      Pagination<Transaction>
    >(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);
    return {
      pagination: data.pagination,
      results: data.results,
    };
  }
}
