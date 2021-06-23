import { Controller, Get, Query, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  AuthErrorResponses,
  AuthHeaders,
  ReadMeExtension,
} from "../../../decorators";
import express from "express";
import { TransferType } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import { PaginationDTO } from "../dto/pagination.dto";
import { TransferDTO } from "../dto/transfer.dto";
import { TransfersService } from "./transfers.service";
import { TransferStatus } from "@haechi-labs/henesis-wallet-core/lib/__generate__/fil";

@Controller("transfers")
@ApiTags("transfers")
@AuthErrorResponses()
@AuthHeaders()
@ReadMeExtension()
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get("/")
  public async getTransfers(
    @Request() request: express.Request,
    @Query("walletId") walletId?: string,
    @Query("transactionId") transactionId?: string,
    @Query("status") status?: TransferStatus,
    @Query("transferType") transferType?: TransferType,
    @Query("updatedAtGte") updatedAtGte?: string,
    @Query("updatedAtLt") updatedAtLt?: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<TransferDTO>> {
    return await this.transfersService.getTransfers(request.sdk, {
      walletId,
      transactionId,
      status,
      transferType,
      updatedAtGte,
      updatedAtLt,
      size,
      page,
    });
  }
}
