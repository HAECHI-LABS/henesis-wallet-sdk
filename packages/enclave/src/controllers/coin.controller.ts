import express from 'express';
import AbstractController from "./controller";
import {Controller} from "../types";
import {CoinData} from "@haechi-labs/henesis-wallet-core/lib/wallets";
import {BlockchainType} from "@haechi-labs/henesis-wallet-core/lib/blockchain";

export default class CoinController extends AbstractController implements Controller {
    private path = '/api/v1/coins';

    constructor() {
        super();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(
          `${this.path}/:ticker`,
          this.promiseWrapper(this.getCoin)
        );

        this.router.get(
            `${this.path}`,
          this.promiseWrapper(this.getAllCoins)
        );
    }

    private async getCoin(req: express.Request): Promise<CoinData> {
        return await req.sdk
          .wallets
          .getCoinData(
            req.params.ticker,
            req.query.blockchain as BlockchainType,
          );
    }


    private async getAllCoins(req: express.Request): Promise<CoinData[]> {
        return await req.sdk
          .wallets
          .getCoinsData();
    }
}