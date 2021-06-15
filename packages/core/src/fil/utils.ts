import {
  TransactionDTO,
  TransferInternalDTO,
  TransferDTO,
} from "../__generate__/fil";
import { FilTransfer, FilTransferInternal } from "./transfers";
import { FilTransaction } from "./abstractWallet";
import { BNConverter } from "../utils/common";
import BN from "bn.js";

// TODO: implement me
export const convertTransactionDTO = (
  transaction: TransactionDTO
): FilTransaction => {
  return null;
};

export const convertTransferDTO = (t: TransferDTO): FilTransfer => {
  return {
    ...t,
    transaction: t.transaction ? convertTransactionDTO(t.transaction) : null,
    amount: BNConverter.hexStringToBN(t.amount),
    confirmation: new BN(0), // TODO
    // confirmation: BNConverter.hexStringToBN(t.confirmation),
    proposalTransaction: t.proposalTransaction
      ? convertTransactionDTO(t.proposalTransaction)
      : null,
  };
};

export const convertTransferInternalDTO = (
  transfer: TransferInternalDTO
): FilTransferInternal => {
  return {
    ...transfer,
    amount: BNConverter.hexStringToBN(transfer.amount),
    transaction: transfer.transaction
      ? convertTransactionDTO(transfer.transaction)
      : null,
    confirmation: BNConverter.hexStringToBN(transfer.confirmation),
    proposalTransaction: transfer.proposalTransaction
      ? convertTransactionDTO(transfer.proposalTransaction)
      : null,
  };
};
