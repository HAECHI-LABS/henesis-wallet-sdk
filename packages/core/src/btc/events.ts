import * as BN from 'bn.js';
import { Pagination, PaginationOptions } from '../types';
import { BlockchainType } from '../blockchain';
import { Client } from '../httpClient';
import { BNConverter, toSnakeCase } from '../utils';

export interface Event {
  createdAt: string;
  status: EventStatusType;
  toAddress: string;
  transactionHash: string;
  walletId: string;
}

export enum EventStatusType {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  MINED = 'MINED',
  CONFIRMED = 'CONFIRMED',
}

export enum TransferType {
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
}

export interface ValueTransferEvent extends Event {
  amount: BN;
  coinSymbol: string;
  from: string;
  to: string;
  transferType: TransferType;
}

export interface EventPaginationOptions extends PaginationOptions {
  transactionHash?: string;
  status?: EventStatusType;
  blockchain?: BlockchainType;
}

export class BtcEvents {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
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
