import { Controller, Get, Query, Request } from "@nestjs/common";
import { CallEventsService } from "./call-events.service";
import { CallEventDTO } from "../dto/call-event.dto";
import express from "express";
import { Status } from "../dto/enums/status.enum";
import { ApiPaginationResponse, Queries } from "../../../decorators";
import { PaginationDTO } from "../dto/pagination.dto";
import { ApiHeaders, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
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
import { AUTHORIZATION, X_HENESIS_SECRET } from "../../../headers";

@Controller("/call-events")
@ApiTags("call-events")
export class CallEventsController {
  constructor(private readonly callEventsService: CallEventsService) {}

  @Get("/")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @Queries(
    WALLET_ID_OPTIONAL,
    TRANSACTION_ID_OPTIONAL,
    TRANSACTION_HASH_OPTIONAL,
    STATUS_OPTIONAL,
    TICKER_OPTIONAL,
    UPDATED_AT_GTE_OPTIONAL,
    UPDATED_AT_LE_OPTIONAL,
    SIZE_OPTIONAL,
    PAGE_OPTIONAL
  )
  @ApiPaginationResponse(CallEventDTO)
  @ApiOperation({
    summary: "스마트 컨트랙트 호출 내역 조회하기",
    description: "내가 발생시킨 스마트 컨트랙트 호출 내역을 조회합니다.",
  })
  public async getCallEvents(
    @Request() request: express.Request,
    @Query("walletId") walletId?: string,
    @Query("transactionId") transactionId?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("status") status?: Status,
    @Query("ticker") ticker?: string,
    @Query("updatedAtGte") updatedAtGte?: string,
    @Query("updatedAtLt") updatedAtLt?: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<CallEventDTO>> {
    return null;
  }
}
