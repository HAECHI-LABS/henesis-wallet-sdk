import AbstractController from "../controller";
import { Controller } from "../../types";
import express from "express";
import {
  BtcEstimatedFee,
  BtcMasterWalletData,
  DepositAddress,
} from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import { Transfer } from "@haechi-labs/henesis-wallet-core/lib/btc/transfers";
import { TransferResponse } from "./transfers.controller";

export interface BalanceResponse {
  coinType: string;
  amount: string;
  name: string;
  symbol: string;
}

export interface Boolean {
  value: boolean;
}

export default class WalletsController extends AbstractController
  implements Controller {
  private path = "/api/v2/btc/wallets";

  constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes() {
    this.router.get(`${this.path}`, this.promiseWrapper(this.getWallets));
    this.router.get(
      `${this.path}/:walletId`,
      this.promiseWrapper(this.getWallet)
    );
    this.router.patch(
      `${this.path}/:walletId/name`,
      this.promiseWrapper(this.changeWalletName)
    );
    this.router.patch(
      `${this.path}/:walletId/passphrase`,
      this.promiseWrapper(this.changePassphrase)
    );
    this.router.get(
      `${this.path}/:walletId/balance`,
      this.promiseWrapper(this.getWalletBalance)
    );
    this.router.get(
      `${this.path}/:walletId/estimated-fee`,
      this.promiseWrapper(this.getEstimatedFee)
    );
    this.router.post(
      `${this.path}/:walletId/deposit-addresses`,
      this.promiseWrapper(this.createDepositAddress)
    );
    this.router.get(
      `${this.path}/:walletId/deposit-addresses`,
      this.promiseWrapper(this.getDepositAddresses)
    );
    this.router.get(
      `${this.path}/:walletId/deposit-addresses/:depositAddressId`,
      this.promiseWrapper(this.getDepositAddress)
    );
    this.router.post(
      `${this.path}/verify-address`,
      this.promiseWrapper(this.verifyAddress)
    );
    this.router.post(
      `${this.path}/:walletId/transfer`,
      this.promiseWrapper(this.transfer)
    );
  }

  private async getWallets(
    req: express.Request
  ): Promise<BtcMasterWalletData[]> {
    const options = req.query;
    const wallets = await req.sdk.btc.wallets.getMasterWallets(options);
    return wallets.map((x) => x.getData());
  }

  private async getWallet(req: express.Request): Promise<BtcMasterWalletData> {
    const wallet = await req.sdk.btc.wallets.getWallet(req.params.walletId);
    return wallet.getData();
  }

  private async verifyAddress(req: express.Request): Promise<Boolean> {
    return {
      value: req.sdk.btc.wallets.verifyAddress(req.body.address),
    };
  }

  private async transfer(req: express.Request): Promise<TransferResponse> {
    const wallet = await req.sdk.btc.wallets.getWallet(req.params.walletId);

    const transfer: Transfer = await wallet.transfer(
      req.body.to,
      BNConverter.hexStringToBN(req.body.amount, "amount"),
      req.body.passphrase,
      req.body.otpCode
    );

    return this.bnToHexString(transfer);
  }

  private async getEstimatedFee(
    req: express.Request
  ): Promise<BtcEstimatedFee> {
    const wallet = await req.sdk.btc.wallets.getWallet(req.params.walletId);
    return wallet.getEstimatedFee();
  }

  private async getWalletBalance(
    req: express.Request
  ): Promise<BalanceResponse[]> {
    const wallet = await req.sdk.btc.wallets.getWallet(req.params.walletId);

    const balances = await wallet.getBalance();
    return this.bnToHexString(balances);
  }

  private async getDepositAddresses(
    req: express.Request
  ): Promise<Pagination<DepositAddress>> {
    const wallet = await req.sdk.btc.wallets.getWallet(req.params.walletId);

    return this.pagination<DepositAddress>(
      req,
      await wallet.getDepositAddresses(req.query)
    );
  }

  private async getDepositAddress(
    req: express.Request
  ): Promise<DepositAddress> {
    const wallet = await req.sdk.btc.wallets.getWallet(req.params.walletId);

    return await wallet.getDepositAddress(req.params.depositAddressId);
  }

  private async createDepositAddress(
    req: express.Request
  ): Promise<DepositAddress> {
    const wallet = await req.sdk.btc.wallets.getWallet(req.params.walletId);

    return await wallet.createDepositAddress(req.body.name);
  }

  private async changePassphrase(req: express.Request): Promise<void> {
    const wallet = await req.sdk.btc.wallets.getWallet(req.params.walletId);

    return wallet.changePassphrase(
      req.body.passphrase,
      req.body.newPassphrase,
      req.body.otpCode
    );
  }

  private async changeWalletName(req: express.Request): Promise<void> {
    const wallet = await req.sdk.btc.wallets.getWallet(req.params.walletId);

    return wallet.changeName(req.body.name);
  }
}
