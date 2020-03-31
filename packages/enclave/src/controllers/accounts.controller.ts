import express from 'express';
import { Account, AccountWithKey } from '@haechi-labs/henesis-wallet-core/lib/accounts';
import { Controller } from '../types';
import AbstractController from './controller';

export default class AccountsController extends AbstractController implements Controller {
  private path = '/api/v1/accounts';

  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(`${this.path}/login`, this.promiseWrapper(this.login));
  }

  private async login(req: express.Request): Promise<Account> {
    return await req.sdk.accounts.login(
      req.body.email,
      req.body.password,
      req.body.otpCode,
    );
  }
}
