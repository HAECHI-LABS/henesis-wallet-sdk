import { Pagination, PaginationOptions, Timestamp } from "../types";
import { Client } from "../httpClient";
import { BNConverter } from "../utils/common";
import { makeQueryString } from "../utils/url";
import { BtcTransaction, BtcTransactionOutput } from "./wallet";
import { PaginationTransferDTO, TransferDTO } from "../__generate__/btc";

export import TransferStatus = TransferDTO.StatusEnum;

export interface TransferPaginationOptions extends PaginationOptions {
  walletId?: string;
  type?: TransferType;
  status?: TransferStatus;
  address?: string;
  transactionHash?: string;
  updatedAtGte?: Timestamp;
  updatedAtLt?: Timestamp;
}

export enum TransferType {
  WITHDRAWAL = "WITHDRAWAL",
  DEPOSIT = "DEPOSIT",
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

  public async getTransfer(id: string): Promise<Transfer> {
    const response = await this.client.get(`/transfers/${id}`);
    return this.parseResponseToTransfer(response);
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
        return this.parseResponseToTransfer(t);
      }),
    };
  }

  private parseResponseToTransfer(t: any): Transfer {
    return {
      id: t.id,
      walletId: t.walletId,
      outputIndex: t.outputIndex,
      transaction: {
        id: t.transaction.id,
        transactionHash: t.transaction.transactionHash,
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
      } as BtcTransaction,
      receivedAt: t.receivedAt,
      sendTo: t.sendTo,
      type: t.type,
      status: t.status,
      createdAt: t.createdAt,
    };
  }
}
