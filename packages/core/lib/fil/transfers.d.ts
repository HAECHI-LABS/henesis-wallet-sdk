import { TransferDTO, TransferInternalDTO, TransferStatus, TransferType } from "../__generate__/fil";
import BN from "bn.js";
import { FilSimplifiedWallet, FilTransaction } from "./abstractWallet";
import { Client } from "../httpClient";
import { Pagination, PaginationOptions, Timestamp } from "../types";
export interface FilTransfer extends Omit<TransferDTO, "amount" | "transaction" | "proposalTransaction"> {
    amount: BN;
    transaction: FilTransaction | null;
    proposalTransaction: FilTransaction | null;
}
export interface FilTransferInternal extends Omit<TransferInternalDTO, "amount" | "transaction" | "confirmation" | "fromAddress" | "toAddress" | "proposalTransaction"> {
    amount: BN;
    transaction: FilTransaction | null;
    confirmation: BN;
    fromAddress: FilSimplifiedWallet;
    toAddress: FilSimplifiedWallet;
    proposalTransaction: FilTransaction | null;
}
export interface FilTransferPaginationOptions extends PaginationOptions {
    address?: string;
    toAddress?: string;
    fromAddress?: string;
    updatedAtGte?: Timestamp;
    updatedAtLt?: Timestamp;
    status?: TransferStatus;
    masterWalletId?: string;
    walletId?: string;
    orgId?: string;
    transactionId?: string;
    transactionHash?: string;
    transferType?: TransferType;
}
export declare class FilTransfers {
    private readonly client;
    constructor(client: Client);
    getTransfer(id: string): Promise<FilTransfer>;
    getTransfers(options?: FilTransferPaginationOptions): Promise<Pagination<FilTransfer>>;
    getInternalTransfer(id: string): Promise<FilTransferInternal>;
    getInternalTransfers(options?: FilTransferPaginationOptions): Promise<Pagination<FilTransferInternal>>;
}
