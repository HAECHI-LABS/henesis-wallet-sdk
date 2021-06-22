import { ApiExtraModels, ApiTags } from "@nestjs/swagger";
import {
  AuthErrorResponses,
  AuthHeaders,
  ReadMeExtension,
} from "../../../decorators";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from "@nestjs/common";
import { WalletsService } from "./wallets.service";
import { WalletDTO } from "../dto/wallet.dto";
import express from "express";
import { BalanceDTO } from "../dto/balance.dto";
import { ChangeWalletNameRequestDTO } from "./dto/chnage-wallet-name-request.dto";
import { TransferDTO } from "../dto/transfer.dto";
import { TransferRequestDTO } from "./dto/transfer-request.dto";
import { FlushRequestDTO } from "./dto/flush-request.dto";
import { FlushDTO } from "../dto/flush.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { DepositAddressDTO } from "../dto/deposit-address.dto";
import { CreateDepositAddressRequestDTO } from "./dto/create-deposit-address-request.dto";
import { TransactionDTO } from "../dto/transaction.dto";

@Controller("wallets")
@ApiTags("wallets")
@ApiExtraModels(
  WalletDTO,
  DepositAddressDTO,
  BalanceDTO,
  TransferDTO,
  FlushDTO,
  TransactionDTO
)
@AuthErrorResponses()
@AuthHeaders()
@ReadMeExtension()
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get("/")
  public async getWallets(
    @Request() request: express.Request,
    @Query("name") name?: string
  ): Promise<WalletDTO[]> {
    return await this.walletsService.getWallets(request.sdk, name);
  }

  @Get("/:walletId")
  public async getWallet(
    @Request() request: express.Request,
    @Query("walletId") walletId: string
  ): Promise<WalletDTO> {
    return await this.walletsService.getWallet(request.sdk, walletId);
  }

  @Get("/:walletId/balance")
  public async getWalletBalances(
    @Request() request: express.Request,
    @Param("walletId") walletId: string
  ): Promise<BalanceDTO[]> {
    return await this.walletsService.getWalletBalances(request.sdk, walletId);
  }

  @Patch("/:walletId/name")
  public async changeWalletName(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() changeWalletNameRequest: ChangeWalletNameRequestDTO
  ) {
    await this.walletsService.changeWalletName(
      request.sdk,
      walletId,
      changeWalletNameRequest
    );
  }

  @Post("/:walletId/transfer")
  public async transfer(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() transferRequest: TransferRequestDTO
  ): Promise<TransferDTO> {
    return await this.walletsService.transfer(
      request.sdk,
      walletId,
      transferRequest
    );
  }

  @Post("/:walletId/flush")
  public async flush(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() flushRequest: FlushRequestDTO
  ): Promise<FlushDTO> {
    return await this.walletsService.flush(request.sdk, walletId, flushRequest);
  }

  @Get("/:walletId/deposit-addresses")
  public async getDepositAddresses(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Query("name") name?: string,
    @Query("address") address?: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<DepositAddressDTO>> {
    return await this.walletsService.getDepositAddresses(
      request.sdk,
      walletId,
      {
        name,
        address,
        size,
        page,
      }
    );
  }

  @Post("/:walletId/deposit-addresses")
  public async createDepositAddress(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() createDepositAddressRequest: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    return await this.walletsService.createDepositAddress(
      request.sdk,
      walletId,
      createDepositAddressRequest
    );
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId")
  public async getDepositAddress(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Param("depositAddressId") depositAddressId: string
  ): Promise<DepositAddressDTO> {
    return await this.walletsService.getDepositAddress(
      request.sdk,
      walletId,
      depositAddressId
    );
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId/balance")
  public async getDepositAddressBalance(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Param("depositAddressId") depositAddressId: string
  ): Promise<BalanceDTO[]> {
    return await this.walletsService.getDepositAddressBalance(
      request.sdk,
      walletId,
      depositAddressId
    );
  }
}
