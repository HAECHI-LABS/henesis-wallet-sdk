import BN from "bn.js";

import { Client } from "./httpClient";
import { Pagination, PaginationOptions, Balance } from "./types";
import { makeQueryString } from "./utils/url";
import { BlockchainType, transformBlockchainType } from "./blockchain";
import { SimplifiedCoinInternalDTO } from "./__generate__/eth";
import {
  getSummarizedInvoice,
  getDetailedInvoice,
} from "./apis/billings/invoice";
import {
  DetailedInvoiceDto,
  SummarizedBlockchainNetworkFeeBillingDto,
  SummarizedInvoiceDto,
} from "./__generate__/billings";

export interface SummarizedInvoice
  extends Omit<SummarizedInvoiceDto, "summarizedBlockchainNetworkFeeBilling"> {
  summarizedBlockchainNetworkFeeBilling?: Omit<
    SummarizedBlockchainNetworkFeeBillingDto,
    "blockchains"
  > & { blockchains: BlockchainType[] };
}
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
    return {
      ...response,
      summarizedBlockchainNetworkFeeBilling: {
        ...response.summarizedBlockchainNetworkFeeBilling,
        blockchains:
          response.summarizedBlockchainNetworkFeeBilling?.blockchains?.map?.(
            (blockchain) => transformBlockchainType(blockchain)
          ),
      },
    };
  }

  async getDetailedInvoice(request: {
    invoiceId: string;
  }): Promise<DetailedInvoice> {
    const { invoiceId } = request;
    const response = await getDetailedInvoice({
      client: this.client,
      invoiceId,
    });
    return response;
  }
}
