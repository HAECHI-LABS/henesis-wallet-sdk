import _ from "lodash";
import { Client } from "./httpClient";
import { Key, Token } from "./types";
import {
  AccountDTO,
  LoginResponse,
  ChangeAccountNameRequest,
  UpdatePasswordRequest,
  AccessTokenDTO,
} from "./__generate__/accounts";
import { makeQueryString } from "./utils/url";

export interface AccountWithOTP extends Account {
  otp?: OTP;
}

export interface Account {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken?: string;
  roles: Role[];
}

export interface OTP {
  key: string;
  url: string;
}

export const Role: Record<
  keyof typeof AccountDTO.RolesEnum,
  AccountDTO.RolesEnum
> = { ...AccountDTO.RolesEnum };
export type Role = AccountDTO.RolesEnum;

export class Accounts {
  private readonly client: Client;

  private readonly baseUrl = "/accounts";

  private readonly DEFAULT_TOKEN_EXPIRED_TIME = 3600;

  constructor(client: Client) {
    this.client = client;
  }

  public async me(): Promise<Account> {
    const response = await this.client.get<AccountDTO>(`${this.baseUrl}/me`);
    return response;
  }

  public async login(
    email: string,
    password: string,
    otpCode?: string
  ): Promise<AccountWithOTP> {
    const response = await this.client.post<LoginResponse>(
      `${this.baseUrl}/login`,
      {
        email,
        password,
        otpCode,
      }
    );
    return response;
  }

  public async verify(params: {
    identifier: string;
    accountId: string;
  }): Promise<void> {
    const queryString: string = makeQueryString({
      identifier: params.identifier,
      account_id: params.accountId,
    });
    await this.client.get(
      `${this.baseUrl}/login/verify${queryString ? `?${queryString}` : ""}`
    );
  }

  public async changeName(firstName: string, lastName: string): Promise<void> {
    const params: ChangeAccountNameRequest = {
      firstName,
      lastName,
    };
    await this.client.patch<AccountDTO>(`${this.baseUrl}/name`, params);
  }

  public async changePassword(
    password: string,
    newPassword: string,
    otpCode?: string
  ): Promise<void> {
    const params: UpdatePasswordRequest = {
      newPassword,
      password,
      otpCode,
    };
    await this.client.patch(`${this.baseUrl}/password`, params);
  }

  public async createAccessToken(expiresIn?: number): Promise<Token> {
    const requestExpiresIn = expiresIn || this.DEFAULT_TOKEN_EXPIRED_TIME;
    const response = await this.client.post<AccessTokenDTO>(
      `${this.baseUrl}/token`,
      {
        expiresIn: requestExpiresIn,
      }
    );
    return response;
  }

  public async refreshShortAccessToken(otpCode?: string): Promise<Token> {
    const response = await this.client.post<AccessTokenDTO>(
      `${this.baseUrl}/token?type=short`,
      {
        otpCode,
      }
    );
    return response;
  }

  public async getAccessToken(): Promise<Token> {
    const response = await this.client.get<AccessTokenDTO>(
      `${this.baseUrl}/token`
    );
    return response;
  }
}
