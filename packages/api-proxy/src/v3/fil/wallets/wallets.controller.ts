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
import {
  EXAMPLE_FILECOIN_MASTER_WALLET_DTO,
  MasterWalletDto,
} from "../dto/master-wallet.dto";
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
  EXAMPLE_MASTER_WALLET_NOT_FOUND_EXCEPTION_DTO,
  EXAMPLE_NO_MASTER_WALLET_NAME_EXCEPTION_DTO,
  FlushNotFoundException,
  MasterWalletNotFoundException,
  NoMasterWalletNameException,
} from "../dto/exceptions.dto";
import {
  DEPOSIT_ADDRESS_ID_REQUIRED,
  DEPOSIT_ADDRESS_NAME_OPTIONAL,
  DEPOSIT_ADDRESS_OPTIONAL,
  FLUSH_ID_REQUIRED,
  MASTER_WALLET_ID_REQUIRED,
  MASTER_WALLET_NAME_OPTIONAL,
} from "./dto/params.dto";
import { PAGE_OPTIONAL, SIZE_OPTIONAL } from "../dto/params";
import {
  EXAMPLE_FILECOIN_MASTER_WALLET_BALANCE_DTO,
  MasterWalletBalanceDto,
} from "../dto/master-wallet-balance.dto";
import { DepositAddressTransferRequestDTO } from "./dto/deposit-address-transfer-request.dto";

