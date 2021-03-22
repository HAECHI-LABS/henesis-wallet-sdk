import {
  TransactionDTO as BtcTransactionDTO,
  TransferDTO,
  TransferInternalDTO,
} from "src/__generate__/btc";
import { Transfer, TransferInternal } from "@btc/transfers";
import { BtcTransaction, BtcTransactionOutput } from "@btc/wallet";
import { BNConverter } from "@utils/common";

export const convertTransactionDTO = (
  transaction: BtcTransactionDTO
): BtcTransaction => {
  return {
    ...transaction,
    amount: BNConverter.hexStringToBN(String(transaction.amount)),
    blockNumber: transaction.blockNumber
      ? BNConverter.hexStringToBN(String(transaction.blockNumber))
      : null,
    feeAmount: transaction.feeAmount
      ? BNConverter.hexStringToBN(String(transaction.feeAmount))
      : null,
    outputs: transaction.outputs.map((o) => {
      return {
        transactionId: o.transactionId,
        outputIndex: o.outputIndex,
        address: o.address,
        scriptPubKey: o.scriptPubKey,
        amount: BNConverter.hexStringToBN(String(o.amount)),
        isChange: o.isChange,
      } as BtcTransactionOutput;
    }),
  };
};

export const convertTransferDTO = (t: TransferDTO): Transfer => {
  return {
    ...t,
    transaction: t.transaction ? convertTransactionDTO(t.transaction) : null,
    feeAmount: t.feeAmount ? BNConverter.hexStringToBN(t.feeAmount) : null,
    amount: BNConverter.hexStringToBN(t.amount),
    confirmation: BNConverter.hexStringToBN(t.confirmation),
  };
};

export const convertTransferInternalDTO = (
  transfer: TransferInternalDTO
): TransferInternal => {
  return {
    ...transfer,
    transaction: transfer.transaction
      ? convertTransactionDTO(transfer.transaction)
      : null,
    feeAmount: transfer.feeAmount
      ? BNConverter.hexStringToBN(transfer.feeAmount)
      : null,
    amount: BNConverter.hexStringToBN(transfer.amount),
    confirmation: BNConverter.hexStringToBN(transfer.confirmation),
  };
};
