import { Configuration } from './configuration';
import { AxiosPromise, AxiosInstance } from 'axios';
import { RequestArgs, BaseAPI } from './base';
export interface ActivateAllowedAddressesRequest {
    otpCode: string;
}
export interface ActivateMasterWalletRequest {
    accountKey: KeyDTO;
    backupKey: KeyDTO;
    gasPrice?: string;
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
    signedMultiSigPayload: SignedMultiSigPayloadDTO;
    otpCode?: string;
}
export interface BalanceDTO {
    symbol: string;
    name: string;
    decimals: number;
    amount: string;
    coinId: number;
    coinType: CoinType;
    spendableAmount: string;
}
export interface BatchTransactionDTO {
    transaction: TransactionDTO;
    message: string;
}
export interface BindHenesisKeyToWalletDTO {
    blockchain?: BindHenesisKeyToWalletDTOBlockchainEnum;
    keyId?: string;
    walletId?: string;
}
export declare enum BindHenesisKeyToWalletDTOBlockchainEnum {
    ETHEREUM = "ETHEREUM",
    KLAYTN = "KLAYTN",
    BITCOIN = "BITCOIN",
    FILECOIN = "FILECOIN",
    BINANCESMARTCHAIN = "BINANCE_SMART_CHAIN",
    LITECOIN = "LITECOIN"
}
export interface BindHenesisKeyToWalletRequest {
    walletId?: string;
}
export declare enum Blockchain {
    ETHEREUM = "ETHEREUM",
    KLAYTN = "KLAYTN",
    BITCOIN = "BITCOIN",
    FILECOIN = "FILECOIN",
    BINANCESMARTCHAIN = "BINANCE_SMART_CHAIN",
    LITECOIN = "LITECOIN"
}
export interface CallEventDTO {
    id: number;
    data: string;
    blockchain: string;
    status: EventStatus;
    confirmation: string;
    metadata?: string;
    walletId: string;
    orgId?: string;
    masterWalletId?: string;
    transactionId?: string;
    fromAddress: string;
    toAddress: string;
    transactionHash?: string;
    createdAt: string;
    updatedAt: string;
}
export interface CallEventInternalDTO {
    id: number;
    transaction: SimplifiedTransactionInternalDTO;
    from: SimplifiedWalletInternalDTO;
    to: SimplifiedWalletInternalDTO;
    data: string;
    blockchain: Blockchain;
    status: EventStatus;
    confirmation: string;
    walletId: string;
    orgId?: string;
    createdAt: string;
    updatedAt: string;
}
export interface ChangeWalletNameRequest {
    name: string;
}
export interface CoinDTO {
    id: number;
    name: string;
    symbol: string;
    address: string;
    desc: string;
    blockchain: Blockchain;
    decimals: number;
    attributes: Array<CoinDTOAttributesEnum>;
}
export declare enum CoinDTOAttributesEnum {
    STANDARD = "ERC20_STANDARD",
    NONSTANDARDRETURNTYPE = "ERC20_NON_STANDARD_RETURN_TYPE",
    REBASE = "ERC20_REBASE",
    PAUSABLE = "ERC20_PAUSABLE"
}
export declare enum CoinType {
    ETHEREUM = "ETHEREUM",
    KLAYTN = "KLAYTN",
    BITCOIN = "BITCOIN",
    FILECOIN = "FILECOIN",
    BINANCESMARTCHAIN = "BINANCE_SMART_CHAIN",
    LITECOIN = "LITECOIN",
    TOKEN = "TOKEN",
    NFT = "NFT"
}
export interface CreateAllowedAddressRequest {
    address: string;
    label: string;
    coinId?: number;
    whitelistType: WhitelistType;
    allowedCoinType: AllowedCoinType;
    otpCode: string;
}
export interface CreateBatchTransactionRequest {
    metadata?: string;
    walletId: string;
    signedMultiSigPayloads: Array<SignedMultiSigPayloadDTO>;
    gasPrice?: string;
    gasLimit?: string;
    otpCode?: string;
}
export interface CreateCoinRequest {
    name: string;
    symbol: string;
    address: string;
    desc: string;
    decimals: number;
    attributes: Array<CreateCoinRequestAttributesEnum>;
    orgId?: string;
}
export declare enum CreateCoinRequestAttributesEnum {
    STANDARD = "ERC20_STANDARD",
    NONSTANDARDRETURNTYPE = "ERC20_NON_STANDARD_RETURN_TYPE",
    REBASE = "ERC20_REBASE",
    PAUSABLE = "ERC20_PAUSABLE"
}
export interface CreateHenesisKeyRequest {
    orgId: string;
    walletType?: CreateHenesisKeyRequestWalletTypeEnum;
}
export declare enum CreateHenesisKeyRequestWalletTypeEnum {
    DEFAULT = "DEFAULT",
    BOOST = "BOOST"
}
export interface CreateInactiveMasterWalletRequest {
    name: string;
    encryptionKey: string;
}
export interface CreateMasterWalletRequestV1 {
    name: string;
    blockchain?: string;
    encryptionKey: string;
    accountKey: KeyDTO;
    backupKey: KeyDTO;
    gasPrice?: string;
}
export interface CreateMultiSigTransactionRequest {
    metadata?: string;
    walletId: string;
    signedMultiSigPayload: SignedMultiSigPayloadDTO;
    transactionId?: string;
    gasPrice?: string;
    gasLimit?: string;
    otpCode?: string;
}
export interface CreateMultiSigTransactionRequestV1 {
    metadata?: string;
    blockchain?: string;
    walletId: string;
    signedMultiSigPayload: SignedMultiSigPayloadDTO;
    transactionId?: string;
    gasPrice?: string;
    gasLimit?: string;
    otpCode?: string;
}
export interface CreateNftMultiSigTransactionRequest {
    metadata?: string;
    nftId: number;
    tokenOnchainId: string;
    toAddress: string;
    signedMultiSigPayload: SignedMultiSigPayloadDTO;
    transactionId?: string;
    gasPrice?: string;
    gasLimit?: string;
    otpCode?: string;
}
export interface CreateTransactionRequest {
    value: string;
    data: string;
    toAddress: string;
    gasPrice?: string;
    gasLimit?: string;
    otpCode?: string;
}
export interface CreateUserWalletRequest {
    name: string;
    salt: string;
    signedMultiSigPayload?: SignedMultiSigPayloadDTO;
    gasPrice?: string;
    otpCode?: string;
}
export interface CreateWithdrawalPolicyRequest {
    limitAmount: string;
    walletType: WalletType;
    type: CreateWithdrawalPolicyRequestTypeEnum;
    coinSymbol: string;
    otpCode: string;
}
export declare enum CreateWithdrawalPolicyRequestTypeEnum {
    DAILY = "DAILY",
    TRANSACTION = "TRANSACTION"
}
export interface DeleteAllowedAddressRequest {
    otpCode: string;
}
export interface DetailedRawTransactionDTO {
    nonce: string;
    to?: string;
    value: string;
    data?: string;
    fee: string;
    gasPrice: string;
    gasLimit: string;
}
export interface ErrorBody {
    message?: string;
    code?: number;
}
export interface ErrorResponse {
    error?: ErrorBody;
}
export declare enum EventStatus {
    PENDINGAPPROVAL = "PENDING_APPROVAL",
    REJECTED = "REJECTED",
    REQUESTED = "REQUESTED",
    PENDING = "PENDING",
    FAILED = "FAILED",
    REVERTED = "REVERTED",
    REPLACED = "REPLACED",
    MINED = "MINED",
    CONFIRMED = "CONFIRMED"
}
export interface ExampleHenesisKeyDTO {
    id: string;
    name: string;
    address: string;
    pub: string;
    blockchain: Blockchain;
    path: string;
    nonce: string;
    orgId: string;
    encryptedPassphrase: string;
    feeDelegationEnabled: boolean;
}
export interface ExternalWithdrawalSearchCondition {
    address?: string;
    blockchain?: string;
    status?: string;
    symbol?: string;
    symbols?: Array<string>;
    fromAddress?: string;
    toAddress?: string;
    transactionHash?: string;
    updatedAtGte?: string;
    updatedAtLt?: string;
    walletId?: string;
    orgId?: string;
    masterWalletId?: string;
    transactionId?: string;
}
export interface FlushQuerySearchCondition {
    status?: TransactionStatus;
    transactionId?: string;
    transactionHash?: string;
    coinId?: number;
}
export interface FlushRequest {
    targets: Array<FlushTarget>;
    metadata?: string;
    gasPrice?: string;
    gasLimit?: string;
}
export interface FlushTarget {
    coinId: number;
    depositAddressId: string;
}
export interface FlushTransactionDTO {
    id: string;
    blockchain: Blockchain;
    fee?: string;
    hash?: string;
    status: TransactionStatus;
    transfers: Array<FlushTransactionValueTransferEventDTO>;
    createdAt: string;
    updatedAt: string;
}
export interface FlushTransactionValueTransferEventDTO {
    id: number;
    decimals: number;
    amount: string;
    status: FlushTransactionValueTransferEventDTOStatus;
    coinSymbol: string;
    coinId: number;
    depositAddress: string;
}
export declare enum FlushTransactionValueTransferEventDTOStatus {
    NOTMINED = "NOT_MINED",
    FIRST = "FIRST",
    NOTFIRST = "NOT_FIRST"
}
export interface GetGasPriceResponse {
    gasPrice: string;
}
export interface HenesisKeyBalanceDTO {
    symbol: string;
    name: string;
    amount: string;
    spendableAmount: string;
    decimals: number;
    coinId: number;
    coinType: CoinType;
}
export interface HenesisKeyDTO {
    address?: string;
    pub: string;
    keyFile?: string;
    feeDelegationEnabled: boolean;
    keyId?: string;
}
export interface InactivateAllowedAddressesRequest {
    otpCode: string;
}
export interface InactiveMasterWalletDTO {
    id: string;
    name: string;
    blockchain: Blockchain;
    status: WalletStatus;
    orgId: string;
    henesisKey: KeyDTO;
    createdAt: string;
    updatedAt: string;
}
export interface KeyDTO {
    address?: string;
    pub: string;
    keyFile?: string;
}
export interface MasterWalletBalanceDTO {
    symbol: string;
    name: string;
    decimals: number;
    amount: string;
    coinId: number;
    coinType: CoinType;
    spendableAmount: string;
    aggregatedAmount: string;
}
export interface MasterWalletDTO {
    id: string;
    name: string;
    address: string;
    blockchain: Blockchain;
    status: WalletStatus;
    error?: string;
    version: string;
    encryptionKey: string;
    backupKey: KeyDTO;
    accountKey: KeyDTO;
    transactionId?: string;
    whitelistActivated: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface MethodGasUsageDTO {
    id: string;
    blockchain: Blockchain;
    name: string;
    estimatedGasConsumption: string;
}
export interface MultiSigPayloadDTO {
    value: string;
    walletAddress: string;
    toAddress: string;
    walletNonce: string;
    hexData?: string;
}
export interface NftBalanceDTO {
    nft: NftDTO;
    token: NftTokenDTO;
    walletId: string;
    masterWalletId: string;
    isWithdrawalPending: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface NftBalanceSearchCondition {
    tokenOnchainId?: string;
    tokenName?: string;
    isWithdrawalPending?: boolean;
}
export interface NftDTO {
    id: number;
    name: string;
    symbol: string;
    address: string;
}
export interface NftItemDTO {
    nft: NftDTO;
    token: NftTokenDTO;
}
export interface NftTokenDTO {
    name: string;
    uri: string;
    metadata?: {
        [key: string]: object;
    };
    onchainId: string;
    externalUrl: string;
    imageUrl: string;
}
export interface NftTransferEventDTO {
    id: number;
    nft: NftDTO;
    token: NftTokenDTO;
    from: string;
    to: string;
    blockchain: string;
    status: EventStatus;
    confirmation: string;
    metadata?: string;
    walletId: string;
    orgId?: string;
    masterWalletId?: string;
    transactionId?: string;
    transferType: TransferType;
    blockHash?: string;
    transactionHash?: string;
    createdAt: string;
    updatedAt: string;
    walletName?: string;
    walletType?: WalletType;
}
export interface NftTransferEventInternalDTO {
    id: number;
    transaction: SimplifiedTransactionInternalDTO;
    nft: NftDTO;
    token: NftTokenDTO;
    from: SimplifiedWalletInternalDTO;
    to: SimplifiedWalletInternalDTO;
    blockchain: string;
    status: EventStatus;
    confirmation: string;
    metadata?: string;
    walletId: string;
    orgId?: string;
    masterWalletId?: string;
    transferType: TransferType;
    createdAt: string;
    updatedAt: string;
}
export interface NftTransferEventSearchCondition {
    address?: string;
    blockchain?: string;
    status?: string;
    fromAddress?: string;
    toAddress?: string;
    transactionHash?: string;
    updatedAtGte?: string;
    updatedAtLt?: string;
    walletId?: string;
    orgId?: string;
    masterWalletId?: string;
    transactionId?: string;
    nftId?: number;
    tokenName?: string;
    tokenOnchainId?: string;
    transferType?: string;
}
export interface NonceDTO {
    nonce: string;
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
export interface PaginationCallEventDTO {
    pagination: PaginationMeta;
    results: Array<CallEventDTO>;
}
export interface PaginationCallEventInternalDTO {
    pagination: PaginationMeta;
    results: Array<CallEventInternalDTO>;
}
export interface PaginationFlushTransactionDTO {
    pagination: PaginationMeta;
    results: Array<FlushTransactionDTO>;
}
export interface PaginationMeta {
    nextUrl: string;
    previousUrl: string;
    totalCount: number;
}
export interface PaginationNftBalanceDTO {
    pagination: PaginationMeta;
    results: Array<NftBalanceDTO>;
}
export interface PaginationNftTransferEventDTO {
    pagination: PaginationMeta;
    results: Array<NftTransferEventDTO>;
}
export interface PaginationNftTransferEventInternalDTO {
    pagination: PaginationMeta;
    results: Array<NftTransferEventInternalDTO>;
}
export interface PaginationTransactionDTO {
    pagination: PaginationMeta;
    results: Array<TransactionDTO>;
}
export interface PaginationTransactionHistoryDTO {
    pagination: PaginationMeta;
    results: Array<TransactionHistoryDTO>;
}
export interface PaginationUserWalletDTO {
    pagination: PaginationMeta;
    results: Array<UserWalletDTO>;
}
export interface PaginationValueTransferEventDTO {
    pagination: PaginationMeta;
    results: Array<ValueTransferEventDTO>;
}
export interface PaginationValueTransferEventInternalDTO {
    pagination: PaginationMeta;
    results: Array<ValueTransferEventInternalDTO>;
}
export interface PaginationWalletDTO {
    pagination: PaginationMeta;
    results: Array<WalletDTO>;
}
export interface PaginationWalletWithdrawalPolicyDTO {
    pagination: PaginationMeta;
    results: Array<WalletWithdrawalPolicyDTO>;
}
export interface PatchWithdrawalPolicyRequest {
    limitAmount: string;
    otpCode: string;
}
export interface RawTransactionDTO {
    nonce: string;
    to?: string;
    value: string;
    data?: string;
    gasPrice: string;
    gasLimit: string;
}
export interface RecreateWalletRequest {
    gasPrice?: string;
}
export interface RecreateWalletRequestV1 {
    blockchain?: string;
    gasPrice?: string;
}
export interface RejectWithdrawalApprovalRequest {
    otpCode?: string;
}
export interface ReplaceTransactionRequest {
    metadata?: string;
    walletId: string;
    transactionId: string;
    gasPrice?: string;
}
export interface ResendTransactionRequest {
    walletId: string;
    transactionId: string;
    gasPrice?: string;
    gasLimit?: string;
}
export interface SignedMultiSigPayloadDTO {
    signature: string;
    multiSigPayload: MultiSigPayloadDTO;
}
export interface SimplifiedCoinInternalDTO {
    symbol: string;
    decimals: number;
}
export interface SimplifiedTransactionInternalDTO {
    id?: string;
    hash?: string;
    blockHash?: string;
    blockNumber?: string;
}
export interface SimplifiedWalletDTO {
    type: WalletType;
    masterWalletId: string;
    masterWalletAddress: string;
    masterWalletName: string;
    userWalletId?: string;
    userWalletAddress?: string;
    userWalletName?: string;
}
export interface SimplifiedWalletInternalDTO {
    id?: string;
    address: string;
    name?: string;
    type?: WalletType;
    masterWalletId?: string;
}
export interface Sort {
    sorted?: boolean;
    unsorted?: boolean;
    empty?: boolean;
}
export interface SyncMetadataRequest {
    tokenOnchainId: string;
}
export interface TransactionDTO {
    id: string;
    blockchain: Blockchain;
    sender: string;
    hash?: string;
    error?: string;
    status: TransactionStatus;
    fee?: string;
    keyId: string;
    signedMultiSigPayload?: SignedMultiSigPayloadDTO;
    rawTransaction?: RawTransactionDTO;
    isFeeDelegated: boolean;
    estimatedFee?: string;
    createdAt: string;
    updatedAt: string;
}
export interface TransactionHistoryDTO {
    id: string;
    blockchain: Blockchain;
    sender: string;
    hash?: string;
    error?: string;
    status: TransactionStatus;
    fee?: string;
    type: TransactionType;
    wallet?: SimplifiedWalletDTO;
    keyId: string;
    signedMultiSigPayload?: SignedMultiSigPayloadDTO;
    rawTransaction?: RawTransactionDTO;
    isFeeDelegated: boolean;
    estimatedFee?: string;
    createdAt: string;
    updatedAt: string;
}
export declare enum TransactionStatus {
    PENDINGAPPROVAL = "PENDING_APPROVAL",
    REJECTED = "REJECTED",
    REQUESTED = "REQUESTED",
    PENDING = "PENDING",
    FAILED = "FAILED",
    MINED = "MINED",
    REVERTED = "REVERTED",
    INTERNALREVERTED = "INTERNAL_REVERTED",
    CONFIRMED = "CONFIRMED",
    REPLACED = "REPLACED"
}
export declare enum TransactionType {
    WITHDRAWAL = "WITHDRAWAL",
    DEPOSIT = "DEPOSIT",
    UNKNOWNEXTERNALCALL = "UNKNOWN_EXTERNAL_CALL",
    SMARTCONTRACTCALL = "SMART_CONTRACT_CALL",
    MASTERWALLETDEPLOYMENT = "MASTER_WALLET_DEPLOYMENT",
    USERWALLETDEPLOYMENT = "USER_WALLET_DEPLOYMENT",
    FLUSH = "FLUSH",
    NFTWITHDRAWAL = "NFT_WITHDRAWAL"
}
export declare enum TransferType {
    WITHDRAWAL = "WITHDRAWAL",
    DEPOSIT = "DEPOSIT"
}
export interface UpdateAccountKeyRequest {
    keyFile: string;
    otpCode?: string;
}
export interface UpdateCoinRequest {
    name: string;
    symbol: string;
    address: string;
    desc: string;
    decimals: number;
    attributes: Array<UpdateCoinRequestAttributesEnum>;
    orgId?: string;
}
export declare enum UpdateCoinRequestAttributesEnum {
    STANDARD = "ERC20_STANDARD",
    NONSTANDARDRETURNTYPE = "ERC20_NON_STANDARD_RETURN_TYPE",
    REBASE = "ERC20_REBASE",
    PAUSABLE = "ERC20_PAUSABLE"
}
export interface UserWalletDTO {
    id: string;
    name: string;
    address: string;
    blockchain: UserWalletDTOBlockchainEnum;
    status: WalletStatus;
    error?: string;
    version: string;
    transactionId?: string;
    createdAt: string;
    updatedAt: string;
}
export declare enum UserWalletDTOBlockchainEnum {
    ETHEREUM = "ETHEREUM",
    KLAYTN = "KLAYTN",
    BITCOIN = "BITCOIN",
    FILECOIN = "FILECOIN",
    BINANCESMARTCHAIN = "BINANCE_SMART_CHAIN",
    LITECOIN = "LITECOIN"
}
export interface ValidateIsAllowedAddressRequest {
    address: string;
    coinId: number;
}
export interface ValidateIsAllowedAddressResponse {
    isValid: boolean;
}
export interface ValueTransferEventDTO {
    id: number;
    from: string;
    to: string;
    amount: string;
    decimals: number;
    blockchain: string;
    status: EventStatus;
    confirmation: string;
    metadata?: string;
    walletId: string;
    orgId?: string;
    masterWalletId?: string;
    transactionId?: string;
    coinSymbol: string;
    transferType: TransferType;
    blockHash?: string;
    transactionHash?: string;
    createdAt: string;
    updatedAt: string;
    walletName?: string;
    walletType?: WalletType;
}
export interface ValueTransferEventInternalDTO {
    id: number;
    transaction: SimplifiedTransactionInternalDTO;
    coin: SimplifiedCoinInternalDTO;
    from: SimplifiedWalletInternalDTO;
    to: SimplifiedWalletInternalDTO;
    amount: string;
    blockchain: Blockchain;
    status: EventStatus;
    confirmation: string;
    walletId: string;
    orgId?: string;
    transferType: TransferType;
    createdAt: string;
    updatedAt: string;
}
export interface ValueTransferEventSearchCondition {
    address?: string;
    blockchain?: string;
    start?: string;
    end?: string;
    status?: string;
    symbol?: string;
    symbols?: Array<string>;
    fromAddress?: string;
    toAddress?: string;
    transactionHash?: string;
    updatedAtGte?: string;
    updatedAtLt?: string;
    walletId?: string;
    orgId?: string;
    masterWalletId?: string;
    transactionId?: string;
    transferType?: string;
}
export interface WalletDTO {
    id: string;
    blockchain: Blockchain;
    type: WalletType;
    status: WalletStatus;
    address: string;
    masterWalletId: string;
    orgId: string;
    walletName: string;
    createdAt: string;
    updatedAt: string;
}
export declare enum WalletStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    CREATING = "CREATING",
    FAILED = "FAILED"
}
export declare enum WalletType {
    MASTERWALLET = "MASTER_WALLET",
    USERWALLET = "USER_WALLET"
}
export interface WalletWithdrawalPolicyDTO {
    id: string;
    decimals: number;
    limitAmount: string;
    walletType: WalletType;
    type: WithdrawalPolicyType;
    walletId: string;
    blockchain: Blockchain;
    coinSymbol: string;
    coinName: string;
}
export declare enum WhitelistType {
    ALL = "ALL",
    SINGLE = "SINGLE"
}
export declare enum WithdrawalPolicyType {
    DAILY = "DAILY",
    TRANSACTION = "TRANSACTION"
}
export declare const BscAdminControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getCoin2: (coinId: number, options?: any) => Promise<RequestArgs>;
    getExternalWithdrawals: (pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any) => Promise<RequestArgs>;
    getMasterWallets2: (pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getUserWallets2: (pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getValueTransferEvents3: (pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const BscAdminControllerApiFp: (configuration?: Configuration) => {
    getCoin2(coinId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
    getExternalWithdrawals(pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventDTO>>;
    getMasterWallets2(pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletDTO>>;
    getUserWallets2(pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletDTO>>;
    getValueTransferEvents3(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventDTO>>;
};
export declare const BscAdminControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getCoin2(coinId: number, options?: any): AxiosPromise<CoinDTO>;
    getExternalWithdrawals(pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventDTO>;
    getMasterWallets2(pageable: Pageable, options?: any): AxiosPromise<PaginationWalletDTO>;
    getUserWallets2(pageable: Pageable, options?: any): AxiosPromise<PaginationWalletDTO>;
    getValueTransferEvents3(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventDTO>;
};
export declare class BscAdminControllerApi extends BaseAPI {
    getCoin2(coinId: number, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
    getExternalWithdrawals(pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventDTO>>;
    getMasterWallets2(pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletDTO>>;
    getUserWallets2(pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletDTO>>;
    getValueTransferEvents3(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventDTO>>;
}
export declare const BscCoinControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    createCoin: (createCoinRequest: CreateCoinRequest, options?: any) => Promise<RequestArgs>;
    deleteCoin: (symbol: string, options?: any) => Promise<RequestArgs>;
    getAllCoins11: (flag: boolean, options?: any) => Promise<RequestArgs>;
    getCoin1: (symbol: string, options?: any) => Promise<RequestArgs>;
    patchCoin: (updateCoinRequest: UpdateCoinRequest, options?: any) => Promise<RequestArgs>;
};
export declare const BscCoinControllerApiFp: (configuration?: Configuration) => {
    createCoin(createCoinRequest: CreateCoinRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
    deleteCoin(symbol: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getAllCoins11(flag: boolean, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CoinDTO>>>;
    getCoin1(symbol: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
    patchCoin(updateCoinRequest: UpdateCoinRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const BscCoinControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createCoin(createCoinRequest: CreateCoinRequest, options?: any): AxiosPromise<CoinDTO>;
    deleteCoin(symbol: string, options?: any): AxiosPromise<void>;
    getAllCoins11(flag: boolean, options?: any): AxiosPromise<Array<CoinDTO>>;
    getCoin1(symbol: string, options?: any): AxiosPromise<CoinDTO>;
    patchCoin(updateCoinRequest: UpdateCoinRequest, options?: any): AxiosPromise<void>;
};
export declare class BscCoinControllerApi extends BaseAPI {
    createCoin(createCoinRequest: CreateCoinRequest, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
    deleteCoin(symbol: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
    getAllCoins11(flag: boolean, options?: any): Promise<import("axios").AxiosResponse<CoinDTO[]>>;
    getCoin1(symbol: string, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
    patchCoin(updateCoinRequest: UpdateCoinRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
}
export declare const BscEventControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getCallEvents1: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getValueTransferEvents1: (pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const BscEventControllerApiFp: (configuration?: Configuration) => {
    getCallEvents1(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationCallEventDTO>>;
    getValueTransferEvents1(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventDTO>>;
};
export declare const BscEventControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getCallEvents1(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationCallEventDTO>;
    getValueTransferEvents1(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventDTO>;
};
export declare class BscEventControllerApi extends BaseAPI {
    getCallEvents1(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationCallEventDTO>>;
    getValueTransferEvents1(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventDTO>>;
}
export declare const BscGasPriceControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getGasPrice: (options?: any) => Promise<RequestArgs>;
};
export declare const BscGasPriceControllerApiFp: (configuration?: Configuration) => {
    getGasPrice(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetGasPriceResponse>>;
};
export declare const BscGasPriceControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getGasPrice(options?: any): AxiosPromise<GetGasPriceResponse>;
};
export declare class BscGasPriceControllerApi extends BaseAPI {
    getGasPrice(options?: any): Promise<import("axios").AxiosResponse<GetGasPriceResponse>>;
}
export declare const BscHenesisKeyControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    createExampleHenesisKey: (options?: any) => Promise<RequestArgs>;
    createTransaction: (createTransactionRequest: CreateTransactionRequest, options?: any) => Promise<RequestArgs>;
    getHenesisKey: (options?: any) => Promise<RequestArgs>;
    getHenesisKeyBalance: (options?: any) => Promise<RequestArgs>;
    getHistoriesCsv: (createdAtGte: string, createdAtLt: string, options?: any) => Promise<RequestArgs>;
    getTransactionHistories: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
};
export declare const BscHenesisKeyControllerApiFp: (configuration?: Configuration) => {
    createExampleHenesisKey(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExampleHenesisKeyDTO>>;
    createTransaction(createTransactionRequest: CreateTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    getHenesisKey(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HenesisKeyDTO>>;
    getHenesisKeyBalance(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HenesisKeyBalanceDTO>>;
    getHistoriesCsv(createdAtGte: string, createdAtLt: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getTransactionHistories(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransactionHistoryDTO>>;
};
export declare const BscHenesisKeyControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createExampleHenesisKey(options?: any): AxiosPromise<ExampleHenesisKeyDTO>;
    createTransaction(createTransactionRequest: CreateTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    getHenesisKey(options?: any): AxiosPromise<HenesisKeyDTO>;
    getHenesisKeyBalance(options?: any): AxiosPromise<HenesisKeyBalanceDTO>;
    getHistoriesCsv(createdAtGte: string, createdAtLt: string, options?: any): AxiosPromise<void>;
    getTransactionHistories(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationTransactionHistoryDTO>;
};
export declare class BscHenesisKeyControllerApi extends BaseAPI {
    createExampleHenesisKey(options?: any): Promise<import("axios").AxiosResponse<ExampleHenesisKeyDTO>>;
    createTransaction(createTransactionRequest: CreateTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    getHenesisKey(options?: any): Promise<import("axios").AxiosResponse<HenesisKeyDTO>>;
    getHenesisKeyBalance(options?: any): Promise<import("axios").AxiosResponse<HenesisKeyBalanceDTO>>;
    getHistoriesCsv(createdAtGte: string, createdAtLt: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
    getTransactionHistories(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationTransactionHistoryDTO>>;
}
export declare const BscInternalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getCallEvents2: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getValueTransferEvents2: (pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const BscInternalControllerApiFp: (configuration?: Configuration) => {
    getCallEvents2(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationCallEventInternalDTO>>;
    getValueTransferEvents2(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventInternalDTO>>;
};
export declare const BscInternalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getCallEvents2(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationCallEventInternalDTO>;
    getValueTransferEvents2(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventInternalDTO>;
};
export declare class BscInternalControllerApi extends BaseAPI {
    getCallEvents2(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationCallEventInternalDTO>>;
    getValueTransferEvents2(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventInternalDTO>>;
}
export declare const BscMethodGasUsageControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getMethodGasUsages1: (name: string, options?: any) => Promise<RequestArgs>;
};
export declare const BscMethodGasUsageControllerApiFp: (configuration?: Configuration) => {
    getMethodGasUsages1(name: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MethodGasUsageDTO>>;
};
export declare const BscMethodGasUsageControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getMethodGasUsages1(name: string, options?: any): AxiosPromise<MethodGasUsageDTO>;
};
export declare class BscMethodGasUsageControllerApi extends BaseAPI {
    getMethodGasUsages1(name: string, options?: any): Promise<import("axios").AxiosResponse<MethodGasUsageDTO>>;
}
export declare const BscOperationControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    bindHenesisKeyToWallet: (keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any) => Promise<RequestArgs>;
    createHenesisKey: (createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any) => Promise<RequestArgs>;
};
export declare const BscOperationControllerApiFp: (configuration?: Configuration) => {
    bindHenesisKeyToWallet(keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BindHenesisKeyToWalletDTO>>;
    createHenesisKey(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HenesisKeyDTO>>;
};
export declare const BscOperationControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    bindHenesisKeyToWallet(keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any): AxiosPromise<BindHenesisKeyToWalletDTO>;
    createHenesisKey(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): AxiosPromise<HenesisKeyDTO>;
};
export declare class BscOperationControllerApi extends BaseAPI {
    bindHenesisKeyToWallet(keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any): Promise<import("axios").AxiosResponse<BindHenesisKeyToWalletDTO>>;
    createHenesisKey(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): Promise<import("axios").AxiosResponse<HenesisKeyDTO>>;
}
export declare const BscTransactionControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getAllTransactions1: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getRawTransactionByHash: (transactionHash: string, options?: any) => Promise<RequestArgs>;
    getTransactionById1: (transactionId: string, options?: any) => Promise<RequestArgs>;
};
export declare const BscTransactionControllerApiFp: (configuration?: Configuration) => {
    getAllTransactions1(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransactionDTO>>;
    getRawTransactionByHash(transactionHash: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DetailedRawTransactionDTO>>;
    getTransactionById1(transactionId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
};
export declare const BscTransactionControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getAllTransactions1(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationTransactionDTO>;
    getRawTransactionByHash(transactionHash: string, options?: any): AxiosPromise<DetailedRawTransactionDTO>;
    getTransactionById1(transactionId: string, options?: any): AxiosPromise<TransactionDTO>;
};
export declare class BscTransactionControllerApi extends BaseAPI {
    getAllTransactions1(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationTransactionDTO>>;
    getRawTransactionByHash(transactionHash: string, options?: any): Promise<import("axios").AxiosResponse<DetailedRawTransactionDTO>>;
    getTransactionById1(transactionId: string, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
}
export declare const BscWalletControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    activateAllowedAddresses: (walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any) => Promise<RequestArgs>;
    activateMasterWallet: (walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any) => Promise<RequestArgs>;
    createAllowedAddress: (walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
    createMasterWallet11: (createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any) => Promise<RequestArgs>;
    createUserWallet1: (walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any) => Promise<RequestArgs>;
    createWalletWithdrawalPolicy: (walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any) => Promise<RequestArgs>;
    deleteAllowedAddress: (walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
    flush: (walletId: string, flushRequest: FlushRequest, options?: any) => Promise<RequestArgs>;
    getAllWalletWithdrawalPolicies: (walletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getAllowedAddress: (walletId: string, allowedAddressId: string, options?: any) => Promise<RequestArgs>;
    getAllowedAddressesByCoinId1: (walletId: string, coinId: number, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getFlushTransaction: (walletId: string, transactionId: string, options?: any) => Promise<RequestArgs>;
    getFlushTransactions: (walletId: string, pageable: Pageable, searchCondition: FlushQuerySearchCondition, options?: any) => Promise<RequestArgs>;
    getMasterWallet1: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletAccountKey1: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletBalance1: (walletId: string, symbol?: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletInitialKey1: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWallets1: (sort: Sort, options?: any) => Promise<RequestArgs>;
    getUserWallet1: (walletId: string, userWalletId: string, options?: any) => Promise<RequestArgs>;
    getUserWalletBalance1: (walletId: string, userWalletId: string, symbol?: string, options?: any) => Promise<RequestArgs>;
    getUserWallets1: (walletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    inactivateAllowedAddresses: (walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any) => Promise<RequestArgs>;
    patchAccountKey1: (walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any) => Promise<RequestArgs>;
    patchMasterWalletName1: (walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any) => Promise<RequestArgs>;
    patchUserWalletName1: (walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any) => Promise<RequestArgs>;
    patchWalletWithdrawalPolicy: (walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any) => Promise<RequestArgs>;
    recreateMasterWallet1: (walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any) => Promise<RequestArgs>;
    recreateUserWallet1: (walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any) => Promise<RequestArgs>;
    replaceTransaction: (replaceTransactionRequest: ReplaceTransactionRequest, options?: any) => Promise<RequestArgs>;
    resendTransaction: (resendTransactionRequest: ResendTransactionRequest, options?: any) => Promise<RequestArgs>;
    sendBatchTransaction1: (createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any) => Promise<RequestArgs>;
    sendTransaction1: (createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any) => Promise<RequestArgs>;
    validateIsAllowedAddress: (walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
};
export declare const BscWalletControllerApiFp: (configuration?: Configuration) => {
    activateAllowedAddresses(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    activateMasterWallet(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    createAllowedAddress(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedAddressDTO>>;
    createMasterWallet11(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InactiveMasterWalletDTO | MasterWalletDTO>>;
    createUserWallet1(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    createWalletWithdrawalPolicy(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    deleteAllowedAddress(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    flush(walletId: string, flushRequest: FlushRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    getAllWalletWithdrawalPolicies(walletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletWithdrawalPolicyDTO>>;
    getAllowedAddress(walletId: string, allowedAddressId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedAddressDTO>>;
    getAllowedAddressesByCoinId1(walletId: string, coinId: number, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationAllowedAddressDTO>>;
    getFlushTransaction(walletId: string, transactionId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FlushTransactionDTO>>;
    getFlushTransactions(walletId: string, pageable: Pageable, searchCondition: FlushQuerySearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationFlushTransactionDTO>>;
    getMasterWallet1(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    getMasterWalletAccountKey1(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    getMasterWalletBalance1(walletId: string, symbol?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MasterWalletBalanceDTO>>>;
    getMasterWalletInitialKey1(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    getMasterWallets1(sort: Sort, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MasterWalletDTO>>>;
    getUserWallet1(walletId: string, userWalletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    getUserWalletBalance1(walletId: string, userWalletId: string, symbol?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BalanceDTO>>>;
    getUserWallets1(walletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationUserWalletDTO>>;
    inactivateAllowedAddresses(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    patchAccountKey1(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    patchMasterWalletName1(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    patchUserWalletName1(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    patchWalletWithdrawalPolicy(walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    recreateMasterWallet1(walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    recreateUserWallet1(walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    replaceTransaction(replaceTransactionRequest: ReplaceTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    resendTransaction(resendTransactionRequest: ResendTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    sendBatchTransaction1(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BatchTransactionDTO>>>;
    sendTransaction1(createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    validateIsAllowedAddress(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ValidateIsAllowedAddressResponse>>;
};
export declare const BscWalletControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    activateAllowedAddresses(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): AxiosPromise<void>;
    activateMasterWallet(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    createAllowedAddress(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): AxiosPromise<AllowedAddressDTO>;
    createMasterWallet11(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): AxiosPromise<InactiveMasterWalletDTO | MasterWalletDTO>;
    createUserWallet1(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): AxiosPromise<UserWalletDTO>;
    createWalletWithdrawalPolicy(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    deleteAllowedAddress(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): AxiosPromise<void>;
    flush(walletId: string, flushRequest: FlushRequest, options?: any): AxiosPromise<TransactionDTO>;
    getAllWalletWithdrawalPolicies(walletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationWalletWithdrawalPolicyDTO>;
    getAllowedAddress(walletId: string, allowedAddressId: string, options?: any): AxiosPromise<AllowedAddressDTO>;
    getAllowedAddressesByCoinId1(walletId: string, coinId: number, pageable: Pageable, options?: any): AxiosPromise<PaginationAllowedAddressDTO>;
    getFlushTransaction(walletId: string, transactionId: string, options?: any): AxiosPromise<FlushTransactionDTO>;
    getFlushTransactions(walletId: string, pageable: Pageable, searchCondition: FlushQuerySearchCondition, options?: any): AxiosPromise<PaginationFlushTransactionDTO>;
    getMasterWallet1(walletId: string, options?: any): AxiosPromise<MasterWalletDTO>;
    getMasterWalletAccountKey1(walletId: string, options?: any): AxiosPromise<KeyDTO>;
    getMasterWalletBalance1(walletId: string, symbol?: string, options?: any): AxiosPromise<Array<MasterWalletBalanceDTO>>;
    getMasterWalletInitialKey1(walletId: string, options?: any): AxiosPromise<KeyDTO>;
    getMasterWallets1(sort: Sort, options?: any): AxiosPromise<Array<MasterWalletDTO>>;
    getUserWallet1(walletId: string, userWalletId: string, options?: any): AxiosPromise<UserWalletDTO>;
    getUserWalletBalance1(walletId: string, userWalletId: string, symbol?: string, options?: any): AxiosPromise<Array<BalanceDTO>>;
    getUserWallets1(walletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationUserWalletDTO>;
    inactivateAllowedAddresses(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): AxiosPromise<void>;
    patchAccountKey1(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): AxiosPromise<KeyDTO>;
    patchMasterWalletName1(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    patchUserWalletName1(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): AxiosPromise<UserWalletDTO>;
    patchWalletWithdrawalPolicy(walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    recreateMasterWallet1(walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    recreateUserWallet1(walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): AxiosPromise<UserWalletDTO>;
    replaceTransaction(replaceTransactionRequest: ReplaceTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    resendTransaction(resendTransactionRequest: ResendTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    sendBatchTransaction1(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): AxiosPromise<Array<BatchTransactionDTO>>;
    sendTransaction1(createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    validateIsAllowedAddress(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): AxiosPromise<ValidateIsAllowedAddressResponse>;
};
export declare class BscWalletControllerApi extends BaseAPI {
    activateAllowedAddresses(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    activateMasterWallet(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    createAllowedAddress(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<AllowedAddressDTO>>;
    createMasterWallet11(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): Promise<import("axios").AxiosResponse<InactiveMasterWalletDTO | MasterWalletDTO>>;
    createUserWallet1(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    createWalletWithdrawalPolicy(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    deleteAllowedAddress(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    flush(walletId: string, flushRequest: FlushRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    getAllWalletWithdrawalPolicies(walletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletWithdrawalPolicyDTO>>;
    getAllowedAddress(walletId: string, allowedAddressId: string, options?: any): Promise<import("axios").AxiosResponse<AllowedAddressDTO>>;
    getAllowedAddressesByCoinId1(walletId: string, coinId: number, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationAllowedAddressDTO>>;
    getFlushTransaction(walletId: string, transactionId: string, options?: any): Promise<import("axios").AxiosResponse<FlushTransactionDTO>>;
    getFlushTransactions(walletId: string, pageable: Pageable, searchCondition: FlushQuerySearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationFlushTransactionDTO>>;
    getMasterWallet1(walletId: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    getMasterWalletAccountKey1(walletId: string, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    getMasterWalletBalance1(walletId: string, symbol?: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletBalanceDTO[]>>;
    getMasterWalletInitialKey1(walletId: string, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    getMasterWallets1(sort: Sort, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO[]>>;
    getUserWallet1(walletId: string, userWalletId: string, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    getUserWalletBalance1(walletId: string, userWalletId: string, symbol?: string, options?: any): Promise<import("axios").AxiosResponse<BalanceDTO[]>>;
    getUserWallets1(walletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationUserWalletDTO>>;
    inactivateAllowedAddresses(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    patchAccountKey1(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    patchMasterWalletName1(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    patchUserWalletName1(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    patchWalletWithdrawalPolicy(walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    recreateMasterWallet1(walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    recreateUserWallet1(walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    replaceTransaction(replaceTransactionRequest: ReplaceTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    resendTransaction(resendTransactionRequest: ResendTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    sendBatchTransaction1(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<BatchTransactionDTO[]>>;
    sendTransaction1(createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    validateIsAllowedAddress(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<ValidateIsAllowedAddressResponse>>;
}
export declare const BscWithdrawalApprovalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    approveWithdrawalApproval: (withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any) => Promise<RequestArgs>;
    rejectWithdrawalApproval: (withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any) => Promise<RequestArgs>;
};
export declare const BscWithdrawalApprovalControllerApiFp: (configuration?: Configuration) => {
    approveWithdrawalApproval(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    rejectWithdrawalApproval(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const BscWithdrawalApprovalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    approveWithdrawalApproval(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): AxiosPromise<TransactionDTO>;
    rejectWithdrawalApproval(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): AxiosPromise<void>;
};
export declare class BscWithdrawalApprovalControllerApi extends BaseAPI {
    approveWithdrawalApproval(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    rejectWithdrawalApproval(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
}
export declare const CoinControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getAllCoins: (options?: any) => Promise<RequestArgs>;
    getCoin: (symbol: string, blockchain: string, options?: any) => Promise<RequestArgs>;
};
export declare const CoinControllerApiFp: (configuration?: Configuration) => {
    getAllCoins(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CoinDTO>>>;
    getCoin(symbol: string, blockchain: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
};
export declare const CoinControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getAllCoins(options?: any): AxiosPromise<Array<CoinDTO>>;
    getCoin(symbol: string, blockchain: string, options?: any): AxiosPromise<CoinDTO>;
};
export declare class CoinControllerApi extends BaseAPI {
    getAllCoins(options?: any): Promise<import("axios").AxiosResponse<CoinDTO[]>>;
    getCoin(symbol: string, blockchain: string, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
}
export declare const EthAdminControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getCoin6: (coinId: number, options?: any) => Promise<RequestArgs>;
    getExternalWithdrawals2: (pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any) => Promise<RequestArgs>;
    getMasterWallets6: (pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getUserWallets6: (pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getValueTransferEvents9: (pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const EthAdminControllerApiFp: (configuration?: Configuration) => {
    getCoin6(coinId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
    getExternalWithdrawals2(pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventDTO>>;
    getMasterWallets6(pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletDTO>>;
    getUserWallets6(pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletDTO>>;
    getValueTransferEvents9(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventDTO>>;
};
export declare const EthAdminControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getCoin6(coinId: number, options?: any): AxiosPromise<CoinDTO>;
    getExternalWithdrawals2(pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventDTO>;
    getMasterWallets6(pageable: Pageable, options?: any): AxiosPromise<PaginationWalletDTO>;
    getUserWallets6(pageable: Pageable, options?: any): AxiosPromise<PaginationWalletDTO>;
    getValueTransferEvents9(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventDTO>;
};
export declare class EthAdminControllerApi extends BaseAPI {
    getCoin6(coinId: number, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
    getExternalWithdrawals2(pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventDTO>>;
    getMasterWallets6(pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletDTO>>;
    getUserWallets6(pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletDTO>>;
    getValueTransferEvents9(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventDTO>>;
}
export declare const EthCoinControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    createCoin2: (createCoinRequest: CreateCoinRequest, options?: any) => Promise<RequestArgs>;
    deleteCoin2: (symbol: string, options?: any) => Promise<RequestArgs>;
    getAllCoins13: (flag: boolean, options?: any) => Promise<RequestArgs>;
    getCoin5: (symbol: string, options?: any) => Promise<RequestArgs>;
    patchCoin2: (updateCoinRequest: UpdateCoinRequest, options?: any) => Promise<RequestArgs>;
};
export declare const EthCoinControllerApiFp: (configuration?: Configuration) => {
    createCoin2(createCoinRequest: CreateCoinRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
    deleteCoin2(symbol: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getAllCoins13(flag: boolean, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CoinDTO>>>;
    getCoin5(symbol: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
    patchCoin2(updateCoinRequest: UpdateCoinRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const EthCoinControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createCoin2(createCoinRequest: CreateCoinRequest, options?: any): AxiosPromise<CoinDTO>;
    deleteCoin2(symbol: string, options?: any): AxiosPromise<void>;
    getAllCoins13(flag: boolean, options?: any): AxiosPromise<Array<CoinDTO>>;
    getCoin5(symbol: string, options?: any): AxiosPromise<CoinDTO>;
    patchCoin2(updateCoinRequest: UpdateCoinRequest, options?: any): AxiosPromise<void>;
};
export declare class EthCoinControllerApi extends BaseAPI {
    createCoin2(createCoinRequest: CreateCoinRequest, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
    deleteCoin2(symbol: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
    getAllCoins13(flag: boolean, options?: any): Promise<import("axios").AxiosResponse<CoinDTO[]>>;
    getCoin5(symbol: string, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
    patchCoin2(updateCoinRequest: UpdateCoinRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
}
export declare const EthEventControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getCallEvents5: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getNftTransferEvents2: (pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
    getValueTransferEvents7: (pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const EthEventControllerApiFp: (configuration?: Configuration) => {
    getCallEvents5(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationCallEventDTO>>;
    getNftTransferEvents2(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationNftTransferEventDTO>>;
    getValueTransferEvents7(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventDTO>>;
};
export declare const EthEventControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getCallEvents5(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationCallEventDTO>;
    getNftTransferEvents2(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): AxiosPromise<PaginationNftTransferEventDTO>;
    getValueTransferEvents7(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventDTO>;
};
export declare class EthEventControllerApi extends BaseAPI {
    getCallEvents5(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationCallEventDTO>>;
    getNftTransferEvents2(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationNftTransferEventDTO>>;
    getValueTransferEvents7(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventDTO>>;
}
export declare const EthGasPriceControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getGasPrice2: (options?: any) => Promise<RequestArgs>;
};
export declare const EthGasPriceControllerApiFp: (configuration?: Configuration) => {
    getGasPrice2(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetGasPriceResponse>>;
};
export declare const EthGasPriceControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getGasPrice2(options?: any): AxiosPromise<GetGasPriceResponse>;
};
export declare class EthGasPriceControllerApi extends BaseAPI {
    getGasPrice2(options?: any): Promise<import("axios").AxiosResponse<GetGasPriceResponse>>;
}
export declare const EthHenesisKeyControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    createExampleHenesisKey2: (options?: any) => Promise<RequestArgs>;
    createTransaction2: (createTransactionRequest: CreateTransactionRequest, options?: any) => Promise<RequestArgs>;
    getHenesisKey2: (options?: any) => Promise<RequestArgs>;
    getHenesisKeyBalance2: (options?: any) => Promise<RequestArgs>;
    getHistoriesCsv2: (createdAtGte: string, createdAtLt: string, options?: any) => Promise<RequestArgs>;
    getTransactionHistories2: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
};
export declare const EthHenesisKeyControllerApiFp: (configuration?: Configuration) => {
    createExampleHenesisKey2(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExampleHenesisKeyDTO>>;
    createTransaction2(createTransactionRequest: CreateTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    getHenesisKey2(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HenesisKeyDTO>>;
    getHenesisKeyBalance2(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HenesisKeyBalanceDTO>>;
    getHistoriesCsv2(createdAtGte: string, createdAtLt: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getTransactionHistories2(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransactionHistoryDTO>>;
};
export declare const EthHenesisKeyControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createExampleHenesisKey2(options?: any): AxiosPromise<ExampleHenesisKeyDTO>;
    createTransaction2(createTransactionRequest: CreateTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    getHenesisKey2(options?: any): AxiosPromise<HenesisKeyDTO>;
    getHenesisKeyBalance2(options?: any): AxiosPromise<HenesisKeyBalanceDTO>;
    getHistoriesCsv2(createdAtGte: string, createdAtLt: string, options?: any): AxiosPromise<void>;
    getTransactionHistories2(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationTransactionHistoryDTO>;
};
export declare class EthHenesisKeyControllerApi extends BaseAPI {
    createExampleHenesisKey2(options?: any): Promise<import("axios").AxiosResponse<ExampleHenesisKeyDTO>>;
    createTransaction2(createTransactionRequest: CreateTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    getHenesisKey2(options?: any): Promise<import("axios").AxiosResponse<HenesisKeyDTO>>;
    getHenesisKeyBalance2(options?: any): Promise<import("axios").AxiosResponse<HenesisKeyBalanceDTO>>;
    getHistoriesCsv2(createdAtGte: string, createdAtLt: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
    getTransactionHistories2(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationTransactionHistoryDTO>>;
}
export declare const EthInternalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getCallEvents6: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getNftTransferEvents3: (pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
    getValueTransferEvents8: (pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const EthInternalControllerApiFp: (configuration?: Configuration) => {
    getCallEvents6(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationCallEventInternalDTO>>;
    getNftTransferEvents3(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationNftTransferEventInternalDTO>>;
    getValueTransferEvents8(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventInternalDTO>>;
};
export declare const EthInternalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getCallEvents6(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationCallEventInternalDTO>;
    getNftTransferEvents3(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): AxiosPromise<PaginationNftTransferEventInternalDTO>;
    getValueTransferEvents8(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventInternalDTO>;
};
export declare class EthInternalControllerApi extends BaseAPI {
    getCallEvents6(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationCallEventInternalDTO>>;
    getNftTransferEvents3(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationNftTransferEventInternalDTO>>;
    getValueTransferEvents8(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventInternalDTO>>;
}
export declare const EthMethodGasUsageControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getMethodGasUsages3: (name: string, options?: any) => Promise<RequestArgs>;
};
export declare const EthMethodGasUsageControllerApiFp: (configuration?: Configuration) => {
    getMethodGasUsages3(name: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MethodGasUsageDTO>>;
};
export declare const EthMethodGasUsageControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getMethodGasUsages3(name: string, options?: any): AxiosPromise<MethodGasUsageDTO>;
};
export declare class EthMethodGasUsageControllerApi extends BaseAPI {
    getMethodGasUsages3(name: string, options?: any): Promise<import("axios").AxiosResponse<MethodGasUsageDTO>>;
}
export declare const EthNftControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getAllNfts1: (options?: any) => Promise<RequestArgs>;
    getNft1: (nftId: number, options?: any) => Promise<RequestArgs>;
    syncMetadata1: (nftId: number, syncMetadataRequest: SyncMetadataRequest, options?: any) => Promise<RequestArgs>;
};
export declare const EthNftControllerApiFp: (configuration?: Configuration) => {
    getAllNfts1(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<NftDTO>>>;
    getNft1(nftId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NftDTO>>;
    syncMetadata1(nftId: number, syncMetadataRequest: SyncMetadataRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NftItemDTO>>;
};
export declare const EthNftControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getAllNfts1(options?: any): AxiosPromise<Array<NftDTO>>;
    getNft1(nftId: number, options?: any): AxiosPromise<NftDTO>;
    syncMetadata1(nftId: number, syncMetadataRequest: SyncMetadataRequest, options?: any): AxiosPromise<NftItemDTO>;
};
export declare class EthNftControllerApi extends BaseAPI {
    getAllNfts1(options?: any): Promise<import("axios").AxiosResponse<NftDTO[]>>;
    getNft1(nftId: number, options?: any): Promise<import("axios").AxiosResponse<NftDTO>>;
    syncMetadata1(nftId: number, syncMetadataRequest: SyncMetadataRequest, options?: any): Promise<import("axios").AxiosResponse<NftItemDTO>>;
}
export declare const EthOperationControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    bindHenesisKeyToWallet2: (keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any) => Promise<RequestArgs>;
    createHenesisKey2: (createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any) => Promise<RequestArgs>;
    getCoinByAddress1: (address: string, options?: any) => Promise<RequestArgs>;
};
export declare const EthOperationControllerApiFp: (configuration?: Configuration) => {
    bindHenesisKeyToWallet2(keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BindHenesisKeyToWalletDTO>>;
    createHenesisKey2(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HenesisKeyDTO>>;
    getCoinByAddress1(address: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
};
export declare const EthOperationControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    bindHenesisKeyToWallet2(keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any): AxiosPromise<BindHenesisKeyToWalletDTO>;
    createHenesisKey2(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): AxiosPromise<HenesisKeyDTO>;
    getCoinByAddress1(address: string, options?: any): AxiosPromise<CoinDTO>;
};
export declare class EthOperationControllerApi extends BaseAPI {
    bindHenesisKeyToWallet2(keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any): Promise<import("axios").AxiosResponse<BindHenesisKeyToWalletDTO>>;
    createHenesisKey2(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): Promise<import("axios").AxiosResponse<HenesisKeyDTO>>;
    getCoinByAddress1(address: string, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
}
export declare const EthTransactionControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getAllTransactions3: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getRawTransactionByHash2: (transactionHash: string, options?: any) => Promise<RequestArgs>;
    getTransactionById3: (transactionId: string, options?: any) => Promise<RequestArgs>;
};
export declare const EthTransactionControllerApiFp: (configuration?: Configuration) => {
    getAllTransactions3(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransactionDTO>>;
    getRawTransactionByHash2(transactionHash: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DetailedRawTransactionDTO>>;
    getTransactionById3(transactionId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
};
export declare const EthTransactionControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getAllTransactions3(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationTransactionDTO>;
    getRawTransactionByHash2(transactionHash: string, options?: any): AxiosPromise<DetailedRawTransactionDTO>;
    getTransactionById3(transactionId: string, options?: any): AxiosPromise<TransactionDTO>;
};
export declare class EthTransactionControllerApi extends BaseAPI {
    getAllTransactions3(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationTransactionDTO>>;
    getRawTransactionByHash2(transactionHash: string, options?: any): Promise<import("axios").AxiosResponse<DetailedRawTransactionDTO>>;
    getTransactionById3(transactionId: string, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
}
export declare const EthWalletControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    activateAllowedAddresses2: (walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any) => Promise<RequestArgs>;
    activateMasterWallet2: (walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any) => Promise<RequestArgs>;
    createAllowedAddress2: (walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
    createMasterWallet13: (createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any) => Promise<RequestArgs>;
    createUserWallet3: (walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any) => Promise<RequestArgs>;
    createWalletWithdrawalPolicy2: (walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any) => Promise<RequestArgs>;
    deleteAllowedAddress2: (walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
    flush2: (walletId: string, flushRequest: FlushRequest, options?: any) => Promise<RequestArgs>;
    getAllWalletWithdrawalPolicies2: (walletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getAllowedAddress2: (walletId: string, allowedAddressId: string, options?: any) => Promise<RequestArgs>;
    getAllowedAddressesByCoinId3: (walletId: string, coinId: number, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getFlushTransaction1: (walletId: string, transactionId: string, options?: any) => Promise<RequestArgs>;
    getFlushTransactions1: (walletId: string, pageable: Pageable, searchCondition: FlushQuerySearchCondition, options?: any) => Promise<RequestArgs>;
    getMasterWallet3: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletAccountKey3: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletBalance3: (walletId: string, symbol?: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletInitialKey3: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletNonce2: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWallets5: (sort: Sort, options?: any) => Promise<RequestArgs>;
    getNftBalance1: (walletId: string, pageable: Pageable, searchCondition: NftBalanceSearchCondition, options?: any) => Promise<RequestArgs>;
    getUserWallet3: (walletId: string, userWalletId: string, options?: any) => Promise<RequestArgs>;
    getUserWalletBalance3: (walletId: string, userWalletId: string, symbol?: string, options?: any) => Promise<RequestArgs>;
    getUserWalletNonce2: (walletId: string, userWalletId: string, options?: any) => Promise<RequestArgs>;
    getUserWallets5: (walletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    inactivateAllowedAddresses2: (walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any) => Promise<RequestArgs>;
    patchAccountKey3: (walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any) => Promise<RequestArgs>;
    patchMasterWalletName3: (walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any) => Promise<RequestArgs>;
    patchUserWalletName3: (walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any) => Promise<RequestArgs>;
    patchWalletWithdrawalPolicy2: (walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any) => Promise<RequestArgs>;
    recreateMasterWallet3: (walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any) => Promise<RequestArgs>;
    recreateUserWallet3: (walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any) => Promise<RequestArgs>;
    replaceTransaction1: (replaceTransactionRequest: ReplaceTransactionRequest, options?: any) => Promise<RequestArgs>;
    resendTransaction2: (resendTransactionRequest: ResendTransactionRequest, options?: any) => Promise<RequestArgs>;
    sendBatchTransaction3: (createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any) => Promise<RequestArgs>;
    sendNftTransaction1: (walletId: string, createNftMultiSigTransactionRequest: CreateNftMultiSigTransactionRequest, options?: any) => Promise<RequestArgs>;
    sendTransaction3: (createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any) => Promise<RequestArgs>;
    validateIsAllowedAddress2: (walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
};
export declare const EthWalletControllerApiFp: (configuration?: Configuration) => {
    activateAllowedAddresses2(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    activateMasterWallet2(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    createAllowedAddress2(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedAddressDTO>>;
    createMasterWallet13(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InactiveMasterWalletDTO | MasterWalletDTO>>;
    createUserWallet3(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    createWalletWithdrawalPolicy2(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    deleteAllowedAddress2(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    flush2(walletId: string, flushRequest: FlushRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    getAllWalletWithdrawalPolicies2(walletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletWithdrawalPolicyDTO>>;
    getAllowedAddress2(walletId: string, allowedAddressId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedAddressDTO>>;
    getAllowedAddressesByCoinId3(walletId: string, coinId: number, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationAllowedAddressDTO>>;
    getFlushTransaction1(walletId: string, transactionId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FlushTransactionDTO>>;
    getFlushTransactions1(walletId: string, pageable: Pageable, searchCondition: FlushQuerySearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationFlushTransactionDTO>>;
    getMasterWallet3(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    getMasterWalletAccountKey3(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    getMasterWalletBalance3(walletId: string, symbol?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MasterWalletBalanceDTO>>>;
    getMasterWalletInitialKey3(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    getMasterWalletNonce2(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NonceDTO>>;
    getMasterWallets5(sort: Sort, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MasterWalletDTO>>>;
    getNftBalance1(walletId: string, pageable: Pageable, searchCondition: NftBalanceSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationNftBalanceDTO>>;
    getUserWallet3(walletId: string, userWalletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    getUserWalletBalance3(walletId: string, userWalletId: string, symbol?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BalanceDTO>>>;
    getUserWalletNonce2(walletId: string, userWalletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NonceDTO>>;
    getUserWallets5(walletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationUserWalletDTO>>;
    inactivateAllowedAddresses2(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    patchAccountKey3(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    patchMasterWalletName3(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    patchUserWalletName3(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    patchWalletWithdrawalPolicy2(walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    recreateMasterWallet3(walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    recreateUserWallet3(walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    replaceTransaction1(replaceTransactionRequest: ReplaceTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    resendTransaction2(resendTransactionRequest: ResendTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    sendBatchTransaction3(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BatchTransactionDTO>>>;
    sendNftTransaction1(walletId: string, createNftMultiSigTransactionRequest: CreateNftMultiSigTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    sendTransaction3(createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    validateIsAllowedAddress2(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ValidateIsAllowedAddressResponse>>;
};
export declare const EthWalletControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    activateAllowedAddresses2(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): AxiosPromise<void>;
    activateMasterWallet2(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    createAllowedAddress2(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): AxiosPromise<AllowedAddressDTO>;
    createMasterWallet13(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): AxiosPromise<InactiveMasterWalletDTO | MasterWalletDTO>;
    createUserWallet3(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): AxiosPromise<UserWalletDTO>;
    createWalletWithdrawalPolicy2(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    deleteAllowedAddress2(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): AxiosPromise<void>;
    flush2(walletId: string, flushRequest: FlushRequest, options?: any): AxiosPromise<TransactionDTO>;
    getAllWalletWithdrawalPolicies2(walletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationWalletWithdrawalPolicyDTO>;
    getAllowedAddress2(walletId: string, allowedAddressId: string, options?: any): AxiosPromise<AllowedAddressDTO>;
    getAllowedAddressesByCoinId3(walletId: string, coinId: number, pageable: Pageable, options?: any): AxiosPromise<PaginationAllowedAddressDTO>;
    getFlushTransaction1(walletId: string, transactionId: string, options?: any): AxiosPromise<FlushTransactionDTO>;
    getFlushTransactions1(walletId: string, pageable: Pageable, searchCondition: FlushQuerySearchCondition, options?: any): AxiosPromise<PaginationFlushTransactionDTO>;
    getMasterWallet3(walletId: string, options?: any): AxiosPromise<MasterWalletDTO>;
    getMasterWalletAccountKey3(walletId: string, options?: any): AxiosPromise<KeyDTO>;
    getMasterWalletBalance3(walletId: string, symbol?: string, options?: any): AxiosPromise<Array<MasterWalletBalanceDTO>>;
    getMasterWalletInitialKey3(walletId: string, options?: any): AxiosPromise<KeyDTO>;
    getMasterWalletNonce2(walletId: string, options?: any): AxiosPromise<NonceDTO>;
    getMasterWallets5(sort: Sort, options?: any): AxiosPromise<Array<MasterWalletDTO>>;
    getNftBalance1(walletId: string, pageable: Pageable, searchCondition: NftBalanceSearchCondition, options?: any): AxiosPromise<PaginationNftBalanceDTO>;
    getUserWallet3(walletId: string, userWalletId: string, options?: any): AxiosPromise<UserWalletDTO>;
    getUserWalletBalance3(walletId: string, userWalletId: string, symbol?: string, options?: any): AxiosPromise<Array<BalanceDTO>>;
    getUserWalletNonce2(walletId: string, userWalletId: string, options?: any): AxiosPromise<NonceDTO>;
    getUserWallets5(walletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationUserWalletDTO>;
    inactivateAllowedAddresses2(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): AxiosPromise<void>;
    patchAccountKey3(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): AxiosPromise<KeyDTO>;
    patchMasterWalletName3(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    patchUserWalletName3(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): AxiosPromise<UserWalletDTO>;
    patchWalletWithdrawalPolicy2(walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    recreateMasterWallet3(walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    recreateUserWallet3(walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): AxiosPromise<UserWalletDTO>;
    replaceTransaction1(replaceTransactionRequest: ReplaceTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    resendTransaction2(resendTransactionRequest: ResendTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    sendBatchTransaction3(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): AxiosPromise<Array<BatchTransactionDTO>>;
    sendNftTransaction1(walletId: string, createNftMultiSigTransactionRequest: CreateNftMultiSigTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    sendTransaction3(createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    validateIsAllowedAddress2(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): AxiosPromise<ValidateIsAllowedAddressResponse>;
};
export declare class EthWalletControllerApi extends BaseAPI {
    activateAllowedAddresses2(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    activateMasterWallet2(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    createAllowedAddress2(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<AllowedAddressDTO>>;
    createMasterWallet13(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): Promise<import("axios").AxiosResponse<InactiveMasterWalletDTO | MasterWalletDTO>>;
    createUserWallet3(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    createWalletWithdrawalPolicy2(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    deleteAllowedAddress2(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    flush2(walletId: string, flushRequest: FlushRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    getAllWalletWithdrawalPolicies2(walletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletWithdrawalPolicyDTO>>;
    getAllowedAddress2(walletId: string, allowedAddressId: string, options?: any): Promise<import("axios").AxiosResponse<AllowedAddressDTO>>;
    getAllowedAddressesByCoinId3(walletId: string, coinId: number, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationAllowedAddressDTO>>;
    getFlushTransaction1(walletId: string, transactionId: string, options?: any): Promise<import("axios").AxiosResponse<FlushTransactionDTO>>;
    getFlushTransactions1(walletId: string, pageable: Pageable, searchCondition: FlushQuerySearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationFlushTransactionDTO>>;
    getMasterWallet3(walletId: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    getMasterWalletAccountKey3(walletId: string, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    getMasterWalletBalance3(walletId: string, symbol?: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletBalanceDTO[]>>;
    getMasterWalletInitialKey3(walletId: string, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    getMasterWalletNonce2(walletId: string, options?: any): Promise<import("axios").AxiosResponse<NonceDTO>>;
    getMasterWallets5(sort: Sort, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO[]>>;
    getNftBalance1(walletId: string, pageable: Pageable, searchCondition: NftBalanceSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationNftBalanceDTO>>;
    getUserWallet3(walletId: string, userWalletId: string, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    getUserWalletBalance3(walletId: string, userWalletId: string, symbol?: string, options?: any): Promise<import("axios").AxiosResponse<BalanceDTO[]>>;
    getUserWalletNonce2(walletId: string, userWalletId: string, options?: any): Promise<import("axios").AxiosResponse<NonceDTO>>;
    getUserWallets5(walletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationUserWalletDTO>>;
    inactivateAllowedAddresses2(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    patchAccountKey3(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    patchMasterWalletName3(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    patchUserWalletName3(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    patchWalletWithdrawalPolicy2(walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    recreateMasterWallet3(walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    recreateUserWallet3(walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    replaceTransaction1(replaceTransactionRequest: ReplaceTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    resendTransaction2(resendTransactionRequest: ResendTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    sendBatchTransaction3(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<BatchTransactionDTO[]>>;
    sendNftTransaction1(walletId: string, createNftMultiSigTransactionRequest: CreateNftMultiSigTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    sendTransaction3(createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    validateIsAllowedAddress2(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<ValidateIsAllowedAddressResponse>>;
}
export declare const EthWithdrawalApprovalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    approveWithdrawalApproval2: (withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any) => Promise<RequestArgs>;
    rejectWithdrawalApproval2: (withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any) => Promise<RequestArgs>;
};
export declare const EthWithdrawalApprovalControllerApiFp: (configuration?: Configuration) => {
    approveWithdrawalApproval2(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    rejectWithdrawalApproval2(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const EthWithdrawalApprovalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    approveWithdrawalApproval2(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): AxiosPromise<TransactionDTO>;
    rejectWithdrawalApproval2(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): AxiosPromise<void>;
};
export declare class EthWithdrawalApprovalControllerApi extends BaseAPI {
    approveWithdrawalApproval2(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    rejectWithdrawalApproval2(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
}
export declare const EventControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getCallEvents: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getValueTransferEvents: (pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const EventControllerApiFp: (configuration?: Configuration) => {
    getCallEvents(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationCallEventDTO>>;
    getValueTransferEvents(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventDTO>>;
};
export declare const EventControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getCallEvents(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationCallEventDTO>;
    getValueTransferEvents(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventDTO>;
};
export declare class EventControllerApi extends BaseAPI {
    getCallEvents(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationCallEventDTO>>;
    getValueTransferEvents(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventDTO>>;
}
export declare const KlayAdminControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getCoin4: (coinId: number, options?: any) => Promise<RequestArgs>;
    getExternalWithdrawals1: (pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any) => Promise<RequestArgs>;
    getMasterWallets3: (pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getUserWallets3: (pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getValueTransferEvents6: (pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const KlayAdminControllerApiFp: (configuration?: Configuration) => {
    getCoin4(coinId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
    getExternalWithdrawals1(pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventDTO>>;
    getMasterWallets3(pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletDTO>>;
    getUserWallets3(pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletDTO>>;
    getValueTransferEvents6(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventDTO>>;
};
export declare const KlayAdminControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getCoin4(coinId: number, options?: any): AxiosPromise<CoinDTO>;
    getExternalWithdrawals1(pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventDTO>;
    getMasterWallets3(pageable: Pageable, options?: any): AxiosPromise<PaginationWalletDTO>;
    getUserWallets3(pageable: Pageable, options?: any): AxiosPromise<PaginationWalletDTO>;
    getValueTransferEvents6(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventDTO>;
};
export declare class KlayAdminControllerApi extends BaseAPI {
    getCoin4(coinId: number, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
    getExternalWithdrawals1(pageable: Pageable, searchCondition: ExternalWithdrawalSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventDTO>>;
    getMasterWallets3(pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletDTO>>;
    getUserWallets3(pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletDTO>>;
    getValueTransferEvents6(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventDTO>>;
}
export declare const KlayCoinControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    createCoin1: (createCoinRequest: CreateCoinRequest, options?: any) => Promise<RequestArgs>;
    deleteCoin1: (symbol: string, options?: any) => Promise<RequestArgs>;
    getAllCoins12: (flag: boolean, options?: any) => Promise<RequestArgs>;
    getCoin3: (symbol: string, options?: any) => Promise<RequestArgs>;
    patchCoin1: (updateCoinRequest: UpdateCoinRequest, options?: any) => Promise<RequestArgs>;
};
export declare const KlayCoinControllerApiFp: (configuration?: Configuration) => {
    createCoin1(createCoinRequest: CreateCoinRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
    deleteCoin1(symbol: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getAllCoins12(flag: boolean, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CoinDTO>>>;
    getCoin3(symbol: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
    patchCoin1(updateCoinRequest: UpdateCoinRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const KlayCoinControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createCoin1(createCoinRequest: CreateCoinRequest, options?: any): AxiosPromise<CoinDTO>;
    deleteCoin1(symbol: string, options?: any): AxiosPromise<void>;
    getAllCoins12(flag: boolean, options?: any): AxiosPromise<Array<CoinDTO>>;
    getCoin3(symbol: string, options?: any): AxiosPromise<CoinDTO>;
    patchCoin1(updateCoinRequest: UpdateCoinRequest, options?: any): AxiosPromise<void>;
};
export declare class KlayCoinControllerApi extends BaseAPI {
    createCoin1(createCoinRequest: CreateCoinRequest, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
    deleteCoin1(symbol: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
    getAllCoins12(flag: boolean, options?: any): Promise<import("axios").AxiosResponse<CoinDTO[]>>;
    getCoin3(symbol: string, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
    patchCoin1(updateCoinRequest: UpdateCoinRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
}
export declare const KlayEventControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getCallEvents4: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getNftTransferEvents1: (pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
    getValueTransferEvents5: (pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const KlayEventControllerApiFp: (configuration?: Configuration) => {
    getCallEvents4(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationCallEventDTO>>;
    getNftTransferEvents1(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationNftTransferEventDTO>>;
    getValueTransferEvents5(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventDTO>>;
};
export declare const KlayEventControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getCallEvents4(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationCallEventDTO>;
    getNftTransferEvents1(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): AxiosPromise<PaginationNftTransferEventDTO>;
    getValueTransferEvents5(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventDTO>;
};
export declare class KlayEventControllerApi extends BaseAPI {
    getCallEvents4(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationCallEventDTO>>;
    getNftTransferEvents1(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationNftTransferEventDTO>>;
    getValueTransferEvents5(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventDTO>>;
}
export declare const KlayGasPriceControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getGasPrice1: (options?: any) => Promise<RequestArgs>;
};
export declare const KlayGasPriceControllerApiFp: (configuration?: Configuration) => {
    getGasPrice1(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetGasPriceResponse>>;
};
export declare const KlayGasPriceControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getGasPrice1(options?: any): AxiosPromise<GetGasPriceResponse>;
};
export declare class KlayGasPriceControllerApi extends BaseAPI {
    getGasPrice1(options?: any): Promise<import("axios").AxiosResponse<GetGasPriceResponse>>;
}
export declare const KlayHenesisKeyControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    createExampleHenesisKey1: (options?: any) => Promise<RequestArgs>;
    createTransaction1: (createTransactionRequest: CreateTransactionRequest, options?: any) => Promise<RequestArgs>;
    getHenesisKey1: (options?: any) => Promise<RequestArgs>;
    getHenesisKeyBalance1: (options?: any) => Promise<RequestArgs>;
    getHistoriesCsv1: (createdAtGte: string, createdAtLt: string, options?: any) => Promise<RequestArgs>;
    getTransactionHistories1: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
};
export declare const KlayHenesisKeyControllerApiFp: (configuration?: Configuration) => {
    createExampleHenesisKey1(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExampleHenesisKeyDTO>>;
    createTransaction1(createTransactionRequest: CreateTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    getHenesisKey1(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HenesisKeyDTO>>;
    getHenesisKeyBalance1(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HenesisKeyBalanceDTO>>;
    getHistoriesCsv1(createdAtGte: string, createdAtLt: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getTransactionHistories1(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransactionHistoryDTO>>;
};
export declare const KlayHenesisKeyControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createExampleHenesisKey1(options?: any): AxiosPromise<ExampleHenesisKeyDTO>;
    createTransaction1(createTransactionRequest: CreateTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    getHenesisKey1(options?: any): AxiosPromise<HenesisKeyDTO>;
    getHenesisKeyBalance1(options?: any): AxiosPromise<HenesisKeyBalanceDTO>;
    getHistoriesCsv1(createdAtGte: string, createdAtLt: string, options?: any): AxiosPromise<void>;
    getTransactionHistories1(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationTransactionHistoryDTO>;
};
export declare class KlayHenesisKeyControllerApi extends BaseAPI {
    createExampleHenesisKey1(options?: any): Promise<import("axios").AxiosResponse<ExampleHenesisKeyDTO>>;
    createTransaction1(createTransactionRequest: CreateTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    getHenesisKey1(options?: any): Promise<import("axios").AxiosResponse<HenesisKeyDTO>>;
    getHenesisKeyBalance1(options?: any): Promise<import("axios").AxiosResponse<HenesisKeyBalanceDTO>>;
    getHistoriesCsv1(createdAtGte: string, createdAtLt: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
    getTransactionHistories1(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationTransactionHistoryDTO>>;
}
export declare const KlayInternalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getCallEvents3: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getNftTransferEvents: (pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
    getValueTransferEvents4: (pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any) => Promise<RequestArgs>;
};
export declare const KlayInternalControllerApiFp: (configuration?: Configuration) => {
    getCallEvents3(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationCallEventInternalDTO>>;
    getNftTransferEvents(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationNftTransferEventInternalDTO>>;
    getValueTransferEvents4(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationValueTransferEventInternalDTO>>;
};
export declare const KlayInternalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getCallEvents3(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationCallEventInternalDTO>;
    getNftTransferEvents(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): AxiosPromise<PaginationNftTransferEventInternalDTO>;
    getValueTransferEvents4(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): AxiosPromise<PaginationValueTransferEventInternalDTO>;
};
export declare class KlayInternalControllerApi extends BaseAPI {
    getCallEvents3(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationCallEventInternalDTO>>;
    getNftTransferEvents(pageable: Pageable, searchCondition: NftTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationNftTransferEventInternalDTO>>;
    getValueTransferEvents4(pageable: Pageable, searchCondition: ValueTransferEventSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationValueTransferEventInternalDTO>>;
}
export declare const KlayMethodGasUsageControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getMethodGasUsages2: (name: string, options?: any) => Promise<RequestArgs>;
};
export declare const KlayMethodGasUsageControllerApiFp: (configuration?: Configuration) => {
    getMethodGasUsages2(name: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MethodGasUsageDTO>>;
};
export declare const KlayMethodGasUsageControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getMethodGasUsages2(name: string, options?: any): AxiosPromise<MethodGasUsageDTO>;
};
export declare class KlayMethodGasUsageControllerApi extends BaseAPI {
    getMethodGasUsages2(name: string, options?: any): Promise<import("axios").AxiosResponse<MethodGasUsageDTO>>;
}
export declare const KlayNftControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getAllNfts: (options?: any) => Promise<RequestArgs>;
    getNft: (nftId: number, options?: any) => Promise<RequestArgs>;
    syncMetadata: (nftId: number, syncMetadataRequest: SyncMetadataRequest, options?: any) => Promise<RequestArgs>;
};
export declare const KlayNftControllerApiFp: (configuration?: Configuration) => {
    getAllNfts(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<NftDTO>>>;
    getNft(nftId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NftDTO>>;
    syncMetadata(nftId: number, syncMetadataRequest: SyncMetadataRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NftItemDTO>>;
};
export declare const KlayNftControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getAllNfts(options?: any): AxiosPromise<Array<NftDTO>>;
    getNft(nftId: number, options?: any): AxiosPromise<NftDTO>;
    syncMetadata(nftId: number, syncMetadataRequest: SyncMetadataRequest, options?: any): AxiosPromise<NftItemDTO>;
};
export declare class KlayNftControllerApi extends BaseAPI {
    getAllNfts(options?: any): Promise<import("axios").AxiosResponse<NftDTO[]>>;
    getNft(nftId: number, options?: any): Promise<import("axios").AxiosResponse<NftDTO>>;
    syncMetadata(nftId: number, syncMetadataRequest: SyncMetadataRequest, options?: any): Promise<import("axios").AxiosResponse<NftItemDTO>>;
}
export declare const KlayOperationControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    bindHenesisKeyToWallet1: (keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any) => Promise<RequestArgs>;
    createHenesisKey1: (createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any) => Promise<RequestArgs>;
    getCoinByAddress: (address: string, options?: any) => Promise<RequestArgs>;
};
export declare const KlayOperationControllerApiFp: (configuration?: Configuration) => {
    bindHenesisKeyToWallet1(keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BindHenesisKeyToWalletDTO>>;
    createHenesisKey1(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HenesisKeyDTO>>;
    getCoinByAddress(address: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinDTO>>;
};
export declare const KlayOperationControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    bindHenesisKeyToWallet1(keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any): AxiosPromise<BindHenesisKeyToWalletDTO>;
    createHenesisKey1(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): AxiosPromise<HenesisKeyDTO>;
    getCoinByAddress(address: string, options?: any): AxiosPromise<CoinDTO>;
};
export declare class KlayOperationControllerApi extends BaseAPI {
    bindHenesisKeyToWallet1(keyId: string, bindHenesisKeyToWalletRequest: BindHenesisKeyToWalletRequest, options?: any): Promise<import("axios").AxiosResponse<BindHenesisKeyToWalletDTO>>;
    createHenesisKey1(createHenesisKeyRequest: CreateHenesisKeyRequest, options?: any): Promise<import("axios").AxiosResponse<HenesisKeyDTO>>;
    getCoinByAddress(address: string, options?: any): Promise<import("axios").AxiosResponse<CoinDTO>>;
}
export declare const KlayTransactionControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getAllTransactions2: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getRawTransactionByHash1: (transactionHash: string, options?: any) => Promise<RequestArgs>;
    getTransactionById2: (transactionId: string, options?: any) => Promise<RequestArgs>;
};
export declare const KlayTransactionControllerApiFp: (configuration?: Configuration) => {
    getAllTransactions2(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransactionDTO>>;
    getRawTransactionByHash1(transactionHash: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DetailedRawTransactionDTO>>;
    getTransactionById2(transactionId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
};
export declare const KlayTransactionControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getAllTransactions2(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationTransactionDTO>;
    getRawTransactionByHash1(transactionHash: string, options?: any): AxiosPromise<DetailedRawTransactionDTO>;
    getTransactionById2(transactionId: string, options?: any): AxiosPromise<TransactionDTO>;
};
export declare class KlayTransactionControllerApi extends BaseAPI {
    getAllTransactions2(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationTransactionDTO>>;
    getRawTransactionByHash1(transactionHash: string, options?: any): Promise<import("axios").AxiosResponse<DetailedRawTransactionDTO>>;
    getTransactionById2(transactionId: string, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
}
export declare const KlayWalletControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    activateAllowedAddresses1: (walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any) => Promise<RequestArgs>;
    activateMasterWallet1: (walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any) => Promise<RequestArgs>;
    createAllowedAddress1: (walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
    createMasterWallet12: (createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any) => Promise<RequestArgs>;
    createUserWallet2: (walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any) => Promise<RequestArgs>;
    createWalletWithdrawalPolicy1: (walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any) => Promise<RequestArgs>;
    deleteAllowedAddress1: (walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
    flush1: (walletId: string, flushRequest: FlushRequest, options?: any) => Promise<RequestArgs>;
    getAllWalletWithdrawalPolicies1: (walletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getAllowedAddress1: (walletId: string, allowedAddressId: string, options?: any) => Promise<RequestArgs>;
    getAllowedAddressesByCoinId2: (walletId: string, coinId: number, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getMasterWallet2: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletAccountKey2: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletBalance2: (walletId: string, symbol?: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletInitialKey2: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletNonce1: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWallets4: (sort: Sort, options?: any) => Promise<RequestArgs>;
    getNftBalance: (walletId: string, pageable: Pageable, searchCondition: NftBalanceSearchCondition, options?: any) => Promise<RequestArgs>;
    getUserWallet2: (walletId: string, userWalletId: string, options?: any) => Promise<RequestArgs>;
    getUserWalletBalance2: (walletId: string, userWalletId: string, symbol?: string, options?: any) => Promise<RequestArgs>;
    getUserWalletNonce1: (walletId: string, userWalletId: string, options?: any) => Promise<RequestArgs>;
    getUserWallets4: (walletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    inactivateAllowedAddresses1: (walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any) => Promise<RequestArgs>;
    patchAccountKey2: (walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any) => Promise<RequestArgs>;
    patchMasterWalletName2: (walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any) => Promise<RequestArgs>;
    patchUserWalletName2: (walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any) => Promise<RequestArgs>;
    patchWalletWithdrawalPolicy1: (walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any) => Promise<RequestArgs>;
    recreateMasterWallet2: (walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any) => Promise<RequestArgs>;
    recreateUserWallet2: (walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any) => Promise<RequestArgs>;
    resendTransaction1: (resendTransactionRequest: ResendTransactionRequest, options?: any) => Promise<RequestArgs>;
    sendBatchTransaction2: (createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any) => Promise<RequestArgs>;
    sendNftTransaction: (walletId: string, createNftMultiSigTransactionRequest: CreateNftMultiSigTransactionRequest, options?: any) => Promise<RequestArgs>;
    sendTransaction2: (createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any) => Promise<RequestArgs>;
    validateIsAllowedAddress1: (walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any) => Promise<RequestArgs>;
};
export declare const KlayWalletControllerApiFp: (configuration?: Configuration) => {
    activateAllowedAddresses1(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    activateMasterWallet1(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    createAllowedAddress1(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedAddressDTO>>;
    createMasterWallet12(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InactiveMasterWalletDTO | MasterWalletDTO>>;
    createUserWallet2(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    createWalletWithdrawalPolicy1(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    deleteAllowedAddress1(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    flush1(walletId: string, flushRequest: FlushRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    getAllWalletWithdrawalPolicies1(walletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWalletWithdrawalPolicyDTO>>;
    getAllowedAddress1(walletId: string, allowedAddressId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedAddressDTO>>;
    getAllowedAddressesByCoinId2(walletId: string, coinId: number, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationAllowedAddressDTO>>;
    getMasterWallet2(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    getMasterWalletAccountKey2(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    getMasterWalletBalance2(walletId: string, symbol?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MasterWalletBalanceDTO>>>;
    getMasterWalletInitialKey2(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    getMasterWalletNonce1(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NonceDTO>>;
    getMasterWallets4(sort: Sort, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MasterWalletDTO>>>;
    getNftBalance(walletId: string, pageable: Pageable, searchCondition: NftBalanceSearchCondition, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationNftBalanceDTO>>;
    getUserWallet2(walletId: string, userWalletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    getUserWalletBalance2(walletId: string, userWalletId: string, symbol?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BalanceDTO>>>;
    getUserWalletNonce1(walletId: string, userWalletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NonceDTO>>;
    getUserWallets4(walletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationUserWalletDTO>>;
    inactivateAllowedAddresses1(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    patchAccountKey2(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    patchMasterWalletName2(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    patchUserWalletName2(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    patchWalletWithdrawalPolicy1(walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WalletWithdrawalPolicyDTO>>;
    recreateMasterWallet2(walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    recreateUserWallet2(walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    resendTransaction1(resendTransactionRequest: ResendTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    sendBatchTransaction2(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BatchTransactionDTO>>>;
    sendNftTransaction(walletId: string, createNftMultiSigTransactionRequest: CreateNftMultiSigTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    sendTransaction2(createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    validateIsAllowedAddress1(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ValidateIsAllowedAddressResponse>>;
};
export declare const KlayWalletControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    activateAllowedAddresses1(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): AxiosPromise<void>;
    activateMasterWallet1(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    createAllowedAddress1(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): AxiosPromise<AllowedAddressDTO>;
    createMasterWallet12(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): AxiosPromise<InactiveMasterWalletDTO | MasterWalletDTO>;
    createUserWallet2(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): AxiosPromise<UserWalletDTO>;
    createWalletWithdrawalPolicy1(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    deleteAllowedAddress1(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): AxiosPromise<void>;
    flush1(walletId: string, flushRequest: FlushRequest, options?: any): AxiosPromise<TransactionDTO>;
    getAllWalletWithdrawalPolicies1(walletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationWalletWithdrawalPolicyDTO>;
    getAllowedAddress1(walletId: string, allowedAddressId: string, options?: any): AxiosPromise<AllowedAddressDTO>;
    getAllowedAddressesByCoinId2(walletId: string, coinId: number, pageable: Pageable, options?: any): AxiosPromise<PaginationAllowedAddressDTO>;
    getMasterWallet2(walletId: string, options?: any): AxiosPromise<MasterWalletDTO>;
    getMasterWalletAccountKey2(walletId: string, options?: any): AxiosPromise<KeyDTO>;
    getMasterWalletBalance2(walletId: string, symbol?: string, options?: any): AxiosPromise<Array<MasterWalletBalanceDTO>>;
    getMasterWalletInitialKey2(walletId: string, options?: any): AxiosPromise<KeyDTO>;
    getMasterWalletNonce1(walletId: string, options?: any): AxiosPromise<NonceDTO>;
    getMasterWallets4(sort: Sort, options?: any): AxiosPromise<Array<MasterWalletDTO>>;
    getNftBalance(walletId: string, pageable: Pageable, searchCondition: NftBalanceSearchCondition, options?: any): AxiosPromise<PaginationNftBalanceDTO>;
    getUserWallet2(walletId: string, userWalletId: string, options?: any): AxiosPromise<UserWalletDTO>;
    getUserWalletBalance2(walletId: string, userWalletId: string, symbol?: string, options?: any): AxiosPromise<Array<BalanceDTO>>;
    getUserWalletNonce1(walletId: string, userWalletId: string, options?: any): AxiosPromise<NonceDTO>;
    getUserWallets4(walletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationUserWalletDTO>;
    inactivateAllowedAddresses1(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): AxiosPromise<void>;
    patchAccountKey2(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): AxiosPromise<KeyDTO>;
    patchMasterWalletName2(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    patchUserWalletName2(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): AxiosPromise<UserWalletDTO>;
    patchWalletWithdrawalPolicy1(walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): AxiosPromise<WalletWithdrawalPolicyDTO>;
    recreateMasterWallet2(walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    recreateUserWallet2(walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): AxiosPromise<UserWalletDTO>;
    resendTransaction1(resendTransactionRequest: ResendTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    sendBatchTransaction2(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): AxiosPromise<Array<BatchTransactionDTO>>;
    sendNftTransaction(walletId: string, createNftMultiSigTransactionRequest: CreateNftMultiSigTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    sendTransaction2(createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): AxiosPromise<TransactionDTO>;
    validateIsAllowedAddress1(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): AxiosPromise<ValidateIsAllowedAddressResponse>;
};
export declare class KlayWalletControllerApi extends BaseAPI {
    activateAllowedAddresses1(walletId: string, activateAllowedAddressesRequest: ActivateAllowedAddressesRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    activateMasterWallet1(walletId: string, activateMasterWalletRequest: ActivateMasterWalletRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    createAllowedAddress1(walletId: string, createAllowedAddressRequest: CreateAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<AllowedAddressDTO>>;
    createMasterWallet12(createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequest, options?: any): Promise<import("axios").AxiosResponse<InactiveMasterWalletDTO | MasterWalletDTO>>;
    createUserWallet2(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    createWalletWithdrawalPolicy1(walletId: string, createWithdrawalPolicyRequest: CreateWithdrawalPolicyRequest, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    deleteAllowedAddress1(walletId: string, allowedAddressId: string, deleteAllowedAddressRequest: DeleteAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    flush1(walletId: string, flushRequest: FlushRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    getAllWalletWithdrawalPolicies1(walletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationWalletWithdrawalPolicyDTO>>;
    getAllowedAddress1(walletId: string, allowedAddressId: string, options?: any): Promise<import("axios").AxiosResponse<AllowedAddressDTO>>;
    getAllowedAddressesByCoinId2(walletId: string, coinId: number, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationAllowedAddressDTO>>;
    getMasterWallet2(walletId: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    getMasterWalletAccountKey2(walletId: string, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    getMasterWalletBalance2(walletId: string, symbol?: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletBalanceDTO[]>>;
    getMasterWalletInitialKey2(walletId: string, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    getMasterWalletNonce1(walletId: string, options?: any): Promise<import("axios").AxiosResponse<NonceDTO>>;
    getMasterWallets4(sort: Sort, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO[]>>;
    getNftBalance(walletId: string, pageable: Pageable, searchCondition: NftBalanceSearchCondition, options?: any): Promise<import("axios").AxiosResponse<PaginationNftBalanceDTO>>;
    getUserWallet2(walletId: string, userWalletId: string, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    getUserWalletBalance2(walletId: string, userWalletId: string, symbol?: string, options?: any): Promise<import("axios").AxiosResponse<BalanceDTO[]>>;
    getUserWalletNonce1(walletId: string, userWalletId: string, options?: any): Promise<import("axios").AxiosResponse<NonceDTO>>;
    getUserWallets4(walletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationUserWalletDTO>>;
    inactivateAllowedAddresses1(walletId: string, inactivateAllowedAddressesRequest: InactivateAllowedAddressesRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    patchAccountKey2(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    patchMasterWalletName2(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    patchUserWalletName2(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    patchWalletWithdrawalPolicy1(walletId: string, policyId: string, patchWithdrawalPolicyRequest: PatchWithdrawalPolicyRequest, options?: any): Promise<import("axios").AxiosResponse<WalletWithdrawalPolicyDTO>>;
    recreateMasterWallet2(walletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    recreateUserWallet2(walletId: string, userWalletId: string, recreateWalletRequest: RecreateWalletRequest, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    resendTransaction1(resendTransactionRequest: ResendTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    sendBatchTransaction2(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<BatchTransactionDTO[]>>;
    sendNftTransaction(walletId: string, createNftMultiSigTransactionRequest: CreateNftMultiSigTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    sendTransaction2(createMultiSigTransactionRequest: CreateMultiSigTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    validateIsAllowedAddress1(walletId: string, validateIsAllowedAddressRequest: ValidateIsAllowedAddressRequest, options?: any): Promise<import("axios").AxiosResponse<ValidateIsAllowedAddressResponse>>;
}
export declare const KlayWithdrawalApprovalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    approveWithdrawalApproval1: (withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any) => Promise<RequestArgs>;
    rejectWithdrawalApproval1: (withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any) => Promise<RequestArgs>;
};
export declare const KlayWithdrawalApprovalControllerApiFp: (configuration?: Configuration) => {
    approveWithdrawalApproval1(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
    rejectWithdrawalApproval1(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const KlayWithdrawalApprovalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    approveWithdrawalApproval1(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): AxiosPromise<TransactionDTO>;
    rejectWithdrawalApproval1(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): AxiosPromise<void>;
};
export declare class KlayWithdrawalApprovalControllerApi extends BaseAPI {
    approveWithdrawalApproval1(withdrawalApprovalId: string, approveWithdrawalApprovalRequest: ApproveWithdrawalApprovalRequest, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
    rejectWithdrawalApproval1(withdrawalApprovalId: string, rejectWithdrawalApprovalRequest: RejectWithdrawalApprovalRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
}
export declare const MethodGasUsageControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getMethodGasUsages: (blockchain?: string, name?: string, options?: any) => Promise<RequestArgs>;
};
export declare const MethodGasUsageControllerApiFp: (configuration?: Configuration) => {
    getMethodGasUsages(blockchain?: string, name?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MethodGasUsageDTO>>;
};
export declare const MethodGasUsageControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getMethodGasUsages(blockchain?: string, name?: string, options?: any): AxiosPromise<MethodGasUsageDTO>;
};
export declare class MethodGasUsageControllerApi extends BaseAPI {
    getMethodGasUsages(blockchain?: string, name?: string, options?: any): Promise<import("axios").AxiosResponse<MethodGasUsageDTO>>;
}
export declare const TransactionControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getAllTransactions: (pageable: Pageable, specs: object, options?: any) => Promise<RequestArgs>;
    getTransactionById: (blockchain: string, transactionId: string, options?: any) => Promise<RequestArgs>;
};
export declare const TransactionControllerApiFp: (configuration?: Configuration) => {
    getAllTransactions(pageable: Pageable, specs: object, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationTransactionDTO>>;
    getTransactionById(blockchain: string, transactionId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
};
export declare const TransactionControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getAllTransactions(pageable: Pageable, specs: object, options?: any): AxiosPromise<PaginationTransactionDTO>;
    getTransactionById(blockchain: string, transactionId: string, options?: any): AxiosPromise<TransactionDTO>;
};
export declare class TransactionControllerApi extends BaseAPI {
    getAllTransactions(pageable: Pageable, specs: object, options?: any): Promise<import("axios").AxiosResponse<PaginationTransactionDTO>>;
    getTransactionById(blockchain: string, transactionId: string, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
}
export declare const WalletControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    createMasterWallet: (createMasterWalletRequestV1: CreateMasterWalletRequestV1, options?: any) => Promise<RequestArgs>;
    createUserWallet: (walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any) => Promise<RequestArgs>;
    getMasterWallet: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletAccountKey: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletBalance: (walletId: string, symbol?: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletInitialKey: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWalletNonce: (walletId: string, options?: any) => Promise<RequestArgs>;
    getMasterWallets: (sort: Sort, options?: any) => Promise<RequestArgs>;
    getUserWallet: (walletId: string, userWalletId: string, options?: any) => Promise<RequestArgs>;
    getUserWalletBalance: (walletId: string, userWalletId: string, symbol?: string, options?: any) => Promise<RequestArgs>;
    getUserWalletNonce: (walletId: string, userWalletId: string, options?: any) => Promise<RequestArgs>;
    getUserWallets: (walletId: string, pageable: Pageable, options?: any) => Promise<RequestArgs>;
    patchAccountKey: (walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any) => Promise<RequestArgs>;
    patchMasterWalletName: (walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any) => Promise<RequestArgs>;
    patchUserWalletName: (walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any) => Promise<RequestArgs>;
    recreateMasterWallet: (walletId: string, recreateWalletRequestV1: RecreateWalletRequestV1, options?: any) => Promise<RequestArgs>;
    recreateUserWallet: (walletId: string, userWalletId: string, recreateWalletRequestV1: RecreateWalletRequestV1, options?: any) => Promise<RequestArgs>;
    sendBatchTransaction: (createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any) => Promise<RequestArgs>;
    sendTransaction: (createMultiSigTransactionRequestV1: CreateMultiSigTransactionRequestV1, options?: any) => Promise<RequestArgs>;
};
export declare const WalletControllerApiFp: (configuration?: Configuration) => {
    createMasterWallet(createMasterWalletRequestV1: CreateMasterWalletRequestV1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    createUserWallet(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    getMasterWallet(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    getMasterWalletAccountKey(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    getMasterWalletBalance(walletId: string, symbol?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MasterWalletBalanceDTO>>>;
    getMasterWalletInitialKey(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    getMasterWalletNonce(walletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NonceDTO>>;
    getMasterWallets(sort: Sort, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MasterWalletDTO>>>;
    getUserWallet(walletId: string, userWalletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    getUserWalletBalance(walletId: string, userWalletId: string, symbol?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BalanceDTO>>>;
    getUserWalletNonce(walletId: string, userWalletId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NonceDTO>>;
    getUserWallets(walletId: string, pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationUserWalletDTO>>;
    patchAccountKey(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KeyDTO>>;
    patchMasterWalletName(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    patchUserWalletName(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    recreateMasterWallet(walletId: string, recreateWalletRequestV1: RecreateWalletRequestV1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MasterWalletDTO>>;
    recreateUserWallet(walletId: string, userWalletId: string, recreateWalletRequestV1: RecreateWalletRequestV1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserWalletDTO>>;
    sendBatchTransaction(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BatchTransactionDTO>>>;
    sendTransaction(createMultiSigTransactionRequestV1: CreateMultiSigTransactionRequestV1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionDTO>>;
};
export declare const WalletControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createMasterWallet(createMasterWalletRequestV1: CreateMasterWalletRequestV1, options?: any): AxiosPromise<MasterWalletDTO>;
    createUserWallet(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): AxiosPromise<UserWalletDTO>;
    getMasterWallet(walletId: string, options?: any): AxiosPromise<MasterWalletDTO>;
    getMasterWalletAccountKey(walletId: string, options?: any): AxiosPromise<KeyDTO>;
    getMasterWalletBalance(walletId: string, symbol?: string, options?: any): AxiosPromise<Array<MasterWalletBalanceDTO>>;
    getMasterWalletInitialKey(walletId: string, options?: any): AxiosPromise<KeyDTO>;
    getMasterWalletNonce(walletId: string, options?: any): AxiosPromise<NonceDTO>;
    getMasterWallets(sort: Sort, options?: any): AxiosPromise<Array<MasterWalletDTO>>;
    getUserWallet(walletId: string, userWalletId: string, options?: any): AxiosPromise<UserWalletDTO>;
    getUserWalletBalance(walletId: string, userWalletId: string, symbol?: string, options?: any): AxiosPromise<Array<BalanceDTO>>;
    getUserWalletNonce(walletId: string, userWalletId: string, options?: any): AxiosPromise<NonceDTO>;
    getUserWallets(walletId: string, pageable: Pageable, options?: any): AxiosPromise<PaginationUserWalletDTO>;
    patchAccountKey(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): AxiosPromise<KeyDTO>;
    patchMasterWalletName(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): AxiosPromise<MasterWalletDTO>;
    patchUserWalletName(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): AxiosPromise<UserWalletDTO>;
    recreateMasterWallet(walletId: string, recreateWalletRequestV1: RecreateWalletRequestV1, options?: any): AxiosPromise<MasterWalletDTO>;
    recreateUserWallet(walletId: string, userWalletId: string, recreateWalletRequestV1: RecreateWalletRequestV1, options?: any): AxiosPromise<UserWalletDTO>;
    sendBatchTransaction(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): AxiosPromise<Array<BatchTransactionDTO>>;
    sendTransaction(createMultiSigTransactionRequestV1: CreateMultiSigTransactionRequestV1, options?: any): AxiosPromise<TransactionDTO>;
};
export declare class WalletControllerApi extends BaseAPI {
    createMasterWallet(createMasterWalletRequestV1: CreateMasterWalletRequestV1, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    createUserWallet(walletId: string, createUserWalletRequest: CreateUserWalletRequest, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    getMasterWallet(walletId: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    getMasterWalletAccountKey(walletId: string, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    getMasterWalletBalance(walletId: string, symbol?: string, options?: any): Promise<import("axios").AxiosResponse<MasterWalletBalanceDTO[]>>;
    getMasterWalletInitialKey(walletId: string, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    getMasterWalletNonce(walletId: string, options?: any): Promise<import("axios").AxiosResponse<NonceDTO>>;
    getMasterWallets(sort: Sort, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO[]>>;
    getUserWallet(walletId: string, userWalletId: string, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    getUserWalletBalance(walletId: string, userWalletId: string, symbol?: string, options?: any): Promise<import("axios").AxiosResponse<BalanceDTO[]>>;
    getUserWalletNonce(walletId: string, userWalletId: string, options?: any): Promise<import("axios").AxiosResponse<NonceDTO>>;
    getUserWallets(walletId: string, pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationUserWalletDTO>>;
    patchAccountKey(walletId: string, updateAccountKeyRequest: UpdateAccountKeyRequest, options?: any): Promise<import("axios").AxiosResponse<KeyDTO>>;
    patchMasterWalletName(walletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    patchUserWalletName(walletId: string, userWalletId: string, changeWalletNameRequest: ChangeWalletNameRequest, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    recreateMasterWallet(walletId: string, recreateWalletRequestV1: RecreateWalletRequestV1, options?: any): Promise<import("axios").AxiosResponse<MasterWalletDTO>>;
    recreateUserWallet(walletId: string, userWalletId: string, recreateWalletRequestV1: RecreateWalletRequestV1, options?: any): Promise<import("axios").AxiosResponse<UserWalletDTO>>;
    sendBatchTransaction(createBatchTransactionRequest: CreateBatchTransactionRequest, options?: any): Promise<import("axios").AxiosResponse<BatchTransactionDTO[]>>;
    sendTransaction(createMultiSigTransactionRequestV1: CreateMultiSigTransactionRequestV1, options?: any): Promise<import("axios").AxiosResponse<TransactionDTO>>;
}
