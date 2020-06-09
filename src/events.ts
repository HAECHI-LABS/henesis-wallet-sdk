import * as BN from 'bn.js';
import { PaginationOptions } from './types';
import { BlockchainType } from './blockchain';
import { ValueTransferEventDTO as BtcValueTransferEventDTO } from "./__generate__/btc";
import { ValueTransferEventDTO as EthValueTransferEventDTO } from "./__generate__/eth";

export type EventStatusType = BtcValueTransferEventDTO.StatusEnum | EthValueTransferEventDTO.StatusEnum;

export type TransferType = BtcValueTransferEventDTO.TransferTypeEnum | EthValueTransferEventDTO.TransferTypeEnum;

export interface Event {
  createdAt: string;
  status: EventStatusType;
  transactionHash: string;
  walletId: string;
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
