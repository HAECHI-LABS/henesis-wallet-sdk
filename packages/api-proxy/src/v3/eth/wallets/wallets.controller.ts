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
import { EXAMPLE_ETHEREUM_WALLET_DTO, WalletDTO } from "../dto/wallet.dto";
import {
  EXAMPLE_ETHEREUM_PAGINATION_NFT_BALANCE_DTO,
  EXAMPLE_ETHEREUM_PAGINATION_NFT_TRANSFER_DTO,
  PaginationDTO,
} from "../dto/pagination.dto";
import {
  BalanceDTO,
  EXAMPLE_ETHEREUM_BALANCE_DTO,
  EXAMPLE_ETHEREUM_MASTER_WALLET_BALANCE_DTO,
} from "../dto/balance.dto";
import {
  EXAMPLE_ETHEREUM_TRANSACTION_DTO,
  TransactionDTO,
} from "../dto/transaction.dto";
import {
  DepositAddressDTO,
  EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO,
} from "../dto/deposit-address.dto";
import { ChangeWalletNameRequestDTO } from "./dto/change-wallet-name-request.dto";
import { SendCoinRequestDTO } from "./dto/send-coin-request.dto";
import { CreateTransactionRequestDTO } from "./dto/create-transaction-reqeust.dto";
import {
  CreateFlushRequestDTO,
  CreateNftFlushRequestDTO,
} from "./dto/create-flush-request.dto";
import { CreateDepositAddressRequestDTO } from "./dto/create-deposit-address-request.dto";
import {
  DEPOSIT_ADDRESS_ID_OPTIONAL,
  DEPOSIT_ADDRESS_ID_REQUIRED,
  DEPOSIT_ADDRESS_OPTIONAL,
  NAME_OPTIONAL,
  NFT_ID_OPTIONAL,
  PAGE_OPTIONAL,
  SIZE_OPTIONAL,
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
  WALLET_ID_OPTIONAL,
  WALLET_ID_REQUIRED,
} from "../dto/params";
import express from "express";
import {
  DepositAddressNotFoundException,
  EXAMPLE_DEPOSIT_ADDRESS_NOT_FOUND_EXCEPTION_DTO,
  EXAMPLE_INVALID_STATUS_EXCEPTION_DTO,
  EXAMPLE_NO_WALLET_NAME_EXCEPTION_DTO,
  EXAMPLE_TRANSACTION_ID_NOT_FOUND_EXCEPTION_DTO,
  EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO,
  InvalidStatusException,
  NoWalletNameException,
  TransactionIdNotFoundException,
  WalletNotFoundException,
} from "../dto/exceptions.dto";
import { ReplaceTransactionRequestDTO } from "../transactions/dto/replace-transaction-request.dto";
import { TransferNftRequestDTO } from "./dto/transfer-nft-request.dto";
import { NftBalanceDTO } from "../dto/nft-balance.dto";
import { NftTransferDTO } from "../dto/nft-transfer.dto";
import {
  EventStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";

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
      EXAMPLE_ETHEREUM_WALLET_DTO,
    ]),
    isArray: true,
  })
  @Queries(NAME_OPTIONAL)
  @ApiOperation({
    summary: "전체 지갑 목록 조회하기",
    description: "모든 지갑의 목록을 조회합니다.",
  })
  @ReadMeExtension()
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
      EXAMPLE_ETHEREUM_WALLET_DTO
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
  @ReadMeExtension()
  public async getWallet(
    @Request() request: express.Request,
    @Param("walletId") walletId: string
  ): Promise<WalletDTO> {
    return await this.walletsService.getWallet(request.sdk, walletId);
  }

  @Get("/:walletId/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(BalanceDTO, [
      EXAMPLE_ETHEREUM_MASTER_WALLET_BALANCE_DTO,
    ]),
    isArray: true,
  })
  @PathParams(WALLET_ID_REQUIRED)
  @Queries(TICKER_OPTIONAL)
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
  @ReadMeExtension()
  public async getBalanceOfWallet(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Query("ticker") ticker: string
  ): Promise<BalanceDTO[]> {
    return await this.walletsService.getBalanceOfWallet(
      request.sdk,
      walletId,
      ticker
    );
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
  @ReadMeExtension()
  public async changeWalletName(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() changeWalletName: ChangeWalletNameRequestDTO
  ) {
    await this.walletsService.changeWalletName(
      request.sdk,
      walletId,
      changeWalletName
    );
  }

  @Post("/:walletId/transfer")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
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
  @ReadMeExtension()
  public async sendCoin(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() sendCoinRequest: SendCoinRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.sendCoin(
      request.sdk,
      walletId,
      sendCoinRequest
    );
  }

  @Post("/:walletId/contract-call")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
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
    summary: "지갑에서 스마트 컨트랙트 호출하기",
    description:
      "특정 지갑에서 일반적인 스마트 컨트랙트 함수를 호출하는 트랜잭션을 발생시킵니다.",
  })
  @ReadMeExtension()
  public async callContract(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() createTransactionRequest: CreateTransactionRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.callContract(
      request.sdk,
      walletId,
      createTransactionRequest
    );
  }

  @Post("/:walletId/transactions/:transactionId/replace")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
    ),
  })
  @PathParams(WALLET_ID_REQUIRED, TRANSACTION_ID_REQUIRED)
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
    description: "트랜잭션을 교체합니다",
  })
  @ReadMeExtension()
  public async replaceTransaction(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Param("transactionId") transactionId: string,
    @Body() replaceTransactionRequest: ReplaceTransactionRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.replaceTransaction(
      request.sdk,
      walletId,
      transactionId,
      replaceTransactionRequest
    );
  }

  @Post("/:walletId/flush")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
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
    description:
      "원화 입금 주소의 특정 코인/토큰 잔액을 모두 상위의 지갑으로 끌어옵니다.",
  })
  @ReadMeExtension()
  public async flush(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() createFlushRequest: CreateFlushRequestDTO
  ): Promise<TransactionDTO> {
    return TransactionDTO.fromEthTransaction(
      await this.walletsService.flush(request.sdk, walletId, createFlushRequest)
    );
  }

  @Post("/:walletId/transactions/:transactionId/resend")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
    ),
  })
  @PathParams(WALLET_ID_REQUIRED, TRANSACTION_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 지갑이 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      WalletNotFoundException,
      EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "트랜잭션 다시 전송하기",
    description:
      "네트워크 사정 등으로 채굴이 지연됐을때, 블록체인에 트랜잭션을 다시 전송합니다.",
  })
  @ReadMeExtension()
  async resendTransaction(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Param("transactionId") transactionId: string
  ): Promise<TransactionDTO> {
    return TransactionDTO.fromEthTransaction(
      await this.walletsService.resendTransaction(
        request.sdk,
        walletId,
        transactionId
      )
    );
  }

  @Get("/:walletId/deposit-addresses")
  @PathParams(WALLET_ID_REQUIRED)
  @Queries(
    NAME_OPTIONAL,
    DEPOSIT_ADDRESS_OPTIONAL,
    SIZE_OPTIONAL,
    PAGE_OPTIONAL
  )
  @ApiPaginationResponse(
    DepositAddressDTO,
    EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO
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
  @ReadMeExtension()
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
        walletId,
        name,
        address,
        size,
        page,
      },
      request
    );
  }

  @Post("/:walletId/deposit-addresses")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      DepositAddressDTO,
      EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO
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
  @ReadMeExtension()
  public async createDepositAddress(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() createDepositAddress: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    return await this.walletsService.createDepositAddress(
      request.sdk,
      walletId,
      createDepositAddress
    );
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      DepositAddressDTO,
      EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO
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

  @Get("/:walletId/deposit-addresses/:depositAddressId/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(BalanceDTO, [
      EXAMPLE_ETHEREUM_BALANCE_DTO,
    ]),
    isArray: true,
  })
  @PathParams(WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @Queries(TICKER_OPTIONAL)
  @ApiOperation({
    summary: "입금 주소 잔고 조회하기",
    description: "특정 입금 주소의 잔액을 조회합니다.",
  })
  @ReadMeExtension()
  public async getBalanceOfDepositAddress(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Param("depositAddressId") depositAddressId: string,
    @Query("ticker") ticker?: string
  ): Promise<BalanceDTO[]> {
    return await this.walletsService.getBalanceOfDepositAddress(
      request.sdk,
      walletId,
      depositAddressId,
      ticker
    );
  }

  @Post("/:walletId/nft/transfer")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
    ),
    isArray: true,
  })
  @PathParams(WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @Queries(TICKER_OPTIONAL)
  @ApiOperation({
    summary: "NFT 출금하기",
    description: "특정 지갑에서 NFT 토큰을 출금합니다.",
  })
  @ReadMeExtension()
  public async transferNft(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() transferNftRequest: TransferNftRequestDTO
  ): Promise<TransactionDTO> {
    return await this.walletsService.transferNft(
      request.sdk,
      walletId,
      transferNftRequest
    );
  }

  @Post("/:walletId/nft/flush")
  @ApiCreatedResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
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
    summary: "입금 주소 NFT 모두 끌어오기",
    description: "입금 주소의 특정 NFT를 모두 상위의 지갑으로 끌어옵니다.",
  })
  @ReadMeExtension()
  public async nftFlush(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() createNftFlushRequestDTO: CreateNftFlushRequestDTO
  ): Promise<TransactionDTO> {
    return TransactionDTO.fromEthTransaction(
      await this.walletsService.nftFlush(
        request.sdk,
        walletId,
        createNftFlushRequestDTO
      )
    );
  }

  @Get("/:walletId/nft/balance")
  @ApiPaginationResponse(
    NftBalanceDTO,
    EXAMPLE_ETHEREUM_PAGINATION_NFT_BALANCE_DTO
  )
  @PathParams(WALLET_ID_REQUIRED)
  @Queries(TICKER_OPTIONAL)
  @ApiOperation({
    summary: "NFT 잔고 조회하기",
    description: "특정 지갑의 NFT 잔고를 조회합니다.",
  })
  @ReadMeExtension()
  public async getNftBalance(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
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

  @Get("/:walletId/deposit-addresses/:depositAddressId/nft/balance")
  @ApiPaginationResponse(
    NftBalanceDTO,
    EXAMPLE_ETHEREUM_PAGINATION_NFT_BALANCE_DTO
  )
  @PathParams(WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @Queries(TICKER_OPTIONAL)
  @ApiOperation({
    summary: "입금 주소 NFT 잔고 조회하기",
    description: "특정 입금 주소의 NFT 잔고를 조회합니다.",
  })
  @ReadMeExtension()
  public async getNftBalanceOfDepositAddress(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Param("depositAddressId") depositAddressId: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0,
    @Query("tokenOnchainId") tokenOnchainId?: string,
    @Query("tokenName") tokenName?: string
  ): Promise<PaginationDTO<NftBalanceDTO>> {
    return await this.walletsService.getDepositAddressNftBalance(
      request.sdk,
      walletId,
      depositAddressId,
      {
        size,
        page,
        tokenOnchainId,
        tokenName,
      },
      request
    );
  }

  @Get("/:walletId/nft/transfers")
  @Queries(
    NFT_ID_OPTIONAL,
    TOKEN_NAME_OPTIONAL,
    TOKEN_ONCHAIN_ID_OPTIONAL,
    DEPOSIT_ADDRESS_ID_OPTIONAL,
    WALLET_ID_OPTIONAL,
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
    EXAMPLE_ETHEREUM_PAGINATION_NFT_TRANSFER_DTO
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
  @ReadMeExtension()
  public async getNftTransfers(
    @Request() request: express.Request,
    @Param("walletId") walletId?: string,
    @Query("nftId") nftId?: number,
    @Query("tokenName") tokenName?: string,
    @Query("tokenOnchainId") tokenOnchainId?: string,
    @Query("depositAddressId") depositAddressId?: string,
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
