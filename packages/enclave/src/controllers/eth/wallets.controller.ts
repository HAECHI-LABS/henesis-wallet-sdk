import express from "express";
import BN from "bn.js";
import {
  EthActivatingMasterWallet,
  EthMasterWallet,
  EthMasterWalletData,
  EthTransaction,
  EthUserWallet,
  EthUserWalletData,
} from "@haechi-labs/henesis-wallet-core/lib/eth/wallet";
import {
  Balance,
  Key,
  Pagination,
} from "@haechi-labs/henesis-wallet-core/lib/types";
import {
  BNConverter,
  Coin,
  MultiSigPayload,
  SDK,
  SignedMultiSigPayload,
} from "@haechi-labs/henesis-wallet-core";

import AbstractController from "../controller";
import { Controller } from "../../types";
import { Cacheable, CacheClear } from "@type-cacheable/core";
import { DefaultFilterCacheStrategy } from "../../utils/cache";
import {
  InactiveMasterWallet,
  WalletStatus,
} from "@haechi-labs/henesis-wallet-core/lib/wallet";
import {
  HenesisError,
  HttpStatus,
} from "@haechi-labs/henesis-wallet-core/lib/error";

interface BalanceResponse
  extends Omit<Balance, "amount" | "spendableAmount" | "aggregatedAmount"> {
  amount: string;
  spendableAmount?: string;
}

interface MasterWalletBalanceResponse extends BalanceResponse {
  aggregatedAmount: string;
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

export default class WalletsController
  extends AbstractController
  implements Controller {
  private path = "/api/v2/eth/wallets";

  constructor() {
    super();
    this.initRoutes();
  }

  initRoutes(): void {
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
      `${this.path}/:masterWalletId/activate`,
      this.promiseWrapper(this.activateMasterWallet)
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
      `${this.path}/:masterWalletId/transactions/resend`,
      this.promiseWrapper(this.resendMasterWalletTransaction, 201)
    );

    this.router.post(
      `${this.path}/:masterWalletId/batch-transactions`,
      this.promiseWrapper(this.sendMasterWalletBatchTransactions, 201)
    );

    this.router.post(
      `${this.path}/:masterWalletId/flush`,
      this.promiseWrapper(this.flush, 201)
    );

    this.router.post(
      `${this.path}/:masterWalletId/raw-transactions`,
      this.promiseWrapper(this.createRawTransaction, 201)
    );

    this.router.post(
      `${this.path}/:masterWalletId/signed-transactions`,
      this.promiseWrapper(this.sendSignedTransaction, 201)
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

  private retryCreateMasterWallet(
    req: express.Request
  ): Promise<EthMasterWalletData> {
    return this.retryCreateMasterWalletById(
      req.sdk,
      req.params.masterWalletId,
      req.body.gasPrice
        ? BNConverter.hexStringToBN(req.body.gasPrice)
        : undefined
    );
  }

  private retryCreateUserWallet(
    req: express.Request
  ): Promise<EthUserWalletData> {
    return this.retryCreateUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId,
      req.body.gasPrice
        ? BNConverter.hexStringToBN(req.body.gasPrice)
        : undefined
    );
  }

  private async getMasterWallet(
    req: express.Request
  ): Promise<EthMasterWalletData> {
    return (
      await this.getMasterWalletById(req.sdk, req.params.masterWalletId)
    ).getData();
  }

  private async getMasterWallets(
    req: express.Request
  ): Promise<EthMasterWalletData[]> {
    return (await req.sdk.eth.wallets.getMasterWallets(req.query)).map((c) =>
      c.getData()
    );
  }

  private async createMasterWallet(
    req: express.Request
  ): Promise<EthMasterWalletData | InactiveMasterWallet> {
    const type: string = <string>req.query.type;
    if (type != undefined) {
      if (type.toUpperCase() != WalletStatus.INACTIVE) {
        throw new HenesisError(
          `type '${type}' is not supported`,
          HttpStatus.BAD_REQUEST
        );
      }
      return req.sdk.eth.wallets.createInactiveMasterWallet(req.body.name);
    }
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

  private async sendMasterWalletContractCall(
    req: express.Request
  ): Promise<EthTransaction> {
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
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
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );

    return await masterWallet.changeName(req.body.name);
  }

  private async getMasterWalletBalance(
    req: express.Request
  ): Promise<MasterWalletBalanceResponse[]> {
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );
    const balances = await masterWallet.getBalance(
      req.query.flag === "true",
      req.query.symbol ? String(req.query.symbol) : null
    );
    return balances.map((c) => this.bnToHexString(c));
  }

