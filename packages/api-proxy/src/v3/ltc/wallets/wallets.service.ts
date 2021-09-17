import { Injectable } from "@nestjs/common";
import { BNConverter, SDK } from "@haechi-labs/henesis-wallet-core";
import {
  DepositAddressPaginationOptions,
  LtcMasterWallet,
} from "@haechi-labs/henesis-wallet-core/lib/ltc/wallet";
import { object } from "../../../utils/object";
import { changeUrlHost } from "../../../utils/pagination";
import express from "express";
import { WalletDTO } from "../dto/wallet.dto";
import { ChangeWalletNameRequestDTO } from "../dto/change-wallet-name-request.dto";
import { BalanceDTO } from "../dto/balance.dto";
import { CreateDepositAddressRequestDTO } from "../dto/create-deposit-address-request.dto";
import { DepositAddressDTO } from "../dto/deposit-address.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { TransferRequestDTO } from "../dto/transfer-request.dto";
import { TransferDTO } from "../dto/transfer.dto";

@Injectable()
export class WalletsService {
  public constructor() {}

  public async getWallets(
    sdk: SDK,
    walletName?: string
  ): Promise<Array<WalletDTO>> {
    const options = walletName ? { name: walletName } : {};
    const wallets = await sdk.ltc.wallets.getMasterWallets(options);
    return wallets.map(WalletDTO.fromLTCMasterWallet);
  }

  public async getWallet(sdk: SDK, walletId: string): Promise<WalletDTO> {
    return WalletDTO.fromLTCMasterWallet(
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
      BNConverter.decimalStringToBn(transferRequestDTO.amount),
      transferRequestDTO.passphrase,
      null,
      transferRequestDTO.feeRate
        ? BNConverter.decimalStringToBn(transferRequestDTO.feeRate)
        : undefined,
      transferRequestDTO.metadata
    );

    return TransferDTO.fromTransfer(transfer);
  }

  private getWalletById(sdk: SDK, id: string): Promise<LtcMasterWallet> {
    return sdk.ltc.wallets.getWallet(id);
  }
}
