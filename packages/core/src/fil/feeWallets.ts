import {
  FeeHistoryDTO,
  FeeWalletBalanceDTO,
  FeeWalletDTO,
} from "../__generate__/fil";
import { FilHenesisKey } from "./henesisKeys";
import { Key, Pagination } from "../types";
import { Client } from "../httpClient";
import { FilTransaction } from "./abstractWallet";

export interface FilFeeWallet
  extends Omit<FeeWalletDTO, "defaultWallet" | "proposalWallets"> {
  defaultWallet: FilHenesisKey;
  proposalWallets: Key[];
}

export type FilFeeWalletBalance = FeeWalletBalanceDTO;

export interface FilFeeHistory extends Omit<FeeHistoryDTO, "transaction"> {
  transaction: FilTransaction;
}

export class FilFeeWallets {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  // TODO: implement me
  async getFeeWallet(): Promise<FilFeeWallet> {
    return null;
  }

  // TODO: implement me
  async getFeeWalletBalance(): Promise<FilFeeWalletBalance> {
    return null;
  }

  // TODO: implement me
  async getFeeHistories(): Promise<Pagination<FilFeeHistory>> {
    return null;
  }
}
