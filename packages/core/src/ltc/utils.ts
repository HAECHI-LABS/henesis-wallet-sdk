import {
  TransactionDTO as LtcTransactionDTO,
  TransferDTO,
  TransferInternalDTO,
} from "../__generate__/ltc";
import { Transfer, TransferInternal } from "./transfers";
import { LtcTransaction, LtcTransactionOutput } from "./wallet";
import { BNConverter } from "../utils/common";
import * as bitcoin from "bitcoinjs-lib";

export const convertTransactionDTO = (
  transaction: LtcTransactionDTO
): LtcTransaction => {
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
      } as LtcTransactionOutput;
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

/**
 * Return true when the address is legacy p2sh address.
 * Other address types like p2pkh will return
 */
export function isLegacyAddress(address: string): boolean {
  try {
    const decoded = bitcoin.address.fromBase58Check(address);
    const version = decoded["version"];

    switch (version) {
      case 5:
      case 196:
        return true;
      default:
        return false;
    }
  } catch (err) {
    return false;
  }
}

/**
 * Return true when the address is new p2sh address.
 * Other address types like p2pkh will return false;
 */
export function isNewAddress(address: string): boolean {
  try {
    const decoded = bitcoin.address.fromBase58Check(address);
    const version = decoded["version"];

    switch (version) {
      case 50:
      case 58:
        return true;
      default:
        return false;
    }
  } catch (err) {
    return false;
  }
}

/**
 * Return new address if the address is legacy address.
 * Return null if the address is not a legacy address.
 */
export function convertToNewAddress(address: string): string | null {
  try {
    const decoded = bitcoin.address.fromBase58Check(address);
    const version = decoded["version"];

    let newVersion;
    switch (version) {
      case 5:
        newVersion = 50;
        break;
      case 196:
        newVersion = 58;
        break;
      default:
        return null;
    }
    return bitcoin.address.toBase58Check(decoded["hash"], newVersion);
  } catch (err) {
    return null;
  }
}

/**
 * Return legacy address if the address is new address.
 * Return null if the address is not a new address.
 */
export function convertToLegacyAddress(address: string): string | null {
  try {
    const decoded = bitcoin.address.fromBase58Check(address);
    const version = decoded["version"];

    let newVersion;
    switch (version) {
      case 50:
        newVersion = 5;
        break;
      case 58:
        newVersion = 196;
        break;
      default:
        return null;
    }
    return bitcoin.address.toBase58Check(decoded["hash"], newVersion);
  } catch (err) {
    return null;
  }
}
