import * as BN from 'bn.js';
import { Pagination } from '../types';
import { Client } from '../httpClient';
import { BNConverter, toSnakeCase } from '../utils';
import { EventPaginationOptions, Event, ValueTransferEvent } from "../events";

export class EthEvents {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getCallEvents(
    walletId: string,
    options?: EventPaginationOptions,
  ): Promise<Pagination<Event>> {
    const queryString: string = options
      ? Object.keys(options)
          .filter((key) => !!options[key])
          .map((key) => `${toSnakeCase(key)}=${options[key]}`)
          .join('&')
      : '';

    const data: Pagination<Event> = await this.client.get<Pagination<Event>>(
        `/call-events${
          queryString ? `?${queryString}&` : '?'
        }wallet_id=${walletId}`,
    );
    return {
      pagination: data.pagination,
      results: data.results,
    };
  }

  public async getValueTransferEvents(
    walletId: string,
    options?: EventPaginationOptions,
  ): Promise<Pagination<ValueTransferEvent>> {
    const queryString: string = options
      ? Object.keys(options)
          .filter((key) => !!options[key])
          .map((key) => `${toSnakeCase(key)}=${options[key]}`)
          .join('&')
      : '';
    const data = await this.client.get(
        `/value-transfer-events${
          queryString ? `?${queryString}&` : '?'
        }wallet_id=${walletId}`,
    );

    return {
      pagination: data.pagination,
      results: data.results.map((e) => {
        e.amount = BNConverter.hexStringToBN(e.amount);
        return e;
      }),
    };
  }
}
