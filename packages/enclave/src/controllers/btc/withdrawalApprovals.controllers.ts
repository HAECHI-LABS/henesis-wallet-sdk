import AbstractController from "../controller";
import { Controller } from "../../types";
import express from "express";
import { WithdrawalApproval } from "@haechi-labs/henesis-wallet-core/lib/withdrawalApprovals";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import { TransferResponse } from "./transfers.controller";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";

export default class WithdrawalApprovalsController extends AbstractController
  implements Controller {
  private path = "/api/v2/btc/withdrawal-approvals";

  constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes() {
    this.router.get(
      `${this.path}/:withdrawalApprovalId`,
      this.promiseWrapper(this.getWithdrawalApprovalById)
    );

    this.router.get(
      `${this.path}`,
      this.promiseWrapper(this.getWithdrawalApprovals)
    );
  }

  private async getWithdrawalApprovalById(
    req: express.Request
  ): Promise<WithdrawalApproval> {
    return this.bnToHexString<WithdrawalApproval>(
      await req.sdk.withdrawalApproval.getWithdrawalApprovalById(
        req.params.withdrawalApprovalId
      )
    );
  }

  private async getWithdrawalApprovals(
    req: express.Request
  ): Promise<Pagination<WithdrawalApproval>> {
    const response = await req.sdk.withdrawalApproval.getWithdrawalApprovals(
      req.query
    );

    return this.pagination<WithdrawalApproval>(req, {
      pagination: response.pagination,
      results: response.results.map((c) => this.bnToHexString(c)),
    });
  }
}
