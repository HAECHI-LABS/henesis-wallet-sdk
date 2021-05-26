import { TransactionDTO, TransferDTO } from "../__generate__/fil";
import { FilTransfer } from "./transfers";
import { FilTransaction } from "./abstractWallet";

// TODO: implement me
export const convertTransactionDTO = (
  transaction: TransactionDTO
): FilTransaction => {
  return null;
};

// TODO: implement me
export const convertTransferDTO = (t: TransferDTO): FilTransfer => {
  return null;
};
