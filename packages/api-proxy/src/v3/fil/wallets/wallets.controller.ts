import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  ApiPaginationResponse,
  ApiResponseContentGenerator,
  ApiResponseContentsGenerator,
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  Queries,
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
import { EXAMPLE_FILECOIN_WALLET_DTO, WalletDTO } from "../dto/wallet.dto";
import express from "express";
import { BalanceDTO, EXAMPLE_FILECOIN_BALANCE_DTO } from "../dto/balance.dto";
import { ChangeWalletNameRequestDTO } from "./dto/chnage-wallet-name-request.dto";
import {
  EXAMPLE_FILECOIN_TRANSFER_DTO,
  TransferDTO,
} from "../dto/transfer.dto";
import { TransferRequestDTO } from "./dto/transfer-request.dto";
import { FlushRequestDTO } from "./dto/flush-request.dto";
import { EXAMPLE_FILECOIN_FLUSH_DTO, FlushDTO } from "../dto/flush.dto";
import {
  EXAMPLE_FILECOIN_PAGINATION_DEPOSIT_ADDRESS_DTO,
  EXAMPLE_FILECOIN_PAGINATION_FLUSH_DTO,
  PaginationDTO,
} from "../dto/pagination.dto";
import {
  DepositAddressDTO,
  EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO,
} from "../dto/deposit-address.dto";
import { CreateDepositAddressRequestDTO } from "./dto/create-deposit-address-request.dto";
import {
  EXAMPLE_FILECOIN_TRANSACTION_DTO,
  TransactionDTO,
} from "../dto/transaction.dto";
import {
  DepositAddressNotFoundException,
  EXAMPLE_DEPOSIT_ADDRESS_NOT_FOUND_EXCEPTION_DTO,
  EXAMPLE_FLUSH_NOT_FOUND_EXCEPTION_DTO,
  EXAMPLE_NO_WALLET_NAME_EXCEPTION_DTO,
  EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO,
  FlushNotFoundException,
  NoWalletNameException,
  WalletNotFoundException,
} from "../dto/exceptions.dto";
import {
  DEPOSIT_ADDRESS_ID_REQUIRED,
  DEPOSIT_ADDRESS_NAME_OPTIONAL,
  DEPOSIT_ADDRESS_OPTIONAL,
  FLUSH_ID_REQUIRED,
  WALLET_ID_REQUIRED,
  WALLET_NAME_OPTIONAL,
} from "./dto/params.dto";
import { PAGE_OPTIONAL, SIZE_OPTIONAL } from "../dto/params";
import {
  EXAMPLE_FILECOIN_WALLET_BALANCE_DTO,
  WalletBalanceDTO,
} from "../dto/wallet-balance.dto";

