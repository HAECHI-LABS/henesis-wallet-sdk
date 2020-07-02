import AbstractController from "../controller";
import { Controller } from "../../types";
import express from "express";

export default class TransfersController extends AbstractController
  implements Controller {
  private path = "/api/v2/btc/transfers";

  constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes() {
    this.router.get(`${this.path}`, this.promiseWrapper(this.getTransfers));
    this.router.get(
      `${this.path}/:walletId`,
      this.promiseWrapper(this.getTransfer)
    );
  }

  private async getTransfers(req: express.Request): Promise<any> {
    const data = await req.sdk.btc.transfers.getTransfers(req.query);
    return this.pagination<any>(req, {
      pagination: data.pagination,
      results: data.results.map((t) => this.bnToHexString(t)),
    });
  }

  private async getTransfer(req: express.Request): Promise<any> {
    return req.sdk.btc.transfers.getTransfer(req.params.walletId);
  }
}
