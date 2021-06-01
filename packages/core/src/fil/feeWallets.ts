import {
  BalanceDTO,
  FeeHistoryDTO,
  FeeWalletBalanceDTO,
  FeeWalletDTO,
  ProposalWalletBalanceDTO,
} from "../__generate__/fil";
import { Key, Pagination } from "../types";
import { Client } from "../httpClient";
import { FilTransaction } from "./abstractWallet";
import BN from "bn.js";

export interface FilHenesisKey extends Key {
  keyId: string;
}

export interface FilFeeWallet
  extends Omit<FeeWalletDTO, "defaultWallet" | "proposalWallets"> {
  defaultWallet: FilHenesisKey;
  proposalWallets: Key[];
}

export interface FilBalance
  extends Omit<BalanceDTO, "balance" | "spendableBalance"> {
  balance: BN;
  spendableBalance: BN;
}

export interface ProposalWalletBalance
  extends Omit<ProposalWalletBalanceDTO, "balance"> {
  balance: FilBalance;
}

export interface FilFeeWalletBalance
  extends Omit<FeeWalletBalanceDTO, "defaultWallet" | "proposalWallets"> {
  defaultWallet: FilBalance;
  proposalWallets: ProposalWalletBalance[];
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
