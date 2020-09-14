import * as BN from "bn.js";
import { BlockchainType, transformBlockchainType } from "../blockchain";
import { Pagination, PaginationOptions, Timestamp } from "../types";
import { Client } from "../httpClient";
import { makeQueryString } from "../utils/url";
import {
  DetailedTransactionDTO,
  PaginationTransactionDTO,
  TransactionDTO,
  TransactionStatus,
} from "../__generate__/eth";
import _ from "lodash";

export import TransactionStatus = TransactionStatus;
import { BNConverter } from "../utils/common";

export interface DetailedTransaction extends Transaction {
  fee: BN;
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

  private readonly baseUrl = "/transactions";

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
      rawTransaction: rawTransaction
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
        : null,
    };
  }

  private mappingDetailedTransactionDTOToTransaction(
    detailedTransactionDTO: NoUndefinedField<DetailedTransactionDTO>
  ): DetailedTransaction {
    return {
      ...this.mappingTransactionDTOToTransaction(detailedTransactionDTO),
      fee: detailedTransactionDTO.fee
        ? BNConverter.hexStringToBN(String(detailedTransactionDTO.fee))
        : null,
    };
  }

  public async getTransaction(
    transactionId: string
  ): Promise<DetailedTransaction> {
    const response = await this.client.get<
      NoUndefinedField<DetailedTransactionDTO>
    >(`${this.baseUrl}/${transactionId}`);
    return this.mappingDetailedTransactionDTOToTransaction(response);
  }

  public async getTransactions(
    options?: TransactionPaginationOptions
  ): Promise<Pagination<Transaction>> {
    const queryString: string = makeQueryString(options);
    const data = await this.client.get<
      NoUndefinedField<PaginationTransactionDTO>
    >(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);
    return {
      pagination: data.pagination,
      results: _.map(data.results, (result) =>
        this.mappingTransactionDTOToTransaction(result)
      ),
    };
  }
}
