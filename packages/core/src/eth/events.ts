import * as BN from 'bn.js';
import { Pagination } from '../types';
import { Client } from '../httpClient';
import { BNConverter, toSnakeCase } from '../utils';
import {
  EthEvent,
  EthEventPaginationOptions,
  EthValueTransferEvent,
} from '../events';
import { PaginationValueTransferEventDTO } from '../__generate__/eth';

export class EthEvents {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getCallEvents(
    walletId: string,
    options?: EthEventPaginationOptions,
  ): Promise<Pagination<EthEvent>> {
    const queryString: string = options
      ? Object.keys(options)
          .filter((key) => !!options[key])
          .map((key) => `${toSnakeCase(key)}=${options[key]}`)
          .join('&')
      : '';

    const data: Pagination<EthEvent> = await this.client.get<
      Pagination<EthEvent>
    >(
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
    options?: EthEventPaginationOptions,
  ): Promise<Pagination<EthValueTransferEvent>> {
    const queryString: string = options
      ? Object.keys(options)
          .filter((key) => !!options[key])
          .map((key) => `${toSnakeCase(key)}=${options[key]}`)
          .join('&')
      : '';
    const data: NoUndefinedField<PaginationValueTransferEventDTO> = await this.client.get(
      `/value-transfer-events${
        queryString ? `?${queryString}&` : '?'
      }wallet_id=${walletId}`,
    );

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
