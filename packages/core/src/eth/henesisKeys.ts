import { Client } from "../httpClient";
import { Balance, Key, Pagination, PaginationOptions } from "../types";
import {
  BalanceDTO,
  HenesisKeyDTO,
  PaginationTransactionHistoryDTO,
  SimplifiedWalletDTO,
  TransactionType,
} from "../__generate__/eth";
import { BNConverter, Transaction } from "../";
import { makeQueryString } from "../utils/url";
import { convertTransactionHistoryDTO } from "./utils";

export interface TransactionHistory extends Transaction {
  wallet: SimplifiedWalletDTO;
  type: TransactionType;
  createdAt: string;
}

export interface TransactionHistoryPaginationOptions extends PaginationOptions {
  transactionHash?: string;
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
  ): Promise<void> {
    const queryString: string = makeQueryString({
      createdAtGte: createdAtGte,
      createdAtLt: createdAtLt,
    });
    await this.client.get<void>(`${this.baseUrl}/histories/csv?${queryString}`);
  }
}