  private async getMasterWalletNonce(req: express.Request): Promise<Nonce> {
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );

    return {
      nonce: BNConverter.bnToHexString(masterWallet.getNonce()),
    };
  }

  private async sendMasterWalletCoin(
    req: express.Request
  ): Promise<EthTransaction> {
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );

    return await masterWallet.transfer(
      await this.getCoinByTicker(req.sdk, req.body.ticker),
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
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );

    return await masterWallet.replaceTransaction(
      req.body.transactionId,
      req.body.gasPrice
        ? BNConverter.hexStringToBN(req.body.gasPrice)
        : undefined
    );
  }

  private async resendMasterWalletTransaction(
    req: express.Request
  ): Promise<EthTransaction> {
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );

    return await masterWallet.resendTransaction(
      req.body.transactionId,
      req.body.gasPrice
        ? BNConverter.hexStringToBN(req.body.gasPrice)
        : undefined,
      req.body.gasLimit
        ? BNConverter.hexStringToBN(req.body.gasLimit)
        : undefined
    );
  }

  private async sendMasterWalletBatchTransactions(
    req: express.Request
  ): Promise<EthTransaction[]> {
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );

    const batch = masterWallet.createBatchRequest(req.body.otpCode);
    const payloads: SignedMultiSigPayload[] = await Promise.all(
      req.body.requests.map(
        (request): Promise<SignedMultiSigPayload> => {
          // TODO: should refactoring
          if (this.isContractCallRequest(request)) {
            request = request as ContractCallRequest;
            return masterWallet.buildContractCallPayload(
              request.contractAddress,
              BNConverter.hexStringToBN(request.value),
              request.data,
              req.body.passphrase
            );
          }

          if (this.isTransferRequest(request)) {
            request = request as TransferRequest;
            return this.getCoinByTicker(req.sdk, request.ticker).then((coin) =>
              masterWallet.buildTransferPayload(
                coin,
                request.to,
                BNConverter.hexStringToBN(request.amount),
                req.body.passphrase
              )
            );
          }

          throw new Error("invalid batch transactions request format");
        }
      )
    );
    batch.addAll(payloads);

    return batch.execute();
  }

  private async flush(req: express.Request): Promise<EthTransaction> {
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );

    return await masterWallet.flush(
      await this.getCoinByTicker(req.sdk, req.body.ticker),
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

  private async createRawTransaction(
    req: express.Request
  ): Promise<MultiSigPayload> {
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );

    return masterWallet.createRawTransaction(
      await this.getCoinByTicker(req.sdk, req.body.ticker),
      req.body.to,
      BNConverter.hexStringToBN(req.body.amount)
    );
  }

  private async sendSignedTransaction(
    req: express.Request
  ): Promise<EthTransaction> {
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );

    const signedMultiSigPayload = req.body.signedMultiSigPayload;
    return masterWallet.sendTransaction(
      {
        signature: signedMultiSigPayload.signature,
        multiSigPayload: {
          walletAddress: signedMultiSigPayload.multiSigPayload.walletAddress,
          toAddress: signedMultiSigPayload.multiSigPayload.toAddress,
          value: BNConverter.hexStringToBN(
            signedMultiSigPayload.multiSigPayload.value
          ),
          walletNonce: BNConverter.hexStringToBN(
            signedMultiSigPayload.multiSigPayload.walletNonce
          ),
          hexData: signedMultiSigPayload.multiSigPayload.hexData,
        },
      },
      masterWallet.getId(),
      null,
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
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
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
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
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

  private async getUserWalletBalance(
    req: express.Request
  ): Promise<BalanceResponse[]> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId
    );

    const balances = await userWallet.getBalance(
      req.query.flag === "true",
      req.query.symbol ? String(req.query.symbol) : null
    );
    return balances.map((c) => this.bnToHexString(c));
  }

  private async getUserWalletNonce(req: express.Request): Promise<Nonce> {
    const userWallet = await this.getUserWalletByContext(
      req.sdk,
      req.params.masterWalletId,
      req.params.userWalletId
    );

    return {
      nonce: BNConverter.bnToHexString(userWallet.getNonce()),
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
      await this.getCoinByTicker(req.sdk, req.body.ticker),
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

    return await userWallet.replaceTransaction(
      req.body.transactionId,
      req.body.gasPrice
        ? BNConverter.hexStringToBN(req.body.gasPrice)
        : undefined
    );
  }

  private async changePassphrase(req: express.Request): Promise<void> {
    const masterWallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );

    return await masterWallet.changePassphrase(
      req.body.passphrase,
      req.body.newPassphrase,
      req.body.otpCode
    );
  }

  @Cacheable({
    cacheKey: (args) => args[1],
    hashKey: "eth_coin",
  })
  private getCoinByTicker(sdk: SDK, ticker: string): Promise<Coin> {
    return sdk.eth.coins.getCoin(ticker);
  }

  @Cacheable({
    cacheKey: (args) => args[1],
    hashKey: "eth_master_wallet",
    ttlSeconds: 10, // should refresh master wallet due to whitelistActivated field
    strategy: new DefaultFilterCacheStrategy(
      (wallet: EthMasterWallet) =>
        // should cache only if it is active
        wallet.getData().status === WalletStatus.ACTIVE
    ),
  })
  private getMasterWalletById(sdk: SDK, id: string): Promise<EthMasterWallet> {
    return sdk.eth.wallets.getMasterWallet(id);
  }

  @CacheClear({
    cacheKey: (args) => args[1],
    hashKey: "eth_master_wallet",
  })
  private async retryCreateMasterWalletById(
    sdk: SDK,
    walletId: string,
    gasPrice?: BN
  ): Promise<EthMasterWalletData> {
    return (
      await sdk.eth.wallets.retryCreateMasterWallet(walletId, gasPrice)
    ).getData();
  }

  @Cacheable({
    cacheKey: (args) => args[1] + args[2],
    hashKey: "eth_user_wallet",
    strategy: new DefaultFilterCacheStrategy(
      (wallet: EthUserWallet) =>
        // should cache only if it is active
        wallet.getData().status === WalletStatus.ACTIVE
    ),
  })
  private async getUserWalletByContext(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string
  ): Promise<EthUserWallet> {
    return (await this.getMasterWalletById(sdk, masterWalletId)).getUserWallet(
      userWalletId
    );
  }

  @CacheClear({
    cacheKey: (args) => args[1] + args[2],
    hashKey: "eth_user_wallet",
  })
  private async retryCreateUserWalletByContext(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    gasPrice?: BN
  ): Promise<EthUserWalletData> {
    const masterWallet = await this.getMasterWalletById(sdk, masterWalletId);
    const response = await masterWallet.retryCreateUserWallet(
      userWalletId,
      gasPrice
    );
    return response.getData();
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

  private async activateMasterWallet(
    req: express.Request
  ): Promise<EthActivatingMasterWallet> {
    const wallet = await this.getMasterWalletById(
      req.sdk,
      req.params.masterWalletId
    );
    return wallet.activate(
      req.body.accountKey as Key,
      req.body.backupKey as Key
    );
  }
}
