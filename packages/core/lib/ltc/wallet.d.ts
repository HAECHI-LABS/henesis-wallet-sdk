import { Client } from "../httpClient";
import BN from "bn.js";
import { Balance, Key, Keychains, Pagination, PaginationOptions, Timestamp } from "../types";
import { ActivatingMasterWallet, Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import { DepositAddressDTO, MasterWalletDTO, TransactionDTO, TransactionOutputDTO } from "../__generate__/ltc";
import { Env } from "../sdk";
import { Transfer } from "./transfers";
import { ApproveWithdrawal } from "../withdrawalApprovals";
export interface LtcTransaction extends Omit<TransactionDTO, "outputs" | "blockNumber" | "feeAmount" | "amount"> {
    blockNumber?: BN;
    feeAmount?: BN;
    amount: BN;
    outputs: LtcTransactionOutput[];
}
export interface LtcEstimatedFee {
    estimatedFee: string;
}
export interface LtcRawTransaction {
    inputs: LtcRawTransactionInput[];
    outputs: LtcRawTransactionOutput[];
}
export interface LtcTransactionOutput extends Omit<TransactionOutputDTO, "amount"> {
    amount: BN;
}
export interface LtcRawTransactionInput {
    redeemScript: string;
    transactionOutput: LtcTransactionOutput;
}
export interface LtcRawTransactionOutput {
    to: string;
    amount: string;
    isChange: boolean;
}
export interface LtcCreateTransactionOutput extends Omit<LtcTransactionOutput, "amount"> {
    amount: string;
}
export interface LtcSignedRawTransactionRequest extends LtcSignedRawTransaction {
    otpCode?: string;
}
export interface LtcSignedRawTransaction {
    inputs: {
        transactionOutput: LtcCreateTransactionOutput;
        accountSignature: string;
    }[];
    outputs: LtcRawTransactionOutput[];
}
export interface LtcMasterWalletData extends WalletData {
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
export interface LtcWithdrawalApproveParams extends ApproveWithdrawal {
}
export interface LtcActivatingMasterWallet extends ActivatingMasterWallet {
}
export declare const transformWalletData: (data: MasterWalletDTO) => LtcMasterWalletData;
export declare class LtcMasterWallet extends Wallet<LtcTransaction> {
    private readonly data;
    private readonly env;
    constructor(data: LtcMasterWalletData, client: Client, keychains: Keychains, env: Env);
    build(to: string, amount: BN, passphrase: string, feeRate?: BN, metadata?: string): Promise<LtcSignedRawTransaction>;
    transfer(to: string, amount: BN, passphrase: string, otpCode?: string, feeRate?: BN, metadata?: string): Promise<Transfer>;
    sendSignedTransaction(signedRawTransactionRequest: LtcSignedRawTransactionRequest): Promise<Transfer>;
    createRawTransaction(to: string, amount: BN, feeRate?: BN, metadata?: string): Promise<LtcRawTransaction>;
    getEstimatedFee(): Promise<LtcEstimatedFee>;
    getChain(): BlockchainType;
    getBalance(): Promise<Balance[]>;
    createDepositAddress(name: string, otpCode?: string): Promise<DepositAddress>;
    getDepositAddress(depositAddressId: string): Promise<DepositAddress>;
    getDepositAddresses(options?: DepositAddressPaginationOptions): Promise<Pagination<DepositAddress>>;
    approve(params: LtcWithdrawalApproveParams): Promise<Transfer>;
    reject(params: {
        id: string;
        otpCode: string;
    }): Promise<void>;
    getAddress(): string;
    getData(): LtcMasterWalletData;
    getId(): string;
    getEncryptionKey(): string;
    getAccountKey(): Key;
    updateAccountKey(key: Key): void;
    changeName(name: string): Promise<void>;
    activate(accountKey: Key, backupKey: Key): Promise<LtcActivatingMasterWallet>;
}
