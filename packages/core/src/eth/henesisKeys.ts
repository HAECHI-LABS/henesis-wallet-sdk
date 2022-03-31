import { Client } from "../httpClient";
import { Balance, Key, Pagination, PaginationOptions } from "../types";
import {
  BalanceDTO,
  CreateTransactionRequest,
  HenesisKeyDTO,
  PaginationTransactionHistoryDTO,
  SimplifiedWalletDTO,
  TransactionDTO,
  TransactionType,
} from "../__generate__/eth";
import { BNConverter, Transaction } from "../";
import { makeQueryString } from "../utils/url";
import { convertTransactionHistoryDTO } from "./utils";
import { transformBlockchainType } from "../blockchain";
import { EthTransaction } from "./abstractWallet";
import BN from "bn.js";

export interface TransactionHistory extends Transaction {
  wallet: SimplifiedWalletDTO;
  type: TransactionType;
  createdAt: string;
}

export interface TransactionHistoryPaginationOptions extends PaginationOptions {
  transactionHash?: string;
  createdAtGte?: string;
  createdAtLt?: string;
}

export interface HenesisKey extends Key {
  feeDelegationEnabled: boolean;
}

export class HenesisKeys {
  private readonly client: Client;

  private readonly baseUrl = "/henesis-keys";

  constructor(client: Client) {
    this.client = client;
  }

  getHenesisKey(): Promise<HenesisKey> {
    return this.client.get<RequireProperty<HenesisKeyDTO, "pub">>(
      `${this.baseUrl}/me`
    );
  }

  async getHenesisKeyBalance(): Promise<Balance> {
    const response = await this.client.get<BalanceDTO>(
      `${this.baseUrl}/balance`
    );
    const {
      coinId,
      coinType,
      amount,
      spendableAmount,
      name,
      symbol,
      decimals,
    } = response;
    return {
      coinId: coinId,
      coinType: coinType as any,
      amount: BNConverter.hexStringToBN(String(amount)),
      spendableAmount: BNConverter.hexStringToBN(String(spendableAmount)),
      name,
      symbol,
      decimals,
    };
  }

  async henesisKeyWithdrawal(
    toAddress: string,
    amount: BN,
    otpCode: string
  ): Promise<EthTransaction> {
    const request: CreateTransactionRequest = {
      data: "",
      toAddress: toAddress,
      value: BNConverter.bnToHexString(amount),
      otpCode: otpCode,
    };
    const response = await this.client.post<TransactionDTO>(
      `${this.baseUrl}/transactions`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  async getTransactionHistories(
    options?: TransactionHistoryPaginationOptions
  ): Promise<Pagination<TransactionHistory>> {
    const queryString: string = makeQueryString(options);
    const data = await this.client.get<
      NoUndefinedField<PaginationTransactionHistoryDTO>
    >(`${this.baseUrl}/histories${queryString ? `?${queryString}` : ""}`);

    return {
      pagination: data.pagination,
      results: data.results.map((data) => convertTransactionHistoryDTO(data)),
    };
  }

  async getTransactionHistoriesCsv(
    createdAtGte: string,
    createdAtLt: string
  ): Promise<any> {
    const queryString: string = makeQueryString({
      createdAtGte: createdAtGte,
      createdAtLt: createdAtLt,
    });
    return await this.client.get<any>(
      `${this.baseUrl}/histories/csv?${queryString}`
    );
  }
}
