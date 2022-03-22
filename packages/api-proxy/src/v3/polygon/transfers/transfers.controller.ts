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
  EXAMPLE_ETHEREUM_PAGINATION_TRANSFER_DTO,
  PaginationDTO,
} from "../../eth/dto/pagination.dto";
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiQueryOptions,
  ApiTags,
} from "@nestjs/swagger";
import {
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
  MASTER_WALLET_ID_OPTIONAL,
  WALLET_ID_OPTIONAL,
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
    USER_WALLET_ID_OPTIONAL,
    MASTER_WALLET_ID_OPTIONAL,
    TRANSACTION_ID_OPTIONAL,
    TRANSACTION_HASH_OPTIONAL,
    STATUS_OPTIONAL,
    TRANSFER_TYPE_OPTIONAL,
    UPDATED_AT_GTE_OPTIONAL,
    UPDATED_AT_LE_OPTIONAL,
    SIZE_OPTIONAL,
    PAGE_OPTIONAL
  )
  @ApiPaginationResponse(TransferDTO, EXAMPLE_ETHEREUM_PAGINATION_TRANSFER_DTO)
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
    @Query("walletId") walletId?: string,
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
