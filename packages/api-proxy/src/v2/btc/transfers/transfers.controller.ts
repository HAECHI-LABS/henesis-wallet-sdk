import { Controller, Get, Param, Query, Request } from "@nestjs/common";
import { TransfersService } from "./transfers.service";
import { EXAMPLE_BITCOIN_TRANSFER_DTO, TransferDTO } from '../dto/transfer.dto';
import { ApiHeaders, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import express from "express";
import { EXAMPLE_BITCOIN_PAGINATION_TRANSFER_DTO, PaginationDTO } from '../dto/pagination.dto';
import {
  ApiPaginationResponse, ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  Queries
} from '../../../decorators';
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

@Controller("transfers")
@ApiTags("transfers")
@AuthErrorResponses()
@AuthHeaders()
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get("/")
  @ApiOperation({
    summary: "입출금 내역 조회하기",
    description: "입출금 내역을 조회합니다.",
  })
  @ApiPaginationResponse(TransferDTO, EXAMPLE_BITCOIN_PAGINATION_TRANSFER_DTO)
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
    return await this.transfersService.getTransfers(request.sdk, {
      type,
      walletId,
      status,
      address,
      transactionHash,
      updatedAtGte,
      updatedAtLt,
      size,
      page,
    });
  }

  @Get("/:transferId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(TransferDTO, EXAMPLE_BITCOIN_TRANSFER_DTO)
  })
  @ApiOperation({
    summary: "특정 입출금 내역 조회하기",
    description: "특정 입출금 내역을 조회합니다.",
  })
  @PathParams(PARAM_TRANSFER_ID)
  public async getTransfer(
    @Request() request: express.Request,
    @Param("transferId") transferId: string
  ): Promise<TransferDTO> {
    return await this.transfersService.getTransfer(request.sdk, transferId);
  }
}
