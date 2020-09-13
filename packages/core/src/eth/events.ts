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
} from "../__generate__/eth";
import { makeQueryString } from "../utils/url";

export class EthEvents {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getCallEvents(
    options?: EthEventPaginationOptions
  ): Promise<Pagination<EthCallEvent>> {
    const queryString: string = makeQueryString(options);
    const data = await this.client.get<PaginationCallEventDTO>(
      `/call-events${queryString ? `?${queryString}` : ""}`
    );
    return {
      pagination: data.pagination,
      results: data.results,
    };
  }

  public async getValueTransferEvents(
    options?: EthValueTransferEventPaginationOptions
  ): Promise<Pagination<EthValueTransferEvent>> {
    const queryString: string = makeQueryString(options);
    const data = await this.client.get<
      NoUndefinedField<PaginationValueTransferEventDTO>
    >(`/value-transfer-events${queryString ? `?${queryString}` : ""}`);

    return {
      pagination: data.pagination,
      results: data.results.map((e) => {
        return {
          ...e,
          amount: BNConverter.hexStringToBN(String(e.amount)),
        };
      }),
    };
  }
}
