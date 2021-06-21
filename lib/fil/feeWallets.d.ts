import { BalanceDTO, FeeHistoryDTO, FeeWalletBalanceDTO, FeeWalletDTO, HenesisKeyDTO, ProposalFeeWalletBalanceDTO } from "../__generate__/fil";
import { Pagination } from "../types";
import { Client } from "../httpClient";
import { FilAccountKey, FilTransaction } from "./abstractWallet";
import BN from "bn.js";
export declare type FilHenesisKey = HenesisKeyDTO;
export interface FilFeeWallet extends Omit<FeeWalletDTO, "defaultFeeWallet" | "proposalFeeWallets"> {
    defaultFeeWallet: FilHenesisKey;
    proposalFeeWallets: FilAccountKey[];
}
export interface FilBalance extends Omit<BalanceDTO, "balance" | "spendableBalance"> {
    balance: BN;
    spendableBalance: BN;
}
export interface ProposalFeeWalletBalance extends Omit<ProposalFeeWalletBalanceDTO, "balance"> {
    balance: FilBalance;
}
export interface FilFeeWalletBalance extends Omit<FeeWalletBalanceDTO, "defaultFeeWallet" | "proposalFeeWallets"> {
    defaultFeeWallet: FilBalance;
    proposalFeeWallets: ProposalFeeWalletBalance[];
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
