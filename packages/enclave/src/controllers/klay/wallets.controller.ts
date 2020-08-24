import express from "express";
import BN from "bn.js";
import {
  EthMasterWalletData,
  EthTransaction,
  EthUserWallet,
  EthUserWalletData,
} from "@haechi-labs/henesis-wallet-core/lib/eth/wallet";
import { BNConverter, SDK } from "@haechi-labs/henesis-wallet-core";

import AbstractController from "../controller";
import { Controller } from "../../types";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";

interface Balance {
  coinType: string;
  amount: string;
  spendableAmount?: string;
  name: string;
  symbol: string;
}

interface Nonce {
  nonce: string;
}

interface ContractCallRequest {
  contractAddress: string;
  value: BN;
  data: string;
}

interface TransferRequest {
  ticker: string;
  to: string;
  amount: BN;
}

export default class WalletsController extends AbstractController
  implements Controller {
  private path = "/api/v2/klay/wallets";

  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(
      `${this.path}/:masterWalletId`,
      this.promiseWrapper(this.getMasterWallet)
    );

    this.router.get(`${this.path}`, this.promiseWrapper(this.getMasterWallets));

    this.router.post(
      `${this.path}`,
      this.promiseWrapper(this.createMasterWallet, 201)
    );

    this.router.post(
      `${this.path}/:masterWalletId/contract-call`,
      this.promiseWrapper(this.sendMasterWalletContractCall, 201)
    );

    this.router.patch(
      `${this.path}/:masterWalletId/name`,
      this.promiseWrapper(this.changeMasterWalletName)
    );

    this.router.get(
      `${this.path}/:masterWalletId/balance`,
      this.promiseWrapper(this.getMasterWalletBalance)
    );

    this.router.get(
      `${this.path}/:masterWalletId/nonce`,
      this.promiseWrapper(this.getMasterWalletNonce)
    );

    this.router.post(
      `${this.path}/:masterWalletId/transfer`,
      this.promiseWrapper(this.sendMasterWalletCoin, 201)
    );

    this.router.post(
      `${this.path}/:masterWalletId/transactions`,
      this.promiseWrapper(this.replaceMasterWalletTransaction, 201)
    );

    this.router.post(
      `${this.path}/:masterWalletId/batch-transactions`,
      this.promiseWrapper(this.sendMasterWalletBatchTransactions, 201)
    );

    this.router.post(
      `${this.path}/:masterWalletId/flush`,
      this.promiseWrapper(this.flush, 201)
    );

    this.router.get(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId`,
      this.promiseWrapper(this.getUserWallet)
    );

    this.router.get(
      `${this.path}/:masterWalletId/user-wallets`,
      this.promiseWrapper(this.getUserWallets)
    );

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets`,
      this.promiseWrapper(this.createUserWallet, 201)
    );

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/contract-call`,
      this.promiseWrapper(this.sendUserWalletContractCall, 201)
    );

    this.router.patch(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/name`,
      this.promiseWrapper(this.changeUserWalletName)
    );

    this.router.get(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/balance`,
      this.promiseWrapper(this.getUserWalletBalance)
    );

    this.router.get(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/nonce`,
      this.promiseWrapper(this.getUserWalletNonce)
    );

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/transfer`,
      this.promiseWrapper(this.sendUserWalletCoin, 201)
    );

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/transactions`,
      this.promiseWrapper(this.replaceUserWalletTransaction, 201)
    );

    this.router.patch(
      `${this.path}/:masterWalletId/passphrase`,
      this.promiseWrapper(this.changePassphrase)
    );

    this.router.post(
      `${this.path}/:masterWalletId/recreate`,
      this.promiseWrapper(this.retryCreateMasterWallet)
    );

    this.router.post(
      `${this.path}/:masterWalletId/user-wallets/:userWalletId/recreate`,
      this.promiseWrapper(this.retryCreateUserWallet)
    );
  }

  private async retryCreateMasterWallet(
    req: express.Request
  ): Promise<EthMasterWalletData> {
    const response = await req.sdk.klay.wallets.retryCreateMasterWallet(
      req.params.masterWalletId,
      req.body.gasPrice
        ? BNConverter.hexStringToBN(req.body.gasPrice)
        : undefined
    );
    return response.getData();
  }

  private async retryCreateUserWallet(
    req: express.Request
  ): Promise<EthUserWalletData> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
      req.params.masterWalletId
    );
    const response = await masterWallet.retryCreateUserWallet(
      req.params.userWalletId,
      req.body.gasPrice
        ? BNConverter.hexStringToBN(req.body.gasPrice)
        : undefined
    );
    return response.getData();
  }

  private async getMasterWallet(
    req: express.Request
  ): Promise<EthMasterWalletData> {
    return (
      await req.sdk.klay.wallets.getMasterWallet(req.params.masterWalletId)
    ).getData();
  }

  private async getMasterWallets(
    req: express.Request
  ): Promise<EthMasterWalletData[]> {
    return (await req.sdk.klay.wallets.getMasterWallets(req.query)).map((c) =>
      c.getData()
    );
  }

  private async createMasterWallet(
    req: express.Request
  ): Promise<EthMasterWalletData> {
    return (
      await req.sdk.klay.wallets.createMasterWallet(
        req.body.name,
        req.body.passphrase,
        req.body.gasPrice
          ? BNConverter.hexStringToBN(req.body.gasPrice)
          : undefined
      )
    ).getData();
  }

  private async sendMasterWalletContractCall(
    req: express.Request
  ): Promise<EthTransaction> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    return await masterWallet.contractCall(
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

  private async changeMasterWalletName(req: express.Request): Promise<void> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    return await masterWallet.changeName(req.body.name);
  }

  private async getMasterWalletBalance(
    req: express.Request
  ): Promise<Balance[]> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
      req.params.masterWalletId
    );
    const balances = await masterWallet.getBalance();
    return balances.map((c) => this.bnToHexString(c));
  }

  private async getMasterWalletNonce(req: express.Request): Promise<Nonce> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    return {
      nonce: BNConverter.bnToHexString(await masterWallet.getNonce()),
    };
  }

  private async sendMasterWalletCoin(
    req: express.Request
  ): Promise<EthTransaction> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
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

  private async replaceMasterWalletTransaction(
    req: express.Request
  ): Promise<EthTransaction> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    return await masterWallet.replaceTransaction(req.body.transactionId);
  }

  private async sendMasterWalletBatchTransactions(
    req: express.Request
  ): Promise<EthTransaction[]> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
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

  private async flush(req: express.Request): Promise<EthTransaction> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    return await masterWallet.flush(
      req.body.ticker,
      req.body.userWalletIds,
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

  private async getUserWallets(
    req: express.Request
  ): Promise<Pagination<EthUserWalletData>> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    const userWallets = await masterWallet.getUserWallets({
      page: +req.query.page,
      size: +req.query.size,
      sort: req.query.sort as string,
      name: req.query.name as string,
      address: req.query.address as string,
    });

    return this.pagination<EthUserWalletData>(req, {
      pagination: userWallets.pagination,
      results: userWallets.results.map((c) => c.getData()),
    });
  }

  private async createUserWallet(
    req: express.Request
  ): Promise<EthUserWalletData> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
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

  private async changeUserWalletName(req: express.Request): Promise<void> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId
    );

    return await userWallet.changeName(req.body.name);
  }

  private async getUserWalletBalance(req: express.Request): Promise<Balance[]> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId
    );

    const balances = await userWallet.getBalance();
    return balances.map((c) => this.bnToHexString(c));
  }

  private async getUserWalletNonce(req: express.Request): Promise<Nonce> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId
    );

    return {
      nonce: BNConverter.bnToHexString(await userWallet.getNonce()),
    };
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

  private async changePassphrase(req: express.Request): Promise<void> {
    const masterWallet = await req.sdk.klay.wallets.getMasterWallet(
      req.params.masterWalletId
    );

    return await masterWallet.changePassphrase(
      req.body.passphrase,
      req.body.newPassphrase,
      req.body.otpCode
    );
  }

  private async getUserWalletByContext(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string
  ): Promise<EthUserWallet> {
    return (
      await sdk.klay.wallets.getMasterWallet(masterWalletId)
    ).getUserWallet(userWalletId);
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
