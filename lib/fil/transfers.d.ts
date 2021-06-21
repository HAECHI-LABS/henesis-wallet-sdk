import { TransferDTO, TransferInternalDTO, TransferStatus } from "../__generate__/fil";
import BN from "bn.js";
import { FilSimplifiedWalletInternal, FilTransaction } from "./abstractWallet";
import { Client } from "../httpClient";
import { Pagination, PaginationOptions, Timestamp } from "../types";
export interface FilTransfer extends Omit<TransferDTO, "amount" | "confirmation" | "transaction" | "proposalTransaction"> {
    amount: BN;
    confirmation: BN;
    transaction: FilTransaction | null;
    proposalTransaction: FilTransaction | null;
}
export interface FilTransferInternal extends Omit<TransferInternalDTO, "amount" | "transaction" | "confirmation" | "fromAddress" | "toAddress" | "proposalTransaction"> {
    amount: BN;
    transaction: FilTransaction | null;
    confirmation: BN;
    fromAddress: FilSimplifiedWalletInternal;
    toAddress: FilSimplifiedWalletInternal;
    proposalTransaction: FilTransaction | null;
}
export interface FilTransferPaginationOptions extends PaginationOptions {
    address?: string;
    toAddress?: string;
    fromAddress?: string;
    transactionHash?: string;
    updatedAtGte?: Timestamp;
    updatedAtLt?: Timestamp;
    status?: TransferStatus;
    walletId?: string;
    orgId?: string;
    transactionId?: string;
}
export declare class FilTransfers {
    private readonly client;
    constructor(client: Client);
    getTransfer(id: string): Promise<FilTransfer>;
    getTransfers(options?: FilTransferPaginationOptions): Promise<Pagination<FilTransfer>>;
    getInternalTransfer(): Promise<FilTransferInternal>;
    getInternalTransfers(options?: FilTransferPaginationOptions): Promise<Pagination<FilTransferInternal>>;
}
