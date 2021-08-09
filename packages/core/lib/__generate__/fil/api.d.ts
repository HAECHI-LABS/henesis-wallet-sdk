import { Configuration } from './configuration';
import { AxiosPromise, AxiosInstance } from 'axios';
import { RequestArgs, BaseAPI } from './base';
export interface AccountKeyDTO {
    address: string;
    pub: string;
    keyFile?: string;
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
    confirmedBalance: string;
    spendableBalance: string;
}
export interface BalanceWithIdDTO {
    id: string;
    confirmedBalance: string;
    spendableBalance: string;
}
export interface BuildFlushRequest {
    depositAddressIds: Array<string>;
    gasPremium?: string;
}
export interface BuildTransactionRequest {
    version: number;
    to: string;
    from: string;
    value: string;
    method: number;
    params: string;
    gasLimit: string;
    gasPremium?: string;
    otpCode?: string;
}
export interface CreateDepositAddressRequest {
    name: string;
    address: string;
    pub: string;
    childNumber: number;
    otpCode?: string;
}
export interface CreateFlushRequest {
    targets: Array<FlushTarget>;
    metadata?: string;
}
export interface CreateHenesisKeyRequest {
    orgId: string;
}
export interface CreateMasterWalletRequest {
    name: string;
    encryptionKey: string;
    accountKey: AccountKeyDTO;
    backupKey: BackupKeyDTO;
}
export interface CreateMultiSigTransactionRequest {
    amount: string;
    metadata?: string;
    proposalGasPremium?: Amount;
    proposalGasLimit?: Amount;
    proposalNonce?: string;
    toAddress: string;
    proposalTransaction: RawSignedTransactionDTO;
    gasPremium?: string;
    otpCode?: string;
}
export interface CreateTransactionRequest {
    transaction: RawSignedTransactionDTO;
    metadata?: string;
    otpCode?: string;
}
export interface DepositAddressDTO {
    id: string;
    name: string;
    version: string;
    address: string;
    pub: string;
    orgId: string;
    childNumber: number;
    createdAt: string;
    updatedAt: string;
}
export interface DepositAddressSearchCondition {
    id?: string;
    ids?: Array<string>;
    name?: string;
    address?: string;
    masterWalletId?: string;
    orgId?: string;
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
    wallet: SimplifiedWalletDTO;
    transaction: TransactionDTO;
    paymentType: FeeHistoryPaymentType;
    type: FeeHistoryType;
    orgId: string;
    createdAt: string;
    updatedAt: string;
}
export declare enum FeeHistoryPaymentType {
    DEFAULTFEEWALLET = "DEFAULT_FEE_WALLET",
    PROPOSALFEEWALLET = "PROPOSAL_FEE_WALLET",
    DEPOSITADDRESS = "DEPOSIT_ADDRESS"
}
export interface FeeHistorySearchCondition {
    orgId?: string;
    transactionHash?: string;
    createdAtGte?: string;
    createdAtLt?: string;
}
export declare enum FeeHistoryType {
    WITHDRAWAL = "WITHDRAWAL",
    FLUSH = "FLUSH",
    WALLETDEPLOYMENT = "WALLET_DEPLOYMENT"
}
export interface FeeWalletBalanceDTO {
    defaultFeeWallet: BalanceDTO;
    proposalFeeWallets: Array<BalanceWithIdDTO>;
}
export interface FeeWalletDTO {
    defaultFeeWallet: HenesisKeyDTO;
    proposalFeeWallets: Array<ProposalFeeWalletDTO>;
}
export interface FlushDTO {
    id: string;
    transfers: Array<TransferDTO>;
    orgId: string;
    masterWalletId: string;
    createdAt: string;
    updatedAt: string;
}
export interface FlushInternalDTO {
    id: string;
    transfers: Array<TransferInternalDTO>;
    createdAt: string;
    updatedAt: string;
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
    id: string;
    address: string;
    pub: string;
}
export interface MasterWalletBalanceDTO {
    confirmedBalance: string;
    spendableBalance: string;
    aggregatedBalance: string;
}
export interface MasterWalletDTO {
    id: string;
    name: string;
    version: string;
    address: string;
    transaction?: TransactionDTO;
    status: WalletStatus;
    confirmation?: string;
    orgId: string;
    encryptionKey: string;
    nextChildNumber: number;
    accountKey: AccountKeyDTO;
    createdAt: string;
    updatedAt: string;
}
export interface MasterWalletSearchCondition {
    name?: string;
    status?: string;
    orgId?: string;
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
    keyFile: string;
    otpCode?: string;
}
export interface PatchWalletNameRequest {
    name: string;
}
export interface ProposalFeeWalletDTO {
    address: string;
    pub: string;
    id: string;
    keyFile?: string;
    chainCode: string;
}
export interface RawFlushDTO {
    targets: Array<RawFlushTransactionDTO>;
}
export interface RawFlushTransactionDTO {
    depositAddressId: string;
    childNumber: number;
    rawTransaction: RawTransactionDTO;
}
export interface RawSignedTransactionDTO {
    cid: string;
    message: RawTransactionDTO;
    signature: SignatureDTO;
}
export interface RawTransactionDTO {
    cid?: string;
    version: number;
    to: string;
    from: string;
    nonce: string;
    value: string;
    method: number;
    params: string;
    gasLimit: string;
    gasFeeCap: string;
    gasPremium: string;
}
export interface SignatureDTO {
    data: string;
    type: number;
}
export interface SimplifiedWalletDTO {
    masterWalletId: string;
    masterWalletAddress: string;
    masterWalletName: string;
    depositAddressId?: string;
    depositAddress?: string;
    depositAddressName?: string;
}
export interface SimplifiedWalletInternalDTO {
    id?: string;
    address: string;
    name?: string;
    masterWalletId?: string;
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
    hash?: string;
    params: string;
    version: number;
    error?: string;
    fromAddress: string;
    toAddress: string;
    gasLimit?: string;
    gasFeeCap?: string;
    gasPremium?: string;
    exitCode?: number;
    gasUsed?: string;
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
    metadata?: string;
    fromAddress: string;
    toAddress: string;
    orgId: string;
    masterWalletId: string;
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
    metadata?: string;
    fromAddress: SimplifiedWalletInternalDTO;
    toAddress: SimplifiedWalletInternalDTO;
    orgId: string;
    masterWalletId: string;
    walletId: string;
    proposalTransaction?: TransactionDTO;
    createdAt: string;
    updatedAt: string;
}
export interface TransferSearchCondition {
    address?: string;
    status?: string;
    fromAddress?: string;
    toAddress?: string;
    orgId?: string;
    masterWalletId?: string;
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
export declare enum WalletStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    CREATING = "CREATING",
    FAILED = "FAILED"
}
export declare const FeeWalletControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getFeeHistories: (pageable: Pageable, condition: FeeHistorySearchCondition, options?: any) => Promise<RequestArgs>;
    getFeeHistory: (historyId: string, options?: any) => Promise<RequestArgs>;
    getFeeWallet: (options?: any) => Promise<RequestArgs>;
    getFeeWalletBalance: (options?: any) => Promise<RequestArgs>;
};
export declare const FeeWalletControllerApiFp: (configuration?: Configuration) => {
    getFeeHistories(pageable: Pageable, condition: FeeHistorySearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationFeeHistoryDTO>>;
    getFeeHistory(historyId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FeeHistoryDTO>>;
    getFeeWallet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FeeWalletDTO>>;
    getFeeWalletBalance(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FeeWalletBalanceDTO>>;
};
export declare const FeeWalletControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getFeeHistories(pageable: Pageable, condition: FeeHistorySearchCondition, options?: any): AxiosPromise<PaginationFeeHistoryDTO>;
    getFeeHistory(historyId: string, options?: any): AxiosPromise<FeeHistoryDTO>;
    getFeeWallet(options?: any): AxiosPromise<FeeWalletDTO>;
    getFeeWalletBalance(options?: any): AxiosPromise<FeeWalletBalanceDTO>;
};
export declare class FeeWalletControllerApi extends BaseAPI {
    getFeeHistories(pageable: Pageable, condition: FeeHistorySearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationFeeHistoryDTO>>;
    getFeeHistory(historyId: string, options?: any): Promise<import("axios").AxiosResponse<FeeHistoryDTO>>;
    getFeeWallet(options?: any): Promise<import("axios").AxiosResponse<FeeWalletDTO>>;
    getFeeWalletBalance(options?: any): Promise<import("axios").AxiosResponse<FeeWalletBalanceDTO>>;
}
export declare const InternalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getFlush: (flushId: string, options?: any) => Promise<RequestArgs>;
    getFlushes: (pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getTransfer1: (transferId: string, options?: any) => Promise<RequestArgs>;
    getTransfers1: (pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const InternalControllerApiFp: (configuration?: Configuration) => {
    getFlush(flushId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FlushInternalDTO>>;
    getFlushes(pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationFlushInternalDTO>>;
    getTransfer1(transferId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferInternalDTO>>;
    getTransfers1(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransferInternalDTO>>;
};
export declare const InternalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getFlush(flushId: string, options?: any): AxiosPromise<FlushInternalDTO>;
    getFlushes(pageable: Pageable, options?: any): AxiosPromise<PaginationFlushInternalDTO>;
    getTransfer1(transferId: string, options?: any): AxiosPromise<TransferInternalDTO>;
    getTransfers1(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): AxiosPromise<PaginationTransferInternalDTO>;
};
export declare class InternalControllerApi extends BaseAPI {
    getFlush(flushId: string, options?: any): Promise<import("axios").AxiosResponse<FlushInternalDTO>>;
    getFlushes(pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationFlushInternalDTO>>;
    getTransfer1(transferId: string, options?: any): Promise<import("axios").AxiosResponse<TransferInternalDTO>>;
    getTransfers1(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationTransferInternalDTO>>;
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
    getTransfers: (pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const TransferControllerApiFp: (configuration?: Configuration) => {
    getTransfer(transferId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferDTO>>;
    getTransfers(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransferDTO>>;
};
export declare const TransferControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getTransfer(transferId: string, options?: any): AxiosPromise<TransferDTO>;
    getTransfers(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): AxiosPromise<PaginationTransferDTO>;
};
export declare class TransferControllerApi extends BaseAPI {
    getTransfer(transferId: string, options?: any): Promise<import("axios").AxiosResponse<TransferDTO>>;
    getTransfers(pageable: Pageable, transferSearchCondition: TransferSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationTransferDTO>>;
}
export declare const WalletControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    buildDepositAddressTransaction: (masterWalletId: string, depositAddressId: string, buildTransactionRequest: BuildTransactionRequest, options?: any) => Promise<RequestArgs>;
    buildFlush: (masterWalletId: string, buildFlushRequest: BuildFlushRequest, options?: any) => Promise<RequestArgs>;
    buildTransaction: (masterWalletId: string, buildTransactionRequest: BuildTransactionRequest, options?: any) => Promise<RequestArgs>;
    createDepositAddress: (masterWalletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any) => Promise<RequestArgs>;
    createMasterWallet: (createMasterWalletRequest: CreateMasterWalletRequest, options?: any) => Promise<RequestArgs>;
    flush: (masterWalletId: string, createFlushRequest: CreateFlushRequest, options?: any) => Promise<RequestArgs>;
    getAllMasterWallets: (sort: Sort, condition: MasterWalletSearchCondition, options?: any) => Promise<RequestArgs>;
    getBalance: (masterWalletId: string, options?: any) => Promise<RequestArgs>;
    getDepositAddress: (masterWalletId: string, depositAddressId: string, options?: any) => Promise<RequestArgs>;
    getDepositAddressBalance: (masterWalletId: string, depositAddressId: string, options?: any) => Promise<RequestArgs>;
    getDepositAddresses: (masterWalletId: string, pageable: Pageable, condition: DepositAddressSearchCondition, options?: any) => Promise<RequestArgs>;
    getDepositAddressesBalance: (masterWalletId: string, ids: Array<string>, options?: any) => Promise<RequestArgs>;
    getFlush1: (masterWalletId: string, flushId: string, options?: any) => Promise<RequestArgs>;
    getFlushes1: (masterWalletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getMasterWallet: (masterWalletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletInitialAccountKey: (masterWalletId: string, options?: any) => Promise<RequestArgs>;
    patchDepositAddressName: (masterWalletId: string, depositAddressId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any) => Promise<RequestArgs>;
    patchMasterWalletAccountKey: (masterWalletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any) => Promise<RequestArgs>;
    patchWalletMasterName: (masterWalletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any) => Promise<RequestArgs>;
    recreateWallet: (masterWalletId: string, options?: any) => Promise<RequestArgs>;
    sendTransaction: (masterWalletId: string, createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any) => Promise<RequestArgs>;
    sendTransaction1: (masterWalletId: string, depositAddressId: string, createTransactionRequest: CreateTransactionRequest, options?: any) => Promise<RequestArgs>;
};
export declare const WalletControllerApiFp: (configuration?: Configuration) => {
    buildDepositAddressTransaction(masterWalletId: string, depositAddressId: string, buildTransactionRequest: BuildTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RawTransactionDTO>>;
    buildFlush(masterWalletId: string, buildFlushRequest: BuildFlushRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RawFlushDTO>>;
    buildTransaction(masterWalletId: string, buildTransactionRequest: BuildTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RawTransactionDTO>>;
    createDepositAddress(masterWalletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DepositAddressDTO>>;
    createMasterWallet(createMasterWalletRequest: CreateMasterWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    flush(masterWalletId: string, createFlushRequest: CreateFlushRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FlushDTO>>;
    getAllMasterWallets(sort: Sort, condition: MasterWalletSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MasterWalletDTO>>>;
    getBalance(masterWalletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletBalanceDTO>>;
    getDepositAddress(masterWalletId: string, depositAddressId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DepositAddressDTO>>;
    getDepositAddressBalance(masterWalletId: string, depositAddressId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BalanceDTO>>;
    getDepositAddresses(masterWalletId: string, pageable: Pageable, condition: DepositAddressSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationDepositAddressDTO>>;
    getDepositAddressesBalance(masterWalletId: string, ids: Array<string>, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BalanceWithIdDTO>>>;
    getFlush1(masterWalletId: string, flushId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FlushDTO>>;
    getFlushes1(masterWalletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationFlushDTO>>;
    getMasterWallet(masterWalletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    getMasterWalletInitialAccountKey(masterWalletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccountKeyDTO>>;
    patchDepositAddressName(masterWalletId: string, depositAddressId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DepositAddressDTO>>;
    patchMasterWalletAccountKey(masterWalletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccountKeyDTO>>;
    patchWalletMasterName(masterWalletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    recreateWallet(masterWalletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    sendTransaction(masterWalletId: string, createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferDTO>>;
    sendTransaction1(masterWalletId: string, depositAddressId: string, createTransactionRequest: CreateTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferDTO>>;
};
export declare const WalletControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    buildDepositAddressTransaction(masterWalletId: string, depositAddressId: string, buildTransactionRequest: BuildTransactionRequest, options?: any): AxiosPromise<RawTransactionDTO>;
    buildFlush(masterWalletId: string, buildFlushRequest: BuildFlushRequest, options?: any): AxiosPromise<RawFlushDTO>;
    buildTransaction(masterWalletId: string, buildTransactionRequest: BuildTransactionRequest, options?: any): AxiosPromise<RawTransactionDTO>;
    createDepositAddress(masterWalletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): AxiosPromise<DepositAddressDTO>;
    createMasterWallet(createMasterWalletRequest: CreateMasterWalletRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    flush(masterWalletId: string, createFlushRequest: CreateFlushRequest, options?: any): AxiosPromise<FlushDTO>;
    getAllMasterWallets(sort: Sort, condition: MasterWalletSearchCondition, options?: any): AxiosPromise<Array<MasterWalletDTO>>;
    getBalance(masterWalletId: string, options?: any): AxiosPromise<MasterWalletBalanceDTO>;
    getDepositAddress(masterWalletId: string, depositAddressId: string, options?: any): AxiosPromise<DepositAddressDTO>;
    getDepositAddressBalance(masterWalletId: string, depositAddressId: string, options?: any): AxiosPromise<BalanceDTO>;
    getDepositAddresses(masterWalletId: string, pageable: Pageable, condition: DepositAddressSearchCondition, options?: any): AxiosPromise<PaginationDepositAddressDTO>;
    getDepositAddressesBalance(masterWalletId: string, ids: Array<string>, options?: any): AxiosPromise<Array<BalanceWithIdDTO>>;
    getFlush1(masterWalletId: string, flushId: string, options?: any): AxiosPromise<FlushDTO>;
    getFlushes1(masterWalletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationFlushDTO>;
    getMasterWallet(masterWalletId: string, options?: any): AxiosPromise<MasterWalletDTO>;
    getMasterWalletInitialAccountKey(masterWalletId: string, options?: any): AxiosPromise<AccountKeyDTO>;
    patchDepositAddressName(masterWalletId: string, depositAddressId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): AxiosPromise<DepositAddressDTO>;
    patchMasterWalletAccountKey(masterWalletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): AxiosPromise<AccountKeyDTO>;
    patchWalletMasterName(masterWalletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    recreateWallet(masterWalletId: string, options?: any): AxiosPromise<MasterWalletDTO>;
    sendTransaction(masterWalletId: string, createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): AxiosPromise<TransferDTO>;
    sendTransaction1(masterWalletId: string, depositAddressId: string, createTransactionRequest: CreateTransactionRequest, options?: any): AxiosPromise<TransferDTO>;
};
export declare class WalletControllerApi extends BaseAPI {
    buildDepositAddressTransaction(masterWalletId: string, depositAddressId: string, buildTransactionRequest: BuildTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<RawTransactionDTO>>;
    buildFlush(masterWalletId: string, buildFlushRequest: BuildFlushRequest, options?: any): Promise<import("axios").AxiosResponse<RawFlushDTO>>;
    buildTransaction(masterWalletId: string, buildTransactionRequest: BuildTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<RawTransactionDTO>>;
    createDepositAddress(masterWalletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): Promise<import("axios").AxiosResponse<DepositAddressDTO>>;
    createMasterWallet(createMasterWalletRequest: CreateMasterWalletRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    flush(masterWalletId: string, createFlushRequest: CreateFlushRequest, options?: any): Promise<import("axios").AxiosResponse<FlushDTO>>;
    getAllMasterWallets(sort: Sort, condition: MasterWalletSearchCondition, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO[]>>;
    getBalance(masterWalletId: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletBalanceDTO>>;
    getDepositAddress(masterWalletId: string, depositAddressId: string, options?: any): Promise<import("axios").AxiosResponse<DepositAddressDTO>>;
    getDepositAddressBalance(masterWalletId: string, depositAddressId: string, options?: any): Promise<import("axios").AxiosResponse<BalanceDTO>>;
    getDepositAddresses(masterWalletId: string, pageable: Pageable, condition: DepositAddressSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationDepositAddressDTO>>;
    getDepositAddressesBalance(masterWalletId: string, ids: Array<string>, options?: any): Promise<import("axios").AxiosResponse<BalanceWithIdDTO[]>>;
    getFlush1(masterWalletId: string, flushId: string, options?: any): Promise<import("axios").AxiosResponse<FlushDTO>>;
    getFlushes1(masterWalletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationFlushDTO>>;
    getMasterWallet(masterWalletId: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    getMasterWalletInitialAccountKey(masterWalletId: string, options?: any): Promise<import("axios").AxiosResponse<AccountKeyDTO>>;
    patchDepositAddressName(masterWalletId: string, depositAddressId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<DepositAddressDTO>>;
    patchMasterWalletAccountKey(masterWalletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): Promise<import("axios").AxiosResponse<AccountKeyDTO>>;
    patchWalletMasterName(masterWalletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    recreateWallet(masterWalletId: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    sendTransaction(masterWalletId: string, createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransferDTO>>;
    sendTransaction1(masterWalletId: string, depositAddressId: string, createTransactionRequest: CreateTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransferDTO>>;
}
