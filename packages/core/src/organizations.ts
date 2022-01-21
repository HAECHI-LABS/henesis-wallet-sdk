import _ from "lodash";

import { Client } from "./httpClient";
import { Pagination, PaginationOptions, Secret } from "./types";
import { Account, Role } from "./accounts";
import {
  ActivateAllowedIpsRequest,
  Activation,
  AllowedIpDTO,
  CreateAllowedIpRequest,
  CreateSecretResponse,
  DeleteAllowedIpRequest,
  InactivateAllowedIpsRequest,
  OrgAccountDTO,
  OrganizationDTO,
  PaginationAllowedIpDTO,
  PatchAllowedIpLabelRequest,
  RequestActivationRequest,
} from "./__generate__/accounts";
import { makeQueryString } from "./utils/url";
import { BlockchainType, transformBlockchainType } from "./blockchain";

export interface Organization {
  id: string;
  name: string;
  secret: string;
  inactivatedAt: string | null;
  whitelistActivated: boolean;
  activeBlockchain: Array<BlockchainType>;
  activeNft: Array<BlockchainType>;
}

export interface AllowedIp {
  id: string;
  ipAddress: string;
  location: string | null;
  label: string;
  createdAt: string;
}

export interface AllowedIpsPaginationOptions extends PaginationOptions {}

export interface OrganizationAccount extends OrgAccountDTO {}

export class Organizations {
  private readonly client: Client;

  private readonly baseUrl = "/organizations";

  constructor(client: Client) {
    this.client = client;
  }

  async getOrganization(): Promise<Organization> {
    const response = await this.client.get<OrganizationDTO>(
      `${this.baseUrl}/me`
    );
    return {
      ...response,
      activeBlockchain: _.map(response.activeBlockchain, (blockchain) =>
        transformBlockchainType(blockchain)
      ),
      activeNft: _.map(response.activeNft, (blockchain) =>
        transformBlockchainType(blockchain)
      ),
    };
  }

  async requestActivationOrganization(params: {
    activationType: Activation;
    blockchain: BlockchainType;
  }): Promise<void> {
    const { activationType, blockchain } = params;
    const request: RequestActivationRequest = {
      activationType,
      blockchain: blockchain as any,
    };
    this.client.post(`${this.baseUrl}/request-activation`, request);
  }

  getAccounts(): Promise<OrganizationAccount[]> {
    return this.client.get<OrganizationAccount[]>(`${this.baseUrl}/accounts`);
  }

  createSecret(): Promise<Secret> {
    return this.client.post<CreateSecretResponse>(`${this.baseUrl}/secret`);
  }

  changeAccountRole(
    accountId: string,
    role: Role,
    otpCode?: string
  ): Promise<Account> {
    return this.client.patch<Account>(`${this.baseUrl}/accounts/${accountId}`, {
      role,
      otpCode,
    });
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
    const result: PaginationAllowedIpDTO =
      await this.client.get<PaginationAllowedIpDTO>(
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
