import * as BN from "bn.js";
import { PaginationOptions, Timestamp } from "./types";
import { BlockchainType } from "./blockchain";
import { ValueTransferEventDTO as BtcValueTransferEventDTO } from "./__generate__/btc";
import { ValueTransferEventDTO as EthValueTransferEventDTO } from "./__generate__/eth";

export interface Event<S> {
  createdAt: string;
  status: S;
  transactionHash?: string;
  walletId: string;
}

export type BtcEvent = Event<null>;

export type EthCallEvent = CallEvent<EthValueTransferEventDTO.StatusEnum>;

export interface CallEvent<T> extends Event<T> {
  toAddress: string;
}

export interface ValueTransferEvent<S, T> extends Event<S> {
  amount: BN;
  coinSymbol: string;
  from: string;
  to: string;
  transferType: T;
}

export type BtcValueTransferEvent = ValueTransferEvent<
  null,
  BtcValueTransferEventDTO.TransferTypeEnum
>;

export type EthValueTransferEvent = ValueTransferEvent<
  EthValueTransferEventDTO.StatusEnum,
  EthValueTransferEventDTO.TransferTypeEnum
>;

export interface EventPaginationOptions<S> extends PaginationOptions {
  address?: string;
  toAddress?: string;
  fromAddress?: string;
  transactionHash?: string;
  start?: Timestamp;
  end?: Timestamp;
  status?: S;
  walletId?: string;
  orgId?: string;
  masterWalletId?: string;
  transactionId?: string;
}

export type BtcEventPaginationOptions = EventPaginationOptions<null>;

export type EthEventPaginationOptions = EventPaginationOptions<
  EthValueTransferEventDTO.StatusEnum
>;
