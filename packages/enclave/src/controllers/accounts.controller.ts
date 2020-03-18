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
    this.router.get(`${this.path}/me`, this.promiseWrapper(this.me));
    this.router.post(`${this.path}/login`, this.promiseWrapper(this.login));
    this.router.post(`${this.path}/token`, this.promiseWrapper(this.token));
    this.router.post(`${this.path}/secret`, this.promiseWrapper(this.secret));
  }

  private async me(req: express.Request): Promise<AccountWithKey> {
    return await req.sdk.accounts.get();
  }

  private async token(req: express.Request) {
    return await req.sdk.accounts.token(
      req.body.expiresIn,
    );
  }

  private async secret(req: express.Request) {
    return await req.sdk.accounts.secret(
      req.body.email,
      req.body.password,
    );
  }

  private async login(req: express.Request): Promise<Account> {
    return await req.sdk.accounts.login(
      req.body.email,
      req.body.password,
    );
  }
}
