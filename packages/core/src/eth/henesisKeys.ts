import { Client } from "../httpClient";
import { Balance, Key, Pagination, PaginationOptions } from "../types";
import {
  BalanceDTO,
  HenesisKeyDTO,
  PaginationTransactionHistoryDTO,
  RawTransactionDTO,
  SimplifiedWalletDTO,
  TransactionDTO,
  TransactionHistoryDTO,
  TransactionType,
} from "../__generate__/eth";
import { BNConverter, RawTransaction, Transaction } from "../";
import { makeQueryString } from "../utils/url";
import { convertTransactionHistoryDTO } from "./utils";

export interface TransactionHistory extends Transaction {
  wallet: SimplifiedWalletDTO;
  type: TransactionType;
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
    const { coinId, coinType, amount, name, symbol, decimals } = response;
    return {
      coinId: coinId,
      coinType: coinType as any,
      amount: BNConverter.hexStringToBN(String(amount)),
      name,
      symbol,
      decimals,
    };
  }

  async getTransactionHistories(
    options?: PaginationOptions
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
}
