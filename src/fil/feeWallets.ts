import {
  BalanceDTO,
  FeeHistoryDTO,
  FeeWalletBalanceDTO,
  FeeWalletDTO,
  HenesisKeyDTO,
  ProposalFeeWalletBalanceDTO,
} from "../__generate__/fil";
import { Pagination } from "../types";
import { Client } from "../httpClient";
import { FilAccountKey, FilTransaction } from "./abstractWallet";
import BN from "bn.js";

export type FilHenesisKey = HenesisKeyDTO;

export interface FilFeeWallet
  extends Omit<FeeWalletDTO, "defaultFeeWallet" | "proposalFeeWallets"> {
  defaultFeeWallet: FilHenesisKey;
  proposalFeeWallets: FilAccountKey[];
}

export interface FilBalance
  extends Omit<BalanceDTO, "balance" | "spendableBalance"> {
  balance: BN;
  spendableBalance: BN;
}

export interface ProposalFeeWalletBalance
  extends Omit<ProposalFeeWalletBalanceDTO, "balance"> {
  balance: FilBalance;
}

export interface FilFeeWalletBalance
  extends Omit<FeeWalletBalanceDTO, "defaultFeeWallet" | "proposalFeeWallets"> {
  defaultFeeWallet: FilBalance;
  proposalFeeWallets: ProposalFeeWalletBalance[];
}

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
    throw new Error("this feature is not supported yet");
  }
}
