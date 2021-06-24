import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { WalletDTO } from "../dto/wallet.dto";
import { BalanceDTO } from "../dto/balance.dto";
import {
  FilFlush,
  FilWallet,
} from "@haechi-labs/henesis-wallet-core/lib/fil/wallet";
import { ChangeWalletNameRequestDTO } from "./dto/chnage-wallet-name-request.dto";
import { TransferRequestDTO } from "./dto/transfer-request.dto";
import { TransferDTO } from "../dto/transfer.dto";
import { FilTransfer } from "@haechi-labs/henesis-wallet-core/lib/fil";
import BN from "bn.js";
import { FlushRequestDTO } from "./dto/flush-request.dto";
import { FlushDTO } from "../dto/flush.dto";
import { CreateDepositAddressRequestDTO } from "./dto/create-deposit-address-request.dto";
import { GetDepositAddressesOptionsDTO } from "./dto/get-deposit-addresses-options.dto";
import { DepositAddressDTO } from "../dto/deposit-address.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { FilDepositAddress } from "@haechi-labs/henesis-wallet-core/lib/fil/depositAddress";
import { WalletBalanceDTO } from "../dto/wallet-balance.dto";

@Injectable()
export class WalletsService {
  public async getWallets(sdk: SDK, name?: string): Promise<WalletDTO[]> {
    return (
      await sdk.fil.wallets.getWallets({
        name: name,
      })
    ).map(WalletDTO.fromFilWallet);
  }

  public async getWallet(sdk: SDK, walletId: string): Promise<WalletDTO> {
    return WalletDTO.fromFilWallet(await sdk.fil.wallets.getWallet(walletId));
  }

  public async getWalletBalances(
    sdk: SDK,
    walletId: string
  ): Promise<WalletBalanceDTO[]> {
    const wallet: FilWallet = await sdk.fil.wallets.getWallet(walletId);
    return WalletBalanceDTO.fromBalances(await wallet.getBalance());
  }

  public async changeWalletName(
    sdk: SDK,
    walletId: string,
    request: ChangeWalletNameRequestDTO
  ) {
    const wallet: FilWallet = await sdk.fil.wallets.getWallet(walletId);
    await wallet.changeName(request.name);
  }

  public async transfer(
    sdk: SDK,
    walletId: string,
    request: TransferRequestDTO
  ): Promise<TransferDTO> {
    const wallet: FilWallet = await sdk.fil.wallets.getWallet(walletId);
    const transfer: FilTransfer = await wallet.transfer(
      request.to,
      new BN(request.amount),
      request.passphrase,
      null,
      request.gasPremium ? new BN(request.gasPremium) : null
    );
    return TransferDTO.fromTransfer(transfer);
  }

  public async flush(
    sdk: SDK,
    walletId: string,
    request: FlushRequestDTO
  ): Promise<FlushDTO> {
    const wallet: FilWallet = await sdk.fil.wallets.getWallet(walletId);
    const flush: FilFlush = await wallet.flush(
      request.targets,
      request.passphrase,
      request.gasPremium ? new BN(request.gasPremium) : null
    );
    return FlushDTO.fromFlush(flush);
  }

  public async getDepositAddresses(
    sdk: SDK,
    walletId: string,
    options: GetDepositAddressesOptionsDTO
  ): Promise<PaginationDTO<DepositAddressDTO>> {
    const wallet: FilWallet = await sdk.fil.wallets.getWallet(walletId);
    const data = await wallet.getDepositAddresses(options);
    return {
      pagination: data.pagination,
      results: data.results.map(DepositAddressDTO.fromDepositAddress),
    };
  }

  public async createDepositAddress(
    sdk: SDK,
    walletId: string,
    request: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    const wallet: FilWallet = await sdk.fil.wallets.getWallet(walletId);
    return DepositAddressDTO.fromDepositAddress(
      await wallet.createDepositAddress(request.name, request.passphrase)
    );
  }

  public async getDepositAddress(
    sdk: SDK,
    walletId: string,
    depositAddressId: string
  ): Promise<DepositAddressDTO> {
    const wallet: FilWallet = await sdk.fil.wallets.getWallet(walletId);
    return DepositAddressDTO.fromDepositAddress(
      await wallet.getDepositAddress(depositAddressId)
    );
  }

  public async getDepositAddressBalance(
    sdk: SDK,
    walletId: string,
    depositAddressId: string
  ): Promise<BalanceDTO[]> {
    const wallet: FilWallet = await sdk.fil.wallets.getWallet(walletId);
    const depositAddress: FilDepositAddress = await wallet.getDepositAddress(
      depositAddressId
    );
    return BalanceDTO.fromBalances(await depositAddress.getBalance());
  }
}
