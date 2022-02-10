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
  EXAMPLE_BINANCE_SMART_CHAIN_WALLET_DTO,
  WalletDTO,
} from "../../eth/dto/wallet.dto";
import {
  EXAMPLE_BINANCE_SMART_CHAIN_PAGINATION_NFT_TRANSFER_DTO,
  EXAMPLE_ETHEREUM_PAGINATION_NFT_BALANCE_DTO,
  PaginationDTO,
} from "../../eth/dto/pagination.dto";
import {
  BalanceDTO,
  EXAMPLE_BINANCE_SMART_CHAIN_BALANCE_DTO,
  EXAMPLE_BINANCE_SMART_CHAIN_MASTER_WALLET_BALANCE_DTO,
} from "../../eth/dto/balance.dto";
import {
  EXAMPLE_BINANCE_SMART_CHAIN_TRANSACTION_DTO,
  EXAMPLE_ETHEREUM_TRANSACTION_DTO,
  EXAMPLE_KLAYTN_TRANSACTION_DTO,
  TransactionDTO,
} from "../../eth/dto/transaction.dto";
import { DepositAddressDTO } from "../../eth/dto/deposit-address.dto";
import express from "express";
import {
  ADDRESS_OPTIONAL,
  MASTER_WALLET_ID_OPTIONAL,
  MASTER_WALLET_ID_REQUIRED,
  NAME_OPTIONAL,
  NFT_ID_OPTIONAL,
  PAGE_OPTIONAL,
  SIZE_OPTIONAL,
  SORT_OPTIONAL,
  STATUS_OPTIONAL,
  TICKER_OPTIONAL,
  TOKEN_NAME_OPTIONAL,
  TOKEN_ONCHAIN_ID_OPTIONAL,
  TRANSACTION_HASH_OPTIONAL,
  TRANSACTION_ID_OPTIONAL,
  TRANSACTION_ID_REQUIRED,
  TRANSFER_TYPE_OPTIONAL,
  UPDATED_AT_GTE_OPTIONAL,
  UPDATED_AT_LE_OPTIONAL,
  USER_WALLET_ID_OPTIONAL,
  USER_WALLET_ID_REQUIRED,
  WALLET_ID_OPTIONAL,
  WALLET_ID_REQUIRED,
} from "../../eth/dto/params";
import { ChangeWalletNameRequestDTO } from "../../eth/wallets/dto/change-wallet-name-request.dto";
import {
  DepositAddressNotFoundException,
  EXAMPLE_INVALID_STATUS_EXCEPTION_DTO,
  EXAMPLE_NO_WALLET_NAME_EXCEPTION_DTO,
  EXAMPLE_TRANSACTION_ID_NOT_FOUND_EXCEPTION_DTO,
  EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO,
  InvalidStatusException,
  NoWalletNameException,
  TransactionIdNotFoundException,
  WalletNotFoundException,
} from "../../eth/dto/exceptions.dto";
import { SendCoinRequestDTO } from "../../eth/wallets/dto/send-coin-request.dto";
import { CreateTransactionRequestDTO } from "../../eth/wallets/dto/create-transaction-reqeust.dto";
import {
  CreateFlushRequestDTO,
  CreateNftFlushRequestDTO,
} from "../../klay/wallets/dto/create-flush-request.dto";
import { TransferNftRequestDTO } from "../../eth/wallets/dto/transfer-nft-request.dto";
import { NftBalanceDTO } from "../../klay/dto/nft-balance.dto";
import { NftTransferDTO } from "../../eth/dto/nft-transfer.dto";
import {
  EventStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import {
  EXAMPLE_ETHEREUM_USER_WALLET_DTO,
  UserWalletDTO,
} from "../../eth/dto/user-wallet.dto";
import {
  EXAMPLE_ETHEREUM_MASTER_WALLET_DTO,
  MasterWalletDTO,
} from "../../eth/dto/master-wallet.dto";
import { CreateUserWalletRequestDTO } from "../../eth/wallets/dto/create-user-wallet-request.dto";
import {
  PARAM_MASTER_WALLET_ID,
  PARAM_USER_WALLET_ID,
} from "../../../v2/eth/dto/params";
import { ReplaceTransactionRequestDTO } from "../../eth/transactions/dto/replace-transaction-request.dto";
import { RetryCreateUserWalletRequestDTO } from "../../eth/dto/retry-create-user-wallet-request.dto";

@Controller("wallets")
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
    type: MasterWalletDTO,
    isArray: true,
  })
  @Queries(NAME_OPTIONAL)
  @ApiOperation({
    summary: "전체 마스터 지갑 목록 조회하기",
    description: "모든 지갑의 목록을 조회합니다.",
  })
  @ApiTags("wallets")
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
      EXAMPLE_ETHEREUM_MASTER_WALLET_DTO
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
  @ApiTags("wallets")
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
      EXAMPLE_BINANCE_SMART_CHAIN_MASTER_WALLET_BALANCE_DTO,
    ]),
    type: BalanceDTO,
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
  @ApiTags("wallets")
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
  @ApiTags("wallets")
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
      EXAMPLE_BINANCE_SMART_CHAIN_TRANSACTION_DTO
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
  @ApiTags("wallets")
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
      EXAMPLE_BINANCE_SMART_CHAIN_TRANSACTION_DTO
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
  @ApiTags("wallets")
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

  @Post("/:masterWalletId/transactions/:transactionId/replace")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
    ),
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED, TRANSACTION_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiBadRequestResponse({
    description: "transaction id가 없을 때 발생합니다",
    content: ApiResponseContentGenerator(
      TransactionIdNotFoundException,
      EXAMPLE_TRANSACTION_ID_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "트랜잭션 교체",
    description: "마스터 지갑에서 발생한 트랜잭션을 교체합니다",
  })
  @ApiTags("wallets")
  @ReadMeExtension()
  public async replaceMasterWalletTransaction(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("transactionId") transactionId: string,
    @Body() replaceTransactionRequest: ReplaceTransactionRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.replaceMasterWalletTransaction(
      request.sdk,
      masterWalletId,
      transactionId,
      replaceTransactionRequest
    );
  }

  @Post("/:masterWalletId/flush")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_BINANCE_SMART_CHAIN_TRANSACTION_DTO
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
  @ApiTags("wallets")
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
    PAGE_OPTIONAL,
    SORT_OPTIONAL,
    ADDRESS_OPTIONAL
  )
  @ApiOperation({
    summary: "전체 사용자 지갑 목록 조회하기",
    description: "특정 마스터 지갑에 속한 모든 사용자 지갑 목록을 조회합니다.",
  })
  @ApiTags("wallets")
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
      EXAMPLE_BINANCE_SMART_CHAIN_WALLET_DTO
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
  @ApiTags("wallets")
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
  @ApiTags("wallets")
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

  @Post("/:masterWalletId/user-wallets/:userWalletId/recreate")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_KLAYTN_TRANSACTION_DTO
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

  @Get("/:masterWalletId/user-wallets/:userWalletId/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(BalanceDTO, [
      EXAMPLE_BINANCE_SMART_CHAIN_BALANCE_DTO,
    ]),
    type: BalanceDTO,
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
  @ApiTags("wallets")
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
  @ApiTags("wallets")
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
      EXAMPLE_BINANCE_SMART_CHAIN_TRANSACTION_DTO
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
  @ApiTags("wallets")
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
      EXAMPLE_BINANCE_SMART_CHAIN_TRANSACTION_DTO
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
  @ApiTags("wallets")
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

  @Post("/:masterWalletId/nft/transfer")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_BINANCE_SMART_CHAIN_TRANSACTION_DTO
    ),
    isArray: true,
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @ApiOperation({
    summary: "마스터 지갑 NFT 출금하기",
    description: "특정 마스터 지갑에서 NFT 토큰을 출금합니다.",
  })
  @ApiTags("wallets")
  @ReadMeExtension()
  public async transferNft(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() transferNftRequest: TransferNftRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.transferNft(
      request.sdk,
      masterWalletId,
      transferNftRequest
    );
  }

  @Post(
    "/:masterWalletId/userWallet/:userWalletId/transactions/:transactionId/replace"
  )
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
    ),
  })
  @PathParams(
    MASTER_WALLET_ID_REQUIRED,
    USER_WALLET_ID_REQUIRED,
    TRANSACTION_ID_REQUIRED
  )
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiBadRequestResponse({
    description: "transaction id가 없을 때 발생합니다",
    content: ApiResponseContentGenerator(
      TransactionIdNotFoundException,
      EXAMPLE_TRANSACTION_ID_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "트랜잭션 교체하기",
    description: "유저 지갑에서 발생한 트랜잭션을 교체합니다",
  })
  @ApiTags("wallets")
  @ReadMeExtension()
  public async replaceTransaction(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Param("transactionId") transactionId: string,
    @Body() replaceTransactionRequest: ReplaceTransactionRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.replaceUserWalletTransaction(
      request.sdk,
      masterWalletId,
      userWalletId,
      transactionId,
      replaceTransactionRequest
    );
  }

  @Post("/:masterWalletId/nft/flush")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_BINANCE_SMART_CHAIN_TRANSACTION_DTO
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
    summary: "사용자 지갑 NFT 모두 끌어오기",
    description: "사용자 지갑의 특정 NFT를 모두 상위의 지갑으로 끌어옵니다.",
  })
  @ApiTags("wallets")
  @ReadMeExtension()
  public async nftFlush(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() createNftFlushRequestDTO: CreateNftFlushRequestDTO
  ): Promise<TransactionDTO> {
    return TransactionDTO.fromEthTransaction(
      await this.walletsService.nftFlush(
        request.sdk,
        masterWalletId,
        createNftFlushRequestDTO
      )
    );
  }

  @Post("/:masterWalletId/user-wallets/:userWalletId/nft/transfer")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_BINANCE_SMART_CHAIN_TRANSACTION_DTO
    ),
    isArray: true,
  })
  @PathParams(MASTER_WALLET_ID_REQUIRED, USER_WALLET_ID_REQUIRED)
  @ApiOperation({
    summary: "사용자 지갑 NFT 출금하기",
    description: "특정 사용자 지갑에서 NFT 토큰을 출금합니다.",
  })
  @ApiTags("wallets")
  @ReadMeExtension()
  public async transferUserWalletNft(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body() transferNftRequest: TransferNftRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.transferUserWalletNft(
      request.sdk,
      masterWalletId,
      userWalletId,
      transferNftRequest
    );
  }

  @Get("/:masterWalletId/nft/balance")
  @ApiPaginationResponse(
    NftBalanceDTO,
    EXAMPLE_ETHEREUM_PAGINATION_NFT_BALANCE_DTO
  )
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @Queries(
    SIZE_OPTIONAL,
    PAGE_OPTIONAL,
    TOKEN_ONCHAIN_ID_OPTIONAL,
    TOKEN_NAME_OPTIONAL
  )
  @ApiOperation({
    summary: "NFT 잔고 조회하기",
    description: "특정 지갑의 NFT 잔고를 조회합니다.",
  })
  @ApiTags("wallets")
  @ReadMeExtension()
  public async getNftBalance(
    @Request() request: express.Request,
    @Param("masterWalletId") walletId: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0,
    @Query("tokenOnchainId") tokenOnchainId?: string,
    @Query("tokenName") tokenName?: string
  ): Promise<PaginationDTO<NftBalanceDTO>> {
    return await this.walletsService.getNftBalance(
      request.sdk,
      walletId,
      {
        size,
        page,
        tokenOnchainId,
        tokenName,
      },
      request
    );
  }

  @Get("/:masterWalletId/user-wallets/:userWalletId/nft/balance")
  @ApiPaginationResponse(
    NftBalanceDTO,
    EXAMPLE_ETHEREUM_PAGINATION_NFT_BALANCE_DTO
  )
  @PathParams(MASTER_WALLET_ID_REQUIRED, USER_WALLET_ID_REQUIRED)
  @Queries(
    SIZE_OPTIONAL,
    PAGE_OPTIONAL,
    TOKEN_ONCHAIN_ID_OPTIONAL,
    TOKEN_NAME_OPTIONAL
  )
  @ApiOperation({
    summary: "사용자 지갑 NFT 잔고 조회하기",
    description: "특정 사용자 지갑의 NFT 잔고를 조회합니다.",
  })
  @ApiTags("wallets")
  @ReadMeExtension()
  public async getUserWalletNftBalance(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0,
    @Query("tokenOnchainId") tokenOnchainId?: string,
    @Query("tokenName") tokenName?: string
  ): Promise<PaginationDTO<NftBalanceDTO>> {
    return await this.walletsService.getUserWalletNftBalance(
      request.sdk,
      masterWalletId,
      userWalletId,
      {
        size,
        page,
        tokenOnchainId,
        tokenName,
      },
      request
    );
  }

  @Get("/:masterWalletId/nft/transfers")
  @PathParams(MASTER_WALLET_ID_REQUIRED)
  @Queries(
    NFT_ID_OPTIONAL,
    TOKEN_NAME_OPTIONAL,
    TOKEN_ONCHAIN_ID_OPTIONAL,
    USER_WALLET_ID_OPTIONAL,
    TRANSACTION_ID_OPTIONAL,
    TRANSACTION_HASH_OPTIONAL,
    STATUS_OPTIONAL,
    TRANSFER_TYPE_OPTIONAL,
    UPDATED_AT_GTE_OPTIONAL,
    UPDATED_AT_LE_OPTIONAL,
    SIZE_OPTIONAL,
    PAGE_OPTIONAL
  )
  @ApiPaginationResponse(
    NftTransferDTO,
    EXAMPLE_BINANCE_SMART_CHAIN_PAGINATION_NFT_TRANSFER_DTO
  )
  @ApiBadRequestResponse({
    description: "올바르지 않은 트랜잭션 상태(status)로 요청하면 발생합니다.",
    content: ApiResponseContentGenerator(
      InvalidStatusException,
      EXAMPLE_INVALID_STATUS_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "전체 NFT 입출금 목록 조회하기",
    description: "특정 지갑의 NFT 입출금 내역을 조회합니다.",
  })
  @ApiTags("wallets")
  @ReadMeExtension()
  public async getNftTransfers(
    @Request() request: express.Request,
    @Param("masterWalletId") walletId: string,
    @Query("nftId") nftId?: number,
    @Query("tokenName") tokenName?: string,
    @Query("tokenOnchainId") tokenOnchainId?: string,
    @Query("userWalletId") depositAddressId?: string,
    @Query("transactionId") transactionId?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("status") status?: EventStatus,
    @Query("transferType") transferType?: TransferType,
    @Query("updatedAtGte") updatedAtGte?: string,
    @Query("updatedAtLt") updatedAtLt?: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<NftTransferDTO>> {
    return await this.walletsService.getNftTransfers(
      request.sdk,
      {
        nftId,
        tokenName,
        tokenOnchainId,
        depositAddressId,
        walletId,
        transactionId,
        transactionHash,
        status,
        transferType,
        updatedAtGte,
        updatedAtLt,
        size,
        page,
      },
      request
    );
  }
}
