import express from "express";

import AbstractController from "../controller";
import { Controller } from "../../src/types";
import { CoinData } from "@haechi-labs/henesis-wallet-core";

export default class CoinsController
  extends AbstractController
  implements Controller {
  private path = "/api/v2/eth/coins";

  constructor() {
    super();
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get(`${this.path}/:ticker`, this.promiseWrapper(this.getCoin));

    this.router.get(`${this.path}`, this.promiseWrapper(this.getAllCoins));
  }

  private async getCoin(req: express.Request): Promise<CoinData> {
    return (await req.sdk.eth.coins.getCoin(req.params.ticker)).getCoinData();
  }

  private async getAllCoins(req: express.Request): Promise<CoinData[]> {
    return (
      await req.sdk.eth.coins.getCoins(req.query.flag === "true")
    ).map((c) => c.getCoinData());
  }
}
