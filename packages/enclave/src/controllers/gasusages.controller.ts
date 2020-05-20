import AbstractController from './controller';
import { Controller } from '../types';
import {Method, MethodName} from "@haechi-labs/henesis-wallet-core/lib/gasusages";
import express from 'express';
import {BlockchainType} from "@haechi-labs/henesis-wallet-core/lib/blockchain";

export default class GasUsagesController extends AbstractController implements Controller {
    private path = '/api/v1';

    constructor() {
      super();
      this.initRoutes();
    }

    public initRoutes() {
      this.router.get(
        `${this.path}/method-gas-usages`,
        this.promiseWrapper(this.getMethodGasUsages)
      )
    }

    private async getMethodGasUsages(req: express.Request): Promise<Method> {
      return await req.sdk.gasusages.getMethodGasUsages(
        req.query.blockchain as BlockchainType,
        req.query.name as MethodName,
      );
    }
}
