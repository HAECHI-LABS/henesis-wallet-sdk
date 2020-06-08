import * as BN from 'bn.js';
import { PaginationOptions } from './types';
import { BlockchainType } from './blockchain';

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
