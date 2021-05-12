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
import { DEFAULT_DepositAddressDTO, DepositAddressDTO } from '../dto/deposit-address.dto';
import { TransferDTO } from "../dto/transfer.dto";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags, getSchemaPath
} from '@nestjs/swagger';
import express from "express";
import { CreateDepositAddressRequestDTO } from "../dto/create-deposit-address-request.dto";
import { TransferRequestDTO } from "../dto/transfer-request.dto";
import {
  ApiPaginationResponse,
  AuthErrorResponses,
  AuthHeaders,
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

@ApiTags("wallets")
@Controller("wallets")
@AuthErrorResponses()
@AuthHeaders()
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
  @ApiOkResponse({
    description: "지갑 잔고 조회",
    type: BalanceDTO,
    isArray: true,
  })
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
  @ApiCreatedResponse({
    description: "입금 주소가 성공적으로 생성",
    content: {
      "application/json": {
        schema: {
          $ref: getSchemaPath(DepositAddressDTO)
        },
        example: DEFAULT_DepositAddressDTO
      }
    }
  })
  @ApiOperation({
    summary: "입금 주소 생성하기",
    description: "입금 주소를 생성합니다.",
  })
  @PathParams(PARAM_WALLET_ID)
  async createDepositAddress(
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
    summary: "지갑에서 코인 전송하기",
    description: "특정 지갑에서 가상자산을 전송합니다.",
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
