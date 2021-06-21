import { Client } from "../httpClient";
import { Balance, Key, Pagination, PaginationOptions } from "../types";
import { SimplifiedWalletDTO, TransactionType } from "../__generate__/eth";
import { Transaction } from "../";
export interface TransactionHistory extends Transaction {
    wallet: SimplifiedWalletDTO;
    type: TransactionType;
    createdAt: string;
}
export interface TransactionHistoryPaginationOptions extends PaginationOptions {
    transactionHash?: string;
    createdAtGte?: string;
    createdAtLt?: string;
}
export interface HenesisKey extends Key {
    feeDelegationEnabled: boolean;
}
export declare class HenesisKeys {
    private readonly client;
    private readonly baseUrl;
    constructor(client: Client);
    getHenesisKey(): Promise<HenesisKey>;
    getHenesisKeyBalance(): Promise<Balance>;
    getTransactionHistories(options?: TransactionHistoryPaginationOptions): Promise<Pagination<TransactionHistory>>;
    getTransactionHistoriesCsv(createdAtGte: string, createdAtLt: string): Promise<any>;
}