@Controller("wallets")
@ApiTags("wallets")
@ApiExtraModels(
  WalletNotFoundException,
  NoWalletNameException,
  DepositAddressNotFoundException,
  WalletDTO,
  DepositAddressDTO,
  BalanceDTO,
  TransferDTO,
  FlushDTO,
  TransactionDTO,
  WalletBalanceDTO,
  FlushNotFoundException
)
@AuthErrorResponses()
@AuthHeaders()
@ReadMeExtension()
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get("/")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(WalletDTO, [
      EXAMPLE_FILECOIN_WALLET_DTO,
    ]),
    isArray: true,
  })
  @Queries(WALLET_NAME_OPTIONAL)
  @ApiOperation({
    summary: "전체 지갑 목록 조회하기",
    description: "모든 지갑의 목록을 조회합니다.",
  })
  public async getWallets(
    @Request() request: express.Request,
    @Query("name") name?: string
  ): Promise<WalletDTO[]> {
    return await this.walletsService.getWallets(request.sdk, name);
  }

  @Get("/:walletId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      WalletDTO,
      EXAMPLE_FILECOIN_WALLET_DTO
    ),
  })
  @PathParams(WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "지갑 정보 조회하기",
    description: "특정 지갑의 정보를 조회합니다.",
  })
  public async getWallet(
    @Request() request: express.Request,
    @Param("walletId") walletId: string
  ): Promise<WalletDTO> {
    return await this.walletsService.getWallet(request.sdk, walletId);
  }

  @Get("/:walletId/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(WalletBalanceDTO, [
      EXAMPLE_FILECOIN_WALLET_BALANCE_DTO,
    ]),
    isArray: true,
  })
  @PathParams(WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "지갑 잔고 조회하기",
    description: "특정 지갑의 잔고를 조회합니다.",
  })
  public async getWalletBalances(
    @Request() request: express.Request,
    @Param("walletId") walletId: string
  ): Promise<WalletBalanceDTO[]> {
    return await this.walletsService.getWalletBalances(request.sdk, walletId);
  }

  @Patch("/:walletId/name")
  @PathParams(WALLET_ID_REQUIRED)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({
    description: "다음과 같은 bad request 에러가 발생할 수 있습니다.",
    content: ApiResponseContentsGenerator([
      {
        model: WalletNotFoundException,
        example: EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO,
      },
      {
        model: NoWalletNameException,
        example: EXAMPLE_NO_WALLET_NAME_EXCEPTION_DTO,
      },
    ]),
  })
  @ApiOperation({
    summary: "지갑 이름 변경하기",
    description: "특정 지갑의 이름을 변경합니다.",
  })
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
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransferDTO,
      EXAMPLE_FILECOIN_TRANSFER_DTO
    ),
  })
  @PathParams(WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "지갑에서 코인 전송하기",
    description: "특정 지갑에서 가상자산을 송금합니다.",
  })
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
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_FILECOIN_TRANSACTION_DTO
    ),
  })
  @PathParams(WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "입금 주소 잔액을 모두 끌어오기",
    description: "입금 주소의 코인 잔액을 모두 상위의 지갑으로 끌어옵니다.",
  })
  public async flush(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() flushRequest: FlushRequestDTO
  ): Promise<FlushDTO> {
    return await this.walletsService.flush(request.sdk, walletId, flushRequest);
  }

  @Get("/:walletId/deposit-addresses")
  @PathParams(WALLET_ID_REQUIRED)
  @Queries(
    DEPOSIT_ADDRESS_NAME_OPTIONAL,
    DEPOSIT_ADDRESS_OPTIONAL,
    SIZE_OPTIONAL,
    PAGE_OPTIONAL
  )
  @ApiPaginationResponse(
    DepositAddressDTO,
    EXAMPLE_FILECOIN_PAGINATION_DEPOSIT_ADDRESS_DTO
  )
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "전체 입금 주소 목록 조회하기",
    description: "특정 지갑에 속한 모든 입금 주소 조회합니다.",
  })
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
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      DepositAddressDTO,
      EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO
    ),
  })
  @PathParams(WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "입금 주소 생성하기",
    description: "특정 지갑 하위에 새로운 입금 주소 생성합니다",
  })
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
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      DepositAddressDTO,
      EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO
    ),
  })
  @PathParams(WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "다음과 같은 bad request 에러가 발생할 수 있습니다.",
    content: ApiResponseContentsGenerator([
      {
        model: WalletNotFoundException,
        example: EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO,
      },
      {
        model: DepositAddressNotFoundException,
        example: EXAMPLE_DEPOSIT_ADDRESS_NOT_FOUND_EXCEPTION_DTO,
      },
    ]),
  })
  @ApiOperation({
    summary: "입금 주소 정보 조회하기",
    description: "특정 입금 주소를 조회합니다.",
  })
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
  @ApiOkResponse({
    content: ApiResponseContentGenerator(BalanceDTO, [
      EXAMPLE_FILECOIN_BALANCE_DTO,
    ]),
    isArray: true,
  })
  @PathParams(WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @ApiOperation({
    summary: "입금 주소 잔고 조회하기",
    description: "특정 입금 주소의 잔액을 조회합니다.",
  })
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

  @Get("/:walletId/flushes")
  @PathParams(WALLET_ID_REQUIRED)
  @Queries(SIZE_OPTIONAL, PAGE_OPTIONAL)
  @ApiPaginationResponse(FlushDTO, EXAMPLE_FILECOIN_PAGINATION_FLUSH_DTO)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "전체 집금 목록 조회하기",
    description: "특정 지갑에서 발생한 전체 집금 목록을 조회합니다.",
  })
  public async getFlushes(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<FlushDTO>> {
    return await this.walletsService.getFlushes(request.sdk, walletId, {
      size,
      page,
    });
  }

  @Get("/:walletId/flushes/:flushId")
  @PathParams(WALLET_ID_REQUIRED, FLUSH_ID_REQUIRED)
  @ApiPaginationResponse(FlushDTO, EXAMPLE_FILECOIN_FLUSH_DTO)
  @ApiBadRequestResponse({
    description: "다음과 같은 bad request 에러가 발생할 수 있습니다.",
    content: ApiResponseContentsGenerator([
      {
        model: WalletNotFoundException,
        example: EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO,
      },
      {
        model: FlushNotFoundException,
        example: EXAMPLE_FLUSH_NOT_FOUND_EXCEPTION_DTO,
      },
    ]),
  })
  @ApiOperation({
    summary: "특정 집금 조회하기",
    description: "특정 지갑에서 발생한 특정 집금 내역을 조회합니다.",
  })
  public async getFlush(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Param("flushId") flushId: string
  ): Promise<FlushDTO> {
    return await this.walletsService.getFlush(request.sdk, walletId, flushId);
  }
}
