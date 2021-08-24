import { Pagination, PaginationOptions, Timestamp } from "../types";
import { Client } from "../httpClient";
import { BtcTransaction } from "./wallet";
import { TransferDTO, TransferType, TransferStatus, TransferInternalDTO } from "../__generate__/btc";
import BN from "bn.js";
export import TransferStatus = TransferStatus;
export import TransferType = TransferType;
export interface TransferPaginationOptions extends PaginationOptions {
    walletId?: string;
    type?: TransferType;
    status?: TransferStatus;
    address?: string;
    transactionHash?: string;
    updatedAtGte?: Timestamp;
    updatedAtLt?: Timestamp;
}
export interface Transfer extends Omit<TransferDTO, "amount" | "feeAmount" | "confirmation" | "transaction"> {
    amount: BN;
    feeAmount: BN | null;
    confirmation: BN;
    transaction: BtcTransaction | null;
}
export interface TransferInternal extends Omit<TransferInternalDTO, "amount" | "feeAmount" | "confirmation" | "transaction"> {
    amount: BN;
    feeAmount: BN | null;
    confirmation: BN;
    transaction: BtcTransaction | null;
}
export declare class BtcTransfers {
    private readonly client;
    constructor(client: Client);
    getTransfer(id: string): Promise<Transfer>;
    getTransfers(options?: TransferPaginationOptions): Promise<Pagination<Transfer>>;
    getInternalTransfer(id: string): Promise<TransferInternal>;
    getInternalTransfers(options?: TransferPaginationOptions): Promise<Pagination<TransferInternal>>;
}