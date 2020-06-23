import express, { request } from "express";
import {
  EthMasterWalletData,
  EthTransaction,
  EthUserWallet,
  EthUserWalletData,
} from "@haechi-labs/henesis-wallet-core/lib/eth/wallet";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { BNConverter } from "@haechi-labs/henesis-wallet-core/lib/utils/common";
import BN from "bn.js";
import { Controller } from "../types";
import AbstractController from "./controller";

export interface NonceResponse {
  nonce: string;
}

export interface BalanceResponse {
  coinType: string;
  amount: string;
  name: string;
  symbol: string;
}

interface TransferRequest {
  ticker: string;
  to: string;
  amount: BN;
}

interface ContractCallRequest {
  contractAddress: string;
  value: BN;
  data: string;
}

export default class WalletController extends AbstractController
  implements Controller {
  private path = "/api/v1/wallets";

  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}`, this.promiseWrapper(this.getMasterWallets));

    this.router.post(
      `${this.path}`,
      this.promiseWrapper(this.createMasterWallet, 201)
    );

    this.router.get(
      `${this.path}/:masterWalletId/user-wallets`,
      this.promiseWrapper(this.getUserWallets)
    );

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets`,
      this.promiseWrapper(this.createUserWallet)
    );

    this.router.post(
      `${this.path}/:masterWalletId/contract-call`,
      this.promiseWrapper(this.sendMasterWalletContractCall)
    );

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/contract-call`,
      this.promiseWrapper(this.sendUserWalletContractCall)
    );

    this.router.get(
      `${this.path}/:masterWalletId`,
      this.promiseWrapper(this.getMasterWallet)
    );

    this.router.put(
      `${this.path}/:masterWalletId/passphrase`,
      this.promiseWrapper(this.changePassphrase)
    );

    this.router.get(
      `${this.path}/:masterWalletId/nonce`,
      this.promiseWrapper(this.getMasterWalletNonce)
    );

    this.router.post(
      `${this.path}/:masterWalletId/transactions`,
      this.promiseWrapper(this.replaceMasterWalletTransaction, 201)
    );

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/transactions`,
      this.promiseWrapper(this.replaceUserWalletTransaction)
    );

    this.router.get(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/nonce`,
      this.promiseWrapper(this.getUserWalletNonce)
    );

    this.router.get(
      `${this.path}/:masterWalletId/balance`,
      this.promiseWrapper(this.getMasterWalletBalance)
    );

    this.router.get(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId`,
      this.promiseWrapper(this.getUserWallet)
    );

    this.router.get(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/balance`,
      this.promiseWrapper(this.getUserWalletBalance)
    );

    this.router.post(
      `${this.path}/:masterWalletId/transfer`,
      this.promiseWrapper(this.sendMasterWalletCoin)
    );

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/transfer`,
      this.promiseWrapper(this.sendUserWalletCoin)
    );

    this.router.post(
      `${this.path}/:masterWalletId/batch-transactions`,
      this.promiseWrapper(this.sendMasterWalletBatchTransactions, 201)
    );
  }

  private async getMasterWallets(
    req: express.Request
  ): Promise<EthMasterWalletData[]> {
    const options = req.query;
    const wallets = await req.sdk.eth.wallets.getMasterWallets(options);;
    return wallets.map((x) => x.getData());
  }

  private async createMasterWallet(
    req: express.Request
  ): Promise<EthMasterWalletData> {
    return (
      await req.sdk.eth.wallets.createMasterWallet(
        req.body.name,
        req.body.passphrase,
        req.body.gasPrice
          ? BNConverter.hexStringToBN(req.body.gasPrice)
          : undefined
      )
    ).getData();
  }

  private async changePassphrase(req: express.Request): Promise<void> {
    const masterWallet = await req.sdk.eth.wallets.getMasterWallet(
      req.params.masterWalletId
    );
    return await masterWallet.changePassphrase(
      req.body.passphrase,
      req.body.newPassphrase,
      req.body.otpCode
    );
  }

  private async createUserWallet(
    req: express.Request
  ): Promise<EthUserWalletData> {
    const masterWallet = await req.sdk.eth.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    return (
      await masterWallet.createUserWallet(
        req.body.name,
        req.body.passphrase,
        req.body.gasPrice
          ? BNConverter.hexStringToBN(req.body.gasPrice)
          : undefined,
        req.body.salt ? BNConverter.hexStringToBN(req.body.salt) : undefined
      )
    ).getData();
  }

  private async getMasterWallet(
    req: express.Request
  ): Promise<EthMasterWalletData> {
    const masterWallet = await req.sdk.eth.wallets.getMasterWallet(
      req.params.masterWalletId
    );
    return masterWallet.getData();
  }

  private async getMasterWalletBalance(
    req: express.Request
  ): Promise<BalanceResponse[]> {
    const masterWallet = await req.sdk.eth.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    const balances = await masterWallet.getBalance();
    return balances.map((x) => ({
      coinType: x.coinType,
      amount: BNConverter.bnToHexString(x.amount),
      name: x.name,
      symbol: x.symbol,
    }));
  }

  private async getUserWalletBalance(
    req: express.Request
  ): Promise<BalanceResponse[]> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId
    );
    const balances = await userWallet.getBalance();
    return balances.map((x) => ({
      coinType: x.coinType,
      amount: BNConverter.bnToHexString(x.amount),
      name: x.name,
      symbol: x.symbol,
    }));
  }

  private async getMasterWalletNonce(
    req: express.Request
  ): Promise<NonceResponse> {
    const masterWallet = await req.sdk.eth.wallets.getMasterWallet(
      req.params.masterWalletId
    );
    return {
      nonce: BNConverter.bnToHexString(await masterWallet.getNonce()),
    };
  }

  private async getUserWalletNonce(
    req: express.Request
  ): Promise<NonceResponse> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId
    );
    return {
      nonce: BNConverter.bnToHexString(await userWallet.getNonce()),
    };
  }

  private async replaceMasterWalletTransaction(
    req: express.Request
  ): Promise<EthTransaction> {
    const masterWallet = await req.sdk.eth.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    return await masterWallet.replaceTransaction(req.body.transactionId);
  }

  private async replaceUserWalletTransaction(
    req: express.Request
  ): Promise<EthTransaction> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId
    );

    return await userWallet.replaceTransaction(req.body.transactionId);
  }

  private async sendMasterWalletContractCall(
    req: express.Request
  ): Promise<EthTransaction> {
    const masterWallet = await req.sdk.eth.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    const transaction = await masterWallet.contractCall(
      req.body.contractAddress,
      BNConverter.hexStringToBN(req.body.value),
      req.body.data,
      req.body.passphrase,
      req.body.otpCode,
      req.body.gasPrice
        ? BNConverter.hexStringToBN(req.body.gasPrice)
        : undefined,
      req.body.gasLimit
        ? BNConverter.hexStringToBN(req.body.gasLimit)
        : undefined
    );

    return transaction;
  }

  private async sendUserWalletContractCall(
    req: express.Request
  ): Promise<EthTransaction> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId
    );

    return await userWallet.contractCall(
      req.body.contractAddress,
      BNConverter.hexStringToBN(req.body.value),
      req.body.data,
      req.body.passphrase,
      req.body.otpCode,
      req.body.gasPrice
        ? BNConverter.hexStringToBN(req.body.gasPrice)
        : undefined,
      req.body.gasLimit
        ? BNConverter.hexStringToBN(req.body.gasLimit)
        : undefined
    );
  }

  private async sendMasterWalletCoin(
    req: express.Request
  ): Promise<EthTransaction> {
    const masterWallet = await req.sdk.eth.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    return await masterWallet.transfer(
      req.body.ticker,
      req.body.to,
      BNConverter.hexStringToBN(req.body.amount),
      req.body.passphrase,
      req.body.otpCode,
      req.body.gasPrice
        ? BNConverter.hexStringToBN(req.body.gasPrice)
        : undefined,
      req.body.gasLimit
        ? BNConverter.hexStringToBN(req.body.gasLimit)
        : undefined
    );
  }

  private async sendUserWalletCoin(
    req: express.Request
  ): Promise<EthTransaction> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId
    );
    return await userWallet.transfer(
      req.body.ticker,
      req.body.to,
      BNConverter.hexStringToBN(req.body.amount),
      req.body.passphrase,
      req.body.otpCode,
      req.body.gasPrice
        ? BNConverter.hexStringToBN(req.body.gasPrice)
        : undefined,
      req.body.gasLimit
        ? BNConverter.hexStringToBN(req.body.gasLimit)
        : undefined
    );
  }

  private async getUserWallet(
    req: express.Request
  ): Promise<EthUserWalletData> {
    return (
      await this.getUserWalletByContext(
        req.sdk,
        req.params.masterWalletId,
        req.params.userWalletId
      )
    ).getData();
  }

  private async getUserWalletByContext(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string
  ): Promise<EthUserWallet> {
    return (
      await sdk.eth.wallets.getMasterWallet(masterWalletId)
    ).getUserWallet(userWalletId);
  }

  private async getUserWallets(
    req: express.Request
  ): Promise<EthUserWalletData[]> {
    const masterWallet = await req.sdk.eth.wallets.getMasterWallet(
      req.params.masterWalletId
    );
    const wallets = (
      await masterWallet.getUserWallets({
        page: +req.query.page,
        size: +req.query.size,
        sort: req.query.sort as string,
        name: req.query.name as string,
        address: req.query.address as string,
      })
    ).results;
    return wallets.map((x) => x.getData());
  }

  private async sendMasterWalletBatchTransactions(
    req: express.Request
  ): Promise<EthTransaction[]> {
    const masterWallet = await req.sdk.eth.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    const batch = masterWallet.createBatchRequest(req.body.otpCode);
    for (let request of req.body.requests) {
      let payload;
      if (this.isContractCallRequest(request)) {
        request = request as ContractCallRequest;
        payload = await masterWallet.buildContractCallPayload(
          request.contractAddress,
          BNConverter.hexStringToBN(request.value),
          request.data,
          req.body.passphrase
        );
      }

      if (this.isTransferRequest(request)) {
        request = request as TransferRequest;
        payload = await masterWallet.buildTransferPayload(
          request.ticker,
          request.to,
          BNConverter.hexStringToBN(request.amount),
          req.body.passphrase
        );
      }

      if (!payload) {
        throw new Error("invalid batch transactions request format");
      }
      batch.add(payload);
    }

    return batch.execute();
  }

  private isContractCallRequest(request: any): request is ContractCallRequest {
    return (
      request.contractAddress !== undefined &&
      request.value !== undefined &&
      request.data !== undefined
    );
  }

  private isTransferRequest(request: any): request is TransferRequest {
    return (
      request.ticker !== undefined &&
      request.to !== undefined &&
      request.amount !== undefined
    );
  }
}
