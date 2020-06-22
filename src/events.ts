import * as BN from "bn.js";
import { PaginationOptions } from "./types";
import { BlockchainType } from "./blockchain";
import { ValueTransferEventDTO as BtcValueTransferEventDTO } from "./__generate__/btc";
import { ValueTransferEventDTO as EthValueTransferEventDTO } from "./__generate__/eth";

export interface Event<S> {
  createdAt: string;
  status: S;
  transactionHash: string;
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
  walletId?: string;
  orgId?: string;
  masterWalletId?: string;
  transactionId?: string;
  transactionHash?: string;
  status?: S;
  blockchain?: BlockchainType;
}

export type BtcEventPaginationOptions = EventPaginationOptions<null>;

export type EthEventPaginationOptions = EventPaginationOptions<
  EthValueTransferEventDTO.StatusEnum
>;
