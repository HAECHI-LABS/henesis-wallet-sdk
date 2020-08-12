import { Client } from "./httpClient";
import { Pagination, PaginationOptions, Secret } from "./types";
import { Account, Role } from "./accounts";
import {
  OrganizationDTO,
  OrgAccountDTO,
  CreateSecretResponse,
  AccountDTO,
  AllowedIpDTO,
  CreateAllowedIpRequest,
  PatchAllowedIpLabelRequest,
  DeleteAllowedIpRequest,
  ActivateAllowedIpRequest,
  InactivateAllowedIpRequest,
  PaginationAllowedIpDTO,
} from "./__generate__/accounts";
import { makeQueryString } from "./utils/url";

export interface Organization {
  id: string;
  name: string;
  secret: string;
  allowlistActivated: boolean;
}

export interface AllowedIp {
  id: string;
  ipAddress: string;
  location: string | null;
  label: string;
}

export interface AllowedIpsPaginationOptions extends PaginationOptions {}

export class Organizations {
  private readonly client: Client;

  private readonly baseUrl = "/organizations";

  constructor(client: Client) {
    this.client = client;
  }

  public async getOrganization(): Promise<Organization> {
    return this.client.get<OrganizationDTO>(`${this.baseUrl}/me`);
  }

  public async getAccounts(): Promise<Account[]> {
    return this.client.get<OrgAccountDTO[]>(`${this.baseUrl}/accounts`);
  }

  public async createSecret(): Promise<Secret> {
    return this.client.post<CreateSecretResponse>(`${this.baseUrl}/secret`);
  }

  public async changeAccountRole(
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

  public async addAllowedIP(params: {
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

  public async getAllowedIPs(
    options: AllowedIpsPaginationOptions
  ): Promise<Pagination<AllowedIp>> {
    const queryString: string = makeQueryString(options);
    const result: PaginationAllowedIpDTO = await this.client.get<
      PaginationAllowedIpDTO
    >(`${this.baseUrl}/allowed-ips${queryString ? `?${queryString}` : ""}`);
    return {
      pagination: result.pagination,
      results: result.results.map(this.convertAllowedIpDTO),
    };
  }

  public async getAllowedIP(id: string): Promise<AllowedIp> {
    const result: AllowedIpDTO = await this.client.get<AllowedIpDTO>(
      `${this.baseUrl}/allowed-ips/${id}`
    );
    return this.convertAllowedIpDTO(result);
  }

  public async patchAllowedIpLabel(params: {
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

  public async deleteAllowedIp(params: {
    id: string;
    otpCode: string;
  }): Promise<void> {
    const request: DeleteAllowedIpRequest = {
      otpCode: params.otpCode,
    };
    await this.client.delete<void>(
      `${this.baseUrl}/allowed-ips/${params.id}`,
      request
    );
  }

  public async activateAllowedIp(otpCode: string): Promise<void> {
    const request: ActivateAllowedIpRequest = {
      otpCode,
    };
    await this.client.post<void>(
      `${this.baseUrl}/allowed-ips/activate`,
      request
    );
  }

  public async inactivateAllowedIp(otpCode: string): Promise<void> {
    const request: InactivateAllowedIpRequest = {
      otpCode,
    };
    await this.client.post<void>(
      `${this.baseUrl}/allowed-ips/inactivate`,
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
