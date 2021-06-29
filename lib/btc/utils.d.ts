import { TransactionDTO as BtcTransactionDTO, TransferDTO, TransferInternalDTO } from "../__generate__/btc";
import { Transfer, TransferInternal } from "./transfers";
import { BtcTransaction } from "./wallet";
export declare const convertTransactionDTO: (transaction: BtcTransactionDTO) => BtcTransaction;
export declare const convertTransferDTO: (t: TransferDTO) => Transfer;
export declare const convertTransferInternalDTO: (transfer: TransferInternalDTO) => TransferInternal;
