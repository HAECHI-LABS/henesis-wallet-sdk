import { Pagination } from "../types";
import { Client } from "../httpClient";
import { BNConverter } from "../utils/common";
import {
  EthCallEvent,
  EthEventPaginationOptions,
  EthValueTransferEvent,
  EthValueTransferEventPaginationOptions,
} from "../events";
import {
  PaginationValueTransferEventDTO,
  PaginationCallEventDTO,
  PaginationValueTransferEventInternalDTO,
  ValueTransferEventInternalDTO,
  SimplifiedTransactionInternalDTO,
  CallEventInternalDTO,
  PaginationCallEventInternalDTO,
} from "../__generate__/eth";
import { makeQueryString } from "../utils/url";
import BN from "bn.js";

export type SimplifiedTransactionInternal = Omit<
  SimplifiedTransactionInternalDTO,
  "blockNumber"
> & {
  blockNumber: BN;
};

export type ValueTransferEventInternal = Omit<
  ValueTransferEventInternalDTO,
  "amount" | "confirmation" | "transaction"
> & {
  amount: BN;
  confirmation: BN;
  transaction: SimplifiedTransactionInternal;
};

export type CallEventInternal = Omit<
  CallEventInternalDTO,
  "confirmation" | "transaction"
> & {
  confirmation: BN;
  transaction: SimplifiedTransactionInternal;
};

export class EthEvents {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getCallEvents(
    options?: EthEventPaginationOptions
  ): Promise<Pagination<EthCallEvent>> {
    const queryString = makeQueryString(options);
    const data = await this.client.get<PaginationCallEventDTO>(
      `/call-events${queryString ? `?${queryString}` : ""}`
    );
    return {
      pagination: data.pagination,
      results: data.results.map((e) => {
        return {
          ...e,
          confirmation: BNConverter.hexStringToBN(e.confirmation),
        };
      }),
    };
  }

  async getValueTransferEvents(
    options?: EthValueTransferEventPaginationOptions
  ): Promise<Pagination<EthValueTransferEvent>> {
    const queryString = makeQueryString(options);
    const data = await this.client.get<
      NoUndefinedField<PaginationValueTransferEventDTO>
    >(`/value-transfer-events${queryString ? `?${queryString}` : ""}`);

    return {
      pagination: data.pagination,
      results: data.results.map((e) => {
        return {
          ...e,
          amount: BNConverter.hexStringToBN(String(e.amount)),
          confirmation: BNConverter.hexStringToBN(String(e.confirmation)),
        };
      }),
    };
  }

  async getInternalCallEvents(
    options?: EthEventPaginationOptions
  ): Promise<Pagination<CallEventInternal>> {
    const queryString = makeQueryString(options);
    const data = await this.client.get<PaginationCallEventInternalDTO>(
      `/internal/call-events${queryString ? `?${queryString}` : ""}`
    );
    return {
      pagination: data.pagination,
      results: data.results.map((e) => {
        return {
          ...e,
          transaction: this.convertSimplifiedTransaction(e.transaction),
          confirmation: BNConverter.hexStringToBN(e.confirmation),
        };
      }),
    };
  }

  async getInternalValueTransferEvents(
    options?: EthValueTransferEventPaginationOptions
  ): Promise<Pagination<ValueTransferEventInternal>> {
    const queryString: string = makeQueryString(options);
    const data = await this.client.get<PaginationValueTransferEventInternalDTO>(
      `/internal/value-transfer-events${queryString ? `?${queryString}` : ""}`
    );

    return {
      pagination: data.pagination,
      results: data.results.map((e) => {
        return {
          ...e,
          transaction: this.convertSimplifiedTransaction(e.transaction),
          amount: BNConverter.hexStringToBN(String(e.amount)),
          confirmation: BNConverter.hexStringToBN(String(e.confirmation)),
        };
      }),
    };
  }

  private convertSimplifiedTransaction(
    transaction: SimplifiedTransactionInternalDTO
  ): SimplifiedTransactionInternal {
    return {
      ...transaction,
      blockNumber: transaction.blockNumber
        ? BNConverter.hexStringToBN(String(transaction.blockNumber))
        : null,
    };
  }
}
