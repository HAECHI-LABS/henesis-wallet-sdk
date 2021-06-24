import { Controller, Get, Query, Request } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ApiPaginationResponse,
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  Queries,
  ReadMeExtension,
} from "../../../decorators";
import express from "express";
import { TransferType } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import {
  EXAMPLE_FILECOIN_PAGINATION_TRANSFER_DTO,
  PaginationDTO,
} from "../dto/pagination.dto";
import { TransferDTO } from "../dto/transfer.dto";
import { TransfersService } from "./transfers.service";
import { TransferStatus } from "@haechi-labs/henesis-wallet-core/lib/__generate__/fil";
import {
  EXAMPLE_INVALID_STATUS_EXCEPTION_DTO,
  InvalidStatusException,
} from "../dto/exceptions.dto";

@Controller("transfers")
@ApiTags("transfers")
@AuthErrorResponses()
@AuthHeaders()
@ReadMeExtension()
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get("/")
  @Queries()
  @ApiPaginationResponse(TransferDTO, EXAMPLE_FILECOIN_PAGINATION_TRANSFER_DTO)
  @ApiBadRequestResponse({
    description: "올바르지 않은 입출금 상태(status)로 요청하면 발생합니다.",
    content: ApiResponseContentGenerator(
      InvalidStatusException,
      EXAMPLE_INVALID_STATUS_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "전체 입출금 목록 조회하기",
    description: "모든 지갑의 가상자산 입출금 내역을 조회합니다.",
  })
  public async getTransfers(
    @Request() request: express.Request,
    @Query("walletId") walletId?: string,
    @Query("transactionId") transactionId?: string,
    @Query("transactionHash") transactionHash?: string,
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
      transactionHash,
      status,
      transferType,
      updatedAtGte,
      updatedAtLt,
      size,
      page,
    });
  }
}
