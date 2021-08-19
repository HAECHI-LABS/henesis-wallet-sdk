import { Injectable } from "@nestjs/common";
import { BNConverter, Coin, SDK } from "@haechi-labs/henesis-wallet-core";
import { BalanceDTO } from "../../eth/dto/balance.dto";
import { ChangeWalletNameRequestDTO } from "../../eth/wallets/dto/change-wallet-name-request.dto";
import { SendCoinRequestDTO } from "../../eth/wallets/dto/send-coin-request.dto";
import { TransactionDTO } from "../../eth/dto/transaction.dto";
import BN from "bn.js";
import { CreateTransactionRequestDTO } from "../../eth/wallets/dto/create-transaction-reqeust.dto";
import { CreateFlushRequestDTO } from "../../eth/wallets/dto/create-flush-request.dto";
import {
  EthMasterWallet,
  EthWallet,
  UserWalletPaginationOptions,
} from "@haechi-labs/henesis-wallet-core/lib/eth/wallet";
import { ReplaceTransactionRequestDTO } from "../../eth/transactions/dto/replace-transaction-request.dto";
import { EthTransaction } from "@haechi-labs/henesis-wallet-core/lib/eth/abstractWallet";
import express from "express";
import { MasterWalletDTO } from "../../eth/dto/master-wallet.dto";
import { UserWalletDTO } from "../../eth/dto/user-wallet.dto";
import { EthUserWallet } from "@haechi-labs/henesis-wallet-core/lib/eth/userWallet";
import { CreateUserWalletRequestDTO } from "../../../v2/eth/dto/create-user-wallet-request.dto";
import { PaginationDTO } from "../../../v2/eth/dto/pagination.dto";
import { object } from "../../../utils/object";
import { changeUrlHost } from "../../../utils/pagination";

@Injectable()
export class WalletsService {
  public async getMasterWallets(
    sdk: SDK,
    name?: string
  ): Promise<MasterWalletDTO[]> {
    const options = {};
    if (name != null) {
      options["name"] = name;
    }
    return (await sdk.klay.wallets.getMasterWallets(options)).map((c) =>
      c.getData()
    );
  }

  public async getMasterWallet(
    sdk: SDK,
    masterWalletId: string
  ): Promise<MasterWalletDTO> {
    return (await sdk.klay.wallets.getMasterWallet(masterWalletId)).getData();
  }

  public async getUserWallet(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string
  ): Promise<UserWalletDTO> {
    return (
      await WalletsService.getUserWalletByContext(
        sdk,
        masterWalletId,
        userWalletId
      )
    ).getData();
  }

