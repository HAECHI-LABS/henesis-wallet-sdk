import {
  FlushDTO,
  FlushTarget,
  BalanceDTO,
  TransactionDTO,
  TransferDTO,
  TransferInternalDTO,
  RawSignedTransactionDTO,
  WalletBalanceDTO,
} from "../__generate__/fil";
import { FilTransfer, FilTransferInternal } from "./transfers";
import { FilTransaction } from "./abstractWallet";
import BN from "bn.js";
import {
  FilFlush,
  FilFlushTarget,
  Message,
  RawTransaction,
  SignedTransaction,
} from "./wallet";
import { BNConverter } from "../utils/common";
import { Balance } from "../types";

export const convertDtoToTransaction = (
  transactionDTO: TransactionDTO
): FilTransaction => {
  if (transactionDTO) {
    return {
      ...transactionDTO,
      nonce: BNConverter.hexStringToBnOrElseNull(transactionDTO.nonce),
      amount: BNConverter.hexStringToBnOrElseNull(transactionDTO.amount),
      gasLimit: BNConverter.hexStringToBnOrElseNull(transactionDTO.gasLimit),
      gasFeeCap: BNConverter.hexStringToBnOrElseNull(transactionDTO.gasFeeCap),
      gasPremium: BNConverter.hexStringToBnOrElseNull(
        transactionDTO.gasPremium
      ),
      gasUsed: BNConverter.hexStringToBnOrElseNull(transactionDTO.gasUsed),
      feeAmount: BNConverter.hexStringToBnOrElseNull(transactionDTO.feeAmount),
    };
  }

  return null;
};

export const convertDtoToTransfer = (transferDTO: TransferDTO): FilTransfer => {
  return transferDTO
    ? {
        ...transferDTO,
        amount: BNConverter.hexStringToBnOrElseNull(transferDTO.amount),
        transaction: convertDtoToTransaction(transferDTO.transaction),
        proposalTransaction: convertDtoToTransaction(
          transferDTO.proposalTransaction
        ),
      }
    : null;
};

export const convertTransferInternalDTO = (
  transfer: TransferInternalDTO
): FilTransferInternal => {
  return {
    ...transfer,
    amount: BNConverter.hexStringToBN(transfer.amount),
    transaction: transfer.transaction
      ? convertDtoToTransaction(transfer.transaction)
      : null,
    confirmation: BNConverter.hexStringToBN(transfer.confirmation),
    proposalTransaction: transfer.proposalTransaction
      ? convertDtoToTransaction(transfer.proposalTransaction)
      : null,
  };
};

export const convertSignedTransactionToRawSignedTransactionDTO = (
  transaction: SignedTransaction
): RawSignedTransactionDTO => {
  if (transaction) {
    const message = transaction.message;
    const signature = transaction.signature;
    return {
      cid: transaction.cid,
      message: {
        cid: message.cid,
        version: message.version,
        to: message.to,
        from: message.from,
        nonce:
          message.nonce != null
            ? BNConverter.bnToHexString(new BN(message.nonce))
            : null,
        value: BNConverter.bnToHexStringOrElseNull(message.value),
        method: message.method,
        params: message.params,
        gasLimit:
          message.gasLimit != null
            ? BNConverter.bnToHexString(new BN(message.gasLimit))
            : null,
        gasFeeCap: BNConverter.bnToHexStringOrElseNull(message.gasFeeCap),
        gasPremium: BNConverter.bnToHexStringOrElseNull(message.gasPremium),
      },
      signature: {
        data: signature.data,
        type: signature.type,
      },
    };
  }
  return null;
};

export const convertMessageToObject = (
  message: Message
): {
  to: string;
  from: string;
  nonce: number;
  value: string;
  gaslimit: number;
  gasfeecap: string;
  gaspremium: string;
  method: number;
  params: string;
} => {
  return message
    ? {
        to: message.to,
        from: message.from,
        nonce: message.nonce,
        value: message.value != null ? message.value.toString() : null,
        gaslimit: message.gasLimit,
        gasfeecap:
          message.gasFeeCap != null ? message.gasFeeCap.toString() : null,
        gaspremium:
          message.gasPremium != null ? message.gasPremium.toString() : null,
        method: message.method,
        params: message.params != null ? message.params : "",
      }
    : null;
};

export const convertRawTransactionToMessage = (
  rawTransaction: RawTransaction
): Message => {
  return rawTransaction
    ? {
        ...rawTransaction,
        value: BNConverter.hexStringToBnOrElseNull(rawTransaction.value),
        gasLimit:
          rawTransaction.gasLimit != null
            ? BNConverter.hexStringToBN(rawTransaction.gasLimit).toNumber()
            : null,
        gasFeeCap: BNConverter.hexStringToBnOrElseNull(
          rawTransaction.gasFeeCap
        ),
        gasPremium: BNConverter.hexStringToBnOrElseNull(
          rawTransaction.gasPremium
        ),
        nonce:
          rawTransaction.nonce != null
            ? BNConverter.hexStringToBN(rawTransaction.nonce).toNumber()
            : null,
      }
    : null;
};

export const convertFilFlushTargetToDto = (
  flushTarget: FilFlushTarget
): FlushTarget => {
  return {
    depositAddressId: flushTarget.depositAddressId,
    flushTransaction: convertSignedTransactionToRawSignedTransactionDTO(
      flushTarget.flushTransaction
    ),
  };
};

export const convertDtoToFlush = (flushDTO: FlushDTO): FilFlush => {
  return flushDTO
    ? {
        ...flushDTO,
        transfers: flushDTO.transfers.map(convertDtoToTransfer),
      }
    : null;
};

export const convertBalanceDtoToFilBalance = (
  balanceDTO: BalanceDTO
): Balance => {
  return {
    coinId: null,
    symbol: "FIL",
    amount: BNConverter.hexStringToBN(balanceDTO.confirmedBalance),
    spendableAmount: BNConverter.hexStringToBN(balanceDTO.spendableBalance),
    coinType: "FIL",
    name: "Filecoin",
    decimals: 18,
  };
};

export const convertWalletBalanceDtoToFilBalance = (
  balanceDTO: WalletBalanceDTO
): Balance => {
  return {
    coinId: null,
    symbol: "FIL",
    amount: BNConverter.hexStringToBN(balanceDTO.confirmedBalance),
    spendableAmount: BNConverter.hexStringToBN(balanceDTO.spendableBalance),
    aggregatedAmount: BNConverter.hexStringToBN(balanceDTO.aggregatedBalance),
    coinType: "FIL",
    name: "Filecoin",
    decimals: 18,
  };
};
