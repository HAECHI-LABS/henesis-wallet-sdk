import express from "express";
import { Method, MethodName } from "@haechi-labs/henesis-wallet-core";

import AbstractController from "../controller";
import { Controller } from "../../types";

export default class GasUsagesController extends AbstractController
  implements Controller {
  private path = "/api/v2/eth";

  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(
      `${this.path}/method-gas-usages`,
      this.promiseWrapper(this.getMethodGasUsages)
    );
  }

  private async getMethodGasUsages(req: express.Request): Promise<Method> {
    return await req.sdk.eth.gasusages.getMethodGasUsages(
      req.query.name as MethodName
    );
  }
}
