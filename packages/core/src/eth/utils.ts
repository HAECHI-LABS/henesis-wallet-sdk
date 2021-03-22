import { BNConverter } from "@utils/common";
import {
  RawTransactionDTO,
  TransactionDTO,
  TransactionHistoryDTO,
} from "src/__generate__/eth";
import { transformBlockchainType } from "src/blockchain";
import { RawTransaction, Transaction } from "@eth/transactions";
import { TransactionHistory } from "@eth/henesisKeys";

export const convertTransactionDTO = (
  transactionDTO: NoUndefinedField<TransactionDTO>
): Transaction => {
  const rawTransaction = transactionDTO.rawTransaction;
  const signedMultiSigPayload = transactionDTO.signedMultiSigPayload;
  const multiSigPayload = signedMultiSigPayload?.multiSigPayload;
  return {
    ...transactionDTO,
    blockchain: transformBlockchainType(transactionDTO.blockchain),
    signedMultiSigPayload: signedMultiSigPayload
      ? {
          ...signedMultiSigPayload,
          multiSigPayload: multiSigPayload
            ? {
                ...multiSigPayload,
                value: BNConverter.hexStringToBN(String(multiSigPayload.value)),
                walletNonce: BNConverter.hexStringToBN(
                  String(multiSigPayload.walletNonce)
                ),
              }
            : null,
        }
      : null,
    rawTransaction: convertRawTransactionDTO(rawTransaction),
    fee: BNConverter.hexStringToBN(String(transactionDTO.fee)),
    estimatedFee: BNConverter.hexStringToBN(
      String(transactionDTO.estimatedFee)
    ),
    isFeeDelegated: transactionDTO.isFeeDelegated,
  };
};

export const convertRawTransactionDTO = (
  rawTransaction: RawTransactionDTO
): RawTransaction => {
  return rawTransaction
    ? {
        ...rawTransaction,
        nonce: rawTransaction.nonce
          ? BNConverter.hexStringToBN(String(rawTransaction.nonce))
          : null,
        gasPrice: rawTransaction.gasPrice
          ? BNConverter.hexStringToBN(String(rawTransaction.gasPrice))
          : null,
        gasLimit: rawTransaction.gasLimit
          ? BNConverter.hexStringToBN(String(rawTransaction.gasLimit))
          : null,
        to: rawTransaction.to,
        value: rawTransaction.value
          ? BNConverter.hexStringToBN(String(rawTransaction.value))
          : null,
        data: rawTransaction.data,
      }
    : null;
};

export const convertTransactionHistoryDTO = (
  transactionHistoryDTO: NoUndefinedField<TransactionHistoryDTO>
): TransactionHistory => {
  return {
    ...convertTransactionDTO(transactionHistoryDTO),
    wallet: transactionHistoryDTO.wallet,
    type: transactionHistoryDTO.type,
    createdAt: transactionHistoryDTO.createdAt,
  };
};
