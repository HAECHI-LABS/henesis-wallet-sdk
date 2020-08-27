import express from "express";

import AbstractController from "../controller";
import { Controller } from "../../types";
import { CoinDTO } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";

export default class CoinsController
  extends AbstractController
  implements Controller {
  private path = "/api/v2/klay/coins";

  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}/:ticker`, this.promiseWrapper(this.getCoin));

    this.router.get(`${this.path}`, this.promiseWrapper(this.getAllCoins));
  }

  private async getCoin(req: express.Request): Promise<CoinDTO> {
    return (await req.sdk.klay.coins.getCoin(req.params.ticker)).getCoinData();
  }

  private async getAllCoins(req: express.Request): Promise<CoinDTO[]> {
    return (await req.sdk.klay.coins.getCoins()).map((c) => c.getCoinData());
  }
}
