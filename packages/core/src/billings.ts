import BN from "bn.js";

import { Client } from "./httpClient";
import { Pagination, PaginationOptions, Balance } from "./types";
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
  vat: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  mainnets: Array<{ blockchain: BlockchainType }>;
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

export class Billings {
  private readonly client: Client;

  private readonly baseUrl = "/organizations";

  constructor(client: Client) {
    this.client = client;
  }

  // todo: implement
  async getInvoice(request: {
    orgId: string;
    year: string;
    month: string;
  }): Promise<Invoice> {
    const { orgId } = request;
    const queryString: string = makeQueryString({});

    return Promise.resolve({
      id: "1",
      orgName: "test",
      billingPolicy: "test",
      totalCharge: 0,
      defaultCharge: 0,
      withdrawalCharge: 0,
      withdrawalFeeRate: 0,
      tokenListingCharge: 0,
      vat: 0,
      mainnets: [
        {
          blockchain: BlockchainType.BITCOIN,
        },
      ],
      startDate: String(new Date().valueOf()),
      endDate: String(new Date().valueOf()),
      createdAt: String(new Date().valueOf()),
      tokens: [
        {
          coinId: 1,
          coinType: "test",
          amount: new BN(0),
          name: "이더리움",
          symbol: "ETH",
          decimals: 18,
        },
      ],
    });
  }

  // todo: implement
  async getInvoiceExternalWithdrawals(
    request: {
      orgId: string;
      startAt?: string;
      endAt?: string;
    } & PaginationOptions
  ): Promise<Pagination<InvoiceExternalWithdrawals>> {
    const { orgId, ...rest } = request;
    const queryString: string = makeQueryString(rest);

    return Promise.resolve({
      results: [
        {
          id: "1",
          invoiceId: "1",
          wallet: {
            id: "1",
            name: "test",
            blockchain: BlockchainType.ETHEREUM,
          },
          amount: "0",
          coin: {
            symbol: "ETH",
            decimals: 18,
          },
          withdrawalTime: String(new Date().valueOf()),
          charge: 0,
          source: "based on upbit",
        },
      ],
      pagination: {
        totalCount: 1,
        nextUrl: "",
        previousUrl: "",
      },
    });
  }

  // todo: implement
  async getInvoiceTokenListingUsage(request: {
    orgId: string;
    startAt?: string;
    endAt?: string;
  }): Promise<InvoiceTokenUsage[]> {
    const { orgId, ...rest } = request;
    const queryString: string = makeQueryString(rest);

    return Promise.resolve([
      {
        invoiceId: "1",
        coin: {
          coinId: 1,
          coinType: "test",
          amount: new BN(0),
          name: "이더리움",
          symbol: "ETH",
          decimals: 18,
        },
        charge: 0,
      },
    ]);
  }

  // todo: implement
  async getInvoiceMainnetUsage(request: {
    orgId: string;
    startAt?: string;
    endAt?: string;
  }): Promise<InvoiceMainnetUsage[]> {
    const { orgId, ...rest } = request;
    const queryString: string = makeQueryString(rest);

    return Promise.resolve([
      {
        invoiceId: "1",
        blockchain: BlockchainType.ETHEREUM,
        charge: 0,
      },
    ]);
  }
}
