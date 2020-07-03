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

export interface AccountWithOTP extends Account {
  otp?: OTP;
}

export interface Account {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken?: string;
  organizationId: string;
  roles: Role[];
}

export interface OTP {
  key: string;
  url: string;
}

export enum Role {
  VIEWER = "VIEWER",
  ADMIN = "ADMIN",
  HAECHI = "HAECHI",
  COIN = "COIN",
}

export const transformRole = (role: AccountDTO.RolesEnum) => {
  const byRole: Record<AccountDTO.RolesEnum, Role> = {
    [AccountDTO.RolesEnum.VIEWER]: Role.VIEWER,
    [AccountDTO.RolesEnum.ADMIN]: Role.ADMIN,
    [AccountDTO.RolesEnum.HAECHI]: Role.HAECHI,
    [AccountDTO.RolesEnum.COIN]: Role.COIN,
  };
  return byRole[role];
};

export class Accounts {
  private readonly client: Client;

  private readonly baseUrl = "/accounts";

  private readonly DEFAULT_TOKEN_EXPIRED_TIME = 3600;

  constructor(client: Client) {
    this.client = client;
  }

  public async me(): Promise<Account> {
    const response = await this.client.get<NoUndefinedField<AccountDTO>>(
      `${this.baseUrl}/me`
    );
    return {
      ...response,
      roles: _.map(response.roles, (role) => transformRole(role)),
    };
  }

  public async login(
    email: string,
    password: string,
    otpCode?: string
  ): Promise<AccountWithOTP> {
    const response = await this.client.post<NoUndefinedField<LoginResponse>>(
      `${this.baseUrl}/login`,
      {
        email,
        password,
        otpCode,
      }
    );
    return {
      ...response,
      roles: _.map(response.roles, (role) => transformRole(role)),
    };
  }

  public async changeName(firstName: string, lastName: string): Promise<void> {
    const params: NoUndefinedField<ChangeAccountNameRequest> = {
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
    const params: NoUndefinedField<UpdatePasswordRequest> = {
      newPassword,
      password,
      otpCode,
    };
    await this.client.patch(`${this.baseUrl}/password`, params);
  }

  public async createAccessToken(expiresIn?: number): Promise<Token> {
    const requestExpiresIn = expiresIn || this.DEFAULT_TOKEN_EXPIRED_TIME;
    const response = await this.client.post<NoUndefinedField<AccessTokenDTO>>(
      `${this.baseUrl}/token`,
      {
        expiresIn: requestExpiresIn,
      }
    );
    return response;
  }

  public async refreshShortAccessToken(otpCode?: string): Promise<Token> {
    const response = await this.client.post<NoUndefinedField<AccessTokenDTO>>(
      `${this.baseUrl}/token?type=short`,
      {
        otpCode,
      }
    );
    return response;
  }

  public async getAccessToken(): Promise<Token> {
    const response = await this.client.get<NoUndefinedField<AccessTokenDTO>>(
      `${this.baseUrl}/token`
    );
    return response;
  }
}
