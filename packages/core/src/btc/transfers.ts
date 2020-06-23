import * as BN from "bn.js";
import { Pagination, PaginationOptions, Timestamp } from "../types";
import { Client } from "../httpClient";
import { BNConverter } from "../utils/common";
import { makeQueryString } from "../utils/url";

export interface TransferPaginationOptions extends PaginationOptions {
  walletId?: string;
  type?: TransferType;
  address?: string;
  transactionHash?: string;
  start?: Timestamp;
  end?: Timestamp;
}

export enum TransferType {
  WITHDRAWAL = "WITHDRAWAL",
  DEPOSIT = "DEPOSIT",
}

export enum TransferStatus {
  PENDING = "PENDING",
  MINED = "MINED",
  CONFIRMED = "CONFIRMED",
}

export interface Transfer {
  walletId: string;
  transactionId: string;
  transactionHash: string;
  blockNumber: BN;
  receivedAt: string;
  sendTo: string;
  amount: BN;
  type: TransferType;
  status: TransferStatus;
  createdAt: string;
}

export class BtcTransfers {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getTransfers(
    options?: TransferPaginationOptions
  ): Promise<Pagination<Transfer>> {
    const queryString: string = makeQueryString(options);
    const data: Pagination<Transfer> = await this.client.get(
      `/transfers${queryString ? `?${queryString}` : ""}`
    );

    return {
      pagination: data.pagination,
      results: data.results.map((t) => {
        return {
          walletId: t.walletId,
          transactionId: t.transactionId,
          transactionHash: t.transactionHash,
          blockNumber: t.blockNumber
            ? BNConverter.hexStringToBN(String(t.blockNumber))
            : null,
          receivedAt: t.receivedAt,
          sendTo: t.sendTo,
          amount: BNConverter.hexStringToBN(String(t.amount)),
          type: t.type,
          status: t.status,
          createdAt: t.createdAt,
        };
      }),
    };
  }
}
