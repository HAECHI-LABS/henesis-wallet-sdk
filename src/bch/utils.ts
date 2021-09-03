import {
  TransactionDTO as BtcTransactionDTO,
  TransferDTO,
  TransferInternalDTO,
} from "../__generate__/btc";
import { Transfer, TransferInternal } from "./transfers";
import { BchTransaction, BchTransactionOutput } from "./wallet";
import { BNConverter } from "../utils/common";
import { Buffer } from "buffer";
import CashAddress from "./cashAddress";
const cashAddress = new CashAddress();
const typeforce = require("typeforce");
const bip66 = require("bip66");

export const convertTransactionDTO = (
  transaction: BtcTransactionDTO
): BchTransaction => {
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
      } as BchTransactionOutput;
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

export const toLegacyAddress = (address: string) => {
  return cashAddress.toLegacyAddress(address);
};

// ref: https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/src/script_signature.js#L35
// this is to use bitcoinjs-lib for bch
// bitcoin cash use sigHash 'FORKID' and bitcoinjs-lib cannot translate 'FORKID'.
export const encodeScriptSignature = (signature: Buffer, hashType: number) => {
  typeforce(
    {
      signature: typeforce.BufferN(64),
      hashType: typeforce.UInt8,
    },
    { signature, hashType }
  );
  // const hashTypeMod = hashType & ~0x80;
  // if (hashTypeMod <= 0 || hashTypeMod >= 4)
  //   throw new Error('Invalid hashType ' + hashType);
  const hashTypeBuffer = Buffer.allocUnsafe(1);
  hashTypeBuffer.writeUInt8(hashType, 0);
  const r = toDER(signature.slice(0, 32));
  const s = toDER(signature.slice(32, 64));
  return Buffer.concat([bip66.encode(r, s), hashTypeBuffer]);
};

const ZERO = Buffer.alloc(1, 0);
function toDER(x) {
  let i = 0;
  while (x[i] === 0) ++i;
  if (i === x.length) return ZERO;
  x = x.slice(i);
  if (x[0] & 0x80) return Buffer.concat([ZERO, x], 1 + x.length);
  return x;
}
