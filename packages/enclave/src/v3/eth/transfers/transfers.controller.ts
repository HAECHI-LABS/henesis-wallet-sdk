import { Controller, Get, Query, Request } from "@nestjs/common";
import { TransfersService } from "./transfers.service";
import { TransferDTO } from "../dto/transfer.dto";
import { Status } from "../dto/enums/status.enum";
import express from "express";
import { ApiPaginationResponse, Queries } from "../../../decorators";
import { PaginationDTO } from "../dto/pagination.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  DEPOSIT_ADDRESS_ID_OPTIONAL,
  PAGE_OPTIONAL,
  SIZE_OPTIONAL,
  STATUS_OPTIONAL,
  TICKER_OPTIONAL,
  TRANSACTION_HASH_OPTIONAL,
  TRANSACTION_ID_OPTIONAL,
  UPDATED_AT_GTE_OPTIONAL,
  UPDATED_AT_LE_OPTIONAL,
  WALLET_ID_OPTIONAL,
} from "../dto/params";

@Controller("transfers")
@ApiTags("transfers")
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get("/")
  @Queries(
    TICKER_OPTIONAL,
    DEPOSIT_ADDRESS_ID_OPTIONAL,
    WALLET_ID_OPTIONAL,
    TRANSACTION_ID_OPTIONAL,
    TRANSACTION_HASH_OPTIONAL,
    STATUS_OPTIONAL,
    UPDATED_AT_GTE_OPTIONAL,
    UPDATED_AT_LE_OPTIONAL,
    SIZE_OPTIONAL,
    PAGE_OPTIONAL
  )
  // pagination type
  @ApiPaginationResponse(TransferDTO)
  @ApiOperation({ summary: "전체 입출금 목록 조회하기" })
  public async getTransfers(
    @Request() request: express.Request,
    @Query("ticker") ticker?: string,
    @Query("depositAddressId") depositAddressId?: string,
    @Query("walletId") walletId?: string,
    @Query("transactionId") transactionId?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("status") status?: Status,
    @Query("updatedAtGte") updatedAtGte?: string,
    @Query("updatedAtLt") updatedAtLt?: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<TransferDTO>> {
    return null;
  }
}
