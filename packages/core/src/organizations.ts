import _ from "lodash";
import { Client } from "./httpClient";
import { Secret } from "./types";
import { Account, Role, transformRole } from "./accounts";
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
    return await this.client.get<NoUndefinedField<OrganizationDTO>>(
      `${this.baseUrl}/me`
    );
  }

  public async getAccounts(): Promise<Account[]> {
    const response = await this.client.get<NoUndefinedField<OrgAccountDTO>[]>(
      `${this.baseUrl}/accounts`
    );
    return _.map(response, (account) => {
      return {
        ...account,
        roles: _.map(account.roles, (role) => transformRole(role)),
      };
    });
  }

  public async createSecret(): Promise<Secret> {
    const response = await this.client.post<
      NoUndefinedField<CreateSecretResponse>
    >(`${this.baseUrl}/secret`);
    return response;
  }

  public async changeAccountRole(
    accountId: string,
    role: Role,
    otpCode?: string
  ): Promise<Account> {
    const response = await this.client.patch<NoUndefinedField<AccountDTO>>(
      `${this.baseUrl}/accounts/${accountId}`,
      {
        role,
        otpCode,
      }
    );
    return {
      ...response,
      roles: _.map(response.roles, (role) => transformRole(role)),
    };
  }
}
