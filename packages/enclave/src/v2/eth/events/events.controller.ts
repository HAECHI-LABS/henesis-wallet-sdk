import { EventsService } from "./events.service";
import { Controller, Get, Query, Request } from "@nestjs/common";
import { ValueTransferEventDTO } from "../dto/value-transfer-event.dto";
import { CallEventDTO } from "../dto/call-event.dto";
import { ApiHeaders, ApiOperation, ApiTags } from "@nestjs/swagger";
import express from "express";
import { PaginationDTO } from "../dto/pagination.dto";
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
} from "../dto/queries";
import { AUTHORIZATION, X_HENESIS_SECRET } from "../../../headers";
import { EventStatus } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import { Timestamp } from "@haechi-labs/henesis-wallet-core/lib/types";

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
    QUERY_EVENT_PAGE_OPTIONAL
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

// todo: delete when implementation is done
// import express from "express";
// import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
// import {
//   EthCallEvent,
//   EthValueTransferEvent,
// } from "@haechi-labs/henesis-wallet-core/lib/events";
//
// import AbstractController from "../../controller";
// import { Controller } from "../../types";
//
// export default class EventsController
//   extends AbstractController
//   implements Controller {
//   private path = "/api/v2/eth";
//
//   constructor() {
//     super();
//     this.initRoutes();
//   }
//
//   initRoutes(): void {
//     this.router.get(
//       `${this.path}/call-events`,
//       this.promiseWrapper(this.getCallEvents)
//     );
//
//     this.router.get(
//       `${this.path}/value-transfer-events`,
//       this.promiseWrapper(this.getValueTransferEvents)
//     );
//   }
//
//   private async getCallEvents(
//     req: express.Request
//   ): Promise<Pagination<EthCallEvent>> {
//     return this.pagination<EthCallEvent>(
//       req,
//       await req.sdk.eth.events.getCallEvents(req.query)
//     );
//   }
//
//   private async getValueTransferEvents(
//     req: express.Request
//   ): Promise<Pagination<EthValueTransferEvent>> {
//     const events = await req.sdk.eth.events.getValueTransferEvents(req.query);
//     return this.pagination<EthValueTransferEvent>(req, {
//       pagination: events.pagination,
//       results: events.results.map((t) => this.bnToHexString(t)),
//     });
//   }
// }
