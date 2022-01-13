import BN from "bn.js";

import { Client } from "./httpClient";
import { Pagination, PaginationOptions, Balance } from "./types";
import { makeQueryString } from "./utils/url";
import { BlockchainType } from "./blockchain";
import { SimplifiedCoinInternalDTO } from "./__generate__/eth";
import {
  getSummarizedInvoice,
  getDetailedInvoice,
} from "./apis/billings/invoice";
import {
  DetailedInvoiceDto,
  SummarizedInvoiceDto,
} from "./__generate__/billings";

export interface SummarizedInvoice extends SummarizedInvoiceDto {}
export interface DetailedInvoice extends DetailedInvoiceDto {}

export class Billings {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getSummarizedInvoice(request: {
    invoiceId: string;
  }): Promise<SummarizedInvoice> {
    const { invoiceId } = request;
    const response = await getSummarizedInvoice({
      client: this.client,
      invoiceId,
    });
    return response;
  }

  async getDetailedInvoice(request: {
    orgId: string;
    invoiceId: string;
  }): Promise<DetailedInvoice> {
    const { orgId, invoiceId } = request;
    const response = await getDetailedInvoice({
      client: this.client,
      invoiceId,
    });
    return response;
  }
}
