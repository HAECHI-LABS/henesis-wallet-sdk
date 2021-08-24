import { Configuration } from './configuration';
import { AxiosPromise, AxiosInstance } from 'axios';
import { RequestArgs, BaseAPI } from './base';
export interface ActivateAllowedAddressesRequest {
    otpCode: string;
}
export interface ActivateMasterWalletRequest {
    accountKey: KeyDTO;
    backupKey: KeyDTO;
}
export interface Address {
    value?: string;
}
export interface AllowedAddressDTO {
    id: string;
    address: string;
    label?: string;
    whitelistedWalletId?: string;
    coinId?: number;
    whitelistType: WhitelistType;
    allowedCoinType: AllowedCoinType;
    createdAt: string;
    updatedAt: string;
}
export declare enum AllowedCoinType {
    ALL = "ALL",
    SINGLE = "SINGLE"
}
export interface ApproveWithdrawalApprovalRequest {
    inputs: Array<CreateTransactionInputDTO>;
    outputs: Array<CreateTransactionOutputDTO>;
    to?: string;
    metadata?: string;
    otpCode: string;
}
export interface BalanceDTO {
    balance: string;
    spendableBalance: string;
}
export declare enum Blockchain {
    ETHEREUM = "ETHEREUM",
    KLAYTN = "KLAYTN",
    BITCOIN = "BITCOIN",
    FILECOIN = "FILECOIN",
    BINANCESMARTCHAIN = "BINANCE_SMART_CHAIN",
    LITECOIN = "LITECOIN"
}
export declare enum CoinSymbol {
    ETH = "ETH",
    KLAY = "KLAY",
    BTC = "BTC",
    FIL = "FIL",
    BNB = "BNB",
    LTC = "LTC"
}
export interface CreateAllowedAddressRequest {
    address: string;
    label?: string;
    whitelistType: WhitelistType;
    otpCode: string;
}
export interface CreateDepositAddressRequest {
    name: string;
    otpCode?: string;
}
export interface CreateInactiveMasterWalletRequest {
    name: string;
    encryptionKey: string;
}
export interface CreateInactiveMasterWalletResponse {
    id: string;
    name: string;
    orgId: string;
    henesisKey: KeyDTO;
    encryptionKey: string;
    status: WalletStatus;
    createdAt: string;
}
export interface CreateRawTransactionRequest {
    to: string;
    amount: string;
    feeRate?: string;
}
export interface CreateTransactionInputDTO {
    transactionOutput: TransactionOutputDTO;
    accountSignature: string;
}
export interface CreateTransactionOutputDTO {
    to: string;
    amount: string;
    isChange: boolean;
}
export interface CreateTransactionRequest {
    inputs: Array<CreateTransactionInputDTO>;
    outputs: Array<CreateTransactionOutputDTO>;
    to?: string;
    metadata?: string;
    otpCode: string;
}
export interface CreateWithdrawalPolicyRequest {
    limitAmount: string;
    type: WithdrawalPolicyType;
    otpCode: string;
}
export interface DeleteAllowedAddressRequest {
    otpCode: string;
}
export interface DepositAddressDTO {
    id: string;
    name: string;
    address: string;
    pub: string;
    createdAt: string;
}
export interface ErrorBody {
    message?: string;
    code?: number;
}
export interface ErrorResponse {
    error?: ErrorBody;
}
export interface EstimatedFeeDTO {
    estimatedFee: string;
}
export interface ExternalWithdrawalSearchCondition {
    status?: string;
    blockchain?: string;
    updatedAtGte?: string;
    updatedAtLt?: string;
    createdAtGte?: string;
    createdAtLt?: string;
    orgId?: string;
    walletId?: string;
}
export interface InactivateAllowedAddressesRequest {
    otpCode: string;
}
export interface KeyDTO {
    pub: string;
    keyFile: string;
}
export interface MasterWalletDTO {
    id: string;
    name: string;
    address: string;
    orgId: string;
    accountKey: KeyDTO;
    encryptionKey: string;
    status: WalletStatus;
    whitelistActivated: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface Pageable {
    page?: number;
    size?: number;
    sort?: Array<string>;
}
export interface PaginationAllowedAddressDTO {
    pagination: PaginationMeta;
    results: Array<AllowedAddressDTO>;
}
export interface PaginationDepositAddressDTO {
    pagination: PaginationMeta;
    results: Array<DepositAddressDTO>;
}
export interface PaginationMeta {
    nextUrl: string;
    previousUrl: string;
    totalCount: number;
}
export interface PaginationSimplifiedTransferDTO {
    pagination: PaginationMeta;
    results: Array<SimplifiedTransferDTO>;
}
export interface PaginationTransferDTO {
    pagination: PaginationMeta;
    results: Array<TransferDTO>;
}
export interface PaginationTransferInternalDTO {
    pagination: PaginationMeta;
    results: Array<TransferInternalDTO>;
}
export interface PaginationWalletDTO {
    pagination: PaginationMeta;
    results: Array<WalletDTO>;
}
export interface PaginationWalletWithdrawalPolicyDTO {
    pagination: PaginationMeta;
    results: Array<WalletWithdrawalPolicyDTO>;
}
export interface PatchAccountKeyRequest {
    keyFile: string;
    otpCode?: string;
}
export interface PatchWalletNameRequest {
    name: string;
}
export interface PatchWithdrawalPolicyRequest {
    limitAmount: string;
    otpCode: string;
}
export interface RawTransactionDTO {
    inputs: Array<RawTransactionInputDTO>;
    outputs: Array<RawTransactionOutputDTO>;
}
export interface RawTransactionInputDTO {
    redeemScript?: string;
    transactionOutput?: TransactionOutputDTO;
}
export interface RawTransactionOutputDTO {
    to: string;
    amount: string;
    isChange: boolean;
}
export interface RejectWithdrawalApprovalRequest {
    otpCode?: string;
}
export interface SimplifiedTransferDTO {
    id?: string;
    amount?: string;
    type?: SimplifiedTransferDTOTypeEnum;
    status?: SimplifiedTransferDTOStatusEnum;
    orgId?: string;
    walletId?: string;
    receivedAt?: Address;
    sendTo?: Address;
    createdAt?: string;
    updatedAt?: string;
}
export declare enum SimplifiedTransferDTOTypeEnum {
    WITHDRAWAL = "WITHDRAWAL",
    DEPOSIT = "DEPOSIT"
}
export declare enum SimplifiedTransferDTOStatusEnum {
    PENDINGAPPROVAL = "PENDING_APPROVAL",
    REJECTED = "REJECTED",
    PENDING = "PENDING",
    MINED = "MINED",
    CONFIRMED = "CONFIRMED",
    REQUESTED = "REQUESTED"
}
export interface SimplifiedWalletInternalDTO {
    id?: string;
    address: string;
    name?: string;
    walletId?: string;
}
export interface TransactionDTO {
    id: string;
    hex: string;
    outputs: Array<TransactionOutputDTO>;
    amount: string;
    blockNumber?: string;
    feeAmount?: string;
    transactionHash: string;
    createdAt: string;
    updatedAt: string;
}
export interface TransactionOutputDTO {
    address: string;
    amount: string;
    transactionId: string;
    outputIndex: number;
    scriptPubKey: string;
    isChange: boolean;
}
export interface TransferDTO {
    amount: string;
    status: TransferStatus;
    confirmation: string;
    metadata?: string;
    id: string;
    walletId: string;
    transaction?: TransactionDTO;
    outputIndex?: number;
    receivedAt?: string;
    sendTo?: string;
    feeAmount?: string;
    withdrawalApprovalId?: string;
    type: TransferType;
    createdAt: string;
    updatedAt: string;
}
export interface TransferInternalDTO {
    amount: string;
    status: TransferStatus;
    confirmation: string;
    id: string;
    walletId: string;
    transaction?: TransactionDTO;
    outputIndex?: number;
    receivedAt?: SimplifiedWalletInternalDTO;
    sendTo?: SimplifiedWalletInternalDTO;
    feeAmount?: string;
    withdrawalApprovalId?: string;
    type: TransferType;
    createdAt: string;
    updatedAt: string;
}
export interface TransferSearchCondition {
    status?: string;
    blockchain?: string;
    updatedAtGte?: string;
    updatedAtLt?: string;
    createdAtGte?: string;
    createdAtLt?: string;
    orgId?: string;
    walletId?: string;
    transferType?: string;
}
export declare enum TransferStatus {
    PENDINGAPPROVAL = "PENDING_APPROVAL",
    REJECTED = "REJECTED",
    PENDING = "PENDING",
    MINED = "MINED",
    CONFIRMED = "CONFIRMED",
    REQUESTED = "REQUESTED"
}
export declare enum TransferType {
    WITHDRAWAL = "WITHDRAWAL",
    DEPOSIT = "DEPOSIT"
}
export interface ValidateIsAllowedAddressRequest {
    address: string;
}
export interface ValidateIsAllowedAddressResponse {
    isValid: boolean;
}
export interface WalletDTO {
    id?: string;
    blockchain?: WalletDTOBlockchainEnum;
    type?: WalletDTOTypeEnum;
    status?: WalletDTOStatusEnum;
    address?: string;
    walletId?: string;
    orgId?: string;
    walletName?: string;
    createdAt?: string;
    updatedAt?: string;
}
export declare enum WalletDTOBlockchainEnum {
    ETHEREUM = "ETHEREUM",
    KLAYTN = "KLAYTN",
    BITCOIN = "BITCOIN",
    FILECOIN = "FILECOIN",
    BINANCESMARTCHAIN = "BINANCE_SMART_CHAIN",
    LITECOIN = "LITECOIN"
}
export declare enum WalletDTOTypeEnum {
    MASTERWALLET = "MASTER_WALLET",
    DEPOSITADDRESS = "DEPOSIT_ADDRESS"
}
export declare enum WalletDTOStatusEnum {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    CREATING = "CREATING"
}
export interface WalletSearchCondition {
    status?: string;
    blockchain?: string;
    id?: string;
    name?: string;
    address?: string;
    updatedAtGte?: string;
    updatedAtLt?: string;
    createdAtGte?: string;
    createdAtLt?: string;
    orgId?: string;
    walletId?: string;
}
export declare enum WalletStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    CREATING = "CREATING"
}
export interface WalletWithdrawalPolicyDTO {
    id: string;
    blockchain: Blockchain;
    limitAmount: string;
    type: WithdrawalPolicyType;
    walletId: string;
    coinSymbol: CoinSymbol;
    coinName: string;
    decimals: number;
}
export declare enum WhitelistType {
    ALL = "ALL",
    SINGLE = "SINGLE"
}
export declare enum WithdrawalPolicyType {
    DAILY = "DAILY",
    TRANSACTION = "TRANSACTION"
}
export declare const AdminControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getDepositAddresses3: (pageable: Pageable, condition: WalletSearchCondition, options?: any) => Promise<RequestArgs>;
    getExternalWithdrawals1: (pageable: Pageable, condition: ExternalWithdrawalSearchCondition, options?: any) => Promise<RequestArgs>;
    getMasterWallets3: (pageable: Pageable, condition: WalletSearchCondition, options?: any) => Promise<RequestArgs>;
    getTransfers3: (pageable: Pageable, condition: TransferSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const AdminControllerApiFp: (configuration?: Configuration) => {
    getDepositAddresses3(pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletDTO>>;
    getExternalWithdrawals1(pageable: Pageable, condition: ExternalWithdrawalSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationSimplifiedTransferDTO>>;
    getMasterWallets3(pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletDTO>>;
    getTransfers3(pageable: Pageable, condition: TransferSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationSimplifiedTransferDTO>>;
};
export declare const AdminControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getDepositAddresses3(pageable: Pageable, condition: WalletSearchCondition, options?: any): AxiosPromise<PaginationWalletDTO>;
    getExternalWithdrawals1(pageable: Pageable, condition: ExternalWithdrawalSearchCondition, options?: any): AxiosPromise<PaginationSimplifiedTransferDTO>;
    getMasterWallets3(pageable: Pageable, condition: WalletSearchCondition, options?: any): AxiosPromise<PaginationWalletDTO>;
    getTransfers3(pageable: Pageable, condition: TransferSearchCondition, options?: any): AxiosPromise<PaginationSimplifiedTransferDTO>;
};
export declare class AdminControllerApi extends BaseAPI {
    getDepositAddresses3(pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletDTO>>;
    getExternalWithdrawals1(pageable: Pageable, condition: ExternalWithdrawalSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationSimplifiedTransferDTO>>;
    getMasterWallets3(pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletDTO>>;
    getTransfers3(pageable: Pageable, condition: TransferSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationSimplifiedTransferDTO>>;
}
export declare const InternalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getTransfer2: (transferId: string, options?: any) => Promise<RequestArgs>;
    getTransfers4: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
};
export declare const InternalControllerApiFp: (configuration?: Configuration) => {
    getTransfer2(transferId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferInternalDTO>>;
    getTransfers4(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransferInternalDTO>>;
};
export declare const InternalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getTransfer2(transferId: string, options?: any): AxiosPromise<TransferInternalDTO>;
    getTransfers4(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationTransferInternalDTO>;
};
export declare class InternalControllerApi extends BaseAPI {
    getTransfer2(transferId: string, options?: any): Promise<import("axios").AxiosResponse<TransferInternalDTO>>;
    getTransfers4(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationTransferInternalDTO>>;
}
export declare const LtcAdminControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getDepositAddresses: (pageable: Pageable, condition: WalletSearchCondition, options?: any) => Promise<RequestArgs>;
    getExternalWithdrawals: (pageable: Pageable, condition: ExternalWithdrawalSearchCondition, options?: any) => Promise<RequestArgs>;
    getMasterWallets: (pageable: Pageable, condition: WalletSearchCondition, options?: any) => Promise<RequestArgs>;
    getTransfers1: (pageable: Pageable, condition: TransferSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const LtcAdminControllerApiFp: (configuration?: Configuration) => {
    getDepositAddresses(pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletDTO>>;
    getExternalWithdrawals(pageable: Pageable, condition: ExternalWithdrawalSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationSimplifiedTransferDTO>>;
    getMasterWallets(pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletDTO>>;
    getTransfers1(pageable: Pageable, condition: TransferSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationSimplifiedTransferDTO>>;
};
export declare const LtcAdminControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getDepositAddresses(pageable: Pageable, condition: WalletSearchCondition, options?: any): AxiosPromise<PaginationWalletDTO>;
    getExternalWithdrawals(pageable: Pageable, condition: ExternalWithdrawalSearchCondition, options?: any): AxiosPromise<PaginationSimplifiedTransferDTO>;
    getMasterWallets(pageable: Pageable, condition: WalletSearchCondition, options?: any): AxiosPromise<PaginationWalletDTO>;
    getTransfers1(pageable: Pageable, condition: TransferSearchCondition, options?: any): AxiosPromise<PaginationSimplifiedTransferDTO>;
};
export declare class LtcAdminControllerApi extends BaseAPI {
    getDepositAddresses(pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletDTO>>;
    getExternalWithdrawals(pageable: Pageable, condition: ExternalWithdrawalSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationSimplifiedTransferDTO>>;
    getMasterWallets(pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletDTO>>;
    getTransfers1(pageable: Pageable, condition: TransferSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationSimplifiedTransferDTO>>;
}
export declare const LtcInternalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getTransfer1: (transferId: string, options?: any) => Promise<RequestArgs>;
    getTransfers2: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
};
export declare const LtcInternalControllerApiFp: (configuration?: Configuration) => {
    getTransfer1(transferId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferInternalDTO>>;
    getTransfers2(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransferInternalDTO>>;
};
export declare const LtcInternalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getTransfer1(transferId: string, options?: any): AxiosPromise<TransferInternalDTO>;
    getTransfers2(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationTransferInternalDTO>;
};
export declare class LtcInternalControllerApi extends BaseAPI {
    getTransfer1(transferId: string, options?: any): Promise<import("axios").AxiosResponse<TransferInternalDTO>>;
    getTransfers2(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationTransferInternalDTO>>;
}
export declare const LtcTransferControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getTransfer: (transferId: string, options?: any) => Promise<RequestArgs>;
    getTransfers: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
};
export declare const LtcTransferControllerApiFp: (configuration?: Configuration) => {
    getTransfer(transferId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferDTO>>;
    getTransfers(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransferDTO>>;
};
export declare const LtcTransferControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getTransfer(transferId: string, options?: any): AxiosPromise<TransferDTO>;
    getTransfers(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationTransferDTO>;
};
export declare class LtcTransferControllerApi extends BaseAPI {
    getTransfer(transferId: string, options?: any): Promise<import("axios").AxiosResponse<TransferDTO>>;
    getTransfers(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationTransferDTO>>;
}
export declare const LtcWalletControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    activateAllowedAddresses: (walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any) => Promise<RequestArgs>;
    activateMasterWallet: (walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any) => Promise<RequestArgs>;
    calculateEstimatedFee: (walletId: string, options?: any) => Promise<RequestArgs>;
    createAllowedAddress: (walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
    createDepositAddress: (walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any) => Promise<RequestArgs>;
    createMasterWallet1: (createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any) => Promise<RequestArgs>;
    createRawTransaction: (walletId: string, createRawTransactionRequest: CreateRawTransactionRequest, options?: any) => Promise<RequestArgs>;
    createWalletWithdrawalPolicy: (walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any) => Promise<RequestArgs>;
    deleteAllowedAddress: (walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
    getAllowedAddress: (walletId: string, allowedAddressId: string, options?: any) => Promise<RequestArgs>;
    getAllowedAddresses: (walletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getBalance: (walletId: string, options?: any) => Promise<RequestArgs>;
    getDepositAddress: (walletId: string, depositAddressId: string, options?: any) => Promise<RequestArgs>;
    getDepositAddresses1: (walletId: string, pageable: Pageable, condition: WalletSearchCondition, options?: any) => Promise<RequestArgs>;
    getMasterWallet: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletInitialKey: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWallets1: (specs: object, options?: any) => Promise<RequestArgs>;
    getWalletWithdrawalPolicies: (walletId: string, pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getWalletWithdrawalPolicy: (walletId: string, withdrawalPolicyId: string, options?: any) => Promise<RequestArgs>;
    inactivateAllowedAddresses: (walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any) => Promise<RequestArgs>;
    patchMasterWalletAccountKey: (walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any) => Promise<RequestArgs>;
    patchMasterWalletName: (walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any) => Promise<RequestArgs>;
    patchWalletWithdrawalPolicy: (walletId: string, withdrawalPolicyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any) => Promise<RequestArgs>;
    sendTransaction: (walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any) => Promise<RequestArgs>;
    validateIsAllowedAddress: (walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
};
export declare const LtcWalletControllerApiFp: (configuration?: Configuration) => {
    activateAllowedAddresses(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    activateMasterWallet(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    calculateEstimatedFee(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EstimatedFeeDTO>>;
    createAllowedAddress(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedAddressDTO>>;
    createDepositAddress(walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DepositAddressDTO>>;
    createMasterWallet1(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateInactiveMasterWalletResponse | MasterWalletDTO>>;
    createRawTransaction(walletId: string, createRawTransactionRequest: CreateRawTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RawTransactionDTO>>;
    createWalletWithdrawalPolicy(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    deleteAllowedAddress(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getAllowedAddress(walletId: string, allowedAddressId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedAddressDTO>>;
    getAllowedAddresses(walletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationAllowedAddressDTO>>;
    getBalance(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BalanceDTO>>;
    getDepositAddress(walletId: string, depositAddressId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DepositAddressDTO>>;
    getDepositAddresses1(walletId: string, pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationDepositAddressDTO>>;
    getMasterWallet(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    getMasterWalletInitialKey(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    getMasterWallets1(specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MasterWalletDTO>>>;
    getWalletWithdrawalPolicies(walletId: string, pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletWithdrawalPolicyDTO>>;
    getWalletWithdrawalPolicy(walletId: string, withdrawalPolicyId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    inactivateAllowedAddresses(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    patchMasterWalletAccountKey(walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    patchMasterWalletName(walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    patchWalletWithdrawalPolicy(walletId: string, withdrawalPolicyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    sendTransaction(walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferDTO>>;
    validateIsAllowedAddress(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ValidateIsAllowedAddressResponse>>;
};
export declare const LtcWalletControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    activateAllowedAddresses(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): AxiosPromise<void>;
    activateMasterWallet(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    calculateEstimatedFee(walletId: string, options?: any): AxiosPromise<EstimatedFeeDTO>;
    createAllowedAddress(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): AxiosPromise<AllowedAddressDTO>;
    createDepositAddress(walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): AxiosPromise<DepositAddressDTO>;
    createMasterWallet1(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): AxiosPromise<CreateInactiveMasterWalletResponse | MasterWalletDTO>;
    createRawTransaction(walletId: string, createRawTransactionRequest: CreateRawTransactionRequest, options?: any): AxiosPromise<RawTransactionDTO>;
    createWalletWithdrawalPolicy(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    deleteAllowedAddress(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): AxiosPromise<void>;
    getAllowedAddress(walletId: string, allowedAddressId: string, options?: any): AxiosPromise<AllowedAddressDTO>;
    getAllowedAddresses(walletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationAllowedAddressDTO>;
    getBalance(walletId: string, options?: any): AxiosPromise<BalanceDTO>;
    getDepositAddress(walletId: string, depositAddressId: string, options?: any): AxiosPromise<DepositAddressDTO>;
    getDepositAddresses1(walletId: string, pageable: Pageable, condition: WalletSearchCondition, options?: any): AxiosPromise<PaginationDepositAddressDTO>;
    getMasterWallet(walletId: string, options?: any): AxiosPromise<MasterWalletDTO>;
    getMasterWalletInitialKey(walletId: string, options?: any): AxiosPromise<KeyDTO>;
    getMasterWallets1(specs: object, options?: any): AxiosPromise<Array<MasterWalletDTO>>;
    getWalletWithdrawalPolicies(walletId: string, pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationWalletWithdrawalPolicyDTO>;
    getWalletWithdrawalPolicy(walletId: string, withdrawalPolicyId: string, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    inactivateAllowedAddresses(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): AxiosPromise<void>;
    patchMasterWalletAccountKey(walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): AxiosPromise<KeyDTO>;
    patchMasterWalletName(walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    patchWalletWithdrawalPolicy(walletId: string, withdrawalPolicyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    sendTransaction(walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any): AxiosPromise<TransferDTO>;
    validateIsAllowedAddress(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): AxiosPromise<ValidateIsAllowedAddressResponse>;
};
export declare class LtcWalletControllerApi extends BaseAPI {
    activateAllowedAddresses(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    activateMasterWallet(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    calculateEstimatedFee(walletId: string, options?: any): Promise<import("axios").AxiosResponse<EstimatedFeeDTO>>;
    createAllowedAddress(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<AllowedAddressDTO>>;
    createDepositAddress(walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): Promise<import("axios").AxiosResponse<DepositAddressDTO>>;
    createMasterWallet1(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): Promise<import("axios").AxiosResponse<CreateInactiveMasterWalletResponse | MasterWalletDTO>>;
    createRawTransaction(walletId: string, createRawTransactionRequest: CreateRawTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<RawTransactionDTO>>;
    createWalletWithdrawalPolicy(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    deleteAllowedAddress(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    getAllowedAddress(walletId: string, allowedAddressId: string, options?: any): Promise<import("axios").AxiosResponse<AllowedAddressDTO>>;
    getAllowedAddresses(walletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationAllowedAddressDTO>>;
    getBalance(walletId: string, options?: any): Promise<import("axios").AxiosResponse<BalanceDTO>>;
    getDepositAddress(walletId: string, depositAddressId: string, options?: any): Promise<import("axios").AxiosResponse<DepositAddressDTO>>;
    getDepositAddresses1(walletId: string, pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationDepositAddressDTO>>;
    getMasterWallet(walletId: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    getMasterWalletInitialKey(walletId: string, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    getMasterWallets1(specs: object, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO[]>>;
    getWalletWithdrawalPolicies(walletId: string, pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletWithdrawalPolicyDTO>>;
    getWalletWithdrawalPolicy(walletId: string, withdrawalPolicyId: string, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    inactivateAllowedAddresses(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    patchMasterWalletAccountKey(walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    patchMasterWalletName(walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    patchWalletWithdrawalPolicy(walletId: string, withdrawalPolicyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    sendTransaction(walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransferDTO>>;
    validateIsAllowedAddress(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<ValidateIsAllowedAddressResponse>>;
}
export declare const LtcWithdrawalApprovalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    approveWithdrawalApproval: (withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any) => Promise<RequestArgs>;
    rejectWithdrawalApproval: (withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any) => Promise<RequestArgs>;
};
export declare const LtcWithdrawalApprovalControllerApiFp: (configuration?: Configuration) => {
    approveWithdrawalApproval(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferDTO>>;
    rejectWithdrawalApproval(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const LtcWithdrawalApprovalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    approveWithdrawalApproval(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): AxiosPromise<TransferDTO>;
    rejectWithdrawalApproval(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): AxiosPromise<void>;
};
export declare class LtcWithdrawalApprovalControllerApi extends BaseAPI {
    approveWithdrawalApproval(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): Promise<import("axios").AxiosResponse<TransferDTO>>;
    rejectWithdrawalApproval(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
}
export declare const TransferControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getTransfer3: (transferId: string, options?: any) => Promise<RequestArgs>;
    getTransfers5: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
};
export declare const TransferControllerApiFp: (configuration?: Configuration) => {
    getTransfer3(transferId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferDTO>>;
    getTransfers5(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransferDTO>>;
};
export declare const TransferControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getTransfer3(transferId: string, options?: any): AxiosPromise<TransferDTO>;
    getTransfers5(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationTransferDTO>;
};
export declare class TransferControllerApi extends BaseAPI {
    getTransfer3(transferId: string, options?: any): Promise<import("axios").AxiosResponse<TransferDTO>>;
    getTransfers5(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationTransferDTO>>;
}
export declare const WalletControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    activateAllowedAddresses1: (walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any) => Promise<RequestArgs>;
    activateMasterWallet1: (walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any) => Promise<RequestArgs>;
    calculateEstimatedFee1: (walletId: string, options?: any) => Promise<RequestArgs>;
    createAllowedAddress1: (walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
    createDepositAddress1: (walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any) => Promise<RequestArgs>;
    createMasterWallet2: (createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any) => Promise<RequestArgs>;
    createRawTransaction1: (walletId: string, createRawTransactionRequest: CreateRawTransactionRequest, options?: any) => Promise<RequestArgs>;
    createWalletWithdrawalPolicy1: (walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any) => Promise<RequestArgs>;
    deleteAllowedAddress1: (walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
    getAllowedAddress1: (walletId: string, allowedAddressId: string, options?: any) => Promise<RequestArgs>;
    getAllowedAddresses1: (walletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getBalance1: (walletId: string, options?: any) => Promise<RequestArgs>;
    getDepositAddress1: (walletId: string, depositAddressId: string, options?: any) => Promise<RequestArgs>;
    getDepositAddresses2: (walletId: string, pageable: Pageable, condition: WalletSearchCondition, options?: any) => Promise<RequestArgs>;
    getMasterWallet1: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletInitialKey1: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWallets2: (specs: object, options?: any) => Promise<RequestArgs>;
    getWalletWithdrawalPolicies1: (walletId: string, pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getWalletWithdrawalPolicy1: (walletId: string, withdrawalPolicyId: string, options?: any) => Promise<RequestArgs>;
    inactivateAllowedAddresses1: (walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any) => Promise<RequestArgs>;
    patchMasterWalletAccountKey1: (walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any) => Promise<RequestArgs>;
    patchMasterWalletName1: (walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any) => Promise<RequestArgs>;
    patchWalletWithdrawalPolicy1: (walletId: string, withdrawalPolicyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any) => Promise<RequestArgs>;
    sendTransaction1: (walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any) => Promise<RequestArgs>;
    validateIsAllowedAddress1: (walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
};
export declare const WalletControllerApiFp: (configuration?: Configuration) => {
    activateAllowedAddresses1(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    activateMasterWallet1(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    calculateEstimatedFee1(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EstimatedFeeDTO>>;
    createAllowedAddress1(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedAddressDTO>>;
    createDepositAddress1(walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DepositAddressDTO>>;
    createMasterWallet2(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateInactiveMasterWalletResponse | MasterWalletDTO>>;
    createRawTransaction1(walletId: string, createRawTransactionRequest: CreateRawTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RawTransactionDTO>>;
    createWalletWithdrawalPolicy1(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    deleteAllowedAddress1(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getAllowedAddress1(walletId: string, allowedAddressId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedAddressDTO>>;
    getAllowedAddresses1(walletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationAllowedAddressDTO>>;
    getBalance1(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BalanceDTO>>;
    getDepositAddress1(walletId: string, depositAddressId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DepositAddressDTO>>;
    getDepositAddresses2(walletId: string, pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationDepositAddressDTO>>;
    getMasterWallet1(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    getMasterWalletInitialKey1(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    getMasterWallets2(specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MasterWalletDTO>>>;
    getWalletWithdrawalPolicies1(walletId: string, pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletWithdrawalPolicyDTO>>;
    getWalletWithdrawalPolicy1(walletId: string, withdrawalPolicyId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    inactivateAllowedAddresses1(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    patchMasterWalletAccountKey1(walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    patchMasterWalletName1(walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    patchWalletWithdrawalPolicy1(walletId: string, withdrawalPolicyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    sendTransaction1(walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferDTO>>;
    validateIsAllowedAddress1(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ValidateIsAllowedAddressResponse>>;
};
export declare const WalletControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    activateAllowedAddresses1(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): AxiosPromise<void>;
    activateMasterWallet1(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    calculateEstimatedFee1(walletId: string, options?: any): AxiosPromise<EstimatedFeeDTO>;
    createAllowedAddress1(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): AxiosPromise<AllowedAddressDTO>;
    createDepositAddress1(walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): AxiosPromise<DepositAddressDTO>;
    createMasterWallet2(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): AxiosPromise<CreateInactiveMasterWalletResponse | MasterWalletDTO>;
    createRawTransaction1(walletId: string, createRawTransactionRequest: CreateRawTransactionRequest, options?: any): AxiosPromise<RawTransactionDTO>;
    createWalletWithdrawalPolicy1(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    deleteAllowedAddress1(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): AxiosPromise<void>;
    getAllowedAddress1(walletId: string, allowedAddressId: string, options?: any): AxiosPromise<AllowedAddressDTO>;
    getAllowedAddresses1(walletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationAllowedAddressDTO>;
    getBalance1(walletId: string, options?: any): AxiosPromise<BalanceDTO>;
    getDepositAddress1(walletId: string, depositAddressId: string, options?: any): AxiosPromise<DepositAddressDTO>;
    getDepositAddresses2(walletId: string, pageable: Pageable, condition: WalletSearchCondition, options?: any): AxiosPromise<PaginationDepositAddressDTO>;
    getMasterWallet1(walletId: string, options?: any): AxiosPromise<MasterWalletDTO>;
    getMasterWalletInitialKey1(walletId: string, options?: any): AxiosPromise<KeyDTO>;
    getMasterWallets2(specs: object, options?: any): AxiosPromise<Array<MasterWalletDTO>>;
    getWalletWithdrawalPolicies1(walletId: string, pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationWalletWithdrawalPolicyDTO>;
    getWalletWithdrawalPolicy1(walletId: string, withdrawalPolicyId: string, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    inactivateAllowedAddresses1(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): AxiosPromise<void>;
    patchMasterWalletAccountKey1(walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): AxiosPromise<KeyDTO>;
    patchMasterWalletName1(walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    patchWalletWithdrawalPolicy1(walletId: string, withdrawalPolicyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    sendTransaction1(walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any): AxiosPromise<TransferDTO>;
    validateIsAllowedAddress1(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): AxiosPromise<ValidateIsAllowedAddressResponse>;
};
export declare class WalletControllerApi extends BaseAPI {
    activateAllowedAddresses1(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    activateMasterWallet1(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    calculateEstimatedFee1(walletId: string, options?: any): Promise<import("axios").AxiosResponse<EstimatedFeeDTO>>;
    createAllowedAddress1(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<AllowedAddressDTO>>;
    createDepositAddress1(walletId: string, createDepositAddressRequest: CreateDepositAddressRequest, options?: any): Promise<import("axios").AxiosResponse<DepositAddressDTO>>;
    createMasterWallet2(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): Promise<import("axios").AxiosResponse<CreateInactiveMasterWalletResponse | MasterWalletDTO>>;
    createRawTransaction1(walletId: string, createRawTransactionRequest: CreateRawTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<RawTransactionDTO>>;
    createWalletWithdrawalPolicy1(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    deleteAllowedAddress1(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    getAllowedAddress1(walletId: string, allowedAddressId: string, options?: any): Promise<import("axios").AxiosResponse<AllowedAddressDTO>>;
    getAllowedAddresses1(walletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationAllowedAddressDTO>>;
    getBalance1(walletId: string, options?: any): Promise<import("axios").AxiosResponse<BalanceDTO>>;
    getDepositAddress1(walletId: string, depositAddressId: string, options?: any): Promise<import("axios").AxiosResponse<DepositAddressDTO>>;
    getDepositAddresses2(walletId: string, pageable: Pageable, condition: WalletSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationDepositAddressDTO>>;
    getMasterWallet1(walletId: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    getMasterWalletInitialKey1(walletId: string, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    getMasterWallets2(specs: object, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO[]>>;
    getWalletWithdrawalPolicies1(walletId: string, pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletWithdrawalPolicyDTO>>;
    getWalletWithdrawalPolicy1(walletId: string, withdrawalPolicyId: string, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    inactivateAllowedAddresses1(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    patchMasterWalletAccountKey1(walletId: string, patchAccountKeyRequest: PatchAccountKeyRequest, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    patchMasterWalletName1(walletId: string, patchWalletNameRequest: PatchWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    patchWalletWithdrawalPolicy1(walletId: string, withdrawalPolicyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    sendTransaction1(walletId: string, createTransactionRequest: CreateTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransferDTO>>;
    validateIsAllowedAddress1(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<ValidateIsAllowedAddressResponse>>;
}
export declare const WithdrawalApprovalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    approveWithdrawalApproval1: (withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any) => Promise<RequestArgs>;
    rejectWithdrawalApproval1: (withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any) => Promise<RequestArgs>;
};
export declare const WithdrawalApprovalControllerApiFp: (configuration?: Configuration) => {
    approveWithdrawalApproval1(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransferDTO>>;
    rejectWithdrawalApproval1(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const WithdrawalApprovalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    approveWithdrawalApproval1(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): AxiosPromise<TransferDTO>;
    rejectWithdrawalApproval1(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): AxiosPromise<void>;
};
export declare class WithdrawalApprovalControllerApi extends BaseAPI {
    approveWithdrawalApproval1(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): Promise<import("axios").AxiosResponse<TransferDTO>>;
    rejectWithdrawalApproval1(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
}
