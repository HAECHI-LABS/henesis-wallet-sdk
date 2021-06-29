import { FeeHistoryDTO, FeeWalletBalanceDTO, FeeWalletDTO, HenesisKeyDTO, ProposalFeeWalletDTO } from "../__generate__/fil";
import { Balance, Pagination } from "../types";
import { Client } from "../httpClient";
import { FilTransaction } from "./abstractWallet";
export declare type FilHenesisKey = HenesisKeyDTO;
export declare type FilProposalFeeWallet = ProposalFeeWalletDTO;
export interface FilFeeWallet extends Omit<FeeWalletDTO, "defaultFeeWallet" | "proposalFeeWallets"> {
    defaultFeeWallet: FilHenesisKey;
    proposalFeeWallets: FilProposalFeeWallet[];
}
export interface FilBalanceWithId extends Balance {
    id: string;
}
export interface FilFeeWalletBalance extends Omit<FeeWalletBalanceDTO, "defaultFeeWallet" | "proposalFeeWallets"> {
    defaultFeeWallet: Balance;
    proposalFeeWallets: FilBalanceWithId[];
}
export interface FilFeeHistory extends Omit<FeeHistoryDTO, "transaction"> {
    transaction: FilTransaction;
}
export declare class FilFeeWallets {
    private readonly client;
    constructor(client: Client);
    getFeeWallet(): Promise<FilFeeWallet>;
    getFeeWalletBalance(): Promise<FilFeeWalletBalance>;
    getFeeHistories(): Promise<Pagination<FilFeeHistory>>;
}
