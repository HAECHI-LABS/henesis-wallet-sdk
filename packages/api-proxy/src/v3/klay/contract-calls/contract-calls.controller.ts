import { Controller, Get, HttpStatus, Query, Request } from "@nestjs/common";
import { ContractCallsService } from "./contract-calls.service";
import { ContractCallsDTO } from "../../eth/dto/contract-calls.dto";
import express from "express";
import {
  ApiPaginationResponse,
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  Queries,
  ReadMeExtension,
} from "../../../decorators";
import {
  EXAMPLE_ETHEREUM_PAGINATION_CONTRACT_CALLS_DTO,
  PaginationDTO,
} from "../../eth/dto/pagination.dto";
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOperation,
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
} from "../../eth/dto/params";
import {
  AccessTokenNotProvidedException,
  EXAMPLE_INVALID_STATUS_EXCEPTION_DTO,
  InvalidAccessIpException,
  InvalidAccessTokenException,
  InvalidStatusException,
} from "../../eth/dto/exceptions.dto";
import { EventStatus } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";

@Controller("/contract-calls")
@ApiTags("contract-calls")
@ApiExtraModels(
  InvalidAccessIpException,
  InvalidAccessTokenException,
  AccessTokenNotProvidedException,
  InvalidStatusException,
  ContractCallsDTO
)
@AuthErrorResponses()
@AuthHeaders()
export class ContractCallsController {
  constructor(private readonly callEventsService: ContractCallsService) {}

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
  @ApiPaginationResponse(
    ContractCallsDTO,
    EXAMPLE_ETHEREUM_PAGINATION_CONTRACT_CALLS_DTO
  )
  @ApiBadRequestResponse({
    description: "올바르지 않은 트랜잭션 상태(status)로 요청하면 발생합니다.",
    content: ApiResponseContentGenerator(
      InvalidStatusException,
      EXAMPLE_INVALID_STATUS_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "스마트 컨트랙트 호출 내역 조회하기",
    description: "내가 발생시킨 스마트 컨트랙트 호출 내역을 조회합니다.",
  })
  @ReadMeExtension()
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
  ): Promise<PaginationDTO<ContractCallsDTO>> {
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
