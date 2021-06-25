import {
  TransferStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/fil";

export class GetTransfersOption {
  address?: string;
  toAddress?: string;
  fromAddress?: string;
  transactionId?: string;
  transactionHash?: string;
  updatedAtGte?: string;
  updatedAtLt?: string;
  status?: TransferStatus;
  walletId?: string;
  transferType?: TransferType;
  size: number;
  page: number;
}
