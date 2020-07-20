import { Client } from "./httpClient";
import { Pagination, PaginationOptions } from "./types";
import { makeQueryString } from "./utils/url";
import {
  PaginationWithdrawalApprovalDTO,
  WithdrawalApprovalDTO,
} from "./__generate__/accounts";
import BN from "bn.js";
import _ from "lodash";
import { BNConverter } from "./utils/common";
import { Transfer } from "./btc/transfers";
import { EthTransaction } from "./eth/wallet";
import { BlockchainType } from "./blockchain";

export interface WithdrawalApproval {
  id: string;
  masterWalletId: string;
  userWalletId?: string;
  requester: {
    name: string;
    email: string;
  };
  blockchain: string;
  coinSymbol: string;
  amount: BN;
  status: WithdrawalApprovalStatus;
  to: string;
  transactionId: string;
}

export type WithdrawalApprovalStatus = WithdrawalApprovalDTO.StatusEnum;

export interface ApproveWithdrawal extends WithdrawalApproval {
  passphrase: string;
  otpCode: string;
  // only used in ethereum
  gasLimit?: BN;
  gasPrice?: BN;
}

export interface WithdrawalApprover {
  approve(
    approveWithdrawal: ApproveWithdrawal
  ): Promise<Transfer | EthTransaction>;
  reject(id: string): Promise<void>;
}

export class WithdrawalApprovals {
  private readonly client: Client;

  private readonly baseUrl = "/withdrawal-approvals";

  private readonly resolver: Record<BlockchainType, WithdrawalApprover>;

  constructor(client: Client, resolver: Record<string, WithdrawalApprover>) {
    this.client = client;
    this.resolver = resolver;
  }

  async getWithdrawalApprovals(
    options: PaginationOptions
  ): Promise<Pagination<WithdrawalApproval>> {
    const queryString: string = makeQueryString(options);
    const data = await this.client.get<PaginationWithdrawalApprovalDTO>(
      `${this.baseUrl}${queryString ? `?${queryString}` : ""}`
    );
    return {
      pagination: data.pagination,
      results: data.results.map((data) => {
        return {
          ..._.omit(data, "approvedBy"),
          amount: BNConverter.hexStringToBN(data.amount),
        };
      }),
    };
  }

  async approveWithdrawalApproval(
    id: string,
    passphrase: string,
    otpCode: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<Transfer | EthTransaction> {
    const data = await this.client.get<WithdrawalApprovalDTO>(
      `${this.baseUrl}/${id}`
    );
    const approveWithdrawal: ApproveWithdrawal = {
      ..._.omit(data, "approvedBy"),
      amount: BNConverter.hexStringToBN(data.amount),
      passphrase: passphrase,
      otpCode: otpCode,
      gasLimit: gasLimit,
      gasPrice: gasPrice,
    };
    return await this.resolver[data.blockchain].approve(approveWithdrawal);
  }

  async rejectWithdrawalApproval(id: string): Promise<void> {
    const data = await this.client.get<WithdrawalApprovalDTO>(
      `${this.baseUrl}/${id}`
    );
    return await this.resolver[data.blockchain].reject(id);
  }
}
