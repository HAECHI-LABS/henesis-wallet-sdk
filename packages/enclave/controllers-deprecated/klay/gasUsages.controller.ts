import express from "express";
import { Method, MethodName } from "@haechi-labs/henesis-wallet-core";

import AbstractController from "../controller";
import { Controller } from "../../src/types";

export default class GasUsagesController
  extends AbstractController
  implements Controller {
  private path = "/api/v2/klay";

  constructor() {
    super();
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get(
      `${this.path}/method-gas-usages`,
      this.promiseWrapper(this.getMethodGasUsages)
    );
  }

  private async getMethodGasUsages(req: express.Request): Promise<Method> {
    return this.bnToHexString(
      await req.sdk.klay.gasUsages.getMethodGasUsages(
        req.query.name as MethodName
      )
    );
  }
}
