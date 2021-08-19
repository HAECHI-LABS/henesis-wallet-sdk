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
  EXAMPLE_ETHEREUM_WALLET_DTO,
  WalletDTO,
} from "../../eth/dto/wallet.dto";
import {
  BalanceDTO,
  EXAMPLE_ETHEREUM_BALANCE_DTO,
} from "../../eth/dto/balance.dto";
import {
  EXAMPLE_ETHEREUM_TRANSACTION_DTO,
  TransactionDTO,
} from "../../eth/dto/transaction.dto";
import { DepositAddressDTO } from "../../eth/dto/deposit-address.dto";
import { ChangeWalletNameRequestDTO } from "../../eth/wallets/dto/change-wallet-name-request.dto";
import { SendCoinRequestDTO } from "../../eth/wallets/dto/send-coin-request.dto";
import { CreateTransactionRequestDTO } from "../../eth/wallets/dto/create-transaction-reqeust.dto";
import { CreateFlushRequestDTO } from "../../eth/wallets/dto/create-flush-request.dto";
import {
  ADDRESS_OPTIONAL,
  MASTER_WALLET_ID_REQUIRED,
  NAME_OPTIONAL,
  SIZE_OPTIONAL,
  SORT_OPTIONAL,
  TICKER_OPTIONAL,
  USER_WALLET_ID_REQUIRED,
} from "../../eth/dto/params";
import express from "express";
import {
  DepositAddressNotFoundException,
  EXAMPLE_NO_WALLET_NAME_EXCEPTION_DTO,
  EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO,
  NoWalletNameException,
  WalletNotFoundException,
} from "../../eth/dto/exceptions.dto";
import {
  EXAMPLE_ETHEREUM_MASTER_WALLET_DTO,
  MasterWalletDTO,
} from "../../eth/dto/master-wallet.dto";
import {
  EXAMPLE_ETHEREUM_USER_WALLET_DTO,
  UserWalletDTO,
} from "../../eth/dto/user-wallet.dto";
import { CreateUserWalletRequestDTO } from "../../eth/wallets/dto/create-user-wallet-request.dto";
import { PaginationDTO } from "../../eth/dto/pagination.dto";

