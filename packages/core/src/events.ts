import * as BN from 'bn.js';
import { Client } from './sdk';
import { Pagination, PaginationOptions } from './types';
import { Converter } from './utils';

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
  CONFIRMED = 'CONFIRMED'
}

export enum TransferType {
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT'
}

export interface ValueTransferEvent extends Event {
  amount: BN;
  coinSymbol: string;
  from: string;
  to: string;
  transferType: TransferType;
}

export interface EventPaginationOptions extends PaginationOptions{
  address?: string;
  transactionHash?: string;
}

export class Events {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getCallEvents(walletId: string, options?: EventPaginationOptions): Promise<Pagination<Event>> {
    const queryString: string = options ? Object.keys(Converter.toSnakeCase(options))
      .map((key) => `${key}=${Converter.toSnakeCase(options)[key]}`).join('&') : '';

    const data: Pagination<Event> = await this.client
      .get<Pagination<Event>>(`/call-events?${queryString}&wallet_id=${walletId}`);
    return {
      pagination: data.pagination,
      results: data.results,
    };
  }

  public async getValueTransferEvents(walletId: string, options?: EventPaginationOptions): Promise<Pagination<ValueTransferEvent>> {
    const queryString: string = options ? Object.keys(Converter.toSnakeCase(options))
      .map((key) => `${key}=${Converter.toSnakeCase(options)[key]}`).join('&') : '';

    const data: Pagination<ValueTransferEvent> = await this.client
      .get<Pagination<ValueTransferEvent>>(`/value-transfer-events?${queryString}&wallet_id=${walletId}`);
    return {
      pagination: data.pagination,
      results: data.results,
    };
  }
}
