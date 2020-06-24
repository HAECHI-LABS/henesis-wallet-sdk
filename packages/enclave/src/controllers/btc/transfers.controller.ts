import AbstractController from "../controller";
import { Controller } from "../../types";
import express, { request } from "express";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import { Transfer } from "@haechi-labs/henesis-wallet-core/lib/btc/transfers";

export default class TransfersController extends AbstractController
  implements Controller {
  private path = "/api/v2/btc/transfers";

  constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes() {
    this.router.get(`${this.path}`, this.promiseWrapper(this.getTransfers));
  }

  private async getTransfers(
    req: express.Request
  ): Promise<Pagination<Transfer>> {
    return await req.sdk.btc.transfers.getTransfers({
      page: +req.query.page,
      size: +req.query.size,
      sort: req.query.sort as string,
      walletId: req.query.walletId as string,
      transactionHash: req.query.transactionHash as string,
      address: req.query.address as string,
    });
  }
}
