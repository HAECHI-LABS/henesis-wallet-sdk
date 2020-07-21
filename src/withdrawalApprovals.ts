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

export import WithdrawalApprovalStatus = WithdrawalApprovalDTO.StatusEnum;

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
}
