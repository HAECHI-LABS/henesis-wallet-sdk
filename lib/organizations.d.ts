import { Client } from "./httpClient";
import { Pagination, PaginationOptions, Secret } from "./types";
import { Account, Role } from "./accounts";
import { OrgAccountDTO } from "./__generate__/accounts";
export interface Organization {
    id: string;
    name: string;
    secret: string;
    whitelistActivated: boolean;
    inactivatedAt: string | null;
    isNftSupported: boolean;
}
export interface AllowedIp {
    id: string;
    ipAddress: string;
    location: string | null;
    label: string;
    createdAt: string;
}
export interface AllowedIpsPaginationOptions extends PaginationOptions {
}
export interface OrganizationAccount extends OrgAccountDTO {
}
export declare class Organizations {
    private readonly client;
    private readonly baseUrl;
    constructor(client: Client);
    getOrganization(): Promise<Organization>;
    getAccounts(): Promise<OrganizationAccount[]>;
    createSecret(): Promise<Secret>;
    changeAccountRole(accountId: string, role: Role, otpCode?: string): Promise<Account>;
    addAllowedIP(params: {
        ipAddress: string;
        label: string;
        otpCode: string;
    }): Promise<AllowedIp>;
    getAllowedIPs(options?: AllowedIpsPaginationOptions): Promise<Pagination<AllowedIp>>;
    getAllowedIP(id: string): Promise<AllowedIp>;
    patchAllowedIpLabel(params: {
        id: string;
        label: string;
        otpCode: string;
    }): Promise<AllowedIp>;
    deleteAllowedIp(id: string, otpCode: string): Promise<void>;
    activateAllowedIps(otpCode: string): Promise<void>;
    inactivateAllowedIps(otpCode: string): Promise<void>;
    private convertAllowedIpDTO;
}
