import * as BN from 'bn.js';
import { Client } from './sdk';
import { Pagination, PaginationOptions } from './types';

export interface Event {
  createdAt: string;
  status: string;
  toAddress: string;
  transactionHash: string;
  walletId: string;
}

export interface ValueTransferEvent extends Event{
  amount: BN;
  coinSymbol: string;
  from: string;
  to: string;
  transferType: string;
}

export class Events {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getCallEvents(walletId:string, options?: PaginationOptions): Promise<Pagination<Event>> {
    const queryString: string = options ? Object.keys(options)
      .map((key) => `${key}=${options[key]}`).join('&') : '';

    const data: Pagination<Event> = await this.client
      .get<Pagination<Event>>(`/call-events?${queryString}&wallet_id=${walletId}`);
    return {
      pagination: data.pagination,
      results: data.results,
    };
  }

  public async getValueTransferEvents(walletId:string, options?: PaginationOptions): Promise<Pagination<ValueTransferEvent>> {
    const queryString: string = options ? Object.keys(options)
      .map((key) => `${key}=${options[key]}`).join('&') : '';

    const data: Pagination<ValueTransferEvent> = await this.client
      .get<Pagination<ValueTransferEvent>>(`/value-transfer-events?${queryString}&wallet_id=${walletId}`);
    return {
      pagination: data.pagination,
      results: data.results,
    };
  }
}
