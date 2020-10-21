import * as BN from "bn.js";
import { BlockchainType, transformBlockchainType } from "../blockchain";
import { Pagination, PaginationOptions, Timestamp } from "../types";
import { Client } from "../httpClient";
import { makeQueryString } from "../utils/url";
import {
  RawTransactionDTO,
  PaginationTransactionDTO,
  TransactionDTO,
  TransactionStatus,
  DetailedRawTransactionDTO,
  TransactionType,
} from "../__generate__/eth";
import _ from "lodash";
import { convertTransactionDTO, convertRawTransactionDTO } from "./utils";

export import TransactionStatus = TransactionStatus;
import { BNConverter } from "../utils/common";

export interface DetailedRawTransaction extends RawTransaction {
  fee: BN | null;
}

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
  isFeeDelegated: boolean;
  fee?: string;
  estimatedFee?: string;
}

export interface TransactionPaginationOptions extends PaginationOptions {
  address?: string;
  toAddress?: string;
  fromAddress?: string;
  transactionHash?: string;
  start?: Timestamp;
  end?: Timestamp;
  status?: TransactionStatus;
  statuses?: TransactionStatus[];
  types?: TransactionType[];
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

export class Transactions {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  private mappingDetailedRawTransactionDTOToDetailedRawTransaction(
    detailedRawTransactionDTO: DetailedRawTransactionDTO
  ): DetailedRawTransaction {
    return {
      ...convertRawTransactionDTO(detailedRawTransactionDTO),
      fee: detailedRawTransactionDTO.fee
        ? BNConverter.hexStringToBN(String(detailedRawTransactionDTO.fee))
        : null,
    };
  }

  public async getRawTransaction(
    transactionHash: string
  ): Promise<DetailedRawTransaction> {
    const response = await this.client.get<DetailedRawTransactionDTO>(
      `/raw-transactions/${transactionHash}`
    );
    return this.mappingDetailedRawTransactionDTOToDetailedRawTransaction(
      response
    );
  }

  public async getTransaction(transactionId: string): Promise<Transaction> {
    const response = await this.client.get<NoUndefinedField<TransactionDTO>>(
      `/transactions/${transactionId}`
    );
    return convertTransactionDTO(response);
  }

  public async getTransactions(
    options?: TransactionPaginationOptions
  ): Promise<Pagination<Transaction>> {
    const queryString: string = makeQueryString(options);
    const data = await this.client.get<
      NoUndefinedField<PaginationTransactionDTO>
    >(`/transactions${queryString ? `?${queryString}` : ""}`);
    return {
      pagination: data.pagination,
      results: _.map(data.results, (result) => convertTransactionDTO(result)),
    };
  }
}
