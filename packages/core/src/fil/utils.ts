import {
  FlushDTO,
  FlushTarget,
  RawSignedTransactionDTO,
  TransactionDTO,
  TransferDTO,
  TransferInternalDTO,
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

const Cid = require("cids");
const multihashing = require("multihashing-async");

export const convertDtoToTransaction = (
  transactionDTO: TransactionDTO
): FilTransaction => {
  return transactionDTO
    ? {
        ...transactionDTO,
        nonce: BNConverter.hexStringToBnOrElseNull(transactionDTO.nonce),
        amount: BNConverter.hexStringToBnOrElseNull(transactionDTO.amount),
        feeAmount: BNConverter.hexStringToBnOrElseNull(
          transactionDTO.feeAmount
        ),
      }
    : null;
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
  return transaction
    ? {
        ...transaction,
        nonce: transaction.nonce
          ? BNConverter.bnToHexString(new BN(transaction.nonce))
          : null,
        value: BNConverter.bnToHexStringOrElseNull(transaction.value),
        gasLimit: transaction.gasLimit
          ? BNConverter.bnToHexString(new BN(transaction.gasLimit))
          : null,
        gasFeeCap: BNConverter.bnToHexStringOrElseNull(transaction.gasFeeCap),
        gasPremium: BNConverter.bnToHexStringOrElseNull(transaction.gasPremium),
        signature: transaction.data,
        signatureType: transaction.type,
      }
    : null;
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
        value: message.value ? message.value.toString() : null,
        gaslimit: message.gasLimit,
        gasfeecap: message.gasFeeCap ? message.gasFeeCap.toString() : null,
        gaspremium: message.gasPremium ? message.gasPremium.toString() : null,
        method: message.method,
        params: message.params,
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
        gasLimit: rawTransaction.gasLimit
          ? BNConverter.hexStringToBN(rawTransaction.gasLimit).toNumber()
          : null,
        gasFeeCap: BNConverter.hexStringToBnOrElseNull(
          rawTransaction.gasFeeCap
        ),
        gasPremium: BNConverter.hexStringToBnOrElseNull(
          rawTransaction.gasPremium
        ),
        nonce: rawTransaction.nonce
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
        transfers: flushDTO.transfers.map(
          (transferDTO: TransferDTO): FilTransfer =>
            convertDtoToTransfer(transferDTO)
        ),
      }
    : null;
};

export const calculateCidFromBytes = async (bytes: Buffer): Promise<string> => {
  console.log(bytes);
  const hash = await multihashing(new Uint8Array(bytes), "sha2-256");
  return new Cid(1, "dag-pb", hash).toString();
};
