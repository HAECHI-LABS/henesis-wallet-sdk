import { Client } from './httpClient';
import { Key, Token } from './types';

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
  VIEWER = 'VIEWER',
  ADMIN = 'ADMIN',
  HAECHI = 'HAECHI',
}

export class Accounts {
  private readonly client: Client;

  private readonly baseUrl = '/accounts';

  private readonly DEFAULT_TOKEN_EXPIRED_TIME = 3600;

  constructor(client: Client) {
    this.client = client;
  }

  public me(): Promise<Account> {
    return this.client.get<Account>(`${this.baseUrl}/me`);
  }

  public login(
    email: string,
    password: string,
    otpCode?: string
  ): Promise<AccountWithOTP> {
    return this.client.post<AccountWithOTP>(`${this.baseUrl}/login`, {
      email,
      password,
      otpCode,
    });
  }

  public changeName(firstName: string, lastName: string): Promise<void> {
    return this.client.patch(`${this.baseUrl}/name`, {
      firstName,
      lastName,
    });
  }

  public changePassword(
    password: string,
    newPassword: string,
    otpCode?: string
  ): Promise<void> {
    return this.client.patch(`${this.baseUrl}/password`, {
      newPassword,
      password,
      otpCode,
    });
  }

  public async createAccessToken(expiresIn?: number): Promise<Token> {
    const requestExpiresIn = expiresIn || this.DEFAULT_TOKEN_EXPIRED_TIME;
    return this.client.post<Token>(`${this.baseUrl}/token`, {
      expiresIn: requestExpiresIn,
    });
  }

  public async getAccessToken(): Promise<Token> {
    return this.client.get<Token>(`${this.baseUrl}/token`);
  }
}
