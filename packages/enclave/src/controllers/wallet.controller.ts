import express from 'express';
import {MasterWalletData, UserWallet, UserWalletData} from '@haechi-labs/henesis-wallet-core/lib/wallet';
import {Pagination} from '@haechi-labs/henesis-wallet-core/lib/types';
import {SDK} from '@haechi-labs/henesis-wallet-core';
import BN from 'bn.js';
import {Controller} from '../types';
import AbstractController from './controller';

export interface Transaction {
  transactionId: string;
}

export interface NonceResponse {
  nonce: string
}

export interface BalanceResponse {
  coinType: string;
  amount: string;
  name: string;
  symbol: string;
}

export default class WalletController extends AbstractController implements Controller {
  private path = '/api/v1/wallets';

  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}`, this.promiseWrapper(this.getMasterWallets));

    this.router.post(`${this.path}`, this.promiseWrapper(this.createMasterWallet));

    this.router.get(`${this.path}/:masterWalletId/user-wallets`,
        this.promiseWrapper(this.getUserWallets)
    );

    this.router.post(
        `${this.path}/:masterWalletId/user-wallets`,
        this.promiseWrapper(this.createUserWallet),
    );

    this.router.post(
        `${this.path}/:masterWalletId/contractCall`,
        this.promiseWrapper(this.sendMasterWalletContractCall),
    );

    this.router.post(
        `${this.path}/:masterWalletId/user-wallets/:userWalletId/contractCall`,
        this.promiseWrapper(this.sendUserWalletContractCall),
    );

    this.router.get(
        `${this.path}/:masterWalletId`,
        this.promiseWrapper(this.getMasterWallet),
    );

    this.router.put(
        `${this.path}/:masterWalletId/passphrase`,
        this.promiseWrapper(this.changePassphrase),
    );

    this.router.get(
        `${this.path}/:masterWalletId/nonce`,
        this.promiseWrapper(this.getMasterWalletNonce),
    );

    this.router.get(
        `${this.path}/:masterWalletId/user-wallets/:userWalletId/nonce`,
        this.promiseWrapper(this.getUserWalletNonce),
    );

    this.router.get(
        `${this.path}/:masterWalletId/balance`,
        this.promiseWrapper(this.getMasterWalletBalance),
    );

    this.router.get(
        `${this.path}/:masterWalletId/user-wallets/:userWalletId`,
        this.promiseWrapper(this.getUserWallet),
    );

    this.router.get(
        `${this.path}/:masterWalletId/user-wallets/:userWalletId/balance`,
        this.promiseWrapper(this.getUserWalletBalance),
    );

    this.router.get(
        `${this.path}/:masterWalletId/user-wallets/:userWalletId/tokenBalance/Hib`,
        this.promiseWrapper(this.getUserWalletTokenBalance),
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

  private async getMasterWallets(req: express.Request): Promise<MasterWalletData[]> {
    const wallets = await req.sdk.wallets.getMasterWallets();
    return wallets.map(x => x.getData());
  }

  private async createMasterWallet(req: express.Request): Promise<MasterWalletData> {
    return (await req.sdk
        .wallets
        .createMasterWallet(
            req.body.name,
            req.body.blockchain,
            req.body.passphrase,
            req.body.pdfPath,
        )).getData();
  }

  private async changePassphrase(req: express.Request): Promise<void> {
    const masterWallet = await req.sdk
        .wallets
        .getMasterWallet(req.params.masterWalletId);
    return (await masterWallet.changePassphrase(
        req.body.passphrase,
        req.body.newPassphrase,
        req.body.otp,
    ));
  }

  private async createUserWallet(req: express.Request): Promise<UserWalletData> {
    const masterWallet = await req.sdk
        .wallets
        .getMasterWallet(req.params.masterWalletId);

    return (await masterWallet.createUserWallet(
        req.body.name,
        req.body.passphrase,
        req.body.salt,
    )).getData();
  }

  private async getMasterWallet(req: express.Request): Promise<MasterWalletData> {
    const masterWallet = await req.sdk
        .wallets
        .getMasterWallet(req.params.masterWalletId);

    return (masterWallet.getData());
  }

  private async getMasterWalletBalance(req: express.Request): Promise<BalanceResponse[]> {
    const masterWallet = await req.sdk
        .wallets
        .getMasterWallet(req.params.masterWalletId);

    const balances = await masterWallet.getBalance();
    return balances.map(x => {
      return {
        coinType: x.coinType,
        amount: x.amount.toString(),
        name: x.name,
        symbol: x.symbol
      };
    });
  }

  private async getUserWalletBalance(req: express.Request): Promise<BalanceResponse[]> {
    const userWallet = await this.getUserWallet(
        req.sdk,
        req.params.masterWalletId,
        req.params.userWalletId,
    );
    const balances = await userWallet.getBalance();
    return balances.map(x => {
      return {
        coinType: x.coinType,
        amount: x.amount.toString(),
        name: x.name,
        symbol: x.symbol
      };
    });
  }

  private async getUserWalletTokenBalance(req: express.Request): Promise<any> {
    const userWallet = await this.getUserWallet(
        req.sdk,
        req.params.masterWalletId,
        req.params.userWalletId,
    );
    const balances = await userWallet.getBalance();
    const hibBalance  = balances.filter(x => x.name === "hib")[0]
    return {
      coinType: hibBalance.coinType,
      balance: hibBalance.amount.toString(),
      name: hibBalance.name,
      symbol: hibBalance.symbol
    };
  }


  private async getMasterWalletNonce(req: express.Request): Promise<NonceResponse> {
    const masterWallet = await req.sdk
        .wallets
        .getMasterWallet(req.params.masterWalletId);
    return {
      nonce: (await masterWallet.getNonce()).toString()
    };
  }

  private async getUserWalletNonce(req: express.Request): Promise<NonceResponse> {
    const userWallet = await this.getUserWallet(
        req.sdk,
        req.params.masterWalletId,
        req.params.userWalletId,
    );
    return {
      nonce: (await userWallet.getNonce()).toString()
    };
  }

  private async sendMasterWalletContractCall(req: express.Request): Promise<Transaction> {
    const masterWallet = await req.sdk
        .wallets
        .getMasterWallet(req.params.masterWalletId);

    const transaction = await masterWallet.contractCall(
        req.body.contractAddress,
        new BN(`${req.body.value}`),
        req.body.data,
        req.body.passphrase,
    );

    return {
      transactionId: transaction.id,
    };
  }

  private async sendUserWalletContractCall(req: express.Request): Promise<Transaction> {
    const userWallet = await this.getUserWallet(
        req.sdk,
        req.params.masterWalletId,
        req.params.userWalletId,
    );

    const transaction = await userWallet.contractCall(
        req.body.contractAddress,
        new BN(`${req.body.value}`),
        req.body.data,
        req.body.passphrase,
    );

    return {
      transactionId: transaction.id,
    };
  }

  private async sendMasterWalletCoin(req: express.Request): Promise<Transaction> {
    const masterWallet = await req.sdk
        .wallets
        .getMasterWallet(req.params.masterWalletId);

    const transaction = await masterWallet.transfer(
      req.body.ticker,
      req.body.to,
      new BN(`${req.body.amount}`),
      req.body.passphrase,
      req.body.otp,
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
        new BN(`${req.body.amount}`),
        req.body.passphrase,
        req.body.otp,
    );

    return {
      transactionId: transaction.id,
    };
  }

  private async getUserWallet(sdk: SDK, masterWalletId: string, userWalletId: string): Promise<UserWallet> {
    return (await sdk.wallets.getMasterWallet(masterWalletId))
        .getUserWallet(userWalletId);
  }

  private async getUserWallets(req: express.Request): Promise<UserWalletData[]> {
    const masterWallet = await req.sdk.wallets.getMasterWallet(req.params.masterWalletId);
    let wallets;
    if ( req.params.page )
      wallets = (await masterWallet.getUserWallets({
        page: +req.params.page,
        size: +req.params.size,
        sort: req.params.sort,
        name: req.params.name,
        address: req.params.address
      })).results;
    else
      wallets = (await masterWallet.getUserWallets()).results;
    return wallets.map(x => x.getData());
  }
}
