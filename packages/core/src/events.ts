import * as BN from 'bn.js';
import { Client } from './sdk';
import { BlockchainType, Pagination, PaginationOptions } from './types';
import { BNConverter, toSnakeCase } from './utils';

export interface Event {
  id: number;
  transactionId: string;
  masterWalletId: string;
  orgId: string;
  createdAt: string;
  updatedAt: string;
  status: EventStatusType;
  toAddress: string;
  transactionHash: string;
  walletId: string;
  confirmation: BN;
}

export enum EventStatusType {
  REQUESTED = 'REQUESTED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  MINED = 'MINED',
  CONFIRMED = 'CONFIRMED',
}

export enum TransferType {
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
}

export enum WalletType {
  MASTER_WALLET = 'MASTER_WALLET',
  USER_WALLET = 'USER_WALLET',
}

export interface CallEvent extends Event {
  from: string;
  to: string;
  data: string;
}

export interface ValueTransferEvent extends Event {
  amount: BN;
  coinSymbol: string;
  from: string;
  to: string;
  transferType: TransferType;
  walletName: string;
  walletType: WalletType;
}

export interface EventPaginationOptions extends PaginationOptions {
  walletId?: string;
  orgId?: string;
  masterWalletId?: string;
  transactionId?: string;
  transactionHash?: string;
  status?: EventStatusType;
  blockchain?: BlockchainType;
}

export interface ValueTransferEventPaginationOptions
  extends EventPaginationOptions {
  symbol?: string;
}

export class Events {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getCallEvents(
    options?: EventPaginationOptions,
  ): Promise<Pagination<CallEvent>> {
    const queryString: string = options
      ? Object.keys(options)
          .filter((key) => !!options[key])
          .map((key) => `${toSnakeCase(key)}=${options[key]}`)
          .join('&')
      : '';

    const data = await this.client.get(
      `/call-events${queryString ? `?${queryString}` : ''}`,
    );
    return {
      pagination: data.pagination,
      results: data.results.map((e) => {
        e.confirmation = BNConverter.hexStringToBN(e.confirmation);
        return e;
      }),
    };
  }

  public async getValueTransferEvents(
    options?: ValueTransferEventPaginationOptions,
  ): Promise<Pagination<ValueTransferEvent>> {
    const queryString: string = options
      ? Object.keys(options)
          .filter((key) => !!options[key])
          .map((key) => `${toSnakeCase(key)}=${options[key]}`)
          .join('&')
      : '';
    const data = await this.client.get(
      `/value-transfer-events${queryString ? `?${queryString}` : ''}`,
    );

    return {
      pagination: data.pagination,
      results: data.results.map((e) => {
        e.amount = BNConverter.hexStringToBN(e.amount);
        e.confirmation = BNConverter.hexStringToBN(e.confirmation);
        return e;
      }),
    };
  }
}
