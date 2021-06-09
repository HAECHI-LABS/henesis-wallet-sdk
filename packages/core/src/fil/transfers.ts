import {
  TransferDTO,
  TransferInternalDTO,
  TransferStatus,
  PaginationTransferInternalDTO,
  PaginationTransferDTO,
} from "../__generate__/fil";
import BN from "bn.js";

import { FilSimplifiedWallet, FilTransaction } from "./abstractWallet";
import { Client } from "../httpClient";
import {
  convertTransactionDTO,
  convertTransferDTO,
  convertTransferInternalDTO,
} from "./utils";
import { Pagination, PaginationOptions, Timestamp } from "../types";
import { makeQueryString } from "../utils/url";

export interface FilTransfer
  extends Omit<TransferDTO, "amount" | "transaction" | "proposalTransaction"> {
  amount: BN;
  transaction: FilTransaction | null;
  proposalTransaction: FilTransaction | null;
}

export interface FilTransferInternal
  extends Omit<
    TransferInternalDTO,
    | "amount"
    | "transaction"
    | "confirmation"
    | "fromAddress"
    | "toAddress"
    | "proposalTransaction"
  > {
  amount: BN;
  transaction: FilTransaction | null;
  confirmation: BN;
  fromAddress: FilSimplifiedWallet;
  toAddress: FilSimplifiedWallet;
  proposalTransaction: FilTransaction | null;
}

export interface FilTransferPaginationOptions extends PaginationOptions {
  address?: string;
  toAddress?: string;
  fromAddress?: string;
  transactionHash?: string;
  updatedAtGte?: Timestamp;
  updatedAtLt?: Timestamp;
  status?: TransferStatus;
  walletId?: string;
  orgId?: string;
  transactionId?: string;
}

export class FilTransfers {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getTransfer(id: string): Promise<FilTransfer> {
    const response = await this.client.get<TransferDTO>(`/transfers/${id}`);
    return convertTransferDTO(response);
  }

  async getTransfers(
    options?: FilTransferPaginationOptions
  ): Promise<Pagination<FilTransfer>> {
    const queryString = makeQueryString(options);
    const data = await this.client.get<PaginationTransferDTO>(
      `/transfers${queryString ? `?${queryString}` : ""}`
    );

    return {
      pagination: data.pagination,
      results: data.results.map((t) => {
        return convertTransferDTO(t);
      }),
    };
  }

  async getInternalTransfer(id: string): Promise<FilTransferInternal> {
    const response = await this.client.get<TransferInternalDTO>(
      `/internal/transfers/${id}`
    );
    return convertTransferInternalDTO(response);
  }

  async getInternalTransfers(
    options?: FilTransferPaginationOptions
  ): Promise<Pagination<FilTransferInternal>> {
    const queryString = makeQueryString(options);
    const data = await this.client.get<PaginationTransferInternalDTO>(
      `/internal/transfers${queryString ? `?${queryString}` : ""}`
    );

    return {
      pagination: data.pagination,
      results: data.results.map((t) => {
        return convertTransferInternalDTO(t);
      }),
    };
  }
}
