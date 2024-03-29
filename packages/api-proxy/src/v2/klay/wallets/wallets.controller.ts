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
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  Queries,
  ReadMeExtension,
} from "../../../decorators";
import { QUERY_WALLET_NAME_OPTIONAL } from "../../btc/dto/queries";
import express from "express";
import { SendMasterWalletContractCallRequestDTO } from "../../eth/dto/send-master-wallet-contract-call-request.dto";
import { ChangeMasterWalletNameRequestDTO } from "../../eth/dto/change-master-wallet-name-request.dto";
import {
  QUERY_FLAG_OPTIONAL,
  QUERY_SYMBOL_OPTIONAL,
  QUERY_WALLETS_ADDRESS_OPTIONAL,
  QUERY_WALLETS_NAME_OPTIONAL,
  QUERY_WALLETS_PAGE_OPTIONAL,
  QUERY_WALLETS_SIZE_OPTIONAL,
  QUERY_WALLETS_SORT_OPTIONAL,
} from "../../eth/dto/queries";
import {
  PARAM_MASTER_WALLET_ID,
  PARAM_TRANSACTION_ID,
  PARAM_USER_WALLET_ID,
} from "../../eth/dto/params";
import { SendMasterWalletCoinRequestDTO } from "../../eth/dto/send-master-wallet-coin-request.dto";
import { SendMasterWalletBatchTransactionsRequestDTO } from "../../eth/dto/send-master-wallet-batch-transactions-request.dto";
import { FlushRequestDTO } from "../../eth/dto/flush-request.dto";
import { CreateUserWalletRequestDTO } from "../../eth/dto/create-user-wallet-request.dto";
import { SendUserWalletContractCallRequestDTO } from "../../eth/dto/send-user-wallet-contract-call-request.dto";
import { ChangeUserWalletNameRequestDTO } from "../../eth/dto/change-user-wallet-name-request.dto";
import { SendUserWalletCoinRequestDTO } from "../../eth/dto/send-user-wallet-coin-request.dto";
import { RetryCreateMasterWalletRequestDTO } from "../../eth/dto/retry-create-master-wallet-request.dto";
import { RetryCreateUserWalletRequestDTO } from "../../eth/dto/retry-create-user-wallet-request.dto";
import {
  EXAMPLE_ETH_KLAY_PAGINATION_USER_WALLET_DTO,
  PaginationDTO,
} from "../../eth/dto/pagination.dto";
import {
  EXAMPLE_ETH_KLAY_MASTER_WALLET_DTO,
  MasterWalletDTO,
} from "../../eth/dto/master-wallet.dto";
import { WalletsService } from "../../klay/wallets/wallets.service";
import {
  EXAMPLE_ETH_KLAY_TRANSACTION_DTO,
  TransactionDTO,
} from "../../eth/dto/transaction.dto";
import {
  BalanceDTO,
  EXAMPLE_ETH_KLAY_BALANCE_DTO,
} from "../../eth/dto/balance.dto";
import {
  EXAMPLE_ETH_KLAY_USER_WALLET_DTO,
  UserWalletDTO,
} from "../../eth/dto/user-wallet.dto";

