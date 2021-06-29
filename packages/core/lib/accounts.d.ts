import { Client } from "./httpClient";
import { Token } from "./types";
import { AccountDTO, LoginResponse, Role, LoginIpDTO, SignUpRequest, SignUpResponse, HenesisLocaleLanguageEnum } from "./__generate__/accounts";
export interface AccountWithOTP extends Account {
    otp?: OTP;
}
export interface Account extends AccountDTO {
}
export interface AccountWithIps extends Account {
    loginIps: LoginIpDTO[];
}
export interface AccountLogin extends LoginResponse {
}
export interface OTP {
    key: string;
    url: string;
}
export import Role = Role;
export declare class Accounts {
    private readonly client;
    private readonly baseUrl;
    private readonly DEFAULT_TOKEN_EXPIRED_TIME;
    constructor(client: Client);
    me(): Promise<Account>;
    login(email: string, password: string, otpCode?: string): Promise<AccountLogin>;
    signup(params: SignUpRequest): Promise<SignUpResponse>;
    verifyEmail(email: string): Promise<void>;
    verify(params: {
        identifier: string;
        accountId: string;
    }): Promise<void>;
    changeName(firstName: string, lastName: string): Promise<void>;
    changePassword(password: string, newPassword: string, otpCode?: string): Promise<void>;
    createAccessToken(expiresIn?: number): Promise<Token>;
    refreshShortAccessToken(otpCode?: string): Promise<Token>;
    getAccessToken(): Promise<Token>;
    updateLanguage(language: HenesisLocaleLanguageEnum): Promise<void>;
}
