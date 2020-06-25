import { Pagination } from "../types";
import { Client } from "../httpClient";
import { BNConverter } from "../utils/common";
import {
  EthCallEvent,
  EthEventPaginationOptions,
  EthValueTransferEvent,
} from "../events";
import { PaginationValueTransferEventDTO } from "../__generate__/eth";
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
    const data: Pagination<EthCallEvent> = await this.client.get<
      Pagination<EthCallEvent>
    >(`/call-events${queryString ? `?${queryString}` : ""}`);
    return {
      pagination: data.pagination,
      results: data.results,
    };
  }

  public async getValueTransferEvents(
    options?: EthEventPaginationOptions
  ): Promise<Pagination<EthValueTransferEvent>> {
    const queryString: string = makeQueryString(options);
    const data: NoUndefinedField<PaginationValueTransferEventDTO> = await this.client.get(
      `/value-transfer-events${queryString ? `?${queryString}` : ""}`
    );

    return {
      pagination: data.pagination,
      results: data.results.map((e) => {
        return {
          ...e,
          id: String(e.id),
          amount: BNConverter.hexStringToBN(String(e.amount)),
        };
      }),
    };
  }
}
