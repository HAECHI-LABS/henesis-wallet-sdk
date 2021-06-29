import { FilAbstractWallet, FilAbstractWalletData, FilWalletData } from "./abstractWallet";
import { Client } from "../httpClient";
import { Balance, Key, PaginationOptions } from "../types";
import { DepositAddressDTO } from "../__generate__/fil";
import { WalletStatus } from "../wallet";
import { FilKeychains } from "./keychains";
export interface FilDepositAddressData extends Omit<FilAbstractWalletData, "encryptionKey"> {
    childNumber: number;
}
export declare const convertDepositAddressData: (data: DepositAddressDTO) => FilDepositAddressData;
export interface DepositAddressPaginationOptions extends PaginationOptions {
    name?: string;
    id?: string;
    ids?: string[];
    address?: string;
    status?: WalletStatus;
}
export declare class FilDepositAddress extends FilAbstractWallet {
    private readonly depositAddressData;
    constructor(client: Client, data: FilWalletData, keychains: FilKeychains, depositAddressData: FilDepositAddressData);
    changeName(name: string): Promise<void>;
    getAccountKey(): Key;
    getAddress(): string;
    getData(): FilDepositAddressData;
    getBalance(): Promise<Balance[]>;
    getEncryptionKey(): string;
    getId(): string;
    updateAccountKey(key: Key): void;
}
