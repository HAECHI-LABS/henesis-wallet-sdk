import express from "express";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import { Transaction } from "@haechi-labs/henesis-wallet-core";

import AbstractController from "../controller";
import { Controller } from "../../src/types";

export default class TransactionsController
  extends AbstractController
  implements Controller {
  private path = "/api/v2/eth/transactions";

  constructor() {
    super();
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get(
      `${this.path}`,
      this.promiseWrapper(this.getAllTransactions)
    );

    this.router.get(
      `${this.path}/:transactionId`,
      this.promiseWrapper(this.getTransaction)
    );
  }

  private async getAllTransactions(
    req: express.Request
  ): Promise<Pagination<Transaction>> {
    const transaction = await req.sdk.eth.transactions.getTransactions(
      req.query
    );
    return this.pagination<Transaction>(req, {
      pagination: transaction.pagination,
      results: transaction.results.map((c) => this.bnToHexString(c)),
    });
  }

  private async getTransaction(req: express.Request): Promise<Transaction> {
    return this.bnToHexString(
      await req.sdk.eth.transactions.getTransaction(req.params.transactionId)
    );
  }
}
