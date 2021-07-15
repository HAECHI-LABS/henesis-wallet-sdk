import { Controller, Get, Param, Query, Request } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import express from "express";
import {
  EXAMPLE_ETHEREUM_TRANSACTION_DTO,
  TransactionDTO,
} from "../dto/transaction.dto";
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  QUERY_TRANSACTIONS_ADDRESS_OPTIONAL,
  QUERY_TRANSACTIONS_END_OPTIONAL,
  QUERY_TRANSACTIONS_FROM_ADDRESS_OPTIONAL,
  QUERY_TRANSACTIONS_KEY_ID_OPTIONAL,
  QUERY_TRANSACTIONS_START_OPTIONAL,
  QUERY_TRANSACTIONS_STATUS_OPTIONAL,
  QUERY_TRANSACTIONS_STATUSES_OPTIONAL,
  QUERY_TRANSACTIONS_TO_ADDRESS_OPTIONAL,
  QUERY_TRANSACTIONS_TRANSACTION_HASH_OPTIONAL,
  QUERY_TRANSACTIONS_TYPES_OPTIONAL,
  TRANSACTION_ID_REQUIRED,
} from "../dto/params";
import {
  ApiPaginationResponse,
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  Queries,
  ReadMeExtension,
} from "../../../decorators";
import {
  EXAMPLE_TRANSACTION_ID_NOT_FOUND_EXCEPTION_DTO,
  TransactionIdNotFoundException,
} from "../dto/exceptions.dto";
import { Timestamp } from "@haechi-labs/henesis-wallet-core/lib/types";
import { TransactionType } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import { TransactionStatus } from "@haechi-labs/henesis-wallet-core";
import {
  EXAMPLE_ETHEREUM_PAGINATION_TRANSACTION_DTO,
  PaginationDTO,
} from "../dto/pagination.dto";

@Controller("transactions")
@ApiTags("transactions")
@ApiExtraModels(TransactionIdNotFoundException)
@AuthErrorResponses()
@AuthHeaders()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get("/:transactionId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      TransactionDTO,
      EXAMPLE_ETHEREUM_TRANSACTION_DTO
    ),
  })
  @PathParams(TRANSACTION_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "transaction id가 없을 때 발생합니다",
    content: ApiResponseContentGenerator(
      TransactionIdNotFoundException,
      EXAMPLE_TRANSACTION_ID_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "개별 트랜잭션 조회하기",
    description: "내가 발생시킨 특정 트랜잭션의 정보를 조회합니다.",
  })
  public async getTransaction(
    @Param("transactionId") transactionId: string,
    @Request() request: express.Request
  ): Promise<TransactionDTO> {
    return await this.transactionsService.getTransaction(
      transactionId,
      request.sdk
    );
  }

  @Get("/")
  @Queries(
    QUERY_TRANSACTIONS_ADDRESS_OPTIONAL,
    QUERY_TRANSACTIONS_TO_ADDRESS_OPTIONAL,
    QUERY_TRANSACTIONS_FROM_ADDRESS_OPTIONAL,
    QUERY_TRANSACTIONS_START_OPTIONAL,
    QUERY_TRANSACTIONS_TRANSACTION_HASH_OPTIONAL,
    QUERY_TRANSACTIONS_START_OPTIONAL,
    QUERY_TRANSACTIONS_END_OPTIONAL,
    QUERY_TRANSACTIONS_STATUS_OPTIONAL,
    QUERY_TRANSACTIONS_STATUSES_OPTIONAL,
    QUERY_TRANSACTIONS_TYPES_OPTIONAL,
    QUERY_TRANSACTIONS_KEY_ID_OPTIONAL
  )
  @ApiPaginationResponse(
    TransactionDTO,
    EXAMPLE_ETHEREUM_PAGINATION_TRANSACTION_DTO
  )
  @ApiOperation({
    summary: "트랜잭션 목록 조회하기",
    description: "트랜잭션 목록을 조회합니다.",
  })
  @ReadMeExtension()
  public async getTransactions(
    @Request() request: express.Request,
    @Query("address") address?: string,
    @Query("toAddress") toAddress?: string,
    @Query("fromAddress") fromAddress?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("start") start?: Timestamp,
    @Query("end") end?: Timestamp,
    @Query("status") status?: TransactionStatus,
    @Query("statuses") statuses?: TransactionStatus[],
    @Query("types") types?: TransactionType[],
    @Query("keyId") keyId?: string
  ): Promise<PaginationDTO<TransactionDTO>> {
    return await this.transactionsService.getTransactions(request.sdk, {
      address,
      toAddress,
      fromAddress,
      transactionHash,
      start,
      end,
      status,
      statuses,
      types,
      keyId,
    });
  }
}
