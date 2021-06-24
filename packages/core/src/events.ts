import * as BN from "bn.js";
import { PaginationOptions, Timestamp } from "./types";
import { TransferType, EventStatus, WalletType } from "./__generate__/eth";

export interface Event {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: EventStatus;
  transactionHash?: string;
  walletId: string;
  transactionId?: string;
  orgId?: string;
  masterWalletId?: string;
  confirmation: BN;
  metadata?: string;
}

export type EthCallEvent = CallEvent;

export interface CallEvent extends Event {
  fromAddress: string;
  toAddress: string;
  data: string;
}

export interface ValueTransferEvent extends Event {
  amount: BN;
  decimals: number;
  coinSymbol: string;
  from: string;
  to: string;
  transferType: TransferType;
  walletName: string;
  walletType: WalletType;
}

export type EthValueTransferEvent = ValueTransferEvent;

export interface EventPaginationOptions extends PaginationOptions {
  address?: string;
  toAddress?: string;
  fromAddress?: string;
  transactionHash?: string;
  updatedAtGte?: Timestamp;
  updatedAtLt?: Timestamp;
  status?: EventStatus;
  walletId?: string;
  orgId?: string;
  masterWalletId?: string;
  transactionId?: string;
  symbol?: string;
}

export interface ValueTransferEventPaginationOptions
  extends EventPaginationOptions {
  transferType?: TransferType;
}

export type EthEventPaginationOptions = EventPaginationOptions;

export type EthValueTransferEventPaginationOptions =
  ValueTransferEventPaginationOptions;
