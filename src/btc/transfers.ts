import { Pagination, PaginationOptions, Timestamp } from "../types";
import { Client } from "../httpClient";
import { BNConverter } from "../utils/common";
import { makeQueryString } from "../utils/url";
import { BtcTransaction, BtcTransactionOutput } from "./wallet";

export interface TransferPaginationOptions extends PaginationOptions {
  walletId?: string;
  type?: TransferType;
  status?: TransferStatus;
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
  id: string;
  walletId: string;
  outputIndex: number;
  transaction: BtcTransaction;
  receivedAt: string;
  sendTo: string;
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
    const data: Pagination<any> = await this.client.get(
      `/transfers${queryString ? `?${queryString}` : ""}`
    );

    return {
      pagination: data.pagination,
      results: data.results.map((t) => {
        return {
          id: t.id,
          walletId: t.walletId,
          outputIndex: t.outputIndex,
          transaction: {
            id: t.transaction.id,
            amount: BNConverter.hexStringToBN(t.transaction.amount),
            blockNumber: t.transaction.blockNumber
              ? BNConverter.hexStringToBN(t.transaction.blockNumber)
              : null,
            feeAmount: t.transaction.feeAmount
              ? BNConverter.hexStringToBN(t.transaction.feeAmount)
              : null,
            createdAt: t.transaction.createdAt,
            hex: t.transaction.hex,
            outputs: t.transaction.outputs.map((o) => {
              return {
                transactionId: o.transactionId,
                outputIndex: o.outputIndex,
                address: o.address,
                scriptPubKey: o.scriptPubKey,
                amount: BNConverter.hexStringToBN(o.amount),
                isChange: o.isChange,
              } as BtcTransactionOutput;
            }),
            inputs: [],
          } as BtcTransaction,
          receivedAt: t.receivedAt,
          sendTo: t.sendTo,
          type: t.type,
          status: t.status,
          createdAt: t.createdAt,
        };
      }),
    };
  }
}