  public async getUserWallets(
    sdk: SDK,
    masterWalletId: string,
    options: UserWalletPaginationOptions,
    request: express.Request
  ): Promise<PaginationDTO<UserWalletDTO>> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );
    const userWallets = await masterWallet.getUserWallets(object(options));

    userWallets.pagination.nextUrl = changeUrlHost(
      userWallets.pagination.nextUrl,
      request
    );
    userWallets.pagination.previousUrl = changeUrlHost(
      userWallets.pagination.previousUrl,
      request
    );
    return {
      pagination: userWallets.pagination,
      results: userWallets.results.map((c) => c.getData()),
    };
  }

  public async createUserWallet(
    sdk: SDK,
    masterWalletId: string,
    createUserWalletRequestDTO: CreateUserWalletRequestDTO
  ): Promise<UserWalletDTO> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    return (
      await masterWallet.createUserWallet(
        createUserWalletRequestDTO.name,
        createUserWalletRequestDTO.passphrase,
        createUserWalletRequestDTO.gasPrice
          ? BNConverter.hexStringToBN(createUserWalletRequestDTO.gasPrice)
          : undefined,
        createUserWalletRequestDTO.salt
          ? BNConverter.hexStringToBN(createUserWalletRequestDTO.salt)
          : undefined
      )
    ).getData();
  }

  public async getMasterWalletBalance(
    sdk: SDK,
    masterWalletId: string,
    symbol?: string
  ): Promise<BalanceDTO[]> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );
    const balances = await masterWallet.getBalance(
      false,
      symbol ? String(symbol) : null
    );
    return balances.map(BalanceDTO.fromBalance);
  }

  public async getUserWalletBalance(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    symbol?: string
  ): Promise<BalanceDTO[]> {
    const userWallet = await WalletsService.getUserWalletByContext(
      sdk,
      masterWalletId,
      userWalletId
    );

    const balances = await userWallet.getBalance(
      false,
      symbol ? String(symbol) : null
    );
    return balances.map(BalanceDTO.fromBalance);
  }

  public async changeMasterWalletName(
    sdk: SDK,
    masterWalletId: string,
    request: ChangeWalletNameRequestDTO
  ) {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    return await masterWallet.changeName(request.name);
  }

  public async changeUserWalletName(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    request: ChangeWalletNameRequestDTO
  ) {
    const userWallet = await WalletsService.getUserWalletByContext(
      sdk,
      masterWalletId,
      userWalletId
    );

    return await userWallet.changeName(request.name);
  }

  public async sendMasterWalletCoin(
    sdk: SDK,
    masterWalletId: string,
    request: SendCoinRequestDTO
  ): Promise<TransactionDTO> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    return await masterWallet.transfer(
      await WalletsService.getCoinByTicker(sdk, request.ticker),
      request.to,
      BNConverter.hexStringToBN(request.amount),
      request.passphrase,
      null,
      request.gasPrice
        ? BNConverter.hexStringToBN(request.gasPrice)
        : undefined,
      request.gasLimit
        ? BNConverter.hexStringToBN(request.gasLimit)
        : undefined,
      request.metadata
    );
  }

  public async sendUserWalletCoin(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    request: SendCoinRequestDTO
  ): Promise<TransactionDTO> {
    const userWallet = await WalletsService.getUserWalletByContext(
      sdk,
      masterWalletId,
      userWalletId
    );

    return await userWallet.transfer(
      await WalletsService.getCoinByTicker(sdk, request.ticker),
      request.to,
      BNConverter.hexStringToBN(request.amount),
      request.passphrase,
      null,
      request.gasPrice
        ? BNConverter.hexStringToBN(request.gasPrice)
        : undefined,
      request.gasLimit
        ? BNConverter.hexStringToBN(request.gasLimit)
        : undefined,
      request.metadata
    );
  }

  public async sendMasterWalletContractCall(
    sdk: SDK,
    masterWalletId: string,
    request: CreateTransactionRequestDTO
  ): Promise<TransactionDTO> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    return await masterWallet.contractCall(
      request.to,
      BNConverter.hexStringToBN(request.value),
      request.data,
      request.passphrase,
      null,
      request.gasPrice
        ? BNConverter.hexStringToBN(request.gasPrice)
        : undefined,
      request.gasLimit ? BNConverter.hexStringToBN(request.gasLimit) : undefined
    );
  }

  public async sendUserWalletContractCall(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    request: CreateTransactionRequestDTO
  ): Promise<TransactionDTO> {
    const userWallet = await WalletsService.getUserWalletByContext(
      sdk,
      masterWalletId,
      userWalletId
    );

    return await userWallet.contractCall(
      request.to,
      BNConverter.hexStringToBN(request.value),
      request.data,
      request.passphrase,
      null,
      request.gasPrice
        ? BNConverter.hexStringToBN(request.gasPrice)
        : undefined,
      request.gasLimit
        ? BNConverter.hexStringToBN(request.gasLimit)
        : undefined,
      request.metadata
    );
  }

  public async flush(
    sdk: SDK,
    masterWalletId: string,
    request: CreateFlushRequestDTO
  ) {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    return masterWallet.flushWithTargets(
      request.targets as any[],
      request.gasPrice == null ? null : new BN(request.gasPrice),
      request.gasLimit == null ? null : new BN(request.gasLimit)
    );
  }

  private static getMasterWalletById(
    sdk: SDK,
    id: string
  ): Promise<EthMasterWallet> {
    return sdk.klay.wallets.getMasterWallet(id);
  }

  private static async getUserWalletByContext(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string
  ): Promise<EthUserWallet> {
    return (
      await WalletsService.getMasterWalletById(sdk, masterWalletId)
    ).getUserWallet(userWalletId);
  }

  private static getCoinByTicker(sdk: SDK, ticker: string): Promise<Coin> {
    return sdk.klay.coins.getCoin(ticker);
  }
}
