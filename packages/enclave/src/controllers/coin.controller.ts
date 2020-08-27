import express from 'express';
import { CoinData } from '@haechi-labs/henesis-wallet-core/lib/coin';
import AbstractController from './controller';
import { Controller } from '../types';
import { BlockchainType } from '@haechi-labs/henesis-wallet-core/lib/types';

export default class CoinController
  extends AbstractController
  implements Controller {
  private path = '/api/v1/coins';

  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}/:ticker`, this.promiseWrapper(this.getCoin));

    this.router.get(`${this.path}`, this.promiseWrapper(this.getAllCoins));
  }

  private async getCoin(req: express.Request): Promise<CoinData> {
    return (
      await req.sdk.coins.getCoin(
        req.params.ticker,
        req.query.blockchain as BlockchainType,
      )
    ).getCoinData();
  }

  private async getAllCoins(req: express.Request): Promise<CoinData[]> {
    return (await req.sdk.coins.getCoins()).map((c) => c.getCoinData());
  }
}
