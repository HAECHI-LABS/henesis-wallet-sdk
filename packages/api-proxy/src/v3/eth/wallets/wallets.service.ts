import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { WalletDTO } from "../dto/wallet.dto";
import { BalanceDTO } from "../dto/balance.dto";
import { ChangeWalletNameRequestDTO } from "./dto/change-wallet-name-request.dto";
import { SendCoinRequestDTO } from "./dto/send-coin-request.dto";
import { TransactionDTO } from "../dto/transaction.dto";
import BN from "bn.js";
import { CreateTransactionRequestDTO } from "./dto/create-transaction-reqeust.dto";
import { CreateFlushRequestDTO } from "./dto/create-flush-request.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { DepositAddressDTO } from "../dto/deposit-address.dto";
import { CreateDepositAddressRequestDTO } from "./dto/create-deposit-address-request.dto";
import {
  EthWallet,
  UserWalletPaginationOptions,
} from "@haechi-labs/henesis-wallet-core/lib/eth/wallet";
import { ReplaceTransactionRequestDTO } from "../transactions/dto/replace-transaction-request.dto";
import { EthTransaction } from "@haechi-labs/henesis-wallet-core/lib/eth/abstractWallet";
import { getPaginationMeta } from "../../../utils/pagination";

@Injectable()
export class WalletsService {
  public async getWallets(sdk: SDK, name?: string): Promise<WalletDTO[]> {
    const options = {};
    if (name != null) {
      options["name"] = name;
    }
    return (await sdk.eth.wallets.getWallets(options)).map(
      WalletDTO.fromEthWallet
    );
  }

  public async getWallet(sdk: SDK, walletId: string): Promise<WalletDTO> {
    return WalletDTO.fromEthWallet(await sdk.eth.wallets.getWallet(walletId));
  }

  public async getBalanceOfWallet(
    sdk: SDK,
    walletId: string,
    ticker?: string
  ): Promise<BalanceDTO[]> {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(walletId);
    return (await wallet.getBalance())
      .map(BalanceDTO.fromBalance)
      .filter((balance) => {
        if (ticker === undefined) return true;
        return balance.ticker.toUpperCase() == ticker.toUpperCase();
      });
  }

  public async changeWalletName(
    sdk: SDK,
    walletId: string,
    request: ChangeWalletNameRequestDTO
  ) {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(walletId);
    await wallet.changeName(request.name);
  }

  public async sendCoin(
    sdk: SDK,
    walletId: string,
    request: SendCoinRequestDTO
  ): Promise<TransactionDTO> {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(walletId);
    return TransactionDTO.fromEthTransaction(
      await wallet.transfer(
        request.ticker,
        request.to,
        new BN(request.amount),
        request.passphrase,
        null,
        request.gasPrice == null ? null : new BN(request.gasPrice),
        null,
        request.metadata
      )
    );
  }

  public async callContract(
    sdk: SDK,
    walletId: string,
    request: CreateTransactionRequestDTO
  ): Promise<TransactionDTO> {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(walletId);
    return TransactionDTO.fromEthTransaction(
      await wallet.contractCall(
        request.to,
        request.value == null ? new BN("0") : new BN(request.value),
        request.data,
        request.passphrase,
        null,
        request.gasPrice == null ? null : new BN(request.gasPrice),
        null,
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
    walletId: string,
    request: CreateFlushRequestDTO
  ) {
    const wallet: EthWallet = await sdk.eth.wallets.getWallet(walletId);
    return wallet.flush(
      request.targets as any[],
      request.gasPrice == null ? null : new BN(request.gasPrice),
      request.gasLimit == null ? null : new BN(request.gasLimit)
    );
  }

  public async getDepositAddresses(
    sdk: SDK,
    walletId: string,
    options: GetDepositAddressOption,
    path: string
  ): Promise<PaginationDTO<DepositAddressDTO>> {
    const wallet = await sdk.eth.wallets.getWallet(walletId);
    const result = await wallet.getDepositAddresses(
      options as UserWalletPaginationOptions
    );
    return {
      pagination: getPaginationMeta(
        path,
        options.page,
        options.size,
        result.pagination.totalCount,
        options
      ),
      results: result.results.map(DepositAddressDTO.fromEthDepositAddress),
    };
  }

  public async getDepositAddress(
    sdk: SDK,
    walletId: string,
    depositAddressId: string
  ): Promise<DepositAddressDTO> {
    const wallet = await sdk.eth.wallets.getWallet(walletId);
    return DepositAddressDTO.fromEthDepositAddress(
      await wallet.getDepositAddress(depositAddressId)
    );
  }

  public async getBalanceOfDepositAddress(
    sdk: SDK,
    walletId: string,
    depositAddressId: string,
    ticker: string
  ): Promise<BalanceDTO[]> {
    const wallet = await sdk.eth.wallets.getWallet(walletId);
    const depositAddress = await wallet.getDepositAddress(depositAddressId);
    return (await depositAddress.getBalance(false))
      .map(BalanceDTO.fromBalance)
      .filter((balance) => {
        if (ticker === undefined) return true;
        return balance.ticker.toUpperCase() == ticker.toUpperCase();
      });
  }

  public async createDepositAddress(
    sdk: SDK,
    walletId: string,
    request: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    const wallet = await sdk.eth.wallets.getWallet(walletId);
    return DepositAddressDTO.fromEthDepositAddress(
      await wallet.createDepositAddress(request.name)
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
}
