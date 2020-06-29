import AbstractController from "../controller";
import { Controller } from "../../types";
import express, { request } from "express";
import {
  BtcMasterWalletData,
  BtcTransaction,
  DepositAddress,
} from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";

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
    this.router.get(`${this.path}`, this.promiseWrapper(this.getMasterWallets));
    this.router.get(
      `${this.path}/:masterWalletId`,
      this.promiseWrapper(this.getMasterWallet)
    );
    this.router.patch(
      `${this.path}/:masterWalletId/name`,
      this.promiseWrapper(this.changeMasterWalletName)
    );
    this.router.get(
      `${this.path}/:masterWalletId/balance`,
      this.promiseWrapper(this.getMasterWalletBalance)
    );
    this.router.post(
      `${this.path}/:masterWalletId/deposit-addresses`,
      this.promiseWrapper(this.createDepositAddress)
    );
    this.router.get(
      `${this.path}/:masterWalletId/deposit-addresses`,
      this.promiseWrapper(this.getDepositAddresses)
    );
    this.router.get(
      `${this.path}/:masterWalletId/deposit-addresses/:depositAddressId`,
      this.promiseWrapper(this.getDepositAddressById)
    );
    this.router.post(
      `${this.path}/verify-address`,
      this.promiseWrapper(this.verifyAddress)
    );
    this.router.post(
      `${this.path}/:masterWalletId/transfer`,
      this.promiseWrapper(this.transfer)
    );
  }

  private async getMasterWallets(
    req: express.Request
  ): Promise<BtcMasterWalletData[]> {
    const options = req.query;
    const wallets = await req.sdk.btc.wallets.getMasterWallets(options);
    return wallets.map((x) => x.getData());
  }

  private async getMasterWallet(
    req: express.Request
  ): Promise<BtcMasterWalletData> {
    const masterWallet = await req.sdk.btc.wallets.getWallet(
      req.params.masterWalletId
    );
    return masterWallet.getData();
  }

  private async verifyAddress(req: express.Request): Promise<Boolean> {
    return {
      value: req.sdk.btc.wallets.verifyAddress(req.body.address),
    };
  }

  private async transfer(req: express.Request): Promise<any> {
    const masterWallet = await req.sdk.btc.wallets.getWallet(
      req.params.masterWalletId
    );

    const t: BtcTransaction = await masterWallet.transfer(
      req.body.to,
      BNConverter.hexStringToBN(req.body.amount),
      req.body.passphrase,
      req.body.otpCode
    );

    return {
      id: t.id,
      transactionHash: t.transactionHash,
      amount: BNConverter.bnToHexString(t.amount),
      blockNumber: t.blockNumber
        ? BNConverter.bnToHexString(t.blockNumber)
        : null,
      feeAmount: t.feeAmount ? BNConverter.bnToHexString(t.feeAmount) : null,
      createdAt: t.createdAt,
      hex: t.hex,
      outputs: t.outputs.map((o) => {
        return {
          transactionId: o.transactionId,
          outputIndex: o.outputIndex,
          address: o.address,
          scriptPubKey: o.scriptPubKey,
          amount: BNConverter.bnToHexString(o.amount),
          isChange: o.isChange,
        };
      }),
    };
  }

  private async getMasterWalletBalance(
    req: express.Request
  ): Promise<BalanceResponse[]> {
    const masterWallet = await req.sdk.btc.wallets.getWallet(
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

  private async getDepositAddresses(
    req: express.Request
  ): Promise<Pagination<DepositAddress>> {
    const masterWallet = await req.sdk.btc.wallets.getWallet(
      req.params.masterWalletId
    );

    return this.pagination<DepositAddress>(
      req,
      await masterWallet.getDepositAddresses({
        page: +req.query.page,
        size: +req.query.size,
        sort: req.query.sort as string,
        id: req.query.id as string,
        name: req.query.name as string,
        address: req.query.address as string,
      })
    );
  }

  private async getDepositAddressById(
    req: express.Request
  ): Promise<DepositAddress> {
    const masterWallet = await req.sdk.btc.wallets.getWallet(
      req.params.masterWalletId
    );

    return await masterWallet.getDepositAddress(req.params.depositAddressId);
  }

  private async createDepositAddress(
    req: express.Request
  ): Promise<DepositAddress> {
    const masterWallet = await req.sdk.btc.wallets.getWallet(
      req.params.masterWalletId
    );

    return await masterWallet.createDepositAddress(req.body.name);
  }

  private async changeMasterWalletName(req: express.Request): Promise<void> {
    const masterWallet = await req.sdk.btc.wallets.getWallet(
      req.params.masterWalletId
    );

    return masterWallet.changeName(req.body.name);
  }
}
