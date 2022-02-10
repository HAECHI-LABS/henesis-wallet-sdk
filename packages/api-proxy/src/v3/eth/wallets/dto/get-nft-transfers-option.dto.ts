import { EthNftTransferEventPaginationOptions } from "@haechi-labs/henesis-wallet-core/lib/events";
import {
  EventStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";

export class GetNftTransfersOption {
  nftId: number;
  tokenName: string;
  tokenOnchainId: string;
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
    option: GetNftTransfersOption
  ): EthNftTransferEventPaginationOptions {
    return {
      transactionHash: option.transactionHash,
      updatedAtGte: option.updatedAtGte,
      updatedAtLt: option.updatedAtLt,
      status: option.status,
      transferType: option.transferType,
      masterWalletId: option.walletId,
      walletId: option.depositAddressId,
      transactionId: option.transactionId,
      nftId: option.nftId,
      tokenName: option.tokenName,
      tokenOnchainId: option.tokenOnchainId,
      size: option.size,
      page: option.page,
    } as EthNftTransferEventPaginationOptions;
  }
}