@Controller("wallets")
@ApiTags("wallets")
@ApiExtraModels(
  MasterWalletNotFoundException,
  NoMasterWalletNameException,
  DepositAddressNotFoundException,
  MasterWalletDto,
  DepositAddressDTO,
  BalanceDTO,
  TransferDTO,
  FlushDTO,
  TransactionDTO,
  MasterWalletBalanceDto,
  FlushNotFoundException
)
@AuthErrorResponses()
@AuthHeaders()
@ReadMeExtension()
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get("/")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(MasterWalletDto, [
      EXAMPLE_FILECOIN_MASTER_WALLET_DTO,
    ]),
    isArray: true,
  })
  @Queries(MASTER_WALLET_NAME_OPTIONAL)
  @ApiOperation({
    summary: "전체 마스터 지갑 목록 조회하기",
    description: "모든 마스터 지갑의 목록을 조회합니다.",
  })
  public async getMasterWallets(
    @Request() request: express.Request,
    @Query("name") name?: string
  ): Promise<MasterWalletDto[]> {
    return await this.walletsService.getMasterWallets(request.sdk, name);
  }

  @Get("/:masterWalletId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      MasterWalletDto,
      EXAMPLE_FILECOIN_MASTER_WALLET_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 마스터 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      MasterWalletNotFoundException,
      EXAMPLE_MASTER_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "마스터 지갑 정보 조회하기",
    description: "특정 마스터 지갑의 정보를 조회합니다.",
  })
  public async getMasterWallet(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string
  ): Promise<MasterWalletDto> {
    return await this.walletsService.getMasterWallet(
      request.sdk,
      masterWalletId
    );
  }

  @Get("/:masterWalletId/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(MasterWalletBalanceDto, [
      EXAMPLE_FILECOIN_MASTER_WALLET_BALANCE_DTO,
    ]),
    isArray: true,
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 마스터 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      MasterWalletNotFoundException,
      EXAMPLE_MASTER_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "마스터 지갑 잔고 조회하기",
    description: "특정 마스터 지갑의 잔고를 조회합니다.",
  })
  public async getMasterWalletBalances(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string
  ): Promise<MasterWalletBalanceDto[]> {
    return await this.walletsService.getMasterWalletBalances(
      request.sdk,
      masterWalletId
    );
  }

  @Patch("/:masterWalletId/name")
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({
    description: "다음과 같은 bad request 에러가 발생할 수 있습니다.",
    content: ApiResponseContentsGenerator([
      {
        model: MasterWalletNotFoundException,
        example: EXAMPLE_MASTER_WALLET_NOT_FOUND_EXCEPTION_DTO,
      },
      {
        model: NoMasterWalletNameException,
        example: EXAMPLE_NO_MASTER_WALLET_NAME_EXCEPTION_DTO,
      },
    ]),
  })
  @ApiOperation({
    summary: "마스터 지갑 이름 변경하기",
    description: "특정 마스터 지갑의 이름을 변경합니다.",
  })
  public async changeMasterWalletName(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() changeWalletNameRequest: ChangeWalletNameRequestDTO
  ) {
    await this.walletsService.changeMasterWalletName(
      request.sdk,
      masterWalletId,
      changeWalletNameRequest
    );
  }

  @Post("/:masterWalletId/transfer")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransferDTO,
      EXAMPLE_FILECOIN_TRANSFER_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 마스터 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      MasterWalletNotFoundException,
      EXAMPLE_MASTER_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "마스터 지갑에서 코인 전송하기",
    description: "특정 마스터 지갑에서 가상자산을 송금합니다.",
  })
  public async transfer(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() transferRequest: TransferRequestDTO
  ): Promise<TransferDTO> {
    return await this.walletsService.transfer(
      request.sdk,
      masterWalletId,
      transferRequest
    );
  }

  @Post("/:masterWalletId/flush")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_FILECOIN_TRANSACTION_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 마스터 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      MasterWalletNotFoundException,
      EXAMPLE_MASTER_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "입금 주소 잔액을 모두 끌어오기",
    description: "입금 주소의 코인 잔액을 모두 상위의 지갑으로 끌어옵니다.",
  })
  public async flush(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() flushRequest: FlushRequestDTO
  ): Promise<FlushDTO> {
    return await this.walletsService.flush(
      request.sdk,
      masterWalletId,
      flushRequest
    );
  }

  @Get("/:masterWalletId/deposit-addresses")
  @PathParams(MASTER_WALLET_ID_REQUIRED)
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
    description: "해당하는 id의 마스터 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      MasterWalletNotFoundException,
      EXAMPLE_MASTER_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "전체 입금 주소 목록 조회하기",
    description: "특정 마스터 지갑에 속한 모든 입금 주소 조회합니다.",
  })
  public async getDepositAddresses(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Query("name") name?: string,
    @Query("address") address?: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<DepositAddressDTO>> {
    return await this.walletsService.getDepositAddresses(
      request.sdk,
      masterWalletId,
      {
        name,
        address,
        size,
        page,
      },
      request
    );
  }

  @Post("/:masterWalletId/deposit-addresses")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      DepositAddressDTO,
      EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 마스터 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      MasterWalletNotFoundException,
      EXAMPLE_MASTER_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "입금 주소 생성하기",
    description: "특정 마스터 지갑 하위에 새로운 입금 주소 생성합니다",
  })
  public async createDepositAddress(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() createDepositAddressRequest: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    return await this.walletsService.createDepositAddress(
      request.sdk,
      masterWalletId,
      createDepositAddressRequest
    );
  }

  @Get("/:masterWalletId/deposit-addresses/:depositAddressId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      DepositAddressDTO,
      EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "다음과 같은 bad request 에러가 발생할 수 있습니다.",
    content: ApiResponseContentsGenerator([
      {
        model: MasterWalletNotFoundException,
        example: EXAMPLE_MASTER_WALLET_NOT_FOUND_EXCEPTION_DTO,
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
    @Param("masterWalletId") masterWalletId: string,
    @Param("depositAddressId") depositAddressId: string
  ): Promise<DepositAddressDTO> {
    return await this.walletsService.getDepositAddress(
      request.sdk,
      masterWalletId,
      depositAddressId
    );
  }

  @Get("/:masterWalletId/deposit-addresses/:depositAddressId/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(BalanceDTO, [
      EXAMPLE_FILECOIN_BALANCE_DTO,
    ]),
    isArray: true,
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @ApiOperation({
    summary: "입금 주소 잔고 조회하기",
    description: "특정 입금 주소의 잔액을 조회합니다.",
  })
  public async getDepositAddressBalance(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("depositAddressId") depositAddressId: string
  ): Promise<BalanceDTO[]> {
    return await this.walletsService.getDepositAddressBalance(
      request.sdk,
      masterWalletId,
      depositAddressId
    );
  }

  @Post("/:masterWalletId/deposit-addresses/:depositAddressId/transfer")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransferDTO,
      EXAMPLE_FILECOIN_TRANSFER_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 입금 주소가 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      DepositAddressNotFoundException,
      EXAMPLE_DEPOSIT_ADDRESS_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "입금 주소에서 코인 전송하기",
    description: "특정 입금 주소에서 가상자산을 송금합니다.",
  })
  public async transferFromDepositAddress(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("depositAddressId") depositAddressId: string,
    @Body() transferRequest: DepositAddressTransferRequestDTO
  ): Promise<TransferDTO> {
    return await this.walletsService.transferFromDepositAddress(
      request.sdk,
      masterWalletId,
      depositAddressId,
      transferRequest
    );
  }

  @Get("/:masterWalletId/flushes")
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @Queries(SIZE_OPTIONAL, PAGE_OPTIONAL)
  @ApiPaginationResponse(FlushDTO, EXAMPLE_FILECOIN_PAGINATION_FLUSH_DTO)
  @ApiBadRequestResponse({
    description: "해당하는 id의 마스터 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      MasterWalletNotFoundException,
      EXAMPLE_MASTER_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "전체 집금 목록 조회하기",
    description: "특정 마스터 지갑에서 발생한 전체 집금 목록을 조회합니다.",
  })
  public async getFlushes(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<FlushDTO>> {
    return await this.walletsService.getFlushes(
      request.sdk,
      masterWalletId,
      {
        size,
        page,
      },
      request
    );
  }

  @Get("/:masterWalletId/flushes/:flushId")
  @PathParams(MASTER_WALLET_ID_REQUIRED, FLUSH_ID_REQUIRED)
  @ApiPaginationResponse(FlushDTO, EXAMPLE_FILECOIN_FLUSH_DTO)
  @ApiBadRequestResponse({
    description: "다음과 같은 bad request 에러가 발생할 수 있습니다.",
    content: ApiResponseContentsGenerator([
      {
        model: MasterWalletNotFoundException,
        example: EXAMPLE_MASTER_WALLET_NOT_FOUND_EXCEPTION_DTO,
      },
      {
        model: FlushNotFoundException,
        example: EXAMPLE_FLUSH_NOT_FOUND_EXCEPTION_DTO,
      },
    ]),
  })
  @ApiOperation({
    summary: "특정 집금 조회하기",
    description: "특정 마스터 지갑에서 발생한 특정 집금 내역을 조회합니다.",
  })
  public async getFlush(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("flushId") flushId: string
  ): Promise<FlushDTO> {
    return await this.walletsService.getFlush(
      request.sdk,
      masterWalletId,
      flushId
    );
  }
}
