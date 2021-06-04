import {
  TransferDTO,
  TransferInternalDTO,
  TransferStatus,
} from "../__generate__/fil";
import BN from "bn.js";

import { FilSimplifiedWalletInternal, FilTransaction } from "./abstractWallet";
import { Client } from "../httpClient";
import { convertTransferDTO } from "./utils";
import { Pagination, PaginationOptions, Timestamp } from "../types";

export interface FilTransfer
  extends Omit<
    TransferDTO,
    "amount" | "confirmation" | "transaction" | "proposalTransaction"
  > {
  amount: BN;
  confirmation: BN;
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
  fromAddress: FilSimplifiedWalletInternal;
  toAddress: FilSimplifiedWalletInternal;
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

  // TODO: implement me
  async getTransfers(
    options?: FilTransferPaginationOptions
  ): Promise<Pagination<FilTransfer>> {
    return null;
  }

  // TODO: implement me
  async getInternalTransfer(): Promise<FilTransferInternal> {
    return null;
  }

  // TODO: implement me
  async getInternalTransfers(
    options?: FilTransferPaginationOptions
  ): Promise<Pagination<FilTransferInternal>> {
    return null;
  }
}
