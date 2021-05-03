import { Controller, Get, Query, Request } from "@nestjs/common";
import { EventsService } from "./events.service";
import { ValueTransferEventDTO } from "../dto/value-transfer-event.dto";
import { CallEventDTO } from "../dto/call-event.dto";
import { ApiHeaders, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AUTHORIZATION, X_HENESIS_SECRET } from "../../../headers";
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
} from "../../eth/dto/queries";
import express from "express";
import { PaginationDTO } from "../../eth/dto/pagination.dto";

@Controller("events")
@ApiTags("events")
@AuthErrorResponses()
@AuthHeaders()
export class EventsController {
  constructor(private readonly eventsController: EventsService) {}

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
    @Query("status") status?: string,
    @Query("updatedAtGte") updatedAtGte?: string,
    @Query("updatedAtLt") updatedAtLt?: string,
    @Query("size") size?: string,
    @Query("page") page?: string
  ): Promise<PaginationDTO<ValueTransferEventDTO>> {
    return null;
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
    @Query("walletId") walletId?: string,
    @Query("masterWalletId") masterWalletId?: string,
    @Query("transactionId") transactionId?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("status") status?: string,
    @Query("updatedAtGte") updatedAtGte?: string,
    @Query("updatedAtLt") updatedAtLt?: string,
    @Query("size") size?: string,
    @Query("page") page?: string
  ): Promise<PaginationDTO<CallEventDTO>> {
    return null;
  }
}

// todo: delete when implementation is done
// import AbstractController from "../../controller";
// import { Controller } from "../../../types";
// import express from "express";
// import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
// import {
//   EthCallEvent,
//   EthValueTransferEvent,
// } from "@haechi-labs/henesis-wallet-core/lib/events";
//
// export interface EthValueTransferEventResponse
//   extends Omit<EthValueTransferEvent, "amount"> {
//   amount: string;
// }
//
// export default class EventsController
//   extends AbstractController
//   implements Controller {
//   private path = "/api/v2/klay";
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
//       await req.sdk.klay.events.getCallEvents(req.query)
//     );
//   }
//
//   private async getValueTransferEvents(
//     req: express.Request
//   ): Promise<Pagination<EthValueTransferEventResponse>> {
//     const events = await req.sdk.klay.events.getValueTransferEvents(req.query);
//     return this.pagination<EthValueTransferEvent>(req, {
//       pagination: events.pagination,
//       results: events.results.map((t) => this.bnToHexString(t)),
//     });
//   }
// }
