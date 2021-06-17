import {
  BalanceDTO,
  FeeHistoryDTO,
  FeeWalletBalanceDTO,
  FeeWalletDTO,
  HenesisKeyDTO,
  ProposalFeeWalletDTO,
} from "../__generate__/fil";
import { Pagination } from "../types";
import { Client } from "../httpClient";
import { FilTransaction } from "./abstractWallet";
import BN from "bn.js";
import { BNConverter } from "../utils/common";

export type FilHenesisKey = HenesisKeyDTO;

export type FilProposalFeeWallet = ProposalFeeWalletDTO;

export interface FilFeeWallet
  extends Omit<FeeWalletDTO, "defaultFeeWallet" | "proposalFeeWallets"> {
  defaultFeeWallet: FilHenesisKey;
  proposalFeeWallets: FilProposalFeeWallet[];
}

export interface FilBalance
  extends Omit<BalanceDTO, "confirmedBalance" | "spendableBalance"> {
  confirmedBalance: BN;
  spendableBalance: BN;
}

export interface FilBalanceWithId extends FilBalance {
  id: string;
}

export interface FilFeeWalletBalance
  extends Omit<FeeWalletBalanceDTO, "defaultFeeWallet" | "proposalFeeWallets"> {
  defaultFeeWallet: FilBalance;
  proposalFeeWallets: FilBalanceWithId[];
}

export interface FilFeeHistory extends Omit<FeeHistoryDTO, "transaction"> {
  transaction: FilTransaction;
}

const convertFilBalanceDTO = (balanceDTO: BalanceDTO): FilBalance => {
  return {
    confirmedBalance: BNConverter.hexStringToBN(balanceDTO.confirmedBalance),
    spendableBalance: BNConverter.hexStringToBN(balanceDTO.spendableBalance),
  };
};

export class FilFeeWallets {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getFeeWallet(): Promise<FilFeeWallet> {
    const response = await this.client.get<FeeWalletDTO>(`/fee-wallets/me`);
    return response;
  }

  async getFeeWalletBalance(): Promise<FilFeeWalletBalance> {
    const response = await this.client.get<FeeWalletBalanceDTO>(
      `/fee-wallets/balance`
    );
    return {
      defaultFeeWallet: convertFilBalanceDTO(response.defaultFeeWallet),
      proposalFeeWallets: response.proposalFeeWallets.map((item) => {
        return {
          id: item.id,
          ...convertFilBalanceDTO(item),
        };
      }),
    };
  }

  // TODO: implement me
  async getFeeHistories(): Promise<Pagination<FilFeeHistory>> {
    throw new Error("this feature is not supported yet");
  }
}
