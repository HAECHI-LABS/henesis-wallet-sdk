import {
  TransferStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/fil";
import { TransactionDTO } from "./transaction.dto";
import { FilTransfer } from "@haechi-labs/henesis-wallet-core/lib/fil";

export class TransferDTO {
  id: string;
  from: string;
  to: string;
  amount: string;
  status: TransferStatus;
  walletId: string;
  type: TransferType;
  transaction: TransactionDTO;
  createdAt: string;
  updatedAt: string;

  static fromTransfer(transfer: FilTransfer): TransferDTO {
    return {
      id: transfer.id,
      from: transfer.fromAddress,
      to: transfer.toAddress,
      amount: transfer.amount.toString(10),
      status: transfer.status,
      walletId: transfer.walletId,
      type: transfer.type,
      transaction: {
        id: transfer.transaction.id,
      },
      createdAt: transfer.createdAt,
      updatedAt: transfer.updatedAt,
    };
  }
}
