import { Controller, Get, Param, Query, Request } from "@nestjs/common";
import { TransfersService } from "./transfers.service";
import { EXAMPLE_TRANSFER_DTO, TransferDTO } from "../dto/transfer.dto";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import express from "express";
import { PaginationDTO } from "../dto/pagination.dto";
import {
  ApiPaginationResponse,
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  Queries,
  ReadMeExtension,
} from "../../../decorators";
import {
  QUERY_TRANSFERS_ADDRESS_OPTIONAL,
  QUERY_TRANSFERS_PAGE_OPTIONAL,
  QUERY_TRANSFERS_SIZE_OPTIONAL,
  QUERY_TRANSFERS_STATUS_OPTIONAL,
  QUERY_TRANSFERS_TRANSACTION_HASH_OPTIONAL,
  QUERY_TRANSFERS_TYPE_OPTIONAL,
  QUERY_TRANSFERS_UPDATED_AT_GTE_OPTIONAL,
  QUERY_TRANSFERS_UPDATED_AT_LT_OPTIONAL,
  QUERY_TRANSFERS_WALLET_ID_OPTIONAL,
} from "../dto/queries";
import { PARAM_TRANSFER_ID } from "../dto/params";
import { EXAMPLE_PAGINATION_TRANSFER_DTO } from "../dto/pagination.dto";

@Controller("transfers")
@AuthErrorResponses()
@AuthHeaders()
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get("/")
  @ApiOperation({
    summary: "입출금 내역 조회하기",
    description: "입출금 내역을 조회합니다.",
  })
  @ApiTags("transfers")
  @ApiPaginationResponse(TransferDTO, EXAMPLE_PAGINATION_TRANSFER_DTO)
  @Queries(
    QUERY_TRANSFERS_TYPE_OPTIONAL,
    QUERY_TRANSFERS_WALLET_ID_OPTIONAL,
    QUERY_TRANSFERS_STATUS_OPTIONAL,
    QUERY_TRANSFERS_ADDRESS_OPTIONAL,
    QUERY_TRANSFERS_TRANSACTION_HASH_OPTIONAL,
    QUERY_TRANSFERS_UPDATED_AT_GTE_OPTIONAL,
    QUERY_TRANSFERS_UPDATED_AT_LT_OPTIONAL,
    QUERY_TRANSFERS_SIZE_OPTIONAL,
    QUERY_TRANSFERS_PAGE_OPTIONAL
  )
  @ReadMeExtension()
  public async getTransfers(
    @Request() request: express.Request,
    @Query("type") type?: string,
    @Query("walletId") walletId?: string,
    @Query("status") status?: string,
    @Query("address") address?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("updatedAtGte") updatedAtGte?: string,
    @Query("updatedAtLt") updatedAtLt?: string,
    @Query("size") size?: string,
    @Query("page") page?: string
  ): Promise<PaginationDTO<TransferDTO>> {
    return await this.transfersService.getTransfers(
      request.sdk,
      {
        type,
        walletId,
        status,
        address,
        transactionHash,
        updatedAtGte,
        updatedAtLt,
        size,
        page,
      },
      request
    );
  }

  @Get("/:transferId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(TransferDTO, EXAMPLE_TRANSFER_DTO),
  })
  @ApiOperation({
    summary: "특정 입출금 내역 조회하기",
    description: "특정 입출금 내역을 조회합니다.",
  })
  @ApiTags("transfers")
  @PathParams(PARAM_TRANSFER_ID)
  @ReadMeExtension()
  public async getTransfer(
    @Request() request: express.Request,
    @Param("transferId") transferId: string
  ): Promise<TransferDTO> {
    return await this.transfersService.getTransfer(request.sdk, transferId);
  }
}
