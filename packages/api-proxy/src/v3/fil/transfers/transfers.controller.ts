import { Controller, Get, Query, Request } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  ApiPaginationResponse,
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  Queries,
  ReadMeExtension,
} from "../../../decorators";
import express from "express";
import {
  EXAMPLE_FILECOIN_PAGINATION_TRANSFER_DTO,
  PaginationDTO,
} from "../dto/pagination.dto";
import { TransferDTO } from "../dto/transfer.dto";
import { TransfersService } from "./transfers.service";
import {
  TransferStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/fil";
import {
  EXAMPLE_INVALID_STATUS_EXCEPTION_DTO,
  InvalidStatusException,
} from "../dto/exceptions.dto";
import {
  MASTER_WALLET_ID_OPTIONAL,
  TRANSACTION_HASH_OPTIONAL,
  TRANSACTION_ID_OPTIONAL,
  WALLET_ID_OPTIONAL,
} from "../wallets/dto/params.dto";
import {
  TRANSFER_STATUS_OPTIONAL,
  TRANSFER_TYPE_OPTIONAL,
} from "./dto/params.dto";
import {
  PAGE_OPTIONAL,
  SIZE_OPTIONAL,
  UPDATED_AT_GTE_OPTIONAL,
  UPDATED_AT_LE_OPTIONAL,
} from "../dto/params";

@Controller("transfers")
@ApiTags("transfers")
@AuthErrorResponses()
@ApiExtraModels(InvalidStatusException)
@AuthHeaders()
@ReadMeExtension()
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get("/")
  @Queries(
    WALLET_ID_OPTIONAL,
    MASTER_WALLET_ID_OPTIONAL,
    TRANSACTION_ID_OPTIONAL,
    TRANSACTION_HASH_OPTIONAL,
    TRANSFER_STATUS_OPTIONAL,
    TRANSFER_TYPE_OPTIONAL,
    UPDATED_AT_GTE_OPTIONAL,
    UPDATED_AT_LE_OPTIONAL,
    SIZE_OPTIONAL,
    PAGE_OPTIONAL
  )
  @ApiPaginationResponse(TransferDTO, EXAMPLE_FILECOIN_PAGINATION_TRANSFER_DTO)
  @ApiBadRequestResponse({
    description: "올바르지 않은 입출금 상태(status)로 요청하면 발생합니다.",
    content: ApiResponseContentGenerator(
      InvalidStatusException,
      EXAMPLE_INVALID_STATUS_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "전체 입출금 목록 조회하기",
    description: "모든 지갑의 가상자산 입출금 내역을 조회합니다.",
  })
  public async getTransfers(
    @Request() request: express.Request,
    @Query("walletId") walletId?: string,
    @Query("masterWalletId") masterWalletId?: string,
    @Query("transactionId") transactionId?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("status") status?: TransferStatus,
    @Query("transferType") transferType?: TransferType,
    @Query("updatedAtGte") updatedAtGte?: string,
    @Query("updatedAtLt") updatedAtLt?: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<TransferDTO>> {
    return await this.transfersService.getTransfers(
      request.sdk,
      {
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
