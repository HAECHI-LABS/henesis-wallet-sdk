import * as BN from "bn.js";
import { PaginationOptions, Timestamp } from "./types";
import { TransferType, EventStatus, WalletType } from "./__generate__/eth";

export interface Event<S> {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: S;
  transactionHash?: string;
  walletId: string;
  transactionId?: string;
  orgId?: string;
  masterWalletId?: string;
  confirmation: BN;
}

export type BtcEvent = Event<null>;

export type EthCallEvent = CallEvent<EventStatus>;

export interface CallEvent<T> extends Event<T> {
  fromAddress: string;
  toAddress: string;
  data: string;
}

export interface ValueTransferEvent<S> extends Event<S> {
  amount: BN;
  coinSymbol: string;
  from: string;
  to: string;
  transferType: TransferType;
  walletName: string;
  walletType: WalletType;
}

export type EthValueTransferEvent = ValueTransferEvent<EventStatus>;

export interface EventPaginationOptions<S> extends PaginationOptions {
  address?: string;
  toAddress?: string;
  fromAddress?: string;
  transactionHash?: string;
  updatedAtGte?: Timestamp;
  updatedAtLt?: Timestamp;
  status?: S;
  walletId?: string;
  orgId?: string;
  masterWalletId?: string;
  transactionId?: string;
  symbol?: string;
}

export interface ValueTransferEventPaginationOptions<S>
  extends EventPaginationOptions<S> {
  symbol?: string;
}

export type BtcEventPaginationOptions = EventPaginationOptions<null>;

export type EthEventPaginationOptions = EventPaginationOptions<EventStatus>;

export type EthValueTransferEventPaginationOptions = ValueTransferEventPaginationOptions<
  EventStatus
>;
