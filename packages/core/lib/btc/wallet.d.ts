import { Client } from "../httpClient";
import BN from "bn.js";
import { Balance, Key, Keychains, Pagination, PaginationOptions, Timestamp } from "../types";
import { ActivatingMasterWallet, Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import { DepositAddressDTO, MasterWalletDTO, TransactionDTO, TransactionOutputDTO } from "../__generate__/btc";
import { Env } from "../sdk";
import { Transfer } from "./transfers";
import { ApproveWithdrawal } from "../withdrawalApprovals";
export interface BtcTransaction extends Omit<TransactionDTO, "outputs" | "blockNumber" | "feeAmount" | "amount"> {
    blockNumber?: BN;
    feeAmount?: BN;
    amount: BN;
    outputs: BtcTransactionOutput[];
}
export interface BtcEstimatedFee {
    estimatedFee: string;
}
export interface BtcRawTransaction {
    inputs: BtcRawTransactionInput[];
    outputs: BtcRawTransactionOutput[];
}
export interface BtcTransactionOutput extends Omit<TransactionOutputDTO, "amount"> {
    amount: BN;
}
export interface BtcRawTransactionInput {
    redeemScript: string;
    transactionOutput: BtcTransactionOutput;
}
export interface BtcRawTransactionOutput {
    to: string;
    amount: string;
    isChange: boolean;
}
export interface BtcCreateTransactionOutput extends Omit<BtcTransactionOutput, "amount"> {
    amount: string;
}
export interface BtcSignedRawTransactionRequest extends BtcSignedRawTransaction {
    otpCode?: string;
}
export interface BtcSignedRawTransaction {
    inputs: {
        transactionOutput: BtcCreateTransactionOutput;
        accountSignature: string;
    }[];
    outputs: BtcRawTransactionOutput[];
}
export interface BtcMasterWalletData extends WalletData {
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
export interface BtcWithdrawalApproveParams extends ApproveWithdrawal {
}
export interface BtcActivatingMasterWallet extends ActivatingMasterWallet {
}
export declare const transformWalletData: (data: MasterWalletDTO) => BtcMasterWalletData;
export declare class BtcMasterWallet extends Wallet<BtcTransaction> {
    private readonly data;
    private readonly env;
    constructor(data: BtcMasterWalletData, client: Client, keychains: Keychains, env: Env);
    build(to: string, amount: BN, passphrase: string, feeRate?: BN, metadata?: string): Promise<BtcSignedRawTransaction>;
    transfer(to: string, amount: BN, passphrase: string, otpCode?: string, feeRate?: BN, metadata?: string): Promise<Transfer>;
    sendSignedTransaction(signedRawTransactionRequest: BtcSignedRawTransactionRequest): Promise<Transfer>;
    createRawTransaction(to: string, amount: BN, feeRate?: BN, metadata?: string): Promise<BtcRawTransaction>;
    getEstimatedFee(): Promise<BtcEstimatedFee>;
    getChain(): BlockchainType;
    getBalance(): Promise<Balance[]>;
    createDepositAddress(name: string, otpCode?: string): Promise<DepositAddress>;
    getDepositAddress(depositAddressId: string): Promise<DepositAddress>;
    getDepositAddresses(options?: DepositAddressPaginationOptions): Promise<Pagination<DepositAddress>>;
    approve(params: BtcWithdrawalApproveParams): Promise<Transfer>;
    reject(params: {
        id: string;
        otpCode: string;
    }): Promise<void>;
    getAddress(): string;
    getData(): BtcMasterWalletData;
    getId(): string;
    getEncryptionKey(): string;
    getAccountKey(): Key;
    updateAccountKey(key: Key): void;
    changeName(name: string): Promise<void>;
    activate(accountKey: Key, backupKey: Key): Promise<BtcActivatingMasterWallet>;
}
