import { Injectable } from "@nestjs/common";
import { BNConverter, SDK } from "@haechi-labs/henesis-wallet-core";
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
} from "@haechi-labs/henesis-wallet-core/lib/eth/wallet";
import { ReplaceTransactionRequestDTO } from "../../eth/transactions/dto/replace-transaction-request.dto";
import { EthTransaction } from "@haechi-labs/henesis-wallet-core/lib/eth/abstractWallet";
import express from "express";
import { MasterWalletDTO } from "../../eth/dto/master-wallet.dto";
import { UserWalletDTO } from "../../eth/dto/user-wallet.dto";
import { EthUserWallet } from "@haechi-labs/henesis-wallet-core/lib/eth/userWallet";
import { CreateUserWalletRequestDTO } from "../../../v2/eth/dto/create-user-wallet-request.dto";

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
    walletId: string
  ): Promise<MasterWalletDTO> {
    return (await sdk.eth.wallets.getMasterWallet(walletId)).getData();
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
    name: string,
    request: express.Request
  ): Promise<UserWalletDTO[]> {
    return null;
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
    ticker?: string
  ): Promise<BalanceDTO[]> {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(masterWalletId);
    return (await wallet.getBalance())
      .map(BalanceDTO.fromBalance)
      .filter((balance) => {
        if (ticker === undefined) return true;
        return balance.ticker.toUpperCase() == ticker.toUpperCase();
      });
  }

  public async getUserWalletBalance(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    ticker?: string
  ): Promise<BalanceDTO[]> {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(userWalletId);
    return (await wallet.getBalance())
      .map(BalanceDTO.fromBalance)
      .filter((balance) => {
        if (ticker === undefined) return true;
        return balance.ticker.toUpperCase() == ticker.toUpperCase();
      });
  }

  public async changeMasterWalletName(
    sdk: SDK,
    masterWalletId: string,
    request: ChangeWalletNameRequestDTO
  ) {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(masterWalletId);
    await wallet.changeName(request.name);
  }

  public async changeUserWalletName(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    request: ChangeWalletNameRequestDTO
  ) {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(userWalletId);
    await wallet.changeName(request.name);
  }

  public async sendMasterWalletCoin(
    sdk: SDK,
    masterWalletId: string,
    request: SendCoinRequestDTO
  ): Promise<TransactionDTO> {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(masterWalletId);
    return TransactionDTO.fromEthTransaction(
      await wallet.transfer(
        request.ticker,
        request.to,
        new BN(request.amount),
        request.passphrase,
        null,
        request.gasPrice == null ? null : new BN(request.gasPrice),
        request.gasLimit == null ? null : new BN(request.gasLimit),
        request.metadata
      )
    );
  }

  public async sendUserWalletCoin(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    request: SendCoinRequestDTO
  ): Promise<TransactionDTO> {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(userWalletId);
    return TransactionDTO.fromEthTransaction(
      await wallet.transfer(
        request.ticker,
        request.to,
        new BN(request.amount),
        request.passphrase,
        null,
        request.gasPrice == null ? null : new BN(request.gasPrice),
        request.gasLimit == null ? null : new BN(request.gasLimit),
        request.metadata
      )
    );
  }

  public async sendMasterWalletContractCall(
    sdk: SDK,
    masterWalletId: string,
    request: CreateTransactionRequestDTO
  ): Promise<TransactionDTO> {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(masterWalletId);
    return TransactionDTO.fromEthTransaction(
      await wallet.contractCall(
        request.to,
        request.value == null ? new BN("0") : new BN(request.value),
        request.data,
        request.passphrase,
        null,
        request.gasPrice == null ? null : new BN(request.gasPrice),
        request.gasLimit == null ? null : new BN(request.gasLimit),
        request.metadata
      )
    );
  }

  public async sendUserWalletContractCall(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    request: CreateTransactionRequestDTO
  ): Promise<TransactionDTO> {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(userWalletId);
    return TransactionDTO.fromEthTransaction(
      await wallet.contractCall(
        request.to,
        request.value == null ? new BN("0") : new BN(request.value),
        request.data,
        request.passphrase,
        null,
        request.gasPrice == null ? null : new BN(request.gasPrice),
        request.gasLimit == null ? null : new BN(request.gasLimit),
        request.metadata
      )
    );
  }

  public async replaceTransaction(
    sdk: SDK,
    walletId: string,
    transactionId: string,
    request: ReplaceTransactionRequestDTO
  ): Promise<TransactionDTO> {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(walletId);
    return TransactionDTO.fromEthTransaction(
      await wallet.replaceTransaction(
        transactionId,
        request.gasPrice == null ? null : new BN(request.gasPrice)
      )
    );
  }

  public async flush(
    sdk: SDK,
    masterWalletId: string,
    request: CreateFlushRequestDTO
  ) {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(masterWalletId);
    return wallet.flush(
      request.targets as any[],
      request.gasPrice == null ? null : new BN(request.gasPrice),
      request.gasLimit == null ? null : new BN(request.gasLimit)
    );
  }

  async resendTransaction(
    sdk: SDK,
    walletId: string,
    transactionId: string
  ): Promise<EthTransaction> {
    const wallet = await sdk.eth.wallets.getWallet(walletId);
    return await wallet.resendTransaction(transactionId);
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
}
