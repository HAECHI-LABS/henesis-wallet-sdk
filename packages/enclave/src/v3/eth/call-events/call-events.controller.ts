import { Controller, Get, Query, Request } from "@nestjs/common";
import { CallEventsService } from "./call-events.service";
import { CallEventDTO } from "../dto/call-event.dto";
import express from "express";
import { Status } from "../dto/enums/status.enum";
import { ApiPaginationResponse, OptionalQueries } from "../../../decorators";
import { PaginationDTO } from "../dto/pagination.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("/v3/ethereum/call-events")
@ApiTags("v3/ethereum/call-events")
export class CallEventsController {
  constructor(private readonly callEventsService: CallEventsService) {}

  @Get("/")
  @OptionalQueries(
    "walletId",
    "transactionId",
    "transactionHash",
    "status",
    "ticker",
    "updatedAtGte",
    "updatedAtLt",
    "size",
    "page"
  )
  @ApiPaginationResponse(CallEventDTO)
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
