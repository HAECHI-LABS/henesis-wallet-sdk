import { RawTransactionDTO, TransactionDTO, TransactionHistoryDTO } from "../__generate__/eth";
import { RawTransaction, Transaction } from "./transactions";
import { TransactionHistory } from "./henesisKeys";
export declare const convertTransactionDTO: (transactionDTO: NoUndefinedField<TransactionDTO>) => Transaction;
export declare const convertRawTransactionDTO: (rawTransaction: RawTransactionDTO) => RawTransaction;
export declare const convertTransactionHistoryDTO: (transactionHistoryDTO: NoUndefinedField<TransactionHistoryDTO>) => TransactionHistory;
