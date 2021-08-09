// FIXME: the code is copied from btc and changed only btc->ltc
// we need to check the code line by line later.

import { Pagination, PaginationOptions, Timestamp } from "../types";
import { Client } from "../httpClient";
import { makeQueryString } from "../utils/url";
import { LtcTransaction } from "./wallet";
import {
  PaginationTransferDTO,
  TransferDTO,
  TransferType,
  TransferStatus,
  TransferInternalDTO,
  PaginationTransferInternalDTO,
} from "../__generate__/ltc";
import BN from "bn.js";

export import TransferStatus = TransferStatus;
export import TransferType = TransferType;
import { convertTransferInternalDTO, convertTransferDTO } from "./utils";

export interface TransferPaginationOptions extends PaginationOptions {
  walletId?: string;
  type?: TransferType;
  status?: TransferStatus;
  address?: string;
  transactionHash?: string;
  updatedAtGte?: Timestamp;
  updatedAtLt?: Timestamp;
}

export interface Transfer
  extends Omit<
    TransferDTO,
    "amount" | "feeAmount" | "confirmation" | "transaction"
  > {
  amount: BN;
  feeAmount: BN | null;
  confirmation: BN;
  transaction: LtcTransaction | null;
}

export interface TransferInternal
  extends Omit<
    TransferInternalDTO,
    "amount" | "feeAmount" | "confirmation" | "transaction"
  > {
  amount: BN;
  feeAmount: BN | null;
  confirmation: BN;
  transaction: LtcTransaction | null;
}

export class LtcTransfers {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getTransfer(id: string): Promise<Transfer> {
    const response = await this.client.get<TransferDTO>(`/transfers/${id}`);
    return convertTransferDTO(response);
  }

  async getTransfers(
    options?: TransferPaginationOptions
  ): Promise<Pagination<Transfer>> {
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

  async getInternalTransfer(id: string): Promise<TransferInternal> {
    const response = await this.client.get<TransferInternalDTO>(
      `/internal/transfers/${id}`
    );
    return convertTransferInternalDTO(response);
  }

  async getInternalTransfers(
    options?: TransferPaginationOptions
  ): Promise<Pagination<TransferInternal>> {
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
