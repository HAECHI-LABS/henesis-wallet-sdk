import BN from "bn.js";
import { Client } from "./httpClient";
import { BlockchainType } from "./blockchain";
import { Balance, Key, Keychains, Pagination, PaginationOptions } from "./types";
import { ActivateAllowedAddressesRequest as BtcActivateAllowedAddressesRequest, AllowedAddressDTO as BtcAllowedAddressDTO, PaginationAllowedAddressDTO as BtcPaginationAllowedAddressDTO, CreateAllowedAddressRequest as BtcCreateAllowedAddressRequest, DeleteAllowedAddressRequest as BtcDeleteAllowedAddressRequest, InactivateAllowedAddressesRequest as BtcInactivateAllowedAddressesRequest, ValidateIsAllowedAddressRequest as BtcValidateIsAllowedAddressRequest, ValidateIsAllowedAddressResponse as BtcValidateIsAllowedAddressResponse, WalletStatus as BtcWalletStatus, WithdrawalPolicyType as BtcWithdrawalPolicyType } from "./__generate__/btc/api";
import { ActivateAllowedAddressesRequest as EthActivateAllowedAddressesRequest, AllowedAddressDTO as EthAllowedAddressDTO, PaginationAllowedAddressDTO as EthPaginationAllowedAddressDTO, CreateAllowedAddressRequest as EthCreateAllowedAddressRequest, DeleteAllowedAddressRequest as EthDeleteAllowedAddressRequest, InactivateAllowedAddressesRequest as EthInactivateAllowedAddressesRequest, ValidateIsAllowedAddressRequest as EthValidateIsAllowedAddressRequest, ValidateIsAllowedAddressResponse as EthValidateIsAllowedAddressResponse, AllowedCoinType as EthAllowedCoinType, WalletType as EthWalletType, WalletStatus as EthWalletStatus, WhitelistType as EthWhitelistType, WithdrawalPolicyType as EthWithdrawalPolicyType } from "./__generate__/eth/api";
export declare type InactivateAllowedAddressesRequest = EthInactivateAllowedAddressesRequest | BtcInactivateAllowedAddressesRequest;
export declare type ActivateAllowedAddressesRequest = EthActivateAllowedAddressesRequest | BtcActivateAllowedAddressesRequest;
export declare type AllowedAddressDTO = EthAllowedAddressDTO | BtcAllowedAddressDTO;
export declare type AllowedAddress = AllowedAddressDTO;
export declare type PaginationAllowedAddressDTO = BtcPaginationAllowedAddressDTO | EthPaginationAllowedAddressDTO;
export declare type CreateAllowedAddressRequest = BtcCreateAllowedAddressRequest | EthCreateAllowedAddressRequest;
export import WhitelistType = EthWhitelistType;
export import AllowedCoinType = EthAllowedCoinType;
export declare type DeleteAllowedAddressRequest = BtcDeleteAllowedAddressRequest | EthDeleteAllowedAddressRequest;
export declare type ValidateAllowedAddressRequest = BtcValidateIsAllowedAddressRequest | EthValidateIsAllowedAddressRequest;
export declare type ValidateAllowedAddressResponse = BtcValidateIsAllowedAddressResponse | EthValidateIsAllowedAddressResponse;
export interface WalletData {
    id: string;
    name: string;
    address: string;
    encryptionKey: string;
    createdAt: string;
    updatedAt: string;
    status: WalletStatus;
    version?: string;
}
export declare enum PolicyType {
    DAILY = "DAILY",
    TRANSACTION = "TRANSACTION"
}
export declare const transformPolicyType: (type: BtcWithdrawalPolicyType | EthWithdrawalPolicyType) => PolicyType;
export import WalletType = EthWalletType;
export interface WithdrawalPolicy {
    id: string;
    limitAmount: BN;
    walletType: WalletType;
    type: PolicyType;
    coinSymbol: string;
}
export declare enum WalletStatus {
    ACTIVE = "ACTIVE",
    CREATING = "CREATING",
    FAILED = "FAILED",
    INACTIVE = "INACTIVE"
}
export interface InactiveWallet {
    id: string;
    name: string;
    blockchain: BlockchainType;
    henesisKey: Key;
    status: WalletStatus;
    createdAt: string;
    updatedAt?: string;
}
export interface InactiveMasterWallet extends InactiveWallet {
}
export interface ActivatingMasterWallet {
    id: string;
    name: string;
    blockchain: BlockchainType;
    address: string;
    status: WalletStatus;
    createdAt: string;
    updatedAt: string;
}
export declare const convertWalletStatus: (status: BtcWalletStatus | EthWalletStatus) => WalletStatus;
export interface AllowedAddressesPaginationOptions extends PaginationOptions {
    coinId?: number;
}
export declare abstract class Wallet<T> {
    protected readonly client: Client;
    protected readonly withdrawalApprovalUrl: string;
    protected readonly baseUrl: any;
    protected readonly keychains: Keychains;
    protected readonly blockchain: BlockchainType;
    protected constructor(client: Client, keychains: Keychains, baseUrl: string, blockchain: BlockchainType);
    abstract getChain(): BlockchainType;
    abstract getBalance(flag?: boolean, symbol?: string): Promise<Balance[]>;
    abstract getAddress(): string;
    abstract getId(): string;
    abstract changeName(name: string): any;
    abstract getEncryptionKey(): string | null;
    abstract getAccountKey(): Key;
    abstract updateAccountKey(key: Key): any;
    protected recoverPassphrase(encryptedPassphrase: string): string;
    changePassphrase(passphrase: string, newPassphrase: string, otpCode?: string): Promise<void>;
    private changePassphraseWithKeyFile;
    restorePassphrase(encryptedPassphrase: string, newPassphrase: string, otpCode?: string): Promise<void>;
    verifyEncryptedPassphrase(encryptedPassphrase: string): Promise<boolean>;
    verifyPassphrase(passphrase: string): Promise<boolean>;
    protected verifyPassphraseWithKeyFile(passphrase: string, initialKey?: Key): Promise<boolean>;
    createWithdrawalPolicy(params: {
        limitAmount: BN;
        walletType: WalletType;
        policyType: PolicyType;
        coinSymbol: string;
        otpCode?: string;
    }): Promise<WithdrawalPolicy>;
    patchWithdrawalPolicy(params: {
        id: string;
        limitAmount: BN;
        otpCode?: string;
    }): Promise<WithdrawalPolicy>;
    getWithdrawalPolices(options: PaginationOptions): Promise<Pagination<WithdrawalPolicy>>;
    createAllowedAddress(params: {
        address: string;
        whitelistType: WhitelistType;
        allowedCoinType: AllowedCoinType;
        otpCode: string;
        label: string | null;
        coinId: number | null;
    }): Promise<AllowedAddress>;
    getAllowedAddresses(options?: AllowedAddressesPaginationOptions): Promise<Pagination<AllowedAddress>>;
    getAllowedAddress(id: string): Promise<AllowedAddress>;
    deleteAllowedAddress(id: string, otpCode: string): Promise<void>;
    activateAllowedAddresses(otpCode: string): Promise<void>;
    inactivateAllowedAddresses(otpCode: string): Promise<void>;
    validateAllowedAddress(address: string, coinId?: number): Promise<boolean>;
}
