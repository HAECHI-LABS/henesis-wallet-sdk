import { Controller, Get, Query, Request } from "@nestjs/common";
import { TransfersService } from "./transfers.service";
import { TransferDTO } from "../dto/transfer.dto";
import { Status } from "../dto/enums/status.enum";
import express from "express";
import { ApiPaginationResponse, OptionalQueries } from "../../../decorators";
import { PaginationDTO } from "../dto/pagination.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("/v3/ethereum/transfers")
@ApiTags("v3/ethereum/transfers")
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get("/")
  // optional
  @OptionalQueries(
    "ticker",
    "depositAddressId",
    "walletId",
    "transactionId",
    "transactionHash",
    "status",
    "updatedAtGte",
    "updatedAtLt",
    "size",
    "page"
  )
  // pagination type
  @ApiPaginationResponse(TransferDTO)
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
