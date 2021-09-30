import {
  FeeHistoryDTO,
  FeeWalletBalanceDTO,
  FeeWalletDTO,
  HenesisKeyDTO,
  ProposalFeeWalletDTO,
} from "../__generate__/fil";
import { Balance, Pagination } from "../types";
import { Client } from "../httpClient";
import { FilTransaction } from "./abstractWallet";
import { convertBalanceDtoToFilBalance } from "./utils";

export type FilHenesisKey = HenesisKeyDTO;

export type FilProposalFeeWallet = ProposalFeeWalletDTO;

export interface FilFeeWallet
  extends Omit<FeeWalletDTO, "defaultFeeWallet" | "proposalFeeWallets"> {
  defaultFeeWallet: FilHenesisKey;
  proposalFeeWallets: FilProposalFeeWallet[];
}

export interface FilBalanceWithId extends Balance {
  id: string;
}

export interface FilFeeWalletBalance
  extends Omit<FeeWalletBalanceDTO, "defaultFeeWallet" | "proposalFeeWallets"> {
  defaultFeeWallet: Balance;
  proposalFeeWallets: FilBalanceWithId[];
}

export interface FilFeeHistory extends Omit<FeeHistoryDTO, "transaction"> {
  transaction: FilTransaction;
}

export class FilFeeWallets {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getFeeWallet(): Promise<FilFeeWallet> {
    return await this.client.get<FeeWalletDTO>(`/fee-wallets/me`);
  }

  async getFeeWalletBalance(): Promise<FilFeeWalletBalance> {
    const response = await this.client.get<FeeWalletBalanceDTO>(
      `/fee-wallets/balance`
    );
    return {
      defaultFeeWallet: convertBalanceDtoToFilBalance(
        response.defaultFeeWallet
      ),
      proposalFeeWallets: response.proposalFeeWallets.map((item) => {
        return {
          id: item.id,
          ...convertBalanceDtoToFilBalance(item),
        };
      }),
    };
  }

  // TODO: implement me
  async getFeeHistories(): Promise<Pagination<FilFeeHistory>> {
    throw new Error("this feature is not supported yet");
  }
}
