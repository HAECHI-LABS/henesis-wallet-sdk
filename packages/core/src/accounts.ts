import { Client } from "./sdk";
import { Key } from "./keychains";

export interface Secret {
  secret: string;
}

export interface Token {
  accessToken: string;
}

export interface AccountWithOTP extends Account {
  otp: OTP;
}

export interface Account {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  accessToken: string;
  roles: Role[];
}

export interface OTP {
  key: string;
  url: string;
}

export interface Role {
  VIEWER,
  ADMIN
}

export interface AccountWithKey extends Account {
  henesisEthKey: Key;
  henesisKlayKey: Key;
}

export class Accounts {
  private readonly client: Client;

  private readonly baseUrl = "/accounts";

  constructor(client: Client) {
    this.client = client;
  }

  public me(): Promise<AccountWithOTP> {
    return this.client
      .get<AccountWithOTP>(`${this.baseUrl}/me`);
  }

  public login(email: string, password: string, otpCode?: string): Promise<Account> {
    return this.client
      .post<Account>(`${this.baseUrl}/login`, {
        email,
        password,
        otpCode
      });
  }

  public changePassword(password: string, newPassword: string, otpCode?: string): Promise<void> {
    return this.client.patch(`${this.baseUrl}/password`, {
        newPassword,
        password,
        otpCode
      }
    );
  }
}
