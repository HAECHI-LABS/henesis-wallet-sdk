import { Client } from "src/httpClient";
import { Pagination, PaginationOptions, Secret } from "src/types";
import { Account, AccountWithIps, Role } from "src/accounts";
import {
  OrganizationDTO,
  OrgAccountDTO,
  CreateSecretResponse,
  AccountDTO,
  AllowedIpDTO,
  CreateAllowedIpRequest,
  PatchAllowedIpLabelRequest,
  DeleteAllowedIpRequest,
  ActivateAllowedIpsRequest,
  InactivateAllowedIpsRequest,
  PaginationAllowedIpDTO,
} from "src/__generate__/accounts";
import { makeQueryString } from "@utils/url";

export interface Organization {
  id: string;
  name: string;
  secret: string;
  whitelistActivated: boolean;
}

export interface AllowedIp {
  id: string;
  ipAddress: string;
  location: string | null;
  label: string;
  createdAt: string;
}

export interface AllowedIpsPaginationOptions extends PaginationOptions {}

export class Organizations {
  private readonly client: Client;

  private readonly baseUrl = "/organizations";

  constructor(client: Client) {
    this.client = client;
  }

  async getOrganization(): Promise<Organization> {
    return this.client.get<OrganizationDTO>(`${this.baseUrl}/me`);
  }

  getAccounts(): Promise<AccountWithIps[]> {
    return this.client.get<OrgAccountDTO[]>(`${this.baseUrl}/accounts`);
  }

  createSecret(): Promise<Secret> {
    return this.client.post<CreateSecretResponse>(`${this.baseUrl}/secret`);
  }

  changeAccountRole(
    accountId: string,
    role: Role,
    otpCode?: string
  ): Promise<Account> {
    return this.client.patch<AccountDTO>(
      `${this.baseUrl}/accounts/${accountId}`,
      {
        role,
        otpCode,
      }
    );
  }

  async addAllowedIP(params: {
    ipAddress: string;
    label: string;
    otpCode: string;
  }): Promise<AllowedIp> {
    const request: CreateAllowedIpRequest = {
      ...params,
    };
    const result: AllowedIpDTO = await this.client.post<AllowedIpDTO>(
      `${this.baseUrl}/allowed-ips`,
      request
    );
    return this.convertAllowedIpDTO(result);
  }

  async getAllowedIPs(
    options?: AllowedIpsPaginationOptions
  ): Promise<Pagination<AllowedIp>> {
    const queryString: string = makeQueryString(options);
    const result: PaginationAllowedIpDTO = await this.client.get<PaginationAllowedIpDTO>(
      `${this.baseUrl}/allowed-ips${queryString ? `?${queryString}` : ""}`
    );
    return {
      pagination: result.pagination,
      results: result.results.map(this.convertAllowedIpDTO),
    };
  }

  async getAllowedIP(id: string): Promise<AllowedIp> {
    const result: AllowedIpDTO = await this.client.get<AllowedIpDTO>(
      `${this.baseUrl}/allowed-ips/${id}`
    );
    return this.convertAllowedIpDTO(result);
  }

  async patchAllowedIpLabel(params: {
    id: string;
    label: string;
    otpCode: string;
  }): Promise<AllowedIp> {
    const request: PatchAllowedIpLabelRequest = {
      label: params.label,
      otpCode: params.otpCode,
    };
    const result: AllowedIpDTO = await this.client.patch<AllowedIpDTO>(
      `${this.baseUrl}/allowed-ips/${params.id}/label`,
      request
    );
    return this.convertAllowedIpDTO(result);
  }

  async deleteAllowedIp(id: string, otpCode: string): Promise<void> {
    const request: DeleteAllowedIpRequest = {
      otpCode,
    };
    await this.client.delete<void>(`${this.baseUrl}/allowed-ips/${id}`, {
      data: request,
    });
  }

  async activateAllowedIps(otpCode: string): Promise<void> {
    const request: ActivateAllowedIpsRequest = {
      otpCode,
    };
    await this.client.post<void>(
      `${this.baseUrl}/activate-allowed-ips`,
      request
    );
  }

  async inactivateAllowedIps(otpCode: string): Promise<void> {
    const request: InactivateAllowedIpsRequest = {
      otpCode,
    };
    await this.client.post<void>(
      `${this.baseUrl}/inactivate-allowed-ips`,
      request
    );
  }

  private convertAllowedIpDTO(dto: AllowedIpDTO): AllowedIp {
    return {
      ...dto,
      location: dto.location ?? null,
    };
  }
}