@Controller("wallets")
@AuthErrorResponses()
@AuthHeaders()
@ApiExtraModels(MasterWalletDTO, UserWalletDTO, TransactionDTO, BalanceDTO)
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get("/")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(MasterWalletDTO, [
      EXAMPLE_ETH_KLAY_MASTER_WALLET_DTO,
    ]),
    type: MasterWalletDTO,
    isArray: true,
  })
  @ApiOperation({
    summary: "전체 마스터 지갑 목록 조회하기",
    description: "모든 마스터 지갑 목록을 조회합니다.",
  })
  @ApiTags("wallets")
  @Queries(QUERY_WALLET_NAME_OPTIONAL)
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
      MasterWalletDTO,
      EXAMPLE_ETH_KLAY_MASTER_WALLET_DTO
    ),
    isArray: false,
  })
  @ApiOperation({
    summary: "마스터 지갑 조회하기",
    description: "특정 마스터 지갑을 조회합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID)
  @ReadMeExtension()
  public async getMasterWallet(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string
  ): Promise<MasterWalletDTO> {
    return await this.walletsService.getMasterWallet(
      request.sdk,
      masterWalletId
    );
  }

  @Post("/:masterWalletId/contract-call")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETH_KLAY_TRANSACTION_DTO
    ),
    isArray: false,
  })
  @ApiOperation({
    summary: "마스터 지갑에서 스마트 컨트랙트 호출하기",
    description:
      "특정 마스터 지갑에서 일반적인 스마트 컨트랙트 함수를 호출하는 트랜잭션을 발생시킵니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID)
  @ReadMeExtension()
  public async sendMasterWalletContractCall(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body()
    sendMasterWalletContractCallRequestDTO: SendMasterWalletContractCallRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.sendMasterWalletContractCall(
      request.sdk,
      masterWalletId,
      sendMasterWalletContractCallRequestDTO
    );
  }

  @Patch("/:masterWalletId/name")
  @ApiOperation({
    summary: "마스터 지갑 이름 변경하기",
    description: "특정 마스터 지갑의 이름을 변경합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID)
  @ApiNoContentResponse()
  @ReadMeExtension()
  public async changeMasterWalletName(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() changeMasterWalletNameRequestDTO: ChangeMasterWalletNameRequestDTO
  ) {
    await this.walletsService.changeMasterWalletName(
      request.sdk,
      masterWalletId,
      changeMasterWalletNameRequestDTO
    );
  }

  @Get("/:masterWalletId/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(BalanceDTO, [
      EXAMPLE_ETH_KLAY_BALANCE_DTO,
    ]),
    type: BalanceDTO,
    isArray: true,
  })
  @ApiOperation({
    summary: "마스터 지갑 잔고 조회하기",
    description: "특정 마스터 지갑의 잔액을 조회합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID)
  @Queries(QUERY_FLAG_OPTIONAL, QUERY_SYMBOL_OPTIONAL)
  @ReadMeExtension()
  public async getMasterWalletBalance(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Query("flag") flag?: string,
    @Query("symbol") symbol?: string
  ): Promise<BalanceDTO[]> {
    return await this.walletsService.getMasterWalletBalance(
      request.sdk,
      masterWalletId,
      flag,
      symbol
    );
  }

  @Post("/:masterWalletId/transfer")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETH_KLAY_TRANSACTION_DTO
    ),
    isArray: false,
  })
  @ApiOperation({
    summary: "마스터 지갑에서 코인/토큰 전송하기",
    description: "특정 마스터 지갑에서 가상자산을 송금합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID)
  @ReadMeExtension()
  public async sendMasterWalletCoin(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() sendMasterWalletCoinRequestDTO: SendMasterWalletCoinRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.sendMasterWalletCoin(
      request.sdk,
      masterWalletId,
      sendMasterWalletCoinRequestDTO
    );
  }

  @Post("/:masterWalletId/batch-transactions")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(TransactionDTO, [
      EXAMPLE_ETH_KLAY_TRANSACTION_DTO,
    ]),
    type: TransactionDTO,
    isArray: true,
  })
  @ApiOperation({
    summary: "마스터 지갑에서 여러 트랜잭션들을 모아서 호출하기",
    description:
      "특정 마스터 지갑에서 여러 트랜잭션을 모아 한꺼번에 발생니다.\n" +
      "최대 10개까지 보낼 수 있습니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID)
  @ReadMeExtension()
  public async sendMasterWalletBatchTransactions(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body()
    sendMasterWalletBatchTransactionsRequestDTO: SendMasterWalletBatchTransactionsRequestDTO
  ): Promise<TransactionDTO[]> {
    return await this.walletsService.sendMasterWalletBatchTransactions(
      request.sdk,
      masterWalletId,
      sendMasterWalletBatchTransactionsRequestDTO
    );
  }

  @Post("/:masterWalletId/flush")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETH_KLAY_TRANSACTION_DTO
    ),
    isArray: false,
  })
  @ApiOperation({
    summary: "사용자 지갑 잔액을 모두 끌어오기",
    description:
      "여러 사용자 지갑의 특정 코인/토큰 잔액을 모두 상위의 마스터 지갑으로 끌어옵니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID)
  @ReadMeExtension()
  public async flush(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() flushRequestDTO: FlushRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.flush(
      request.sdk,
      masterWalletId,
      flushRequestDTO
    );
  }

  @Get("/:masterWalletId/user-wallets/:userWalletId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      UserWalletDTO,
      EXAMPLE_ETH_KLAY_USER_WALLET_DTO
    ),
    isArray: false,
  })
  @ApiOperation({
    summary: "사용자 지갑 정보 조회하기",
    description: "특정 사용자 지갑을 조회합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
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

  @Get("/:masterWalletId/user-wallets")
  @ApiOperation({
    summary: "전체 사용자 지갑 목록 조회하기",
    description: "특정 마스터 지갑에 속한 모든 사용자 지갑 목록을 조회합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID)
  @Queries(
    QUERY_WALLETS_PAGE_OPTIONAL,
    QUERY_WALLETS_SIZE_OPTIONAL,
    QUERY_WALLETS_SORT_OPTIONAL,
    QUERY_WALLETS_NAME_OPTIONAL,
    QUERY_WALLETS_ADDRESS_OPTIONAL
  )
  @ApiPaginationResponse(
    UserWalletDTO,
    EXAMPLE_ETH_KLAY_PAGINATION_USER_WALLET_DTO
  )
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

  @Post("/:masterWalletId/user-wallets")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      UserWalletDTO,
      EXAMPLE_ETH_KLAY_USER_WALLET_DTO
    ),
    isArray: false,
  })
  @ApiOperation({
    summary: "사용자 지갑 생성하기",
    description: "특정 마스터 지갑 하위에 새로운 사용자 지갑을 생성합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID)
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

  @Post("/:masterWalletId/user-wallets/:userWalletId/contract-call")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETH_KLAY_TRANSACTION_DTO
    ),
    isArray: false,
  })
  @ApiOperation({
    summary: "사용자 지갑에서 스마트 컨트랙트 호출하기",
    description:
      "사용자 지갑에서 일반적인 스마트 컨트랙트 함수를 호출하는 트랜잭션을 발생시킵니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  @ReadMeExtension()
  public async sendUserWalletContractCall(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body()
    sendUserWalletContractCallRequestDTO: SendUserWalletContractCallRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.sendUserWalletContractCall(
      request.sdk,
      masterWalletId,
      userWalletId,
      sendUserWalletContractCallRequestDTO
    );
  }

  @Patch("/:masterWalletId/user-wallets/:userWalletId/name")
  @ApiOperation({
    summary: "사용자 지갑 이름 변경하기",
    description: "특정 사용자 지갑의 이름을 변경합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  @ApiNoContentResponse()
  @ReadMeExtension()
  public async changeUserWalletName(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body() changeUserWalletNameRequestDTO: ChangeUserWalletNameRequestDTO
  ) {
    await this.walletsService.changeUserWalletName(
      request.sdk,
      masterWalletId,
      userWalletId,
      changeUserWalletNameRequestDTO
    );
  }

  @Get("/:masterWalletId/user-wallets/:userWalletId/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(BalanceDTO, [
      EXAMPLE_ETH_KLAY_BALANCE_DTO,
    ]),
    type: BalanceDTO,
    isArray: true,
  })
  @ApiOperation({
    summary: "사용자 지갑 잔고 조회하기",
    description: "특정 사용자 지갑의 잔액을 조회합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  @Queries(QUERY_FLAG_OPTIONAL, QUERY_SYMBOL_OPTIONAL)
  @ReadMeExtension()
  public async getUserWalletBalance(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Query("flag") flag?: string,
    @Query("symbol") symbol?: string
  ): Promise<BalanceDTO[]> {
    return await this.walletsService.getUserWalletBalance(
      request.sdk,
      masterWalletId,
      userWalletId,
      flag,
      symbol
    );
  }

  @Post("/:masterWalletId/user-wallets/:userWalletId/transfer")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETH_KLAY_TRANSACTION_DTO
    ),
    isArray: false,
  })
  @ApiOperation({
    summary: "사용자 지갑에서 코인/토큰 전송하기",
    description: "특정 사용자 지갑에서 가상자산을 전송합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  @ReadMeExtension()
  public async sendUserWalletCoin(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body() sendUserWalletCoinRequestDTO: SendUserWalletCoinRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.sendUserWalletCoin(
      request.sdk,
      masterWalletId,
      userWalletId,
      sendUserWalletCoinRequestDTO
    );
  }

  @Post("/:masterWalletId/recreate")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      MasterWalletDTO,
      EXAMPLE_ETH_KLAY_MASTER_WALLET_DTO
    ),
    isArray: false,
  })
  @ApiOperation({
    summary: "마스터 지갑 재생성하기",
    description: "마스터 지갑을 재생성합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID)
  @ReadMeExtension()
  public async retryCreateMasterWallet(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() retryCreateMasterWalletRequestDTO: RetryCreateMasterWalletRequestDTO
  ): Promise<MasterWalletDTO> {
    return await this.walletsService.retryCreateMasterWallet(
      request.sdk,
      masterWalletId,
      retryCreateMasterWalletRequestDTO
    );
  }

  @Post("/:masterWalletId/user-wallets/:userWalletId/recreate")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETH_KLAY_TRANSACTION_DTO
    ),
    isArray: false,
  })
  @ApiOperation({
    summary: "사용자 지갑 생성 실패시 재시도하기",
    description:
      "특정 마스터 지갑 하위에 특정 사용자 지갑 생성 트랜잭션이 실패했을 때 재시도합니다.",
  })
  @ApiTags("wallets")
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  @ReadMeExtension()
  public async retryCreateUserWallet(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body() retryCreateUserWalletRequestDTO: RetryCreateUserWalletRequestDTO
  ): Promise<UserWalletDTO> {
    return await this.walletsService.retryCreateUserWallet(
      request.sdk,
      masterWalletId,
      userWalletId,
      retryCreateUserWalletRequestDTO
    );
  }
}
