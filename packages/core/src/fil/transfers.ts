import { TransferDTO } from "../__generate__/fil";
import BN from "bn.js";

import { FilTransaction } from "./abstractWallet";
import { Client } from "../httpClient";
import { convertTransferDTO } from "./utils";

export interface Transfer
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

export class FilTransfers {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getTransfer(id: string): Promise<Transfer> {
    const response = await this.client.get<TransferDTO>(`/transfers/${id}`);
    return convertTransferDTO(response);
  }

  // TODO: implement me
  async getTransfers(): Promise<Transfer> {
    return null;
  }
}
