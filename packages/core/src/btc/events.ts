import * as BN from 'bn.js';
import { Pagination } from '../types';
import { Client } from '../httpClient';
import { BNConverter, toSnakeCase } from '../utils';
import { BtcEventPaginationOptions, BtcValueTransferEvent } from '../events';
import { PaginationValueTransferEventDTO } from '../__generate__/btc';

export class BtcEvents {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getValueTransferEvents(
    walletId: string,
    options?: BtcEventPaginationOptions,
  ): Promise<Pagination<BtcValueTransferEvent>> {
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
          createdAt: e.createdAt,
          status: e.status,
          transactionHash: e.transactionHash,
          walletId: e.id,
          amount: BNConverter.hexStringToBN(String(e.amount)),
          coinSymbol: 'BTC',
          from: '',
          to: e.to,
          transferType: e.transferType,
        };
      }),
    };
  }
}
