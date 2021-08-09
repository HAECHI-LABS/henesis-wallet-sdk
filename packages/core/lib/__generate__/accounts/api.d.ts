import { Configuration } from './configuration';
import { AxiosPromise, AxiosInstance } from 'axios';
import { RequestArgs, BaseAPI } from './base';
export interface AccessTokenDTO {
    accessToken: string;
}
export interface AccountDTO {
    id: string;
    email: string;
    roles: Array<Role>;
    firstName: string;
    lastName: string;
    organizationId: string;
    accessToken: string;
    locale: HenesisLocale;
    createdAt: string;
}
export interface ActivateAllowedIpsRequest {
    otpCode: string;
}
export interface AllowedIpDTO {
    id: string;
    location?: string;
    label: string;
    ipAddress: string;
    createdAt: string;
}
export interface ApproveCoinListingRequestRequest {
    description?: string;
    attributes?: Array<ApproveCoinListingRequestRequestAttributesEnum>;
    chargeKrw?: string;
    isExempted?: boolean;
    coinListingDate?: string;
}
export declare enum ApproveCoinListingRequestRequestAttributesEnum {
    STANDARD = "ERC20_STANDARD",
    NONSTANDARDRETURNTYPE = "ERC20_NON_STANDARD_RETURN_TYPE",
    REBASE = "ERC20_REBASE",
    PAUSABLE = "ERC20_PAUSABLE"
}
export declare enum Blockchain {
    ETHEREUM = "ETHEREUM",
    KLAYTN = "KLAYTN",
    BITCOIN = "BITCOIN",
    FILECOIN = "FILECOIN",
    BINANCESMARTCHAIN = "BINANCE_SMART_CHAIN"
}
export declare enum Cause {
    SECURITYISSUE = "SECURITY_ISSUE",
    SOURCECODEFORBIDDEN = "SOURCE_CODE_FORBIDDEN",
    OTHER = "OTHER"
}
export interface ChangeAccountNameRequest {
    firstName: string;
    lastName: string;
}
export interface Claim {
    email?: string;
    id?: string;
    type?: ClaimTypeEnum;
    longType?: boolean;
}
export declare enum ClaimTypeEnum {
    LONG = "LONG",
    SHORT = "SHORT"
}
export interface ClientIdentity {
    ip?: string;
    browser?: string;
    host?: string;
    method?: ClientIdentityMethodEnum;
    uri?: string;
    queryParams?: {
        [key: string]: Array<string>;
    };
}
export declare enum ClientIdentityMethodEnum {
    GET = "GET",
    HEAD = "HEAD",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
    TRACE = "TRACE"
}
export interface CoinContractDTO {
    name: string;
    symbol: string;
    decimals: number;
    blockchain: Blockchain;
    address: string;
}
export interface CoinListingRequestDTO {
    id: string;
    status: CoinRequestStatus;
    cause: Cause;
    message?: string;
    blockchain: Blockchain;
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    createdAt: string;
    updatedAt: string;
}
export declare enum CoinRequestStatus {
    INSPECTING = "INSPECTING",
    REJECTED = "REJECTED",
    CANCELED = "CANCELED",
    APPROVED = "APPROVED"
}
export interface CreateAllowedIpRequest {
    label: string;
    ipAddress: string;
    otpCode: string;
}
export interface CreateCoinListingRequestRequest {
    blockchain: Blockchain;
    address: string;
}
export interface CreateNoticeRequest {
    title: string;
}
export interface CreateOrganizationRequest {
    name: string;
}
export interface CreateSecretResponse {
    secret: string;
}
export interface CreateWithdrawalApprovalRequest {
    blockchain: string;
    amount: string;
    decimals: number;
    masterWalletId: string;
    userWalletId?: string;
    walletName: string;
    feeAmount?: string;
    coinSymbol: string;
    coinName: string;
    toAddress: string;
    transferAt: string;
}
export interface DeleteAllowedIpRequest {
    otpCode: string;
}
export interface ErrorBody {
    message?: string;
    code?: number;
}
export interface ErrorResponse {
    error?: ErrorBody;
}
export interface HenesisLocale {
    language?: HenesisLocaleLanguageEnum;
}
export declare enum HenesisLocaleLanguageEnum {
    KO = "KO",
    EN = "EN"
}
export interface IdentityDTO {
    email: string;
    roles: Array<Role>;
    accountId: string;
    firstName: string;
    lastName: string;
    organizationId: string;
    organizationSecret: string;
    locale: HenesisLocale;
    otpKey: string;
    accessToken: string;
}
export interface InactivateAllowedIpsRequest {
    otpCode: string;
}
export interface InlineObject {
    clientIdentity?: ClientIdentity;
    request?: LoginRequest;
}
export interface LoginIpDTO {
    id: string;
    browser?: string;
    status: LoginIpStatus;
    location?: string;
    ipAddress: string;
    createdAt: string;
    updatedAt: string;
}
export declare enum LoginIpStatus {
    REQUESTED = "REQUESTED",
    VERIFIED = "VERIFIED"
}
export interface LoginRequest {
    email: string;
    password: string;
    otpCode?: string;
}
export interface LoginResponse {
    id: string;
    email: string;
    roles: Array<Role>;
    firstName: string;
    lastName: string;
    organizationId: string;
    accessToken: string;
    otp: OTPDTO;
    locale: HenesisLocale;
    passwordInitialized: boolean;
}
export interface NoticeDTO {
    id: string;
    title: string;
    isSeen: boolean;
}
export interface NotificationPayloadDto {
    language?: NotificationPayloadDtoLanguageEnum;
    title?: string;
    content?: string;
}
export declare enum NotificationPayloadDtoLanguageEnum {
    KO = "KO",
    EN = "EN"
}
export interface NotifyRequest {
    targets?: Array<NotifyRequestTargetsEnum>;
    payloads?: Array<NotificationPayloadDto>;
}
export declare enum NotifyRequestTargetsEnum {
    COIN = "COIN",
    VIEWER = "VIEWER",
    ADMIN = "ADMIN",
    HAECHI = "HAECHI",
    SPENDER = "SPENDER"
}
export interface OTPDTO {
    key: string;
    url: string;
}
export interface OrgAccountDTO {
    id: string;
    email: string;
    roles: Array<Role>;
    firstName: string;
    lastName: string;
    loginIps: Array<LoginIpDTO>;
}
export interface OrganizationDTO {
    id: string;
    name: string;
    secret: string;
    whitelistActivated: boolean;
}
export interface OrganizationInfoDTO {
    id: string;
    name: string;
    createdAt: string;
    userCount: number;
}
export interface Pageable {
    page?: number;
    size?: number;
    sort?: Array<string>;
}
export interface PaginationAllowedIpDTO {
    pagination: PaginationMeta;
    results: Array<AllowedIpDTO>;
}
export interface PaginationMeta {
    nextUrl: string;
    previousUrl: string;
    totalCount: number;
}
export interface PaginationWithdrawalApprovalDTO {
    pagination: PaginationMeta;
    results: Array<WithdrawalApprovalDTO>;
}
export interface PatchAccountRoleRequest {
    role: string;
    otpCode?: string;
}
export interface PatchAllowedIpLabelRequest {
    label: string;
    otpCode: string;
}
export interface RefreshAccessTokenRequest {
    otpCode?: string;
}
export interface RejectCoinListingRequestRequest {
    cause: Cause;
    message?: string;
}
export declare enum Role {
    COIN = "COIN",
    VIEWER = "VIEWER",
    ADMIN = "ADMIN",
    HAECHI = "HAECHI",
    SPENDER = "SPENDER"
}
export interface SignUpRequest {
    email: string;
    password: string;
    roles: Array<string>;
    firstName: string;
    lastName: string;
    organizationId: string;
    language: string;
    otpCode?: string;
}
export interface SignUpResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    organizationId: string;
    language: string;
    accessToken: string;
}
export interface SimpleAccountDTO {
    name: string;
    email: string;
}
export interface UpdateLanguageRequest {
    newLanguage: string;
}
export interface UpdateNoticeIsSeenRequest {
    isSeen: boolean;
}
export interface UpdateNoticeRequest {
    title: string;
}
export interface UpdateOTPInitializeRequest {
    initialize: boolean;
}
export interface UpdateOrganizationRequest {
    newOrgId: string;
}
export interface UpdatePasswordRequest {
    password: string;
    newPassword: string;
    otpCode?: string;
}
export interface VerifyEmailRequest {
    email: string;
}
export interface WithdrawalApprovalDTO {
    id: string;
    requester: SimpleAccountDTO;
    blockchain: Blockchain;
    amount: string;
    decimals: number;
    status: WithdrawalApprovalStatus;
    masterWalletId: string;
    userWalletId?: string;
    coinSymbol: string;
    toAddress: string;
    approvedBy: Array<SimpleAccountDTO>;
    transferAt: string;
    createdAt: string;
    updatedAt: string;
}
export declare enum WithdrawalApprovalStatus {
    PENDING = "PENDING",
    REJECTED = "REJECTED",
    APPROVED = "APPROVED"
}
export declare const AccountControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    changeAccountName: (changeAccountNameRequest: ChangeAccountNameRequest, options?: any) => Promise<RequestArgs>;
    createAccessToken1: (refreshAccessTokenRequest: RefreshAccessTokenRequest, options?: any) => Promise<RequestArgs>;
    deleteAccessToken: (options?: any) => Promise<RequestArgs>;
    getAccessToken: (options?: any) => Promise<RequestArgs>;
    getAccount: (options?: any) => Promise<RequestArgs>;
    login: (inlineObject: InlineObject, options?: any) => Promise<RequestArgs>;
    signup: (signUpRequest: SignUpRequest, options?: any) => Promise<RequestArgs>;
    updateLanguage: (updateLanguageRequest: UpdateLanguageRequest, options?: any) => Promise<RequestArgs>;
    updateOTPInitialize: (updateOTPInitializeRequest: UpdateOTPInitializeRequest, options?: any) => Promise<RequestArgs>;
    updateOrganization: (updateOrganizationRequest: UpdateOrganizationRequest, options?: any) => Promise<RequestArgs>;
    updatePassword: (updatePasswordRequest: UpdatePasswordRequest, options?: any) => Promise<RequestArgs>;
    verifyEmail: (verifyEmailRequest: VerifyEmailRequest, options?: any) => Promise<RequestArgs>;
    verifyIP: (clientIdentity: ClientIdentity, identifier: string, options?: any) => Promise<RequestArgs>;
};
export declare const AccountControllerApiFp: (configuration?: Configuration) => {
    changeAccountName(changeAccountNameRequest: ChangeAccountNameRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccountDTO>>;
    createAccessToken1(refreshAccessTokenRequest: RefreshAccessTokenRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccessTokenDTO>>;
    deleteAccessToken(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getAccessToken(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccessTokenDTO>>;
    getAccount(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccountDTO>>;
    login(inlineObject: InlineObject, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoginResponse>>;
    signup(signUpRequest: SignUpRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SignUpResponse>>;
    updateLanguage(updateLanguageRequest: UpdateLanguageRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    updateOTPInitialize(updateOTPInitializeRequest: UpdateOTPInitializeRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    updateOrganization(updateOrganizationRequest: UpdateOrganizationRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    updatePassword(updatePasswordRequest: UpdatePasswordRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    verifyEmail(verifyEmailRequest: VerifyEmailRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    verifyIP(clientIdentity: ClientIdentity, identifier: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const AccountControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    changeAccountName(changeAccountNameRequest: ChangeAccountNameRequest, options?: any): AxiosPromise<AccountDTO>;
    createAccessToken1(refreshAccessTokenRequest: RefreshAccessTokenRequest, options?: any): AxiosPromise<AccessTokenDTO>;
    deleteAccessToken(options?: any): AxiosPromise<void>;
    getAccessToken(options?: any): AxiosPromise<AccessTokenDTO>;
    getAccount(options?: any): AxiosPromise<AccountDTO>;
    login(inlineObject: InlineObject, options?: any): AxiosPromise<LoginResponse>;
    signup(signUpRequest: SignUpRequest, options?: any): AxiosPromise<SignUpResponse>;
    updateLanguage(updateLanguageRequest: UpdateLanguageRequest, options?: any): AxiosPromise<void>;
    updateOTPInitialize(updateOTPInitializeRequest: UpdateOTPInitializeRequest, options?: any): AxiosPromise<void>;
    updateOrganization(updateOrganizationRequest: UpdateOrganizationRequest, options?: any): AxiosPromise<void>;
    updatePassword(updatePasswordRequest: UpdatePasswordRequest, options?: any): AxiosPromise<void>;
    verifyEmail(verifyEmailRequest: VerifyEmailRequest, options?: any): AxiosPromise<void>;
    verifyIP(clientIdentity: ClientIdentity, identifier: string, options?: any): AxiosPromise<void>;
};
export declare class AccountControllerApi extends BaseAPI {
    changeAccountName(changeAccountNameRequest: ChangeAccountNameRequest, options?: any): Promise<import("axios").AxiosResponse<AccountDTO>>;
    createAccessToken1(refreshAccessTokenRequest: RefreshAccessTokenRequest, options?: any): Promise<import("axios").AxiosResponse<AccessTokenDTO>>;
    deleteAccessToken(options?: any): Promise<import("axios").AxiosResponse<void>>;
    getAccessToken(options?: any): Promise<import("axios").AxiosResponse<AccessTokenDTO>>;
    getAccount(options?: any): Promise<import("axios").AxiosResponse<AccountDTO>>;
    login(inlineObject: InlineObject, options?: any): Promise<import("axios").AxiosResponse<LoginResponse>>;
    signup(signUpRequest: SignUpRequest, options?: any): Promise<import("axios").AxiosResponse<SignUpResponse>>;
    updateLanguage(updateLanguageRequest: UpdateLanguageRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    updateOTPInitialize(updateOTPInitializeRequest: UpdateOTPInitializeRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    updateOrganization(updateOrganizationRequest: UpdateOrganizationRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    updatePassword(updatePasswordRequest: UpdatePasswordRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    verifyEmail(verifyEmailRequest: VerifyEmailRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    verifyIP(clientIdentity: ClientIdentity, identifier: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
}
export declare const IdentityControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    getVerifiedIdentity: (claim: Claim, clientIdentity: ClientIdentity, accountId: string, options?: any) => Promise<RequestArgs>;
};
export declare const IdentityControllerApiFp: (configuration?: Configuration) => {
    getVerifiedIdentity(claim: Claim, clientIdentity: ClientIdentity, accountId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<IdentityDTO>>;
};
export declare const IdentityControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getVerifiedIdentity(claim: Claim, clientIdentity: ClientIdentity, accountId: string, options?: any): AxiosPromise<IdentityDTO>;
};
export declare class IdentityControllerApi extends BaseAPI {
    getVerifiedIdentity(claim: Claim, clientIdentity: ClientIdentity, accountId: string, options?: any): Promise<import("axios").AxiosResponse<IdentityDTO>>;
}
export declare const NoticeControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    createNotice: (createNoticeRequest: CreateNoticeRequest, options?: any) => Promise<RequestArgs>;
    deleteNotice: (noticeId: string, options?: any) => Promise<RequestArgs>;
    getNotices: (options?: any) => Promise<RequestArgs>;
    updateNotice: (noticeId: string, updateNoticeRequest: UpdateNoticeRequest, options?: any) => Promise<RequestArgs>;
    updateNoticeIsSeen: (noticeId: string, updateNoticeIsSeenRequest: UpdateNoticeIsSeenRequest, options?: any) => Promise<RequestArgs>;
};
export declare const NoticeControllerApiFp: (configuration?: Configuration) => {
    createNotice(createNoticeRequest: CreateNoticeRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    deleteNotice(noticeId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getNotices(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<NoticeDTO>>>;
    updateNotice(noticeId: string, updateNoticeRequest: UpdateNoticeRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    updateNoticeIsSeen(noticeId: string, updateNoticeIsSeenRequest: UpdateNoticeIsSeenRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const NoticeControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createNotice(createNoticeRequest: CreateNoticeRequest, options?: any): AxiosPromise<void>;
    deleteNotice(noticeId: string, options?: any): AxiosPromise<void>;
    getNotices(options?: any): AxiosPromise<Array<NoticeDTO>>;
    updateNotice(noticeId: string, updateNoticeRequest: UpdateNoticeRequest, options?: any): AxiosPromise<void>;
    updateNoticeIsSeen(noticeId: string, updateNoticeIsSeenRequest: UpdateNoticeIsSeenRequest, options?: any): AxiosPromise<void>;
};
export declare class NoticeControllerApi extends BaseAPI {
    createNotice(createNoticeRequest: CreateNoticeRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    deleteNotice(noticeId: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
    getNotices(options?: any): Promise<import("axios").AxiosResponse<NoticeDTO[]>>;
    updateNotice(noticeId: string, updateNoticeRequest: UpdateNoticeRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    updateNoticeIsSeen(noticeId: string, updateNoticeIsSeenRequest: UpdateNoticeIsSeenRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
}
export declare const OperationControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    approveCoinListingRequest: (requestId: string, approveCoinListingRequestRequest: ApproveCoinListingRequestRequest, options?: any) => Promise<RequestArgs>;
    getAccount1: (accountId: string, options?: any) => Promise<RequestArgs>;
    getAccountByEmail: (email: string, options?: any) => Promise<RequestArgs>;
    getAllAccountsByOrganizationId: (organizationId: string, options?: any) => Promise<RequestArgs>;
    getCoinListingRequest: (requestId: string, options?: any) => Promise<RequestArgs>;
    getOrganizationInfo: (organizationId: string, options?: any) => Promise<RequestArgs>;
    getOrganizationsInfo: (options?: any) => Promise<RequestArgs>;
    rejectCoinListingRequest: (requestId: string, rejectCoinListingRequestRequest: RejectCoinListingRequestRequest, options?: any) => Promise<RequestArgs>;
};
export declare const OperationControllerApiFp: (configuration?: Configuration) => {
    approveCoinListingRequest(requestId: string, approveCoinListingRequestRequest: ApproveCoinListingRequestRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getAccount1(accountId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccountDTO>>;
    getAccountByEmail(email: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccountDTO>>;
    getAllAccountsByOrganizationId(organizationId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AccountDTO>>>;
    getCoinListingRequest(requestId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinListingRequestDTO>>;
    getOrganizationInfo(organizationId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<OrganizationInfoDTO>>;
    getOrganizationsInfo(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<OrganizationInfoDTO>>>;
    rejectCoinListingRequest(requestId: string, rejectCoinListingRequestRequest: RejectCoinListingRequestRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const OperationControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    approveCoinListingRequest(requestId: string, approveCoinListingRequestRequest: ApproveCoinListingRequestRequest, options?: any): AxiosPromise<void>;
    getAccount1(accountId: string, options?: any): AxiosPromise<AccountDTO>;
    getAccountByEmail(email: string, options?: any): AxiosPromise<AccountDTO>;
    getAllAccountsByOrganizationId(organizationId: string, options?: any): AxiosPromise<Array<AccountDTO>>;
    getCoinListingRequest(requestId: string, options?: any): AxiosPromise<CoinListingRequestDTO>;
    getOrganizationInfo(organizationId: string, options?: any): AxiosPromise<OrganizationInfoDTO>;
    getOrganizationsInfo(options?: any): AxiosPromise<Array<OrganizationInfoDTO>>;
    rejectCoinListingRequest(requestId: string, rejectCoinListingRequestRequest: RejectCoinListingRequestRequest, options?: any): AxiosPromise<void>;
};
export declare class OperationControllerApi extends BaseAPI {
    approveCoinListingRequest(requestId: string, approveCoinListingRequestRequest: ApproveCoinListingRequestRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    getAccount1(accountId: string, options?: any): Promise<import("axios").AxiosResponse<AccountDTO>>;
    getAccountByEmail(email: string, options?: any): Promise<import("axios").AxiosResponse<AccountDTO>>;
    getAllAccountsByOrganizationId(organizationId: string, options?: any): Promise<import("axios").AxiosResponse<AccountDTO[]>>;
    getCoinListingRequest(requestId: string, options?: any): Promise<import("axios").AxiosResponse<CoinListingRequestDTO>>;
    getOrganizationInfo(organizationId: string, options?: any): Promise<import("axios").AxiosResponse<OrganizationInfoDTO>>;
    getOrganizationsInfo(options?: any): Promise<import("axios").AxiosResponse<OrganizationInfoDTO[]>>;
    rejectCoinListingRequest(requestId: string, rejectCoinListingRequestRequest: RejectCoinListingRequestRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
}
export declare const OrganizationControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    activateAllowedIps: (activateAllowedIpsRequest: ActivateAllowedIpsRequest, options?: any) => Promise<RequestArgs>;
    cancelCoinListingRequest: (requestId: string, options?: any) => Promise<RequestArgs>;
    createAllowedIp: (createAllowedIpRequest: CreateAllowedIpRequest, options?: any) => Promise<RequestArgs>;
    createCoinListingRequest: (createCoinListingRequestRequest: CreateCoinListingRequestRequest, options?: any) => Promise<RequestArgs>;
    createOrganization: (createOrganizationRequest: CreateOrganizationRequest, options?: any) => Promise<RequestArgs>;
    createSecret: (options?: any) => Promise<RequestArgs>;
    deleteAllowedIp: (allowedIpId: string, deleteAllowedIpRequest: DeleteAllowedIpRequest, options?: any) => Promise<RequestArgs>;
    getAccountByOrganizationId: (options?: any) => Promise<RequestArgs>;
    getAllOrganizations: (options?: any) => Promise<RequestArgs>;
    getAllowedIp: (allowedIpId: string, options?: any) => Promise<RequestArgs>;
    getAllowedIps: (pageable: Pageable, options?: any) => Promise<RequestArgs>;
    getCoinContract: (blockchain: 'ETHEREUM' | 'KLAYTN' | 'BITCOIN' | 'FILECOIN' | 'BINANCE_SMART_CHAIN', address: string, options?: any) => Promise<RequestArgs>;
    getCoinListingRequests: (options?: any) => Promise<RequestArgs>;
    getOrganization: (options?: any) => Promise<RequestArgs>;
    inactivateAllowedIps: (inactivateAllowedIpsRequest: InactivateAllowedIpsRequest, options?: any) => Promise<RequestArgs>;
    notify: (notifyRequest: NotifyRequest, options?: any) => Promise<RequestArgs>;
    patchAccountRole: (accountId: string, patchAccountRoleRequest: PatchAccountRoleRequest, options?: any) => Promise<RequestArgs>;
    patchAllowedIpLabel: (allowedIpId: string, patchAllowedIpLabelRequest: PatchAllowedIpLabelRequest, options?: any) => Promise<RequestArgs>;
};
export declare const OrganizationControllerApiFp: (configuration?: Configuration) => {
    activateAllowedIps(activateAllowedIpsRequest: ActivateAllowedIpsRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    cancelCoinListingRequest(requestId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    createAllowedIp(createAllowedIpRequest: CreateAllowedIpRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedIpDTO>>;
    createCoinListingRequest(createCoinListingRequestRequest: CreateCoinListingRequestRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinListingRequestDTO>>;
    createOrganization(createOrganizationRequest: CreateOrganizationRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<OrganizationDTO>>;
    createSecret(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateSecretResponse>>;
    deleteAllowedIp(allowedIpId: string, deleteAllowedIpRequest: DeleteAllowedIpRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getAccountByOrganizationId(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<OrgAccountDTO>>>;
    getAllOrganizations(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<OrganizationDTO>>>;
    getAllowedIp(allowedIpId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedIpDTO>>;
    getAllowedIps(pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationAllowedIpDTO>>;
    getCoinContract(blockchain: 'ETHEREUM' | 'KLAYTN' | 'BITCOIN' | 'FILECOIN' | 'BINANCE_SMART_CHAIN', address: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CoinContractDTO>>;
    getCoinListingRequests(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CoinListingRequestDTO>>>;
    getOrganization(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<OrganizationDTO>>;
    inactivateAllowedIps(inactivateAllowedIpsRequest: InactivateAllowedIpsRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    notify(notifyRequest: NotifyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    patchAccountRole(accountId: string, patchAccountRoleRequest: PatchAccountRoleRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccountDTO>>;
    patchAllowedIpLabel(allowedIpId: string, patchAllowedIpLabelRequest: PatchAllowedIpLabelRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AllowedIpDTO>>;
};
export declare const OrganizationControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    activateAllowedIps(activateAllowedIpsRequest: ActivateAllowedIpsRequest, options?: any): AxiosPromise<void>;
    cancelCoinListingRequest(requestId: string, options?: any): AxiosPromise<void>;
    createAllowedIp(createAllowedIpRequest: CreateAllowedIpRequest, options?: any): AxiosPromise<AllowedIpDTO>;
    createCoinListingRequest(createCoinListingRequestRequest: CreateCoinListingRequestRequest, options?: any): AxiosPromise<CoinListingRequestDTO>;
    createOrganization(createOrganizationRequest: CreateOrganizationRequest, options?: any): AxiosPromise<OrganizationDTO>;
    createSecret(options?: any): AxiosPromise<CreateSecretResponse>;
    deleteAllowedIp(allowedIpId: string, deleteAllowedIpRequest: DeleteAllowedIpRequest, options?: any): AxiosPromise<void>;
    getAccountByOrganizationId(options?: any): AxiosPromise<Array<OrgAccountDTO>>;
    getAllOrganizations(options?: any): AxiosPromise<Array<OrganizationDTO>>;
    getAllowedIp(allowedIpId: string, options?: any): AxiosPromise<AllowedIpDTO>;
    getAllowedIps(pageable: Pageable, options?: any): AxiosPromise<PaginationAllowedIpDTO>;
    getCoinContract(blockchain: 'ETHEREUM' | 'KLAYTN' | 'BITCOIN' | 'FILECOIN' | 'BINANCE_SMART_CHAIN', address: string, options?: any): AxiosPromise<CoinContractDTO>;
    getCoinListingRequests(options?: any): AxiosPromise<Array<CoinListingRequestDTO>>;
    getOrganization(options?: any): AxiosPromise<OrganizationDTO>;
    inactivateAllowedIps(inactivateAllowedIpsRequest: InactivateAllowedIpsRequest, options?: any): AxiosPromise<void>;
    notify(notifyRequest: NotifyRequest, options?: any): AxiosPromise<void>;
    patchAccountRole(accountId: string, patchAccountRoleRequest: PatchAccountRoleRequest, options?: any): AxiosPromise<AccountDTO>;
    patchAllowedIpLabel(allowedIpId: string, patchAllowedIpLabelRequest: PatchAllowedIpLabelRequest, options?: any): AxiosPromise<AllowedIpDTO>;
};
export declare class OrganizationControllerApi extends BaseAPI {
    activateAllowedIps(activateAllowedIpsRequest: ActivateAllowedIpsRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    cancelCoinListingRequest(requestId: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
    createAllowedIp(createAllowedIpRequest: CreateAllowedIpRequest, options?: any): Promise<import("axios").AxiosResponse<AllowedIpDTO>>;
    createCoinListingRequest(createCoinListingRequestRequest: CreateCoinListingRequestRequest, options?: any): Promise<import("axios").AxiosResponse<CoinListingRequestDTO>>;
    createOrganization(createOrganizationRequest: CreateOrganizationRequest, options?: any): Promise<import("axios").AxiosResponse<OrganizationDTO>>;
    createSecret(options?: any): Promise<import("axios").AxiosResponse<CreateSecretResponse>>;
    deleteAllowedIp(allowedIpId: string, deleteAllowedIpRequest: DeleteAllowedIpRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    getAccountByOrganizationId(options?: any): Promise<import("axios").AxiosResponse<OrgAccountDTO[]>>;
    getAllOrganizations(options?: any): Promise<import("axios").AxiosResponse<OrganizationDTO[]>>;
    getAllowedIp(allowedIpId: string, options?: any): Promise<import("axios").AxiosResponse<AllowedIpDTO>>;
    getAllowedIps(pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationAllowedIpDTO>>;
    getCoinContract(blockchain: 'ETHEREUM' | 'KLAYTN' | 'BITCOIN' | 'FILECOIN' | 'BINANCE_SMART_CHAIN', address: string, options?: any): Promise<import("axios").AxiosResponse<CoinContractDTO>>;
    getCoinListingRequests(options?: any): Promise<import("axios").AxiosResponse<CoinListingRequestDTO[]>>;
    getOrganization(options?: any): Promise<import("axios").AxiosResponse<OrganizationDTO>>;
    inactivateAllowedIps(inactivateAllowedIpsRequest: InactivateAllowedIpsRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    notify(notifyRequest: NotifyRequest, options?: any): Promise<import("axios").AxiosResponse<void>>;
    patchAccountRole(accountId: string, patchAccountRoleRequest: PatchAccountRoleRequest, options?: any): Promise<import("axios").AxiosResponse<AccountDTO>>;
    patchAllowedIpLabel(allowedIpId: string, patchAllowedIpLabelRequest: PatchAllowedIpLabelRequest, options?: any): Promise<import("axios").AxiosResponse<AllowedIpDTO>>;
}
export declare const WithdrawalApprovalControllerApiAxiosParamCreator: (configuration?: Configuration) => {
    approve: (withdrawalApprovalId: string, options?: any) => Promise<RequestArgs>;
    cancelApproval: (withdrawalApprovalId: string, options?: any) => Promise<RequestArgs>;
    cancelRejection: (withdrawalApprovalId: string, options?: any) => Promise<RequestArgs>;
    createWithdrawalApproval: (createWithdrawalApprovalRequest: CreateWithdrawalApprovalRequest, options?: any) => Promise<RequestArgs>;
    getWithdrawalApproval: (withdrawalApprovalId: string, options?: any) => Promise<RequestArgs>;
    getWithdrawalApprovals: (pageable: Pageable, options?: any) => Promise<RequestArgs>;
    reject: (withdrawalApprovalId: string, options?: any) => Promise<RequestArgs>;
};
export declare const WithdrawalApprovalControllerApiFp: (configuration?: Configuration) => {
    approve(withdrawalApprovalId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WithdrawalApprovalDTO>>;
    cancelApproval(withdrawalApprovalId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WithdrawalApprovalDTO>>;
    cancelRejection(withdrawalApprovalId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WithdrawalApprovalDTO>>;
    createWithdrawalApproval(createWithdrawalApprovalRequest: CreateWithdrawalApprovalRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WithdrawalApprovalDTO>>;
    getWithdrawalApproval(withdrawalApprovalId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WithdrawalApprovalDTO>>;
    getWithdrawalApprovals(pageable: Pageable, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationWithdrawalApprovalDTO>>;
    reject(withdrawalApprovalId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WithdrawalApprovalDTO>>;
};
export declare const WithdrawalApprovalControllerApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    approve(withdrawalApprovalId: string, options?: any): AxiosPromise<WithdrawalApprovalDTO>;
    cancelApproval(withdrawalApprovalId: string, options?: any): AxiosPromise<WithdrawalApprovalDTO>;
    cancelRejection(withdrawalApprovalId: string, options?: any): AxiosPromise<WithdrawalApprovalDTO>;
    createWithdrawalApproval(createWithdrawalApprovalRequest: CreateWithdrawalApprovalRequest, options?: any): AxiosPromise<WithdrawalApprovalDTO>;
    getWithdrawalApproval(withdrawalApprovalId: string, options?: any): AxiosPromise<WithdrawalApprovalDTO>;
    getWithdrawalApprovals(pageable: Pageable, options?: any): AxiosPromise<PaginationWithdrawalApprovalDTO>;
    reject(withdrawalApprovalId: string, options?: any): AxiosPromise<WithdrawalApprovalDTO>;
};
export declare class WithdrawalApprovalControllerApi extends BaseAPI {
    approve(withdrawalApprovalId: string, options?: any): Promise<import("axios").AxiosResponse<WithdrawalApprovalDTO>>;
    cancelApproval(withdrawalApprovalId: string, options?: any): Promise<import("axios").AxiosResponse<WithdrawalApprovalDTO>>;
    cancelRejection(withdrawalApprovalId: string, options?: any): Promise<import("axios").AxiosResponse<WithdrawalApprovalDTO>>;
    createWithdrawalApproval(createWithdrawalApprovalRequest: CreateWithdrawalApprovalRequest, options?: any): Promise<import("axios").AxiosResponse<WithdrawalApprovalDTO>>;
    getWithdrawalApproval(withdrawalApprovalId: string, options?: any): Promise<import("axios").AxiosResponse<WithdrawalApprovalDTO>>;
    getWithdrawalApprovals(pageable: Pageable, options?: any): Promise<import("axios").AxiosResponse<PaginationWithdrawalApprovalDTO>>;
    reject(withdrawalApprovalId: string, options?: any): Promise<import("axios").AxiosResponse<WithdrawalApprovalDTO>>;
}
