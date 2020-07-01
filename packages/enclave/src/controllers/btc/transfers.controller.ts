import AbstractController from "../controller";
import { Controller } from "../../types";
import express from "express";
import {
  TransferStatus
} from "@haechi-labs/henesis-wallet-core/lib/btc/transfers";

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

  private async getTransfers(req: express.Request): Promise<any> {
    const data = await req.sdk.btc.transfers.getTransfers(req.query);
    return this.pagination<any>(req, {
      pagination: data.pagination,
      results: data.results.map(t => this.bnToHexString(t))
    });
  }
}
