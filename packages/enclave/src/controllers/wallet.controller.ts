import express, { request } from 'express';
import {
  MasterWalletData, Transaction, UserWallet, UserWalletData,
} from '@haechi-labs/henesis-wallet-core/lib/wallet';
import { SDK } from '@haechi-labs/henesis-wallet-core';
import { BNConverter } from '@haechi-labs/henesis-wallet-core/lib/utils';
import { Ticker } from '@haechi-labs/henesis-wallet-core/lib/coins';
import BN from 'bn.js';
import { Controller } from '../types';
import AbstractController from './controller';

export interface NonceResponse {
  nonce: string
}

export interface BalanceResponse {
  coinType: string;
  amount: string;
  name: string;
  symbol: string;
}

interface TransferRequest {
  ticker: Ticker | string,
  to: string,
  amount: BN,
}

interface ContractCallRequest {
  contractAddress: string,
  value: BN,
  data: string,
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
      this.promiseWrapper(this.getUserWallets));

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets`,
      this.promiseWrapper(this.createUserWallet),
    );

    this.router.post(
      `${this.path}/:masterWalletId/contract-call`,
      this.promiseWrapper(this.sendMasterWalletContractCall),
    );

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/contract-call`,
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

    this.router.post(
      `${this.path}/:masterWalletId/transfer`,
      this.promiseWrapper(this.sendMasterWalletCoin),
    );

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/transfer`,
      this.promiseWrapper(this.sendUserWalletCoin),
    );

    this.router.post(
      `${this.path}/:masterWalletId/batch-transaction`,
      this.promiseWrapper(this.sendMasterWalletBatchTransactions),
    );
  }

  private async getMasterWallets(req: express.Request): Promise<MasterWalletData[]> {
    const wallets = await req.sdk.wallets.getMasterWallets();
    return wallets.map((x) => x.getData());
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
      req.body.salt ? BNConverter.hexStringToBN(req.body.salt) : undefined,
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
    return balances.map((x) => ({
      coinType: x.coinType,
      amount: BNConverter.bnToHexString(x.amount),
      name: x.name,
      symbol: x.symbol,
    }));
  }

  private async getUserWalletBalance(req: express.Request): Promise<BalanceResponse[]> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId,
    );
    const balances = await userWallet.getBalance();
    return balances.map((x) => ({
      coinType: x.coinType,
      amount: BNConverter.bnToHexString(x.amount),
      name: x.name,
      symbol: x.symbol,
    }));
  }

  private async getMasterWalletNonce(req: express.Request): Promise<NonceResponse> {
    const masterWallet = await req.sdk
      .wallets
      .getMasterWallet(req.params.masterWalletId);
    return {
      nonce: BNConverter.bnToHexString(await masterWallet.getNonce()),
    };
  }

  private async getUserWalletNonce(req: express.Request): Promise<NonceResponse> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId,
    );
    return {
      nonce: BNConverter.bnToHexString(await userWallet.getNonce()),
    };
  }

  private async sendMasterWalletContractCall(req: express.Request): Promise<Transaction> {
    const masterWallet = await req.sdk
      .wallets
      .getMasterWallet(req.params.masterWalletId);

    const transaction = await masterWallet.contractCall(
      req.body.contractAddress,
      BNConverter.hexStringToBN(req.body.value),
      req.body.data,
      req.body.passphrase,
    );

    return transaction;
  }

  private async sendUserWalletContractCall(req: express.Request): Promise<Transaction> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId,
    );

    return await userWallet.contractCall(
      req.body.contractAddress,
      BNConverter.hexStringToBN(req.body.value),
      req.body.data,
      req.body.passphrase,
    );
  }

  private async sendMasterWalletCoin(req: express.Request): Promise<Transaction> {
    const masterWallet = await req.sdk
      .wallets
      .getMasterWallet(req.params.masterWalletId);

    return await masterWallet.transfer(
      req.body.ticker,
      req.body.to,
      BNConverter.hexStringToBN(req.body.amount),
      req.body.passphrase,
      req.body.otp,
    );
  }

  private async sendUserWalletCoin(req: express.Request): Promise<Transaction> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId,
    );
    return await userWallet.transfer(
      Ticker[req.body.ticker],
      req.body.to,
      BNConverter.hexStringToBN(req.body.amount),
      req.body.passphrase,
      req.body.otp,
    );
  }

  private async getUserWallet(req: express.Request): Promise<UserWalletData> {
    return (await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId,
    )).getData();
  }

  private async getUserWalletByContext(sdk: SDK, masterWalletId: string, userWalletId: string): Promise<UserWallet> {
    return (await sdk.wallets.getMasterWallet(masterWalletId))
      .getUserWallet(userWalletId);
  }

  private async getUserWallets(req: express.Request): Promise<UserWalletData[]> {
    const masterWallet = await req.sdk.wallets.getMasterWallet(req.params.masterWalletId);
    const wallets = (await masterWallet.getUserWallets({
      page: +req.query.page,
      size: +req.query.size,
      sort: req.query.sort as string,
      name: req.query.name as string,
      address: req.query.address as string,
    })).results;
    return wallets.map((x) => x.getData());
  }

  private async sendMasterWalletBatchTransactions(req: express.Request): Promise<Transaction[]> {
    const masterWallet = await req.sdk
      .wallets
      .getMasterWallet(req.params.masterWalletId);

    const batch = masterWallet.createBatchRequest(req.body.otp);
    for (let request of req.body.requests) {
      let payload;
      if (this.isContractCallRequest(request)) {
        request = request as ContractCallRequest;
        payload = await masterWallet.buildContractCallPayload(
          request.contractAddress,
          BNConverter.hexStringToBN(request.value),
          request.data,
          req.body.passphrase,
        );
      }

      if (this.isTransferRequest(request)) {
        request = request as TransferRequest;
        payload = await masterWallet.buildContractCallPayload(
          request.contractAddress,
          BNConverter.hexStringToBN(request.value),
          request.data,
          req.body.passphrase,
        );
      }
      batch.add(payload);
    }

    return batch.execute();
  }


  private isContractCallRequest(request: any): request is ContractCallRequest {
    return (
      (request.contractAddress !== undefined)
      && (request.value !== undefined)
      && (request.data !== undefined)
    );
  }

  private isTransferRequest(request: any): request is TransferRequest {
    return (
      (request.ticker !== undefined)
      && (request.to !== undefined)
      && (request.amount !== undefined)
    );
  }
}
