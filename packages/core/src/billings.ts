import { Client } from "./httpClient";
import { Pagination, PaginationOptions, Secret } from "./types";
import { Account, AccountWithIps, Role } from "./accounts";
import { makeQueryString } from "./utils/url";
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
  coin: SimplifiedCoinInternalDTO;
  charge: number;
}

export interface InvoiceMainnetUsage {
  invoiceId: string;
  blockchain: BlockchainType;
  charge: number;
}

export interface AllowedIpsPaginationOptions extends PaginationOptions {}

export class Billings {
  private readonly client: Client;

  private readonly baseUrl = "/organizations";

  constructor(client: Client) {
    this.client = client;
  }

  async getInvoice(request: { orgId: string }): Promise<Invoice> {
    const { orgId } = request;
    const queryString: string = makeQueryString({});

    // return this.client.get<BillingsInvoice>(
    //   `${this.baseUrl}/${orgId}/invoice${queryString ? `?${queryString}` : ""}`
    // );
    return Promise.resolve({
      id: "1",
      orgName: "test",
      billingPolicy: "test",
      totalCharge: 0,
      defaultCharge: 0,
      withdrawalCharge: 0,
      withdrawalFeeRate: 0,
      tokenListingCharge: 0,
    });
  }

  async getInvoiceExternalWithdrawals(
    request: {
      orgId: string;
      startAt?: string;
      endAt?: string;
    } & PaginationOptions
  ): Promise<InvoiceExternalWithdrawals[]> {
    const queryString: string = makeQueryString({});

    // return this.client.get<BillingsInvoice>(
    //   `${this.baseUrl}/${orgId}/invoice${queryString ? `?${queryString}` : ""}`
    // );
    return Promise.resolve([
      {
        id: "1",
        invoiceId: "1",
        wallet: {
          id: "1",
          name: "test",
          blockchain: BlockchainType.Ethereum,
        },
        amount: "0",
        coin: {
          symbol: "ETH",
          decimals: 18,
        },
        withdrawalTime: "10",
        charge: 0,
        source: "based on upbit",
      },
    ]);
  }

  async getInvoiceTokenListingUsage(request: {
    orgId: string;
    startAt?: string;
    endAt?: string;
  }): Promise<InvoiceTokenUsage[]> {
    const queryString: string = makeQueryString({});

    // return this.client.get<BillingsInvoice>(
    //   `${this.baseUrl}/${orgId}/invoice${queryString ? `?${queryString}` : ""}`
    // );
    return Promise.resolve([
      {
        invoiceId: "1",
        coin: {
          symbol: "ETH",
          decimals: 18,
        },
        charge: 0,
      },
    ]);
  }

  async getInvoiceMainnetUsage(request: {
    orgId: string;
    startAt?: string;
    endAt?: string;
  }): Promise<InvoiceMainnetUsage[]> {
    const queryString: string = makeQueryString({});

    // return this.client.get<BillingsInvoice>(
    //   `${this.baseUrl}/${orgId}/invoice${queryString ? `?${queryString}` : ""}`
    // );
    return Promise.resolve([
      {
        invoiceId: "1",
        blockchain: BlockchainType.Ethereum,
        charge: 0,
      },
    ]);
  }
}
