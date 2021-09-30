import { Client } from "../httpClient";
import BN from "bn.js";
import { Balance, Key, Keychains, Pagination, PaginationOptions, Timestamp } from "../types";
import { ActivatingMasterWallet, Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import { DepositAddressDTO, MasterWalletDTO, TransactionDTO, TransactionOutputDTO } from "../__generate__/btc";
import { Env } from "../sdk";
import { Transfer } from "./transfers";
import { ApproveWithdrawal } from "../withdrawalApprovals";
export interface BchTransaction extends Omit<TransactionDTO, "outputs" | "blockNumber" | "feeAmount" | "amount"> {
    blockNumber?: BN;
    feeAmount?: BN;
    amount: BN;
    outputs: BchTransactionOutput[];
}
export interface BchEstimatedFee {
    estimatedFee: string;
}
export interface BchRawTransaction {
    inputs: BchRawTransactionInput[];
    outputs: BchRawTransactionOutput[];
}
export interface BchTransactionOutput extends Omit<TransactionOutputDTO, "amount"> {
    amount: BN;
}
export interface BchRawTransactionInput {
    redeemScript: string;
    transactionOutput: BchTransactionOutput;
}
export interface BchRawTransactionOutput {
    to: string;
    amount: string;
    isChange: boolean;
}
export interface BchCreateTransactionOutput extends Omit<BchTransactionOutput, "amount"> {
    amount: string;
}
export interface BchSignedRawTransactionRequest extends BchSignedRawTransaction {
    to?: string;
    otpCode?: string;
}
export interface BchSignedRawTransaction {
    inputs: {
        transactionOutput: BchCreateTransactionOutput;
        accountSignature: string;
    }[];
    outputs: BchRawTransactionOutput[];
}
export interface BchMasterWalletData extends WalletData {
    orgId: string;
    accountKey: Key;
    whitelistActivated: boolean;
}
export declare type DepositAddress = DepositAddressDTO;
export interface DepositAddressPaginationOptions extends PaginationOptions {
    start?: Timestamp;
    end?: Timestamp;
    name?: string;
    id?: string;
    address?: string;
}
export interface BchWithdrawalApproveParams extends ApproveWithdrawal {
}
export interface BchActivatingMasterWallet extends ActivatingMasterWallet {
}
export declare const transformWalletData: (data: MasterWalletDTO) => BchMasterWalletData;
export declare class BchMasterWallet extends Wallet<BchTransaction> {
    private readonly data;
    private readonly env;
    constructor(data: BchMasterWalletData, client: Client, keychains: Keychains, env: Env);
    build(to: string, amount: BN, passphrase: string, feeRate?: BN, metadata?: string): Promise<BchSignedRawTransaction>;
    transfer(to: string, amount: BN, passphrase: string, otpCode?: string, feeRate?: BN, metadata?: string): Promise<Transfer>;
    sendSignedTransaction(signedRawTransactionRequest: BchSignedRawTransactionRequest): Promise<Transfer>;
    createRawTransaction(to: string, amount: BN, feeRate?: BN, metadata?: string): Promise<BchRawTransaction>;
    getEstimatedFee(): Promise<BchEstimatedFee>;
    getChain(): BlockchainType;
    getBalance(): Promise<Balance[]>;
    createDepositAddress(name: string, otpCode?: string): Promise<DepositAddress>;
    getDepositAddress(depositAddressId: string): Promise<DepositAddress>;
    getDepositAddresses(options?: DepositAddressPaginationOptions): Promise<Pagination<DepositAddress>>;
    approve(params: BchWithdrawalApproveParams): Promise<Transfer>;
    reject(params: {
        id: string;
        otpCode: string;
    }): Promise<void>;
    getAddress(): string;
    getData(): BchMasterWalletData;
    getId(): string;
    getEncryptionKey(): string;
    getAccountKey(): Key;
    updateAccountKey(key: Key): void;
    changeName(name: string): Promise<void>;
    activate(accountKey: Key, backupKey: Key): Promise<BchActivatingMasterWallet>;
}
