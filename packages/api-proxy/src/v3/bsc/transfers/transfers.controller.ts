import { Controller, Get, Query, Request } from "@nestjs/common";
import { TransfersService } from "./transfers.service";
import { TransferDTO } from "../../eth/dto/transfer.dto";
import express from "express";
import {
  ApiPaginationResponse,
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  Queries,
  ReadMeExtension,
} from "../../../decorators";
import {
  EXAMPLE_BINANCE_SMART_CHAIN_PAGINATION_TRANSFER_DTO,
  PaginationDTO,
} from "../../eth/dto/pagination.dto";
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiQueryOptions,
  ApiTags,
} from "@nestjs/swagger";
import {
  MASTER_WALLET_ID_OPTIONAL,
  MASTER_WALLET_ID_OPTIONAL_QUERY_ALL,
  PAGE_OPTIONAL,
  SIZE_OPTIONAL,
  STATUS_OPTIONAL,
  TICKER_OPTIONAL,
  TRANSACTION_HASH_OPTIONAL,
  TRANSACTION_ID_OPTIONAL,
  TRANSFER_TYPE_OPTIONAL,
  UPDATED_AT_GTE_OPTIONAL,
  UPDATED_AT_LE_OPTIONAL,
  USER_WALLET_ID_OPTIONAL,
  WALLET_ID_OPTIONAL_ONLY,
} from "../../eth/dto/params";
import {
  EventStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import {
  EXAMPLE_INVALID_STATUS_EXCEPTION_DTO,
  InvalidStatusException,
} from "../../eth/dto/exceptions.dto";

@Controller("transfers")
@AuthErrorResponses()
@AuthHeaders()
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get("/")
  @Queries(
    TICKER_OPTIONAL,
    // USER_WALLET_ID_OPTIONAL,
    {
      name: "userWalletId",
      required: false,
      description: "(Deprecated) walletId를 사용해 주세요.",
    } as ApiQueryOptions,
    MASTER_WALLET_ID_OPTIONAL_QUERY_ALL,
    WALLET_ID_OPTIONAL_ONLY,
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
    TransferDTO,
    EXAMPLE_BINANCE_SMART_CHAIN_PAGINATION_TRANSFER_DTO
  )
  @ApiBadRequestResponse({
    description: "올바르지 않은 트랜잭션 상태(status)로 요청하면 발생합니다.",
    content: ApiResponseContentGenerator(
      InvalidStatusException,
      EXAMPLE_INVALID_STATUS_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "전체 입출금 목록 조회하기",
    description: "모든 지갑의 가상자산 입출금 내역을 조회합니다.",
  })
  @ApiTags("transfers")
  @ReadMeExtension()
  public async getTransfers(
    @Request() request: express.Request,
    @Query("ticker") ticker?: string,
    // deprecated
    // This field is the same as the walletId.
    // For consistency, use the deprecated field when a user sets both the walletId and the deprecated
    @Query("userWalletId") userWalletId?: string,
    // Search the value transfer events of a wallet. By using this field, a user can query master wallet and user wallet's value transfer events.
    @Query("walletId") walletId?: string,
    // By using this field, this API returns all value transfer events related to a master wallet and all its child wallets.
    @Query("masterWalletId") masterWalletId?: string,
    @Query("transactionId") transactionId?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("status") status?: EventStatus,
    @Query("transferType") transferType?: TransferType,
    @Query("updatedAtGte") updatedAtGte?: string,
    @Query("updatedAtLt") updatedAtLt?: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<TransferDTO>> {
    if (userWalletId != null) {
      walletId = userWalletId;
    }
    return await this.transfersService.getTransfers(
      request.sdk,
      {
        ticker,
        walletId,
        masterWalletId,
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
