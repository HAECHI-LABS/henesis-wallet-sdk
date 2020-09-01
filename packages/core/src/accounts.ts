import { Client } from "./httpClient";
import { Key, Token } from "./types";
import {
  AccountDTO,
  AccountDTORolesEnum,
  LoginResponse,
  ChangeAccountNameRequest,
  UpdatePasswordRequest,
  AccessTokenDTO,
  LoginResponseRolesEnum,
  OrgAccountDTORolesEnum,
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

export enum Role {
  COIN = "COIN",
  VIEWER = "VIEWER",
  ADMIN = "ADMIN",
  HAECHI = "HAECHI",
  SPENDER = "SPENDER",
}

export const transformRole = (
  role: AccountDTORolesEnum | LoginResponseRolesEnum | OrgAccountDTORolesEnum
) => {
  const byRole: Record<AccountDTORolesEnum | LoginResponseRolesEnum, Role> = {
    COIN: Role.COIN,
    VIEWER: Role.VIEWER,
    ADMIN: Role.ADMIN,
    HAECHI: Role.HAECHI,
    SPENDER: Role.SPENDER,
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

  async me(): Promise<Account> {
    const response = await this.client.get<AccountDTO>(`${this.baseUrl}/me`);
    return {
      ...response,
      roles: response.roles.map((role) => transformRole(role)),
    };
  }

  async login(
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
    return {
      ...response,
      roles: response.roles.map((role) => transformRole(role)),
    };
  }

  async verify(params: {
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

  async changeName(firstName: string, lastName: string): Promise<void> {
    const params: ChangeAccountNameRequest = {
      firstName,
      lastName,
    };
    await this.client.patch<AccountDTO>(`${this.baseUrl}/name`, params);
  }

  async changePassword(
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

  createAccessToken(expiresIn?: number): Promise<Token> {
    const requestExpiresIn = expiresIn || this.DEFAULT_TOKEN_EXPIRED_TIME;
    return this.client.post<AccessTokenDTO>(`${this.baseUrl}/token`, {
      expiresIn: requestExpiresIn,
    });
  }

  refreshShortAccessToken(otpCode?: string): Promise<Token> {
    return this.client.post<AccessTokenDTO>(
      `${this.baseUrl}/token?type=short`,
      {
        otpCode,
      }
    );
  }

  getAccessToken(): Promise<Token> {
    return this.client.get<AccessTokenDTO>(`${this.baseUrl}/token`);
  }
}
