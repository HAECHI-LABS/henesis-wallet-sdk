import { Injectable } from "@nestjs/common";
import { BNConverter, Coin, SDK } from "@haechi-labs/henesis-wallet-core";
import { BalanceDTO } from "../../eth/dto/balance.dto";
import { ChangeWalletNameRequestDTO } from "../../eth/wallets/dto/change-wallet-name-request.dto";
import { SendCoinRequestDTO } from "../../eth/wallets/dto/send-coin-request.dto";
import { TransactionDTO } from "../../eth/dto/transaction.dto";
import BN from "bn.js";
import { CreateTransactionRequestDTO } from "../../eth/wallets/dto/create-transaction-reqeust.dto";
import {
  EthMasterWallet,
  EthWallet,
  UserWalletPaginationOptions,
} from "@haechi-labs/henesis-wallet-core/lib/eth/wallet";
import express from "express";
import { MasterWalletDTO } from "../../eth/dto/master-wallet.dto";
import { UserWalletDTO } from "../../eth/dto/user-wallet.dto";
import { EthUserWallet } from "@haechi-labs/henesis-wallet-core/lib/eth/userWallet";
import { object } from "../../../utils/object";
import { changeUrlHost } from "../../../utils/pagination";
import { NftBalanceDTO } from "../../eth/dto/nft-balance.dto";
import { NftBalancePaginationOptions } from "@haechi-labs/henesis-wallet-core/lib/eth/abstractWallet";
import { TransferNftRequestDTO } from "../../eth/wallets/dto/transfer-nft-request.dto";
import { GetNftTransfersOption } from "../../eth/wallets/dto/get-nft-transfers-option.dto";
import { NftTransferDTO } from "../../eth/dto/nft-transfer.dto";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import { EthNftTransferEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import {
  CreateFlushRequestDTO,
  CreateNftFlushRequestDTO,
} from "./dto/create-flush-request.dto";
import { ReplaceTransactionRequestDTO } from "../../eth/transactions/dto/replace-transaction-request.dto";
import { PaginationDTO } from "../../eth/dto/pagination.dto";
import { CreateUserWalletRequestDTO } from "../../eth/wallets/dto/create-user-wallet-request.dto";
import { RetryCreateUserWalletRequestDTO } from "../../eth/dto/retry-create-user-wallet-request.dto";

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
          ? new BN(createUserWalletRequestDTO.gasPrice)
          : undefined,
        createUserWalletRequestDTO.salt
          ? new BN(createUserWalletRequestDTO.salt)
          : undefined
      )
    ).getData();
  }

  public async retryCreateUserWallet(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    retryCreateUserWalletRequestDTO: RetryCreateUserWalletRequestDTO
  ): Promise<UserWalletDTO> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );
    return (
      await masterWallet.retryCreateUserWallet(
        userWalletId,
        retryCreateUserWalletRequestDTO.gasPrice
          ? BNConverter.hexStringToBN(retryCreateUserWalletRequestDTO.gasPrice)
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

    if (request.isHopTransaction) {
      return await masterWallet.hopTransfer(
        await WalletsService.getCoinByTicker(sdk, request.ticker),
        request.to,
        new BN(request.amount),
        request.passphrase,
        null,
        request.gasPrice ? new BN(request.gasPrice) : undefined,
        request.gasLimit ? new BN(request.gasLimit) : undefined,
        request.metadata
      );
    }

    return await masterWallet.transfer(
      await WalletsService.getCoinByTicker(sdk, request.ticker),
      request.to,
      new BN(request.amount),
      request.passphrase,
      null,
      request.gasPrice ? new BN(request.gasPrice) : undefined,
      request.gasLimit ? new BN(request.gasLimit) : undefined,
      request.metadata
    );
  }

  public async replaceMasterWalletTransaction(
    sdk: SDK,
    masterWalletId: string,
    transactionId: string,
    request: ReplaceTransactionRequestDTO
  ): Promise<TransactionDTO> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );
    return TransactionDTO.fromEthTransaction(
      await masterWallet.replaceTransaction(
        transactionId,
        request.gasPrice == null ? null : new BN(request.gasPrice)
      )
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

    if (request.isHopTransaction) {
      return await userWallet.hopTransfer(
        await WalletsService.getCoinByTicker(sdk, request.ticker),
        request.to,
        new BN(request.amount),
        request.passphrase,
        null,
        request.gasPrice ? new BN(request.gasPrice) : undefined,
        request.gasLimit ? new BN(request.gasLimit) : undefined,
        request.metadata
      );
    }

    return await userWallet.transfer(
      await WalletsService.getCoinByTicker(sdk, request.ticker),
      request.to,
      new BN(request.amount),
      request.passphrase,
      null,
      request.gasPrice ? new BN(request.gasPrice) : undefined,
      request.gasLimit ? new BN(request.gasLimit) : undefined,
      request.metadata
    );
  }

  public async replaceUserWalletTransaction(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    transactionId: string,
    request: ReplaceTransactionRequestDTO
  ): Promise<TransactionDTO> {
    const userWallet = await WalletsService.getUserWalletByContext(
      sdk,
      masterWalletId,
      userWalletId
    );
    return TransactionDTO.fromEthTransaction(
      await userWallet.replaceTransaction(
        transactionId,
        request.gasPrice == null ? null : new BN(request.gasPrice)
      )
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
      new BN(request.value),
      request.data,
      request.passphrase,
      null,
      request.gasPrice ? new BN(request.gasPrice) : undefined,
      request.gasLimit ? new BN(request.gasLimit) : undefined
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
      new BN(request.value),
      request.data,
      request.passphrase,
      null,
      request.gasPrice ? new BN(request.gasPrice) : undefined,
      request.gasLimit ? new BN(request.gasLimit) : undefined,
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

    const targets: Array<{ coinId: number; depositAddressId: string }> =
      request.targets
        .filter((target) => target.userWalletId)
        .map((target) => {
          return {
            coinId: target.coinId,
            depositAddressId: target.userWalletId,
          };
        });

    return masterWallet.flushWithTargets(
      targets,
      request.gasPrice == null ? null : new BN(request.gasPrice),
      request.gasLimit == null ? null : new BN(request.gasLimit)
    );
  }

  private static async getMasterWalletById(
    sdk: SDK,
    id: string
  ): Promise<EthMasterWallet> {
    return await sdk.klay.wallets.getMasterWallet(id);
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

  public async transferNft(
    sdk: SDK,
    walletId: string,
    request: TransferNftRequestDTO
  ): Promise<TransactionDTO> {
    const wallet = await sdk.klay.wallets.getWallet(walletId);
    return TransactionDTO.fromEthTransaction(
      await wallet.transferNft(
        request.nftId,
        request.tokenOnchainId,
        request.to,
        request.passphrase,
        null,
        request.gasPrice == null ? null : new BN(request.gasPrice),
        request.gasLimit == null ? null : new BN(request.gasLimit),
        request.metadata
      )
    );
  }

  public async nftFlush(
    sdk: SDK,
    masterWalletId: string,
    request: CreateNftFlushRequestDTO
  ) {
    const masterWallet: EthMasterWallet =
      await sdk.klay.wallets.getMasterWallet(masterWalletId);
    const targets: Array<{ nftId: number; depositAddressId: string }> =
      request.targets
        .filter((target) => target.userWalletId)
        .map((target) => {
          return {
            nftId: target.nftId,
            depositAddressId: target.userWalletId,
          };
        });

    return masterWallet.nftFlush(
      targets,
      request.gasPrice == null ? null : new BN(request.gasPrice),
      request.gasLimit == null ? null : new BN(request.gasLimit)
    );
  }

  public async transferUserWalletNft(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    request: TransferNftRequestDTO
  ): Promise<TransactionDTO> {
    const wallet = await sdk.klay.wallets.getMasterWallet(masterWalletId);
    const userWallet = await wallet.getUserWallet(userWalletId);
    return TransactionDTO.fromEthTransaction(
      await userWallet.transferNft(
        request.nftId,
        request.tokenOnchainId,
        request.to,
        request.passphrase,
        null,
        request.gasPrice == null ? null : new BN(request.gasPrice),
        request.gasLimit == null ? null : new BN(request.gasLimit),
        request.metadata
      )
    );
  }

  public async getNftBalance(
    sdk: SDK,
    masterWalletId: string,
    options: NftBalancePaginationOptions,
    request: express.Request
  ): Promise<PaginationDTO<NftBalanceDTO>> {
    const wallet = await sdk.klay.wallets.getMasterWallet(masterWalletId);
    const result = await wallet.getNftBalance(options);

    result.pagination.nextUrl = changeUrlHost(
      result.pagination.nextUrl,
      request
    );
    result.pagination.previousUrl = changeUrlHost(
      result.pagination.previousUrl,
      request
    );
    return {
      pagination: result.pagination,
      results: result.results.map(NftBalanceDTO.fromNftBalance),
    };
  }

  public async getUserWalletNftBalance(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    options: NftBalancePaginationOptions,
    request: express.Request
  ): Promise<PaginationDTO<NftBalanceDTO>> {
    const masterWallet = await sdk.klay.wallets.getMasterWallet(masterWalletId);
    const userWallet = await masterWallet.getUserWallet(userWalletId);
    const result = await userWallet.getNftBalance(options);

    result.pagination.nextUrl = changeUrlHost(
      result.pagination.nextUrl,
      request
    );
    result.pagination.previousUrl = changeUrlHost(
      result.pagination.previousUrl,
      request
    );
    return {
      pagination: result.pagination,
      results: result.results.map(NftBalanceDTO.fromNftBalance),
    };
  }

  public async getNftTransfers(
    sdk: SDK,
    options: GetNftTransfersOption,
    request: express.Request
  ): Promise<PaginationDTO<NftTransferDTO>> {
    const result: Pagination<EthNftTransferEvent> =
      await sdk.klay.events.getNftTransferEvents(
        object(GetNftTransfersOption.toSDKOption(options))
      );

    result.pagination.nextUrl = changeUrlHost(
      result.pagination.nextUrl,
      request
    );
    result.pagination.previousUrl = changeUrlHost(
      result.pagination.previousUrl,
      request
    );
    return {
      pagination: result.pagination,
      results: result.results.map(NftTransferDTO.fromNftTransferEvent),
    };
  }
}
