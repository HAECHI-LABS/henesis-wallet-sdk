import { BNConverter } from "../utils/common";
import {
  RawTransactionDTO,
  TransactionDTO,
  TransactionHistoryDTO,
} from "../__generate__/eth";
import { transformBlockchainType } from "../blockchain";
import { RawTransaction, Transaction } from "./transactions";
import { TransactionHistory } from "./henesisKeys";

export const convertTransactionDTO = (
  transcationDTO: NoUndefinedField<TransactionDTO>
): Transaction => {
  const rawTransaction = transcationDTO.rawTransaction;
  const signedMultiSigPayload = transcationDTO.signedMultiSigPayload;
  const multiSigPayload = signedMultiSigPayload?.multiSigPayload;
  return {
    ...transcationDTO,
    blockchain: transformBlockchainType(transcationDTO.blockchain),
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
    fee: transcationDTO.fee,
    estimatedFee: transcationDTO.estimatedFee,
    isFeeDelegated: transcationDTO.isFeeDelegated,
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
  transcationHistoryDTO: NoUndefinedField<TransactionHistoryDTO>
): TransactionHistory => {
  return {
    ...convertTransactionDTO(transcationHistoryDTO),
    wallet: transcationHistoryDTO.wallet,
    type: transcationHistoryDTO.type,
    createdAt: transcationHistoryDTO.createdAt,
  };
};
