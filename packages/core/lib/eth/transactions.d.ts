import * as BN from "bn.js";
import { BlockchainType } from "../blockchain";
import { Pagination, PaginationOptions, Timestamp } from "../types";
import { Client } from "../httpClient";
import { TransactionStatus, TransactionType } from "../__generate__/eth";
export import TransactionStatus = TransactionStatus;
export interface DetailedRawTransaction extends RawTransaction {
    fee: BN | null;
}
export interface Transaction {
    id: string;
    blockchain: BlockchainType;
    sender: string;
    keyId: string;
    hash: string;
    error: string;
    signedMultiSigPayload: SignedMultiSigPayload | null;
    rawTransaction: RawTransaction;
    status: TransactionStatus;
    isFeeDelegated: boolean;
    fee?: BN;
    estimatedFee?: BN;
    createdAt: string;
    updatedAt: string;
}
export interface TransactionPaginationOptions extends PaginationOptions {
    address?: string;
    toAddress?: string;
    fromAddress?: string;
    transactionHash?: string;
    start?: Timestamp;
    end?: Timestamp;
    status?: TransactionStatus;
    statuses?: TransactionStatus[];
    types?: TransactionType[];
    keyId?: string;
}
export interface MultiSigPayload {
    walletAddress: string;
    toAddress: string;
    value: BN;
    walletNonce: BN;
    hexData: string;
}
export declare const formatMultiSigPayload: (multiSigPayload: MultiSigPayload) => string;
export interface SignedMultiSigPayload {
    signature: string;
    multiSigPayload: MultiSigPayload | null;
}
export interface RawTransaction {
    nonce: BN;
    gasPrice: BN;
    gasLimit: BN;
    to: string;
    value: BN;
    data: string;
}
export declare class Transactions {
    private readonly client;
    constructor(client: Client);
    private mappingDetailedRawTransactionDTOToDetailedRawTransaction;
    getRawTransaction(transactionHash: string): Promise<DetailedRawTransaction>;
    getTransaction(transactionId: string): Promise<Transaction>;
    getTransactions(options?: TransactionPaginationOptions): Promise<Pagination<Transaction>>;
}
