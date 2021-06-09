import {
  RawSignedTransactionDTO,
  TransactionDTO,
  TransferDTO, TransferInternalDTO
} from "../__generate__/fil";
import { FilTransfer, FilTransferInternal } from "./transfers";
import { FilTransaction } from "./abstractWallet";
import BN from "bn.js";
import { Message, RawTransaction, SignedTransaction } from "./wallet";
import { BNConverter } from "../utils/common";

const Cid = require("cids");
const multihashing = require("multihashing-async");

export const convertTransactionDTO = (
  transaction: TransactionDTO
): FilTransaction => {
  return {
    ...transaction,
    nonce: BNConverter.hexStringToBN(transaction.nonce),
    amount: BNConverter.hexStringToBN(transaction.amount),
    feeAmount:
      transaction.feeAmount != undefined
        ? BNConverter.hexStringToBN(transaction.feeAmount)
        : undefined,
  };
};

export const convertTransferDTO = (t: TransferDTO): FilTransfer => {
  return {
    ...t,
    amount: BNConverter.hexStringToBN(t.amount),
    transaction: convertTransactionDTO(t.transaction),
    proposalTransaction: convertTransactionDTO(t.proposalTransaction),
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

export const convertSignedTransactionToRawSignedTransactionDTO = (
  t: SignedTransaction
): RawSignedTransactionDTO => {
  return {
    ...t,
    nonce: BNConverter.bnToHexString(new BN(t.nonce)),
    value: BNConverter.bnToHexString(t.value),
    gasLimit: BNConverter.bnToHexString(new BN(t.gasLimit)),
    gasFeeCap: BNConverter.bnToHexString(t.gasFeeCap),
    gasPremium: BNConverter.bnToHexString(t.gasPremium),
    signature: t.data,
    signatureType: t.type,
  };
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
  return {
    to: message.to,
    from: message.from,
    nonce: message.nonce,
    value: message.value.toString(),
    gaslimit: message.gasLimit,
    gasfeecap: message.gasFeeCap.toString(),
    gaspremium: message.gasPremium.toString(),
    method: message.method,
    params: message.params,
  };
};

export const convertRawTransactionToMessage = (
  rawTransaction: RawTransaction
): Message => {
  return {
    ...rawTransaction,
    value: BNConverter.hexStringToBN(rawTransaction.value),
    gasLimit: BNConverter.hexStringToBN(rawTransaction.gasLimit).toNumber(),
    gasFeeCap: BNConverter.hexStringToBN(rawTransaction.gasFeeCap),
    gasPremium: BNConverter.hexStringToBN(rawTransaction.gasPremium),
    nonce: BNConverter.hexStringToBN(rawTransaction.nonce).toNumber(),
  };
};

export const calculateCidFromBytes = async (bytes: Buffer): Promise<string> => {
  console.log(bytes);
  const hash = await multihashing(new Uint8Array(bytes), "sha2-256");
  return new Cid(1, "dag-pb", hash).toString();
};
