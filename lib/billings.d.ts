import { Client } from "./httpClient";
import { Pagination, PaginationOptions, Balance } from "./types";
import { BlockchainType } from "./blockchain";
import { SimplifiedCoinInternalDTO } from "./__generate__/eth";
export interface Invoice {
    id: string;
    orgName: string;
    billingPolicy: string;
    totalCharge: number;
    defaultCharge: number;
    withdrawalCharge: number;
    withdrawalFeeRate: number;
    tokenListingCharge: number;
    vat: number;
    startDate: string;
    endDate: string;
    createdAt: string;
    mainnets: Array<{
        blockchain: BlockchainType;
    }>;
    tokens: Balance[];
}
export interface InvoiceExternalWithdrawals {
    id: string;
    invoiceId: string;
    wallet: {
        id: string;
        name: string;
        blockchain: BlockchainType;
    };
    amount: string;
    coin: SimplifiedCoinInternalDTO;
    withdrawalTime: string;
    charge: number;
    source: string;
}
export interface InvoiceTokenUsage {
    invoiceId: string;
    coin: Balance;
    charge: number;
}
export interface InvoiceMainnetUsage {
    invoiceId: string;
    blockchain: BlockchainType;
    charge: number;
}
export declare class Billings {
    private readonly client;
    private readonly baseUrl;
    constructor(client: Client);
    getInvoice(request: {
        orgId: string;
        year: string;
        month: string;
    }): Promise<Invoice>;
    getInvoiceExternalWithdrawals(request: {
        orgId: string;
        startAt?: string;
        endAt?: string;
    } & PaginationOptions): Promise<Pagination<InvoiceExternalWithdrawals>>;
    getInvoiceTokenListingUsage(request: {
        orgId: string;
        startAt?: string;
        endAt?: string;
    }): Promise<InvoiceTokenUsage[]>;
    getInvoiceMainnetUsage(request: {
        orgId: string;
        startAt?: string;
        endAt?: string;
    }): Promise<InvoiceMainnetUsage[]>;
}
