import { EthValueTransferEventPaginationOptions } from "@haechi-labs/henesis-wallet-core/lib/events";
import {
  EventStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";

export class GetTransfersOption {
  ticker: string;
  depositAddressId: string;
  walletId: string;
  transactionId: string;
  transactionHash: string;
  status: EventStatus;
  transferType: TransferType;
  updatedAtGte: string;
  updatedAtLt: string;
  size: number;
  page: number;

  static toSDKOption(
    option: GetTransfersOption
  ): EthValueTransferEventPaginationOptions {
    return {
      transactionHash: option.transactionHash,
      updatedAtGte: option.updatedAtGte,
      updatedAtLt: option.updatedAtLt,
      status: option.status,
      transferType: option.transferType,
      walletId: option.depositAddressId,
      masterWalletId: option.walletId,
      transactionId: option.transactionId,
      symbol: option.ticker,
      size: option.size,
      page: option.page,
    } as EthValueTransferEventPaginationOptions;
  }
}
