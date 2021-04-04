import { Controller, Get, HttpStatus, Query, Request } from "@nestjs/common";
import { CallEventsService } from "./call-events.service";
import { CallEventDTO } from "../dto/call-event.dto";
import express from "express";
import {
  ApiPaginationResponse,
  AuthErrorResponses,
  AuthHeaders,
  Queries,
} from "../../../decorators";
import { PaginationDTO } from "../dto/pagination.dto";
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
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
import {
  AccessTokenNotProvidedException,
  InvalidAccessIpException,
  InvalidAccessTokenException,
  InvalidStatusException,
} from "../dto/exceptions.dto";
import { EventStatus } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";

@Controller("/call-events")
@ApiTags("call-events")
@ApiExtraModels(
  InvalidAccessIpException,
  InvalidAccessTokenException,
  AccessTokenNotProvidedException
)
@AuthErrorResponses()
@AuthHeaders()
export class CallEventsController {
  constructor(private readonly callEventsService: CallEventsService) {}

  @Get("/")
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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "올바르지 않은 트랜잭션 상태(status)로 요청하면 발생합니다.",
    type: InvalidStatusException,
  })
  @ApiOperation({
    summary: "스마트 컨트랙트 호출 내역 조회하기",
    description: "내가 발생시킨 스마트 컨트랙트 호출 내역을 조회합니다.",
  })
  public async getCallEvents(
    @Request() request: express.Request,
    @Query("walletId") walletId?: string,
    @Query("transactionId") transactionId?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("status") status?: EventStatus,
    @Query("ticker") ticker?: string,
    @Query("updatedAtGte") updatedAtGte?: string,
    @Query("updatedAtLt") updatedAtLt?: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<CallEventDTO>> {
    return await this.callEventsService.getCallEvents(request.sdk, {
      walletId,
      transactionId,
      transactionHash,
      status,
      ticker,
      updatedAtGte,
      updatedAtLt,
      size,
      page,
    });
  }
}
