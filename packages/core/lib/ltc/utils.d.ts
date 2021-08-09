import { TransactionDTO as LtcTransactionDTO, TransferDTO, TransferInternalDTO } from "../__generate__/ltc";
import { Transfer, TransferInternal } from "./transfers";
import { LtcTransaction } from "./wallet";
export declare const convertTransactionDTO: (transaction: LtcTransactionDTO) => LtcTransaction;
export declare const convertTransferDTO: (t: TransferDTO) => Transfer;
export declare const convertTransferInternalDTO: (transfer: TransferInternalDTO) => TransferInternal;
