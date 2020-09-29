import { Pagination, PaginationOptions, Timestamp } from "../types";
import { Client } from "../httpClient";
import { makeQueryString } from "../utils/url";
import { BtcTransaction } from "./wallet";
import {
  PaginationTransferDTO,
  TransferDTO,
  TransferType,
  TransferStatus,
  TransferInternalDTO,
  PaginationTransferInternalDTO,
} from "../__generate__/btc";
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
  transaction: BtcTransaction | null;
}

export interface TransferInternal
  extends Omit<
    TransferInternalDTO,
    "amount" | "feeAmount" | "confirmation" | "transaction"
  > {
  amount: BN;
  feeAmount: BN | null;
  confirmation: BN;
  transaction: BtcTransaction | null;
}

export class BtcTransfers {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getTransfer(id: string): Promise<Transfer> {
    const response = await this.client.get<TransferDTO>(`/transfers/${id}`);
    return convertTransferDTO(response);
  }

  public async getTransfers(
    options?: TransferPaginationOptions
  ): Promise<Pagination<Transfer>> {
    const queryString: string = makeQueryString(options);
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

  public async getInternalTransfer(id: string): Promise<TransferInternal> {
    const response = await this.client.get<TransferInternalDTO>(
      `/internal/transfers/${id}`
    );
    return convertTransferInternalDTO(response);
  }

  public async getInternalTransfers(
    options?: TransferPaginationOptions
  ): Promise<Pagination<TransferInternal>> {
    const queryString: string = makeQueryString(options);
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
