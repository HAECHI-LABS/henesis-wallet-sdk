import AbstractController from "../controller";
import { Controller } from "../../types";
import express from "express";
import {
  BtcActivatingMasterWallet,
  BtcEstimatedFee,
  BtcMasterWallet,
  BtcMasterWalletData,
  BtcRawTransaction,
  BtcSignedRawTransaction,
  DepositAddress,
} from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";
import { BNConverter, SDK } from "@haechi-labs/henesis-wallet-core";
import {
  Balance,
  Pagination,
} from "@haechi-labs/henesis-wallet-core/lib/types";
import { Transfer } from "@haechi-labs/henesis-wallet-core/lib/btc/transfers";
import { TransferResponse } from "./transfers.controller";
import { Cacheable } from "@type-cacheable/core";
import {
  InactiveMasterWallet,
  WalletStatus,
} from "@haechi-labs/henesis-wallet-core/lib/wallet";
import { DefaultFilterCacheStrategy } from "../../utils/cache";
import {
  HenesisError,
  HttpStatus,
} from "@haechi-labs/henesis-wallet-core/lib/error";

export interface BalanceResponse
  extends Omit<Balance, "amount" | "spendableAmount"> {
  amount: string;
  spendableAmount?: string;
}

export interface Boolean {
  value: boolean;
}

export default class WalletsController
  extends AbstractController
  implements Controller {
  private path = "/api/v2/btc/wallets";

  constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this.router.get(`${this.path}`, this.promiseWrapper(this.getWallets));
    this.router.post(
      `${this.path}`,
      this.promiseWrapper(this.createInactiveMasterWallet, 201)
    );
    this.router.post(
      `${this.path}/:walletId/activate`,
      this.promiseWrapper(this.activateMasterWallet)
    );
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

    this.router.post(
      `${this.path}/:walletId/raw-transactions`,
      this.promiseWrapper(this.createRawTransaction, 201)
    );

    this.router.post(
      `${this.path}/:walletId/signed-transactions`,
      this.promiseWrapper(this.sendSignedTransaction, 201)
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
    const wallet = await this.getWalletById(req.sdk, req.params.walletId);
    return wallet.getData();
  }

  @Cacheable({
    cacheKey: (args) => args[1],
    hashKey: "btc_wallet",
    ttlSeconds: 10, // should refresh master wallet due to whitelistActivated field
    strategy: new DefaultFilterCacheStrategy(
      (wallet: BtcMasterWallet) =>
        // should cache only if it is active
        wallet.getData().status === WalletStatus.ACTIVE
    ),
  })
  private getWalletById(sdk: SDK, id: string): Promise<BtcMasterWallet> {
    return sdk.btc.wallets.getWallet(id);
  }

  private async verifyAddress(req: express.Request): Promise<Boolean> {
    return {
      value: req.sdk.btc.wallets.verifyAddress(req.body.address),
    };
  }

  private async transfer(req: express.Request): Promise<TransferResponse> {
    const wallet = await this.getWalletById(req.sdk, req.params.walletId);
    const transfer: Transfer = await wallet.transfer(
      req.body.to,
      BNConverter.hexStringToBN(req.body.amount),
      req.body.passphrase,
      req.body.otpCode,
      req.body.feeRate ? BNConverter.hexStringToBN(req.body.feeRate) : undefined
    );

    return this.bnToHexString(transfer);
  }

  private async createRawTransaction(
    req: express.Request
  ): Promise<BtcRawTransaction> {
    const wallet = await this.getWalletById(req.sdk, req.params.walletId);
    return wallet.createRawTransaction(
      req.body.to,
      BNConverter.hexStringToBN(req.body.amount),
      req.body.feeRate ? BNConverter.hexStringToBN(req.body.feeRate) : undefined
    );
  }

  private async sendSignedTransaction(
    req: express.Request
  ): Promise<TransferResponse> {
    const wallet = await this.getWalletById(req.sdk, req.params.walletId);
    const transfer: Transfer = await wallet.sendSignedTransaction(
      req.body as BtcSignedRawTransaction
    );
    return this.bnToHexString(transfer);
  }

  private async getEstimatedFee(
    req: express.Request
  ): Promise<BtcEstimatedFee> {
    const wallet = await this.getWalletById(req.sdk, req.params.walletId);
    return wallet.getEstimatedFee();
  }

  private async getWalletBalance(
    req: express.Request
  ): Promise<BalanceResponse[]> {
    const wallet = await this.getWalletById(req.sdk, req.params.walletId);

    const balances = await wallet.getBalance();
    return this.bnToHexString(balances);
  }

  private async getDepositAddresses(
    req: express.Request
  ): Promise<Pagination<DepositAddress>> {
    const wallet = await this.getWalletById(req.sdk, req.params.walletId);

    return this.pagination<DepositAddress>(
      req,
      await wallet.getDepositAddresses(req.query)
    );
  }

  private getDepositAddress(req: express.Request): Promise<DepositAddress> {
    return this.getDepositAddressByContext(
      req.sdk,
      req.params.walletId,
      req.params.depositAddressId
    );
  }

  @Cacheable({
    cacheKey: (args) => args[1] + args[2],
    hashKey: "btc_deposit_address",
  })
  private async getDepositAddressByContext(
    sdk: SDK,
    walletId: string,
    depositAddressId: string
  ): Promise<DepositAddress> {
    const wallet = await this.getWalletById(sdk, walletId);

    return wallet.getDepositAddress(depositAddressId);
  }

  private async createDepositAddress(
    req: express.Request
  ): Promise<DepositAddress> {
    const wallet = await this.getWalletById(req.sdk, req.params.walletId);

    return await wallet.createDepositAddress(req.body.name);
  }

  private async changePassphrase(req: express.Request): Promise<void> {
    const wallet = await this.getWalletById(req.sdk, req.params.walletId);

    return wallet.changePassphrase(
      req.body.passphrase,
      req.body.newPassphrase,
      req.body.otpCode
    );
  }

  private async changeWalletName(req: express.Request): Promise<void> {
    const wallet = await this.getWalletById(req.sdk, req.params.walletId);

    return wallet.changeName(req.body.name);
  }

  private createInactiveMasterWallet(
    req: express.Request
  ): Promise<InactiveMasterWallet> {
    const type: string = <string>req.query.type;
    if (type == undefined || type.toUpperCase() != WalletStatus.INACTIVE) {
      throw new HenesisError(`type should be inactive`, HttpStatus.BAD_REQUEST);
    }
    return req.sdk.btc.wallets.createInactiveMasterWallet(req.body.name);
  }

  private async activateMasterWallet(
    req: express.Request
  ): Promise<BtcActivatingMasterWallet> {
    const wallet = await this.getWalletById(req.sdk, req.params.walletId);
    return wallet.activate(req.body.accountKey, req.body.backupKey);
  }
}
