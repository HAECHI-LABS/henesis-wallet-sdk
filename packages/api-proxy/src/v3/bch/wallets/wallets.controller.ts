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
import { EXAMPLE_WALLET_DTO, WalletDTO } from "../dto/wallet.dto";
import { BalanceDTO, EXAMPLE_BALANCE_DTO } from "../dto/balance.dto";
import {
  DepositAddressDTO,
  EXAMPLE_DEPOSIT_ADDRESS_DTO,
} from "../dto/deposit-address.dto";
import { TransferDTO } from "../dto/transfer.dto";
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import express from "express";
import { CreateDepositAddressRequestDTO } from "../dto/create-deposit-address-request.dto";
import { TransferRequestDTO } from "../dto/transfer-request.dto";
import {
  ApiPaginationResponse,
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  Queries,
  ReadMeExtension,
} from "../../../decorators";
import { PARAM_DEPOSIT_ADDRESS_ID, PARAM_WALLET_ID } from "../dto/params";
import {
  QUERY_DEPOSIT_ADDRESS_ADDRESS_OPTIONAL,
  QUERY_DEPOSIT_ADDRESS_ID_OPTIONAL,
  QUERY_DEPOSIT_ADDRESS_NAME_OPTIONAL,
  QUERY_WALLET_NAME_OPTIONAL,
} from "../dto/queries";
import {
  EXAMPLE_PAGINATION_DEPOSIT_ADDRESS_DTO,
  PaginationDTO,
} from "../dto/pagination.dto";
import { ChangeWalletNameRequestDTO } from "../dto/change-wallet-name-request.dto";
import { PAGE_OPTIONAL, SIZE_OPTIONAL } from "../../../v3/eth/dto/params";
import { EXAMPLE_TRANSACTION_DTO } from "../dto/transaction.dto";

@ApiTags("wallets")
@Controller("wallets")
@ApiExtraModels(WalletDTO, BalanceDTO)
@AuthErrorResponses()
@AuthHeaders()
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get("/")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(WalletDTO, [EXAMPLE_WALLET_DTO]),
    isArray: true,
  })
  @ApiOperation({
    summary: "전체 지갑 목록 조회하기",
    description: "전체 지갑 목록을 조회합니다.",
  })
  @Queries(QUERY_WALLET_NAME_OPTIONAL)
  @ReadMeExtension()
  public async getWallets(
    @Request() request: express.Request,
    @Query("name") walletName?: string
  ): Promise<WalletDTO[]> {
    return await this.walletsService.getWallets(request.sdk, walletName);
  }

  @Get("/:walletId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(WalletDTO, EXAMPLE_WALLET_DTO),
  })
  @ApiOperation({
    summary: "지갑 정보 조회하기",
    description: "특정 지갑의 상세 정보를 조회합니다.",
  })
  @PathParams(PARAM_WALLET_ID)
  @ReadMeExtension()
  public async getWallet(
    @Request() request: express.Request,
    @Param("walletId") walletId: string
  ): Promise<WalletDTO> {
    return await this.walletsService.getWallet(request.sdk, walletId);
  }

  @Patch("/:walletId/name")
  @ApiOperation({
    summary: "지갑 정보 변경하기",
    description: "특정 지갑의 이름을 변경합니다.",
  })
  @PathParams(PARAM_WALLET_ID)
  @ApiNoContentResponse()
  @ReadMeExtension()
  public async changeWalletName(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body()
    changeWalletNameRequestDTO: ChangeWalletNameRequestDTO
  ) {
    await this.walletsService.changeWalletName(
      request.sdk,
      walletId,
      changeWalletNameRequestDTO
    );
  }

  @Get("/:walletId/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(BalanceDTO, [EXAMPLE_BALANCE_DTO]),
    isArray: true,
  })
  @ApiOperation({
    summary: "지갑 잔고 조회하기",
    description: "특정 지갑의 잔고를 변경합니다.",
  })
  @PathParams(PARAM_WALLET_ID)
  @ReadMeExtension()
  public async getWalletBalance(
    @Request() request: express.Request,
    @Param("walletId") walletId: string
  ): Promise<BalanceDTO[]> {
    return await this.walletsService.getWalletBalance(request.sdk, walletId);
  }

  @Post("/:walletId/deposit-addresses")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      DepositAddressDTO,
      EXAMPLE_DEPOSIT_ADDRESS_DTO
    ),
  })
  @ApiOperation({
    summary: "입금 주소 생성하기",
    description: "입금 주소를 생성합니다.",
  })
  @PathParams(PARAM_WALLET_ID)
  @ReadMeExtension()
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
    QUERY_DEPOSIT_ADDRESS_NAME_OPTIONAL,
    SIZE_OPTIONAL,
    PAGE_OPTIONAL
  )
  @PathParams(PARAM_WALLET_ID)
  @ApiPaginationResponse(
    DepositAddressDTO,
    EXAMPLE_PAGINATION_DEPOSIT_ADDRESS_DTO
  )
  @ReadMeExtension()
  public async getDepositAddresses(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Query("id") id?: string,
    @Query("address") address?: string,
    @Query("name") name?: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<DepositAddressDTO>> {
    return await this.walletsService.getDepositAddresses(
      request.sdk,
      walletId,
      {
        id,
        address,
        name,
        size,
        page,
      },
      request
    );
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      DepositAddressDTO,
      EXAMPLE_DEPOSIT_ADDRESS_DTO
    ),
  })
  @ApiOperation({
    summary: "입금 주소 정보 조회하기",
    description: "특정 입금 주소 정보를 조회합니다.",
  })
  @PathParams(PARAM_WALLET_ID, PARAM_DEPOSIT_ADDRESS_ID)
  @ReadMeExtension()
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
  @ApiOkResponse({
    content: ApiResponseContentGenerator(TransferDTO, EXAMPLE_TRANSACTION_DTO),
  })
  @ApiOperation({
    summary: "지갑에서 코인 전송하기",
    description: "특정 지갑에서 가상자산을 전송합니다.",
  })
  @PathParams(PARAM_WALLET_ID)
  @ReadMeExtension()
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
