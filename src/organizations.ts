import { Client } from "./httpClient";
import { Secret } from "./types";
import { Account, Role } from "./accounts";

export interface Organization {
  id: string;
  name: string;
  secret: string;
}

export class Organizations {
  private readonly client: Client;

  private readonly baseUrl = "/organizations";

  constructor(client: Client) {
    this.client = client;
  }

  public async getOrganization(): Promise<Organization> {
    return await this.client.get<Organization>(`${this.baseUrl}/me`);
  }

  public async getAccounts(): Promise<Account[]> {
    return await this.client.get<Account[]>(`${this.baseUrl}/accounts`);
  }

  public async createSecret(): Promise<Secret> {
    return this.client.post<Secret>(`${this.baseUrl}/secret`);
  }

  public async changeAccountRole(
    accountId: string,
    role: Role,
    otpCode?: string
  ): Promise<Account> {
    return this.client.patch<Account>(`${this.baseUrl}/accounts/${accountId}`, {
      role,
      otpCode,
    });
  }
}
