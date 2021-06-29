import BN from "bn.js";
import { ActivatingMasterWallet, WalletStatus } from "../wallet";
import { BlockchainType } from "../blockchain";
import { Balance, Key, Keychains, Pagination, PaginationOptions } from "../types";
import { SignedMultiSigPayload } from "./transactions";
import { Client } from "../httpClient";
import { MasterWalletDTO, FlushQuerySearchCondition, FlushTransactionValueTransferEventDTO, FlushTransactionDTO } from "../__generate__/eth";
import { ApproveWithdrawal } from "../withdrawalApprovals";
import { Coin } from "./coin";
import { EthDepositAddress } from "./depositAddress";
import { EthUserWallet } from "./userWallet";
import { EthLikeWallet, EthMasterWalletData, EthTransaction } from "./abstractWallet";
export interface UserWalletPaginationOptions extends PaginationOptions {
    name?: string;
    id?: string;
    ids?: string[];
    address?: string;
    status?: WalletStatus;
}
export interface EthWithdrawalApproveParams extends ApproveWithdrawal {
    gasPrice?: BN;
    gasLimit?: BN;
}
export declare type EthActivatingMasterWallet = ActivatingMasterWallet;
export declare const transformMasterWalletData: (data: MasterWalletDTO) => EthMasterWalletData;
export declare type FlushTransfer = Omit<FlushTransactionValueTransferEventDTO, "amount" | ""> & {
    amount: BN;
};
export declare type FlushTransaction = Omit<FlushTransactionDTO, "blockchain" | "fee" | "transfers"> & {
    blockchain: BlockchainType;
    fee: BN;
    transfers: FlushTransfer[];
};
export declare class EthWallet extends EthLikeWallet {
    private walletContract;
    constructor(client: Client, data: EthMasterWalletData, keychains: Keychains, blockchain: BlockchainType);
    resendTransaction(transactionId: string, gasPrice?: BN): Promise<EthTransaction>;
    contractCall(contractAddress: string, value: BN, data: string, passphrase: string, otpCode?: string, gasPrice?: BN, gasLimit?: BN, metadata?: string): Promise<EthTransaction>;
    transfer(coin: string | Coin, to: string, amount: BN, passphrase: string, otpCode?: string, gasPrice?: BN, gasLimit?: BN, metadata?: string): Promise<EthTransaction>;
    sendTransaction(signedMultiSigPayload: SignedMultiSigPayload, walletId: string, otpCode?: string, gasPrice?: BN): Promise<EthTransaction>;
    sendBatchTransaction(blockchain: BlockchainType, signedMultiSigPayloads: SignedMultiSigPayload[], walletId: string, otpCode?: string, gasPrice?: BN): Promise<EthTransaction[]>;
    getEncryptionKey(): string;
    getAccountKey(): Key;
    updateAccountKey(key: Key): void;
    activate(accountKey: Key, backupKey: Key): Promise<EthActivatingMasterWallet>;
    createDepositAddress(name: string, passphrase?: string, gasPrice?: BN, salt?: BN, otpCode?: string): Promise<EthDepositAddress>;
    getDepositAddress(walletId: string): Promise<EthDepositAddress>;
    getBalance(flag?: boolean, symbol?: string): Promise<Balance[]>;
    getAddress(): string;
    getData(): EthMasterWalletData;
    getDepositAddresses(options?: UserWalletPaginationOptions): Promise<Pagination<EthDepositAddress>>;
    retryCreateDepositAddress(walletId: string, gasPrice?: BN): Promise<EthDepositAddress>;
    getId(): string;
    changeName(name: string): Promise<void>;
    flush(flushTargets: Array<{
        coinId: number;
        depositAddressId: string;
    }>, gasPrice?: BN, gasLimit?: BN, metadata?: string): Promise<EthTransaction>;
    getFlushTransactions(option?: PaginationOptions & FlushQuerySearchCondition): Promise<Pagination<FlushTransaction>>;
    getFlushTransaction(transactionId: string): Promise<FlushTransaction>;
    approve(params: EthWithdrawalApproveParams): Promise<EthTransaction>;
    reject(params: {
        id: string;
        otpCode: string;
    }): Promise<void>;
}
export declare class EthMasterWallet extends EthLikeWallet {
    private walletContract;
    constructor(client: Client, data: EthMasterWalletData, keychains: Keychains, blockchain: BlockchainType);
    getEncryptionKey(): string;
    getAccountKey(): Key;
    updateAccountKey(key: Key): void;
    activate(accountKey: Key, backupKey: Key): Promise<EthActivatingMasterWallet>;
    createUserWallet(name: string, passphrase: string, gasPrice?: BN, salt?: BN, otpCode?: string): Promise<EthUserWallet>;
    getUserWallet(walletId: string): Promise<EthUserWallet>;
    getBalance(flag?: boolean, symbol?: string): Promise<Balance[]>;
    getAddress(): string;
    getData(): EthMasterWalletData;
    getUserWallets(options?: UserWalletPaginationOptions): Promise<Pagination<EthUserWallet>>;
    retryCreateUserWallet(walletId: string, gasPrice?: BN): Promise<EthUserWallet>;
    getId(): string;
    changeName(name: string): Promise<void>;
    flush(coin: string | Coin, userWalletIds: string[], passphrase: string, otpCode?: string, gasPrice?: BN, gasLimit?: BN, metadata?: string): Promise<EthTransaction>;
    approve(params: EthWithdrawalApproveParams): Promise<EthTransaction>;
    reject(params: {
        id: string;
        otpCode: string;
    }): Promise<void>;
}
