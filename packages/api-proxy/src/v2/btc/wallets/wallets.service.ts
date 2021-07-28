import { Injectable } from "@nestjs/common";
import { BNConverter, SDK } from "@haechi-labs/henesis-wallet-core";
import { WalletDTO } from "../dto/wallet.dto";
import {
  BtcMasterWallet,
  DepositAddressPaginationOptions,
} from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";
import { BalanceDTO } from "../dto/balance.dto";
import { DepositAddressDTO } from "../dto/deposit-address.dto";
import { CreateDepositAddressRequestDTO } from "../dto/create-deposit-address-request.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { TransferRequestDTO } from "../dto/transfer-request.dto";
import { TransferDTO } from "../dto/transfer.dto";
import { ChangeWalletNameRequestDTO } from "../dto/change-wallet-name-request.dto";
import { object } from "../../../utils/object";
import { changeUrlHost } from "../../../utils/pagination";
import express from "express";

@Injectable()
export class WalletsService {
  public constructor() {}

  public async getWallets(
    sdk: SDK,
    walletName?: string
  ): Promise<Array<WalletDTO>> {
    const options = walletName ? { name: walletName } : {};
    const wallets = await sdk.btc.wallets.getMasterWallets(options);
    return wallets.map(WalletDTO.fromBTCMasterWallet);
  }

  public async getWallet(sdk: SDK, walletId: string): Promise<WalletDTO> {
    return WalletDTO.fromBTCMasterWallet(
      await this.getWalletById(sdk, walletId)
    );
  }

  public async changeWalletName(
    sdk: SDK,
    walletId: string,
    changeWalletNameRequestDTO: ChangeWalletNameRequestDTO
  ): Promise<void> {
    const wallet = await this.getWalletById(sdk, walletId);

    return wallet.changeName(changeWalletNameRequestDTO.name);
  }

  public async getWalletBalance(
    sdk: SDK,
    walletId: string
  ): Promise<BalanceDTO[]> {
    const wallet = await this.getWalletById(sdk, walletId);

    const balances = await wallet.getBalance();
    return balances.map(BalanceDTO.fromBalance);
  }

  public async createDepositAddress(
    sdk: SDK,
    walletId: string,
    createDepositAddressRequestDTO: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    const wallet = await this.getWalletById(sdk, walletId);

    return DepositAddressDTO.fromDepositAddress(
      await wallet.createDepositAddress(createDepositAddressRequestDTO.name)
    );
  }

  public async getDepositAddresses(
    sdk: SDK,
    walletId: string,
    options: DepositAddressPaginationOptions,
    request: express.Request
  ): Promise<PaginationDTO<DepositAddressDTO>> {
    const wallet = await this.getWalletById(sdk, walletId);
    const result = await wallet.getDepositAddresses(object(options));

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
      results: result.results.map(DepositAddressDTO.fromDepositAddress),
    };
  }

  public async getDepositAddress(
    sdk: SDK,
    walletId: string,
    depositAddressId: string
  ): Promise<DepositAddressDTO> {
    const wallet = await this.getWalletById(sdk, walletId);

    return DepositAddressDTO.fromDepositAddress(
      await wallet.getDepositAddress(depositAddressId)
    );
  }

  public async transfer(
    sdk: SDK,
    walletId: string,
    transferRequestDTO: TransferRequestDTO
  ): Promise<TransferDTO> {
    const wallet = await this.getWalletById(sdk, walletId);
    const transfer = await wallet.transfer(
      transferRequestDTO.to,
      BNConverter.hexStringToBN(transferRequestDTO.amount),
      transferRequestDTO.passphrase,
      null,
      transferRequestDTO.feeRate
        ? BNConverter.hexStringToBN(transferRequestDTO.feeRate)
        : undefined,
      transferRequestDTO.metadata
    );

    return TransferDTO.fromTransfer(transfer);
  }

  private getWalletById(sdk: SDK, id: string): Promise<BtcMasterWallet> {
    return sdk.btc.wallets.getWallet(id);
  }
}
