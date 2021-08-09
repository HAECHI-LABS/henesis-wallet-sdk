import { FilAbstractWallet, FilAccountKey, FilWalletData } from "./abstractWallet";
import { Client } from "../httpClient";
import { Balance, Pagination, PaginationOptions } from "../types";
import { DepositAddressPaginationOptions, FilDepositAddress } from "./depositAddress";
import { FlushDTO, FlushInternalDTO, RawFlushTransactionDTO, RawTransactionDTO, MasterWalletDTO } from "../__generate__/fil";
import BN from "bn.js";
import { FilTransfer, FilTransferInternal } from "./transfers";
import { FilKeychains } from "./keychains";
import { ApproveWithdrawal } from "../withdrawalApprovals";
import { EthTransaction } from "../eth/abstractWallet";
export declare const convertWalletData: (data: MasterWalletDTO) => FilWalletData;
export interface FilFlush extends Omit<FlushDTO, "transfers"> {
    transfers: FilTransfer[];
}
export interface FilFlushInternal extends Omit<FlushInternalDTO, "transfers"> {
    transfers: FilTransferInternal[];
}
export declare type RawTransaction = RawTransactionDTO;
export interface Message {
    cid?: string;
    from: string;
    to: string;
    value: BN;
    method: number;
    params: string;
    gasLimit: number;
    gasFeeCap: BN;
    gasPremium: BN;
    version: number;
    nonce: number;
}
export interface Signature {
    data: string;
    type: number;
}
export interface SignedTransaction {
    cid: string;
    message: Message;
    signature: Signature;
}
export declare type RawFlushTransaction = RawFlushTransactionDTO;
export interface FilFlushTarget {
    depositAddressId: string;
    flushTransaction: SignedTransaction;
}
export declare class FilMasterWallet extends FilAbstractWallet {
    confirmation?: BN;
    constructor(client: Client, data: FilWalletData, keychains: FilKeychains);
    changeName(name: string): Promise<void>;
    getAccountKey(): FilAccountKey;
    getAddress(): string;
    getData(): FilWalletData;
    getBalance(): Promise<Balance[]>;
    getEncryptionKey(): string;
    getId(): string;
    updateAccountKey(key: FilAccountKey): void;
    createDepositAddress(name: string, otpCode?: string): Promise<FilDepositAddress>;
    getDepositAddresses(options?: DepositAddressPaginationOptions): Promise<Pagination<FilDepositAddress>>;
    getDepositAddress(depositAddressId: string): Promise<FilDepositAddress>;
    transfer(to: string, amount: BN, passphrase: string, otpCode?: string, gasPremium?: BN, metadata?: string): Promise<FilTransfer>;
    flush(targets: Array<string>, passphrase: string, gasPremium?: BN, metadata?: string): Promise<FilFlush>;
    getFlushes(options?: PaginationOptions): Promise<Pagination<FilFlush>>;
    getFlush(flushId: string): Promise<FilFlush>;
    getInternalFlushes(): Promise<Pagination<FilFlushInternal>>;
    getInternalFlush(): Promise<FilFlushInternal>;
    approve(params: ApproveWithdrawal): Promise<EthTransaction>;
    reject(params: {
        id: string;
        otpCode: string;
    }): Promise<void>;
    getConfirmation(): BN;
    private createBuildTransactionRequest;
    private createFlushTarget;
}
