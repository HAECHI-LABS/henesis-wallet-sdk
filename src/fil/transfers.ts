import { TransferDTO, TransferInternalDTO } from "../__generate__/fil";
import BN from "bn.js";

import { FilSimplifiedWalletInternal, FilTransaction } from "./abstractWallet";
import { Client } from "../httpClient";
import { convertTransferDTO } from "./utils";
import { Pagination } from "../types";

export interface FilTransfer
  extends Omit<
    TransferDTO,
    | "amount"
    | "feeAmount"
    | "confirmation"
    | "transaction"
    | "proposalTransaction"
  > {
  amount: BN;
  feeAmount: BN | null;
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
  async getTransfers(): Promise<Pagination<FilTransfer>> {
    return null;
  }

  // TODO: implement me
  async getInternalTransfer(): Promise<FilTransferInternal> {
    return null;
  }

  // TODO: implement me
  async getInternalTransfers(): Promise<Pagination<FilTransferInternal>> {
    return null;
  }
}