@Controller("wallets")
@ApiTags("wallets")
@ApiExtraModels(
  WalletNotFoundException,
  NoWalletNameException,
  DepositAddressNotFoundException,
  WalletDTO,
  BalanceDTO,
  TransactionDTO,
  DepositAddressDTO
)
@AuthErrorResponses()
@AuthHeaders()
@ReadMeExtension()
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get("/")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(WalletDTO, [
      EXAMPLE_ETHEREUM_MASTER_WALLET_DTO,
    ]),
    isArray: true,
  })
  @Queries(NAME_OPTIONAL)
  @ApiOperation({
    summary: "전체 마스터 지갑 목록 조회하기",
    description: "모든 지갑의 목록을 조회합니다.",
  })
  @ReadMeExtension()
  public async getMasterWallets(
    @Request() request: express.Request,
    @Query("name") name?: string
  ): Promise<MasterWalletDTO[]> {
    return await this.walletsService.getMasterWallets(request.sdk, name);
  }

  @Get("/:masterWalletId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      WalletDTO,
      EXAMPLE_ETHEREUM_WALLET_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "마스터 지갑 정보 조회하기",
    description: "특정 마스터 지갑의 정보를 조회합니다.",
  })
  @ReadMeExtension()
  public async getMasterWallet(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string
  ): Promise<WalletDTO> {
    return await this.walletsService.getMasterWallet(
      request.sdk,
      masterWalletId
    );
  }

  @Get("/:masterWalletId/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(BalanceDTO, [
      EXAMPLE_ETHEREUM_BALANCE_DTO,
    ]),
    isArray: true,
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @Queries(TICKER_OPTIONAL)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "마스터 지갑 잔고 조회하기",
    description: "특정 마스터 지갑의 잔고를 조회합니다.",
  })
  @ReadMeExtension()
  public async getMasterWalletBalance(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Query("ticker") ticker: string
  ): Promise<BalanceDTO[]> {
    return await this.walletsService.getMasterWalletBalance(
      request.sdk,
      masterWalletId,
      ticker
    );
  }

  @Patch("/:masterWalletId/name")
  @PathParams(MASTER_WALLET_ID_REQUIRED)
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
    summary: "마스터 지갑 이름 변경하기",
    description: "특정 마스터 지갑의 이름을 변경합니다.",
  })
  @ReadMeExtension()
  public async changeMasterWalletName(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() changeWalletName: ChangeWalletNameRequestDTO
  ) {
    await this.walletsService.changeMasterWalletName(
      request.sdk,
      masterWalletId,
      changeWalletName
    );
  }

  @Post("/:masterWalletId/transfer")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "마스터 지갑에서 코인 전송하기",
    description: "특정 마스터 지갑에서 가상자산을 송금합니다.",
  })
  @ReadMeExtension()
  public async sendMasterWalletCoin(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() sendCoinRequest: SendCoinRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.sendMasterWalletCoin(
      request.sdk,
      masterWalletId,
      sendCoinRequest
    );
  }

  @Post("/:masterWalletId/contract-call")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "마스터 지갑에서 스마트 컨트랙트 호출하기",
    description:
      "특정 마스터 지갑에서 일반적인 스마트 컨트랙트 함수를 호출하는 트랜잭션을 발생시킵니다.",
  })
  @ReadMeExtension()
  public async sendMasterWalletContractCall(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() createTransactionRequest: CreateTransactionRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.sendMasterWalletContractCall(
      request.sdk,
      masterWalletId,
      createTransactionRequest
    );
  }

  @Post("/:masterWalletId/flush")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "사용자 지갑 잔액을 모두 끌어오기",
    description:
      "여러 사용자 지갑의 특정 코인/토큰 잔액을 모두 상위의 마스터 지갑으로 끌어옵니다.",
  })
  @ReadMeExtension()
  public async flush(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() createFlushRequest: CreateFlushRequestDTO
  ): Promise<TransactionDTO> {
    return TransactionDTO.fromEthTransaction(
      await this.walletsService.flush(
        request.sdk,
        masterWalletId,
        createFlushRequest
      )
    );
  }

  @Get("/:masterWalletId/user-wallets")
  @ApiPaginationResponse(UserWalletDTO, EXAMPLE_ETHEREUM_USER_WALLET_DTO)
  @Queries(
    NAME_OPTIONAL,
    SIZE_OPTIONAL,
    NAME_OPTIONAL,
    SORT_OPTIONAL,
    ADDRESS_OPTIONAL
  )
  @ApiOperation({
    summary: "전체 사용자 지갑 목록 조회하기",
    description: "특정 마스터 지갑에 속한 모든 사용자 지갑 목록을 조회합니다.",
  })
  @ReadMeExtension()
  public async getUserWallets(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Query("page") page?: number,
    @Query("size") size?: number,
    @Query("sort") sort?: string,
    @Query("name") name?: string,
    @Query("address") address?: string
  ): Promise<PaginationDTO<UserWalletDTO>> {
    return await this.walletsService.getUserWallets(
      request.sdk,
      masterWalletId,
      {
        page,
        size,
        sort,
        name,
        address,
      },
      request
    );
  }

  @Get("/:masterWalletId/user-wallets/:userWalletId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      WalletDTO,
      EXAMPLE_ETHEREUM_WALLET_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED, USER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "사용자 지갑 정보 조회하기",
    description: "특정 사용자 지갑의 정보를 조회합니다.",
  })
  @ReadMeExtension()
  public async getUserWallet(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string
  ): Promise<UserWalletDTO> {
    return await this.walletsService.getUserWallet(
      request.sdk,
      masterWalletId,
      userWalletId
    );
  }

  @Post("/:masterWalletId/user-wallets")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      UserWalletDTO,
      EXAMPLE_ETHEREUM_USER_WALLET_DTO
    ),
    isArray: false,
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiOperation({
    summary: "사용자 지갑 생성하기",
    description: "특정 마스터 지갑 하위에 새로운 사용자 지갑을 생성합니다.",
  })
  @ReadMeExtension()
  public async createUserWallet(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() createUserWalletRequestDTO: CreateUserWalletRequestDTO
  ): Promise<UserWalletDTO> {
    return await this.walletsService.createUserWallet(
      request.sdk,
      masterWalletId,
      createUserWalletRequestDTO
    );
  }

  @Get("/:masterWalletId/user-wallets/:userWalletId/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(BalanceDTO, [
      EXAMPLE_ETHEREUM_BALANCE_DTO,
    ]),
    isArray: true,
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED, USER_WALLET_ID_REQUIRED)
  @Queries(TICKER_OPTIONAL)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "사용자 지갑 잔고 조회하기",
    description: "특정 사용자 지갑의 잔고를 조회합니다.",
  })
  @ReadMeExtension()
  public async getUserWalletBalance(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Query("ticker") ticker: string
  ): Promise<BalanceDTO[]> {
    return await this.walletsService.getUserWalletBalance(
      request.sdk,
      masterWalletId,
      userWalletId,
      ticker
    );
  }

  @Patch("/:masterWalletId/user-wallets/:userWalletId/name")
  @PathParams(MASTER_WALLET_ID_REQUIRED, USER_WALLET_ID_REQUIRED)
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
    summary: "사용자 지갑 이름 변경하기",
    description: "특정 사용자 지갑의 이름을 변경합니다.",
  })
  @ReadMeExtension()
  public async changeUserWalletName(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body() changeWalletName: ChangeWalletNameRequestDTO
  ) {
    await this.walletsService.changeUserWalletName(
      request.sdk,
      masterWalletId,
      userWalletId,
      changeWalletName
    );
  }

  @Post("/:masterWalletId/user-wallets/:userWalletId/transfer")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED, USER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "사용자 지갑에서 코인 전송하기",
    description: "특정 사용자 지갑에서 가상자산을 송금합니다.",
  })
  @ReadMeExtension()
  public async sendUserWalletCoin(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body() sendCoinRequest: SendCoinRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.sendUserWalletCoin(
      request.sdk,
      masterWalletId,
      userWalletId,
      sendCoinRequest
    );
  }

  @Post("/:masterWalletId/user-wallets/:userWalletId/contract-call")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED, USER_WALLET_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "사용자 지갑에서 스마트 컨트랙트 호출하기",
    description:
      "특정 사용자 지갑에서 일반적인 스마트 컨트랙트 함수를 호출하는 트랜잭션을 발생시킵니다.",
  })
  @ReadMeExtension()
  public async sendUserWalletContractCall(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body() createTransactionRequest: CreateTransactionRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.sendUserWalletContractCall(
      request.sdk,
      masterWalletId,
      userWalletId,
      createTransactionRequest
    );
  }
}
