import _ from "lodash";
import { Client } from "./httpClient";
import { Secret } from "./types";
import { Account, Role } from "./accounts";
import {
  OrganizationDTO,
  OrgAccountDTO,
  CreateSecretResponse,
  AccountDTO,
} from "./__generate__/accounts";

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
    return await this.client.get<OrganizationDTO>(`${this.baseUrl}/me`);
  }

  public async getAccounts(): Promise<Account[]> {
    const response = await this.client.get<OrgAccountDTO[]>(
      `${this.baseUrl}/accounts`
    );
    return response;
  }

  public async createSecret(): Promise<Secret> {
    const response = await this.client.post<CreateSecretResponse>(
      `${this.baseUrl}/secret`
    );
    return response;
  }

  public async changeAccountRole(
    accountId: string,
    role: Role,
    otpCode?: string
  ): Promise<Account> {
    const response = await this.client.patch<AccountDTO>(
      `${this.baseUrl}/accounts/${accountId}`,
      {
        role,
        otpCode,
      }
    );
    return response;
  }
}
