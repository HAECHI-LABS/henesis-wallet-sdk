import { Configuration } from './configuration';
import { AxiosPromise, AxiosInstance } from 'axios';
import { RequestArgs, BaseAPI } from './base';
export interface AccountKeyDTO {
    address: string;
    pub: string;
    keyFile: string;
    chainCode: string;
}
export interface Amount {
    value?: string;
}
export interface BackupKeyDTO {
    pub: string;
    keyFile: string;
}
export interface BalanceDTO {
    balance: string;
    spendableBalance: string;
}
export interface CreateDepositAddressRequest {
    name: string;
    pub: string;
    childNumber: number;
    otpCode?: string;
}
export interface CreateHenesisKeyRequest {
    orgId: string;
}
export interface CreateTransactionRequest {
    amount: string;
    proposalGasPremium?: Amount;
    proposalGasLimit?: Amount;
    toAddress: string;
    proposalTransaction: RawSignedTransactionDTO;
    gasPremium?: string;
    otpCode?: string;
}
export interface CreateWalletRequest {
    name: string;
    encryptionKey: string;
    accountKey: AccountKeyDTO;
    backupKey: BackupKeyDTO;
}
export interface DepositAddressDTO {
    id: string;
    name: string;
    version: string;
    address: string;
    balance: string;
    pub: string;
    nonce: string;
    orgId: string;
    childNumber: number;
    lockStatus: DepositAddressLockStatus;
    createdAt: string;
    updatedAt: string;
}
export declare enum DepositAddressLockStatus {
    LOCKED = "LOCKED",
    UNLOCKED = "UNLOCKED"
}
export interface ErrorBody {
    message?: string;
    code?: number;
}
export interface ErrorResponse {
    error?: ErrorBody;
}
export interface FeeHistoryDTO {
    id: string;
    transaction: TransactionDTO;
    type: string;
}
export interface FeeWalletBalanceDTO {
    defaultFeeWallet: BalanceDTO;
    proposalFeeWallets: Array<ProposalFeeWalletBalanceDTO>;
}
export interface FeeWalletDTO {
    defaultFeeWallet: HenesisKeyDTO;
    proposalFeeWallets: Array<AccountKeyDTO>;
}
export interface FlushDTO {
    id: string;
    transfers: Array<TransferDTO>;
    createdAt: string;
    updatedAt: string;
}
export interface FlushInternalDTO {
    id: string;
    transfers: Array<TransferInternalDTO>;
    createdAt: string;
    updatedAt: string;
}
export interface FlushRequest {
    targets: Array<FlushTarget>;
}
export interface FlushTarget {
    depositAddressId: string;
    flushTransaction: RawSignedTransactionDTO;
}
export interface GasPremiumDTO {
    gasPremium: string;
}
export interface GetGasPremiumRequest {
    nBlocksInclude: number;
    senderAddress: string;
    gasLimit: string;
}
export interface HenesisKeyDTO {
    address: string;
    pub: string;
    keyFile: string;
    keyId: string;
}
export interface Pageable {
    page?: number;
    size?: number;
    sort?: Array<string>;
}
export interface PaginationDepositAddressDTO {
    pagination: PaginationMeta;
    results: Array<DepositAddressDTO>;
}
export interface PaginationFeeHistoryDTO {
    pagination: PaginationMeta;
    results: Array<FeeHistoryDTO>;
}
export interface PaginationFlushDTO {
    pagination: PaginationMeta;
    results: Array<FlushDTO>;
}
export interface PaginationFlushInternalDTO {
    pagination: PaginationMeta;
    results: Array<FlushInternalDTO>;
}
export interface PaginationMeta {
    nextUrl: string;
    previousUrl: string;
    totalCount: number;
}
export interface PaginationTransferDTO {
    pagination: PaginationMeta;
    results: Array<TransferDTO>;
}
export interface PaginationTransferInternalDTO {
    pagination: PaginationMeta;
    results: Array<TransferInternalDTO>;
}
export interface PatchAccountKeyRequest {
    pub: string;
    keyFile: string;
    chainCode: string;
    otpCode?: string;
}
export interface PatchWalletNameRequest {
    name: string;
}
export interface ProposalFeeWalletBalanceDTO {
    id: string;
    balance: BalanceDTO;
}
export interface RawSignedTransactionDTO {
    version: number;
    to: string;
    from: string;
    nonce: string;
    value: string;
    method: number;
    params: string;
    signature: string;
    gasLimit: string;
    gasFeeCap: string;
    gasPremium: string;
    signatureType: number;
}
export interface SimplifiedWalletInternalDTO {
    id?: string;
    address: string;
    name?: string;
    walletId?: string;
}
export interface Sort {
    sorted?: boolean;
    unsorted?: boolean;
    empty?: boolean;
}
export interface TransactionDTO {
    id: string;
    nonce: string;
    method: number;
    amount: string;
    params: string;
    fromAddress: string;
    toAddress: string;
    feeAmount?: string;
    createdAt: string;
    updatedAt: string;
}
export interface TransferDTO {
    id: string;
    amount: string;
    transaction?: TransactionDTO;
    status: TransferStatus;
    type: TransferType;
    fromAddress: string;
    toAddress: string;
    orgId: string;
    walletId: string;
    proposalTransaction?: TransactionDTO;
    createdAt: string;
    updatedAt: string;
}
export interface TransferInternalDTO {
    id: string;
    amount: string;
    transaction?: TransactionDTO;
    status: TransferStatus;
    type: TransferType;
    confirmation: string;
    fromAddress: SimplifiedWalletInternalDTO;
    toAddress: SimplifiedWalletInternalDTO;
    orgId: string;
    walletId: string;
    proposalTransaction?: TransactionDTO;
    createdAt: string;
    updatedAt: string;
}
export interface TransferSearchCondition {
    address?: string;
    status?: string;
    start?: string;
    end?: string;
    fromAddress?: string;
    toAddress?: string;
    orgId?: string;
    walletId?: string;
    transactionId?: string;
    transactionHash?: string;
    transferType?: string;
    updatedAtGte?: string;
    updatedAtLt?: string;
}
export declare enum TransferStatus {
    REQUESTED = "REQUESTED",
    PENDING = "PENDING",
    FAILED = "FAILED",
    MINED = "MINED",
    REVERTED = "REVERTED",
    CONFIRMED = "CONFIRMED"
}
export declare enum TransferType {
    WITHDRAWAL = "WITHDRAWAL",
    DEPOSIT = "DEPOSIT"
}
export interface WalletDTO {
    id: string;
    name: string;
    version: string;
    address: string;
    balance: string;
    transaction?: TransactionDTO;
    status: WalletStatus;
    orgId: string;
    encryptionKey: string;
    nextChildNumber: number;
    accountKey: AccountKeyDTO;
    createdAt: string;
    updatedAt: string;
}
export declare enum WalletStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    CREATING = "CREATING",
    FAILED = "FAILED"
}
export declare const FeeWalletControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getFeeHistories: (pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getFeeWallet: (options?: any) => Promise<RequestArgs>;
    getFeeWalletBalance: (options?: any) => Promise<RequestArgs>;
};
export declare const FeeWalletControllerApiFp: (configuration?: Configuration) => {
    getFeeHistories(pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationFeeHistoryDTO>>;
    getFeeWallet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FeeWalletDTO>>;
    getFeeWalletBalance(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FeeWalletBalanceDTO>>;
};
export declare const FeeWalletControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getFeeHistories(pageable: Pageable, options?: any): AxiosPromise<PaginationFeeHistoryDTO>;
    getFeeWallet(options?: any): AxiosPromise<FeeWalletDTO>;
    getFeeWalletBalance(options?: any): AxiosPromise<FeeWalletBalanceDTO>;
};
export declare class FeeWalletControllerApi extends BaseAPI {
    getFeeHistories(pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationFeeHistoryDTO>>;
    getFeeWallet(options?: any): Promise<import("axios").AxiosResponse<FeeWalletDTO>>;
    getFeeWalletBalance(options?: any): Promise<import("axios").AxiosResponse<FeeWalletBalanceDTO>>;
}
export declare const InternalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getFlush1: (flushId: string, options?: any) => Promise<RequestArgs>;
    getFlushes1: (pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getTransfer1: (transferId: string, options?: any) => Promise<RequestArgs>;
    getTransfers: (pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const InternalControllerApiFp: (configuration?: Configuration) => {
    getFlush1(flushId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FlushInternalDTO>>;
    getFlushes1(pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationFlushInternalDTO>>;
    getTransfer1(transferId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferInternalDTO>>;
    getTransfers(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransferInternalDTO>>;
};
export declare const InternalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getFlush1(flushId: string, options?: any): AxiosPromise<FlushInternalDTO>;
    getFlushes1(pageable: Pageable, options?: any): AxiosPromise<PaginationFlushInternalDTO>;
    getTransfer1(transferId: string, options?: any): AxiosPromise<TransferInternalDTO>;
    getTransfers(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): AxiosPromise<PaginationTransferInternalDTO>;
};
export declare class InternalControllerApi extends BaseAPI {
    getFlush1(flushId: string, options?: any): Promise<import("axios").AxiosResponse<FlushInternalDTO>>;
    getFlushes1(pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationFlushInternalDTO>>;
    getTransfer1(transferId: string, options?: any): Promise<import("axios").AxiosResponse<TransferInternalDTO>>;
    getTransfers(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationTransferInternalDTO>>;
}
export declare const NetworkControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getGasPremium: (getGasPremiumRequest: GetGasPremiumRequest, options?: any) => Promise<RequestArgs>;
};
export declare const NetworkControllerApiFp: (configuration?: Configuration) => {
    getGasPremium(getGasPremiumRequest: GetGasPremiumRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GasPremiumDTO>>;
};
export declare const NetworkControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getGasPremium(getGasPremiumRequest: GetGasPremiumRequest, options?: any): AxiosPromise<GasPremiumDTO>;
};
export declare class NetworkControllerApi extends BaseAPI {
    getGasPremium(getGasPremiumRequest: GetGasPremiumRequest, options?: any): Promise<import("axios").AxiosResponse<GasPremiumDTO>>;
}
export declare const OperationControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    createHenesisKey: (createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any) => Promise<RequestArgs>;
};
export declare const OperationControllerApiFp: (configuration?: Configuration) => {
    createHenesisKey(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HenesisKeyDTO>>;
};
export declare const OperationControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createHenesisKey(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): AxiosPromise<HenesisKeyDTO>;
};
export declare class OperationControllerApi extends BaseAPI {
    createHenesisKey(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): Promise<import("axios").AxiosResponse<HenesisKeyDTO>>;
}
export declare const TransferControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getTransfer: (transferId: string, options?: any) => Promise<RequestArgs>;
    getTransfers1: (pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const TransferControllerApiFp: (configuration?: Configuration) => {
    getTransfer(transferId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferDTO>>;
    getTransfers1(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransferDTO>>;
};
export declare const TransferControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getTransfer(transferId: string, options?: any): AxiosPromise<TransferDTO>;
    getTransfers1(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): AxiosPromise<PaginationTransferDTO>;
};
export declare class TransferControllerApi extends BaseAPI {
    getTransfer(transferId: string, options?: any): Promise<import("axios").AxiosResponse<TransferDTO>>;
    getTransfers1(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationTransferDTO>>;
}
export declare const WalletControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    createDepositAddress: (walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any) => Promise<RequestArgs>;
    createWallet: (createWalletRequest: CreateWalletRequest, options?: any) => Promise<RequestArgs>;
    flush: (walletId: string, flushRequest: FlushRequest, options?: any) => Promise<RequestArgs>;
    getBalance: (walletId: string, options?: any) => Promise<RequestArgs>;
    getDepositAddress: (walletId: string, depositAddressId: string, options?: any) => Promise<RequestArgs>;
    getDepositAddresses: (walletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getFlush: (walletId: string, flushId: string, options?: any) => Promise<RequestArgs>;
    getFlushes: (walletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getWallet: (walletId: string, options?: any) => Promise<RequestArgs>;
    getWalletInitialKey: (walletId: string, options?: any) => Promise<RequestArgs>;
    getWallets: (sort: Sort, options?: any) => Promise<RequestArgs>;
    patchDepositAddressName: (walletId: string, depositAddressId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any) => Promise<RequestArgs>;
    patchWalletAccountKey: (walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any) => Promise<RequestArgs>;
    patchWalletName: (walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any) => Promise<RequestArgs>;
    recreateWallet: (walletId: string, options?: any) => Promise<RequestArgs>;
    sendTransaction: (walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any) => Promise<RequestArgs>;
};
export declare const WalletControllerApiFp: (configuration?: Configuration) => {
    createDepositAddress(walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DepositAddressDTO>>;
    createWallet(createWalletRequest: CreateWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletDTO>>;
    flush(walletId: string, flushRequest: FlushRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FlushDTO>>;
    getBalance(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BalanceDTO>>;
    getDepositAddress(walletId: string, depositAddressId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DepositAddressDTO>>;
    getDepositAddresses(walletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationDepositAddressDTO>>;
    getFlush(walletId: string, flushId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FlushDTO>>;
    getFlushes(walletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationFlushDTO>>;
    getWallet(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletDTO>>;
    getWalletInitialKey(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccountKeyDTO>>;
    getWallets(sort: Sort, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<WalletDTO>>>;
    patchDepositAddressName(walletId: string, depositAddressId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DepositAddressDTO>>;
    patchWalletAccountKey(walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccountKeyDTO>>;
    patchWalletName(walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletDTO>>;
    recreateWallet(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletDTO>>;
    sendTransaction(walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferDTO>>;
};
export declare const WalletControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createDepositAddress(walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): AxiosPromise<DepositAddressDTO>;
    createWallet(createWalletRequest: CreateWalletRequest, options?: any): AxiosPromise<WalletDTO>;
    flush(walletId: string, flushRequest: FlushRequest, options?: any): AxiosPromise<FlushDTO>;
    getBalance(walletId: string, options?: any): AxiosPromise<BalanceDTO>;
    getDepositAddress(walletId: string, depositAddressId: string, options?: any): AxiosPromise<DepositAddressDTO>;
    getDepositAddresses(walletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationDepositAddressDTO>;
    getFlush(walletId: string, flushId: string, options?: any): AxiosPromise<FlushDTO>;
    getFlushes(walletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationFlushDTO>;
    getWallet(walletId: string, options?: any): AxiosPromise<WalletDTO>;
    getWalletInitialKey(walletId: string, options?: any): AxiosPromise<AccountKeyDTO>;
    getWallets(sort: Sort, options?: any): AxiosPromise<Array<WalletDTO>>;
    patchDepositAddressName(walletId: string, depositAddressId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): AxiosPromise<DepositAddressDTO>;
    patchWalletAccountKey(walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): AxiosPromise<AccountKeyDTO>;
    patchWalletName(walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): AxiosPromise<WalletDTO>;
    recreateWallet(walletId: string, options?: any): AxiosPromise<WalletDTO>;
    sendTransaction(walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any): AxiosPromise<TransferDTO>;
};
export declare class WalletControllerApi extends BaseAPI {
    createDepositAddress(walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): Promise<import("axios").AxiosResponse<DepositAddressDTO>>;
    createWallet(createWalletRequest: CreateWalletRequest, options?: any): Promise<import("axios").AxiosResponse<WalletDTO>>;
    flush(walletId: string, flushRequest: FlushRequest, options?: any): Promise<import("axios").AxiosResponse<FlushDTO>>;
    getBalance(walletId: string, options?: any): Promise<import("axios").AxiosResponse<BalanceDTO>>;
    getDepositAddress(walletId: string, depositAddressId: string, options?: any): Promise<import("axios").AxiosResponse<DepositAddressDTO>>;
    getDepositAddresses(walletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationDepositAddressDTO>>;
    getFlush(walletId: string, flushId: string, options?: any): Promise<import("axios").AxiosResponse<FlushDTO>>;
    getFlushes(walletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationFlushDTO>>;
    getWallet(walletId: string, options?: any): Promise<import("axios").AxiosResponse<WalletDTO>>;
    getWalletInitialKey(walletId: string, options?: any): Promise<import("axios").AxiosResponse<AccountKeyDTO>>;
    getWallets(sort: Sort, options?: any): Promise<import("axios").AxiosResponse<WalletDTO[]>>;
    patchDepositAddressName(walletId: string, depositAddressId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<DepositAddressDTO>>;
    patchWalletAccountKey(walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): Promise<import("axios").AxiosResponse<AccountKeyDTO>>;
    patchWalletName(walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<WalletDTO>>;
    recreateWallet(walletId: string, options?: any): Promise<import("axios").AxiosResponse<WalletDTO>>;
    sendTransaction(walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransferDTO>>;
}
