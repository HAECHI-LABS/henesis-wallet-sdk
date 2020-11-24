import { Client } from "./httpClient";
import { Pagination, PaginationOptions } from "./types";
import { makeQueryString } from "./utils/url";
import {
  PaginationWithdrawalApprovalDTO,
  WithdrawalApprovalDTO,
  WithdrawalApprovalStatus,
} from "./__generate__/accounts";
import BN from "bn.js";
import _ from "lodash";
import { BNConverter } from "./utils/common";
import { BlockchainType, transformBlockchainType } from "./blockchain";

export import WithdrawalApprovalStatus = WithdrawalApprovalStatus;

export type WithdrawalApproval = Omit<
  WithdrawalApprovalDTO,
  "approvedBy" | "amount" | "status" | "blockchain"
> & {
  amount: BN;
  status: WithdrawalApprovalStatus;
  blockchain: BlockchainType;
};

export interface ApproveWithdrawal extends WithdrawalApproval {
  passphrase: string;
  otpCode: string;
}

export class WithdrawalApprovals {
  private readonly client: Client;

  private readonly baseUrl = "/withdrawal-approvals";

  constructor(client: Client) {
    this.client = client;
  }

  async getWithdrawalApprovalById(
    withdrawalApprovalId: string
  ): Promise<WithdrawalApproval> {
    const data = await this.client.get<WithdrawalApprovalDTO>(
      `${this.baseUrl}/${withdrawalApprovalId}`
    );
    return {
      ..._.omit(data, "approvedBy"),
      amount: BNConverter.hexStringToBN(data.amount),
      blockchain: transformBlockchainType(data.blockchain),
    };
  }

  async getWithdrawalApprovals(
    options: PaginationOptions
  ): Promise<Pagination<WithdrawalApproval>> {
    const queryString = makeQueryString(options);
    const data = await this.client.get<PaginationWithdrawalApprovalDTO>(
      `${this.baseUrl}${queryString ? `?${queryString}` : ""}`
    );
    return {
      pagination: data.pagination,
      results: data.results.map((data) => {
        return {
          ..._.omit(data, "approvedBy"),
          amount: BNConverter.hexStringToBN(data.amount),
          blockchain: transformBlockchainType(data.blockchain),
        };
      }),
    };
  }
}
