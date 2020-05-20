import AbstractController from './controller';
import { Controller } from '../types';
import {Transaction} from "@haechi-labs/henesis-wallet-core/lib/transactions";
import {Pagination} from "@haechi-labs/henesis-wallet-core/lib/types";
import express from 'express';
import {BlockchainType} from "@haechi-labs/henesis-wallet-core/lib/blockchain";

export default class TransactionController extends AbstractController implements Controller {
    private path = '/api/v1/transactions';

    constructor() {
      super();
      this.initRoutes();
    }

    public initRoutes() {
      this.router.get(
        `${this.path}`,
        this.promiseWrapper(this.getAllTransactions)
      );

      this.router.get(
        `${this.path}/:transactionId`,
        this.promiseWrapper(this.getTransactionById)
      );
    }

    private async getAllTransactions(req: express.Request): Promise<Pagination<Transaction>> {
      return await req.sdk.transactions.getTransactions(
        req.query.blockchain as BlockchainType,
        req.query,
      );
    }

    private async getTransactionById(req: express.Request): Promise<Transaction> {
      return await req.sdk.transactions.getTransaction(
        req.query.blockchain as BlockchainType,
        req.params.transactionId,
      );
    }
}
