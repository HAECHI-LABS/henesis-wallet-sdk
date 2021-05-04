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
import { BalanceDTO } from "../dto/balance.dto";
import { DepositAddressDTO } from "../dto/deposit-address.dto";
import { TransferDTO } from "../dto/transfer.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import express from "express";
import { CreateInactiveMasterWalletRequestDTO } from "../dto/create-inactive-master-wallet-request.dto";
import { CreateDepositAddressRequestDTO } from "../dto/create-deposit-address-request.dto";
import { ActivateMasterWalletRequestDTO } from "../dto/activate-master-wallet-request.dto";
import { TransferRequestDTO } from "../dto/transfer-request.dto";
import {
  ApiPaginationResponse,
  PathParams,
  Queries,
} from "../../../decorators";
import { PARAM_DEPOSIT_ADDRESS_ID, PARAM_WALLET_ID } from "../dto/params";
import {
  QUERY_DEPOSIT_ADDRESS_ADDRESS_OPTIONAL,
  QUERY_DEPOSIT_ADDRESS_ID_OPTIONAL,
  QUERY_DEPOSIT_ADDRESS_NAME_OPTIONAL,
  QUERY_WALLET_NAME_OPTIONAL,
} from "../dto/queries";
import { PaginationDTO } from "../dto/pagination.dto";

@Controller("wallets")
@ApiTags("wallets")
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get("/")
  @ApiOperation({
    summary: "전체 지갑 목록 조회하기",
    description: "전체 지갑 목록을 조회합니다.",
  })
  @Queries(QUERY_WALLET_NAME_OPTIONAL)
  public async getWallets(
    @Request() request: express.Request,
    @Query("name") walletName?: string
  ): Promise<WalletDTO[]> {
    return await this.walletsService.getWallets(request.sdk, walletName);
  }

  @Post("/")
  @ApiOperation({
    summary: "지갑 생성하기",
    description: "지갑을 생성합니다.",
  })
  public async createInactiveMasterWallet(
    @Request() request: express.Request,
    @Body()
    createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequestDTO
  ): Promise<WalletDTO> {
    return await this.walletsService.createInactiveMasterWallet(
      request.sdk,
      createInactiveMasterWalletRequest
    );
  }

  @Post("/:walletId/activate")
  @ApiOperation({
    summary: "지갑 활성화하기",
    description: "지갑을 활성화합니다.",
  })
  @PathParams(PARAM_WALLET_ID)
  public async activateMasterWallet(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body()
    activateMasterWalletRequestDTO: ActivateMasterWalletRequestDTO
  ): Promise<WalletDTO> {
    return await this.walletsService.activateMasterWallet(
      request.sdk,
      walletId,
      activateMasterWalletRequestDTO
    );
  }

  @Get("/:walletId")
  @ApiOperation({
    summary: "지갑 정보 조회하기",
    description: "특정 지갑의 상세 정보를 조회합니다.",
  })
  @PathParams(PARAM_WALLET_ID)
  public async getWallet(
    @Request() request: express.Request,
    @Param("walletId") walletId: string
  ): Promise<WalletDTO> {
    return await this.walletsService.getWallet(request.sdk, walletId);
  }

  @Get("/:walletId/balance")
  @ApiOperation({
    summary: "지갑 잔고 조회하기",
    description: "특정 지갑의 잔고를 변경합니다.",
  })
  @PathParams(PARAM_WALLET_ID)
  public async getWalletBalance(
    @Request() request: express.Request,
    @Param("walletId") walletId: string
  ): Promise<BalanceDTO[]> {
    return await this.walletsService.getWalletBalance(request.sdk, walletId);
  }

  @Post("/:walletId/deposit-addresses")
  @ApiOperation({
    summary: "입금 주소 생성하기",
    description: "입금 주소를 생성합니다.",
  })
  @PathParams(PARAM_WALLET_ID)
  public async createDepositAddress(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body()
    createDepositAddressRequestDTO: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    return await this.walletsService.createDepositAddress(
      request.sdk,
      walletId,
      createDepositAddressRequestDTO
    );
  }

  @Get("/:walletId/deposit-addresses")
  @ApiOperation({
    summary: "전체 입금 주소 목록 조회하기",
    description: "특정 지갑에 속한 모든 입금 주소 목록을 조회합니다.",
  })
  @Queries(
    QUERY_DEPOSIT_ADDRESS_ID_OPTIONAL,
    QUERY_DEPOSIT_ADDRESS_ADDRESS_OPTIONAL,
    QUERY_DEPOSIT_ADDRESS_NAME_OPTIONAL
  )
  @PathParams(PARAM_WALLET_ID)
  @ApiPaginationResponse(DepositAddressDTO)
  public async getDepositAddresses(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Query("id") id?: string,
    @Query("address") address?: string,
    @Query("name") name?: string
  ): Promise<PaginationDTO<DepositAddressDTO>> {
    return await this.walletsService.getDepositAddresses(
      request.sdk,
      walletId,
      id,
      address,
      name
    );
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId")
  @ApiOperation({
    summary: "입금 주소 정보 조회하기",
    description: "특정 입금 주소 정보를 조회합니다.",
  })
  @PathParams(PARAM_WALLET_ID, PARAM_DEPOSIT_ADDRESS_ID)
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

  @Post("/:walletId/transfer")
  @ApiOperation({
    summary: "transfer",
    description: "transfer",
  })
  @PathParams(PARAM_WALLET_ID)
  public async transfer(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() transferRequestDTO: TransferRequestDTO
  ): Promise<TransferDTO> {
    return await this.walletsService.transfer(
      request.sdk,
      walletId,
      transferRequestDTO
    );
  }
}
