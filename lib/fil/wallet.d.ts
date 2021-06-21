import { FilWalletData, FilAbstractWallet, FilAccountKey } from "./abstractWallet";
import { Client } from "../httpClient";
import { Balance, Pagination } from "../types";
import { DepositAddressPaginationOptions, FilDepositAddress } from "./depositAddress";
import { FlushDTO, FlushInternalDTO, WalletDTO } from "../__generate__/fil";
import BN from "bn.js";
import { FilTransfer, FilTransferInternal } from "./transfers";
import { FilKeychains } from "./keychains";
import { ApproveWithdrawal } from "../withdrawalApprovals";
import { EthTransaction } from "../eth/abstractWallet";
export declare const convertWalletData: (data: WalletDTO) => FilWalletData;
export declare type FilFlush = FlushDTO;
export interface FilFlushInternal extends Omit<FlushInternalDTO, "transfers"> {
    transfers: FilTransferInternal[];
}
export declare class FilWallet extends FilAbstractWallet {
    constructor(client: Client, data: FilWalletData, keychains: FilKeychains);
    changeName(name: string): Promise<void>;
    getAccountKey(): FilAccountKey;
    getAddress(): string;
    getData(): FilWalletData;
    getBalance(): Promise<Balance[]>;
    getEncryptionKey(): string;
    getId(): string;
    updateAccountKey(key: FilAccountKey): void;
    createDepositAddress(name: string, passphrase?: string, otpCode?: string): Promise<FilDepositAddress>;
    getDepositAddresses(options?: DepositAddressPaginationOptions): Promise<Pagination<FilDepositAddress>>;
    getDepositAddress(depositAddressId: string): Promise<FilDepositAddress>;
    transfer(to: string, amount: BN, passphrase: string, otpCode?: string): Promise<FilTransfer>;
    flush(targets: Array<string>, passphrase: string): Promise<FilFlush>;
    getFlushes(): Promise<Pagination<FilFlush>>;
    getFlush(): Promise<FilFlush>;
    getInternalFlushes(): Promise<Pagination<FilFlushInternal>>;
    getInternalFlush(): Promise<FilFlushInternal>;
    retryCreateDepositAddress(walletId: string, gasPrice?: BN): Promise<FilDepositAddress>;
    approve(params: ApproveWithdrawal): Promise<EthTransaction>;
    reject(params: {
        id: string;
        otpCode: string;
    }): Promise<void>;
}
