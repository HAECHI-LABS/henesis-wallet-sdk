import { Client } from "./httpClient";
import { Pagination, PaginationOptions } from "./types";
import { makeQueryString } from "./utils/url";
import { PaginationWithdrawalApprovalDTO } from "./__generate__/accounts";
import BN from "bn.js";
import _ from "lodash";
import { BNConverter } from "./utils/common";

export interface WithdrawalApproval {
  id: string;
  masterWalletId: string;
  userWalletId: string;
  // todo: // sync with identity service dto
  // requester: {
  //   name: string;
  //   email: string;
  // };
  blockchain: string;
  coinSymbol: string;
  amount: BN;
  status: string;
  to: string;
  transactionId: string;
}

// todo: // sync with identity service dto
export enum PendingApprovalStatus {}

export class WithdrawalApprovals {
  private readonly client: Client;

  private readonly baseUrl = "/withdrawal-approvals";

  constructor(client: Client) {
    this.client = client;
  }

  async getWithdrawalApprovals(
    options: PaginationOptions
  ): Promise<Pagination<WithdrawalApproval>> {
    const queryString: string = makeQueryString(options);
    const data = await this.client.get<
      NoUndefinedField<PaginationWithdrawalApprovalDTO>
    >(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);

    return {
      pagination: data.pagination,
      results: data.results.map((data) => {
        return {
          ..._.omit(data, "approvedBy", "requester"),
          amount: BNConverter.hexStringToBN(data.amount),
        };
      }),
    };
  }
}
