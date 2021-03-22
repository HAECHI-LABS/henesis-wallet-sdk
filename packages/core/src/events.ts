import * as BN from "bn.js";
import { PaginationOptions, Timestamp } from "./types";
import { TransferType, EventStatus, WalletType } from "./__generate__/eth";

export type Event = {
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
};

export type EthCallEvent = CallEvent;

export type CallEvent = Event & {
  fromAddress: string;
  toAddress: string;
  data: string;
};

export type ValueTransferEvent = Event & {
  amount: BN;
  decimals: number;
  coinSymbol: string;
  from: string;
  to: string;
  transferType: TransferType;
  walletName: string;
  walletType: WalletType;
};

export type EthValueTransferEvent = ValueTransferEvent;

export type EventPaginationOptions = PaginationOptions & {
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
};

export type ValueTransferEventPaginationOptions = EventPaginationOptions & {
  symbol?: string;
};

export type EthEventPaginationOptions = EventPaginationOptions;

export type EthValueTransferEventPaginationOptions = ValueTransferEventPaginationOptions;
