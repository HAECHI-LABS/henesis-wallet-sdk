import * as BN from "bn.js";
import { PaginationOptions, Timestamp } from "./types";
import {
  TransferType,
  EventStatus,
  WalletType,
  CallEventDTO,
  ValueTransferEventDTO,
  ValueTransferEventSearchCondition,
} from "./__generate__/eth";

interface Event {
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
}

interface CallEvent extends Omit<CallEventDTO, "confirmation"> {
  fromAddress: string;
  toAddress: string;
  data: string;
  confirmation: BN;
}

// CallEventDTO
export type EthCallEvent = CallEvent;

interface ValueTransferEvent
  extends Omit<
    ValueTransferEventDTO,
    "amount" | "blockchain" | "confirmation" | "blockHash"
  > {}

export type EthValueTransferEvent = ValueTransferEvent;

interface ValueTransferEventPaginationOptions
  extends PaginationOptions,
    Omit<
      ValueTransferEventSearchCondition,
      "blockchain" | "start" | "end" | "status" | "transferType"
    > {
  status?: EventStatus;
}

export interface EthCallEventPaginationOptions extends PaginationOptions {
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

export interface EthValueTransferEventPaginationOptions
  extends ValueTransferEventPaginationOptions {}
