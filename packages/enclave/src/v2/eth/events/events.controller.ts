import { EventsService } from "./events.service";
import { Controller, Get, Query, Request } from "@nestjs/common";
import { ValueTransferEventDTO } from "../dto/value-transfer-event.dto";
import { CallEventDTO } from "../dto/call-event.dto";
import { ApiOperation } from "@nestjs/swagger";
import express from "express";
import { PaginationDTO } from "../../btc/dto/pagination.dto";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsController: EventsService) {}

  @Get("/value-transfer-events")
  @ApiOperation({
    summary: "코인/토큰 입출금 내역 조회하기",
    description: "모든 지갑의 가상자산 입출금 내역을 조회합니다.",
  }) // todo: query / ApiPaginationResponse(ValueTransferEventDTO)
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
  }) // todo: query / ApiPaginationResponse(CallEventDTO)
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
