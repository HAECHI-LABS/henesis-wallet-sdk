import express from 'express';
import { MasterWalletData, UserWallet, UserWalletData } from '@haechi-labs/henesis-wallet-core/lib/wallet';
import { SDK } from '@haechi-labs/henesis-wallet-core';
import { Controller } from '../types';
import AbstractController from './controller';

export interface Transaction {
  transactionId: string;
}

export interface NonceResponse {
  nonce: number
}

export interface BalanceResponse {
  balance: number
}


export default class WalletController extends AbstractController implements Controller {
  private path = '/api/v1/wallets';

  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(`${this.path}`, this.promiseWrapper(this.createMasterWallet));
    this.router.post(
      `${this.path}/:masterWalletId/user-wallets`,
      this.promiseWrapper(this.createUserWallet),
    );

    this.router.post(
      `${this.path}/:masterWalletId/transactions`,
      this.promiseWrapper(this.sendMasterWalletTransaction),
    );
    this.router.post(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/transactions`,
      this.promiseWrapper(this.sendUserWalletTransaction),
    );

    this.router.get(
      `${this.path}/:masterWalletId/balance`,
      this.promiseWrapper(this.getMasterWalletBalance),
    );
    this.router.get(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/balance`,
      this.promiseWrapper(this.getUserWalletBalance),
    );

    this.router.post(
      `${this.path}/:masterWalletId/transfer`,
      this.promiseWrapper(this.sendMasterWalletCoin),
    );
    this.router.post(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/transfer`,
      this.promiseWrapper(this.sendUserWalletCoin),
    );
  }

  private async createMasterWallet(req: express.Request): Promise<MasterWalletData> {
    return (await req.sdk
      .wallets
      .createMasterWallet(
        req.body.name,
        req.body.blockchain,
        req.body.passphrase,
      )).getData();
  }

  private async createUserWallet(req: express.Request): Promise<UserWalletData> {
    const masterWallet = await req.sdk
      .wallets
      .getMasterWallet(req.params.masterWalletId);

    return (await masterWallet.createUserWallet(
      req.body.name,
      req.body.passphrase,
    )).getData();
  }

  private async getMasterWalletBalance(req: express.Request): Promise<BalanceResponse> {
    const masterWallet = await req.sdk
      .wallets
      .getMasterWallet(req.params.masterWalletId);

    return {
      balance: (await masterWallet.getBalance()).toNumber(),
    };
  }

  private async getUserWalletBalance(req: express.Request): Promise<BalanceResponse> {
    const userWallet = await this.getUserWallet(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId,
    );
    return {
      balance: (await userWallet.getBalance()).toNumber(),
    };
  }

  private async sendMasterWalletTransaction(req: express.Request): Promise<Transaction> {
    return null;
  }

  private async sendUserWalletTransaction(req: express.Request): Promise<Transaction> {
    return null;
  }

  private async sendMasterWalletCoin(req: express.Request): Promise<Transaction> {
    const masterWallet = await req.sdk
      .wallets
      .getMasterWallet(req.params.masterWalletId);

    const transaction = await masterWallet.transfer(
      req.body.ticker,
      req.body.to,
      req.body.amount,
      req.body.passphrase,
    );

    return {
      transactionId: transaction.id,
    };
  }

  private async sendUserWalletCoin(req: express.Request): Promise<Transaction> {
    const userWallet = await this.getUserWallet(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId,
    );

    const transaction = await userWallet.transfer(
      req.body.ticker,
      req.body.to,
      req.body.amount,
      req.body.passphrase,
    );

    return {
      transactionId: transaction.id,
    };
  }

  private async getUserWallet(sdk: SDK, masterWalletId: string, userWalletId: string): Promise<UserWallet> {
    return (await sdk.wallets.getMasterWallet(masterWalletId))
      .getUserWallet(userWalletId);
  }
}
