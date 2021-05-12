import { Controller, Get, Query, Request } from "@nestjs/common";
import { EventsService } from "./events.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ApiPaginationResponse,
  AuthErrorResponses,
  AuthHeaders,
  Queries,
} from "../../../decorators";
import {
  QUERY_EVENT_MASTER_WALLET_ID_OPTIONAL,
  QUERY_EVENT_PAGE_OPTIONAL,
  QUERY_EVENT_SIZE_OPTIONAL,
  QUERY_EVENT_STATUS_OPTIONAL,
  QUERY_EVENT_SYMBOL_OPTIONAL,
  QUERY_EVENT_TRANSACTION_HASH_OPTIONAL,
  QUERY_EVENT_TRANSACTION_ID_OPTIONAL,
  QUERY_EVENT_UPDATED_AT_GTE_OPTIONAL,
  QUERY_EVENT_UPDATED_AT_LT_OPTIONAL,
  QUERY_EVENT_WALLET_ID_OPTIONAL,
  QUERY_EVENT_TRANSFER_TYPE_OPTIONAL,
} from "../../eth/dto/queries";
import express from "express";
import { PaginationDTO } from "../../eth/dto/pagination.dto";
import { Timestamp } from "@haechi-labs/henesis-wallet-core/lib/types";
import {
  EventStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import { ValueTransferEventDTO } from "../../eth/dto/value-transfer-event.dto";
import { CallEventDTO } from "../../eth/dto/call-event.dto";

@Controller("events")
@ApiTags("events")
@AuthErrorResponses()
@AuthHeaders()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("/value-transfer-events")
  @ApiOperation({
    summary: "코인/토큰 입출금 내역 조회하기",
    description: "모든 지갑의 가상자산 입출금 내역을 조회합니다.",
  })
  @Queries(
    QUERY_EVENT_SYMBOL_OPTIONAL,
    QUERY_EVENT_WALLET_ID_OPTIONAL,
    QUERY_EVENT_MASTER_WALLET_ID_OPTIONAL,
    QUERY_EVENT_TRANSACTION_ID_OPTIONAL,
    QUERY_EVENT_TRANSACTION_HASH_OPTIONAL,
    QUERY_EVENT_STATUS_OPTIONAL,
    QUERY_EVENT_UPDATED_AT_GTE_OPTIONAL,
    QUERY_EVENT_UPDATED_AT_LT_OPTIONAL,
    QUERY_EVENT_SIZE_OPTIONAL,
    QUERY_EVENT_PAGE_OPTIONAL,
    QUERY_EVENT_TRANSFER_TYPE_OPTIONAL
  )
  @ApiPaginationResponse(ValueTransferEventDTO)
  public async getValueTransferEvents(
    @Request() request: express.Request,
    @Query("symbol") symbol?: string,
    @Query("walletId") walletId?: string,
    @Query("masterWalletId") masterWalletId?: string,
    @Query("transactionId") transactionId?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("status") status?: EventStatus,
    @Query("transferType") transferType?: TransferType,
    @Query("updatedAtGte") updatedAtGte?: Timestamp,
    @Query("updatedAtLt") updatedAtLt?: Timestamp,
    @Query("size") size?: number,
    @Query("page") page?: number
  ): Promise<PaginationDTO<ValueTransferEventDTO>> {
    return await this.eventsService.getValueTransferEvents(
      request.sdk,
      symbol,
      walletId,
      masterWalletId,
      transactionId,
      transactionHash,
      status,
      transferType,
      updatedAtGte,
      updatedAtLt,
      size,
      page
    );
  }

  @Get("/call-events")
  @ApiOperation({
    summary: "스마트 컨트랙트 호출 내역 조회하기",
    description: "내가 발생시킨 스마트 컨트랙트 호출 내역을 조회합니다.",
  })
  @Queries(
    QUERY_EVENT_WALLET_ID_OPTIONAL,
    QUERY_EVENT_MASTER_WALLET_ID_OPTIONAL,
    QUERY_EVENT_TRANSACTION_ID_OPTIONAL,
    QUERY_EVENT_TRANSACTION_HASH_OPTIONAL,
    QUERY_EVENT_STATUS_OPTIONAL,
    QUERY_EVENT_UPDATED_AT_GTE_OPTIONAL,
    QUERY_EVENT_UPDATED_AT_LT_OPTIONAL,
    QUERY_EVENT_SIZE_OPTIONAL,
    QUERY_EVENT_PAGE_OPTIONAL
  )
  @ApiPaginationResponse(CallEventDTO)
  public async getCallEvents(
    @Request() request: express.Request,
    @Query("walletId") walletId?: string,
    @Query("masterWalletId") masterWalletId?: string,
    @Query("transactionId") transactionId?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("status") status?: EventStatus,
    @Query("updatedAtGte") updatedAtGte?: Timestamp,
    @Query("updatedAtLt") updatedAtLt?: Timestamp,
    @Query("size") size?: number,
    @Query("page") page?: number
  ): Promise<PaginationDTO<CallEventDTO>> {
    return await this.eventsService.getCallEvents(
      request.sdk,
      walletId,
      masterWalletId,
      transactionId,
      transactionHash,
      status,
      updatedAtGte,
      updatedAtLt,
      size,
      page
    );
  }
}
