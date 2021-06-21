import { TransactionDTO, TransferDTO } from "../__generate__/fil";
import { FilTransfer } from "./transfers";
import { FilTransaction } from "./abstractWallet";
export declare const convertTransactionDTO: (transaction: TransactionDTO) => FilTransaction;
export declare const convertTransferDTO: (t: TransferDTO) => FilTransfer;
