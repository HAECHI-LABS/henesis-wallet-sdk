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

  private mappingTransactionDTOToTransaction(
    transcationDTO: NoUndefinedField<TransactionDTO>
  ): Transaction {
    const rawTransaction = transcationDTO.rawTransaction;
    const signedMultiSigPayload = transcationDTO.signedMultiSigPayload;
    const multiSigPayload = signedMultiSigPayload?.multiSigPayload;
    return {
      ...transcationDTO,
      blockchain: transformBlockchainType(transcationDTO.blockchain),
      signedMultiSigPayload: signedMultiSigPayload
        ? {
            ...signedMultiSigPayload,
            multiSigPayload: multiSigPayload
              ? {
                  ...multiSigPayload,
                  value: BNConverter.hexStringToBN(
                    String(multiSigPayload.value)
                  ),
                  walletNonce: BNConverter.hexStringToBN(
                    String(multiSigPayload.walletNonce)
                  ),
                }
              : null,
          }
        : null,
      rawTransaction: this.mappingRawTransactionDTOToRawTransaction(
        rawTransaction
      ),
    };
  }

  private mappingRawTransactionDTOToRawTransaction(
    rawTransaction: RawTransactionDTO
  ): RawTransaction {
    return rawTransaction
      ? {
          ...rawTransaction,
          nonce: rawTransaction.nonce
            ? BNConverter.hexStringToBN(String(rawTransaction.nonce))
            : null,
          gasPrice: rawTransaction.gasPrice
            ? BNConverter.hexStringToBN(String(rawTransaction.gasPrice))
            : null,
          gasLimit: rawTransaction.gasLimit
            ? BNConverter.hexStringToBN(String(rawTransaction.gasLimit))
            : null,
          to: rawTransaction.to,
          value: rawTransaction.value
            ? BNConverter.hexStringToBN(String(rawTransaction.value))
            : null,
          data: rawTransaction.data,
        }
      : null;
  }

  private mappingDetailedRawTransactionDTOToDetailedRawTransaction(
    detailedRawTransactionDTO: DetailedRawTransactionDTO
  ): DetailedRawTransaction {
    return {
      ...this.mappingRawTransactionDTOToRawTransaction(
        detailedRawTransactionDTO
      ),
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
    return this.mappingTransactionDTOToTransaction(response);
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
      results: _.map(data.results, (result) =>
        this.mappingTransactionDTOToTransaction(result)
      ),
    };
  }
}
