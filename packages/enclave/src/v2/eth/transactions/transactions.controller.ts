import { Controller, Get, Param, Query, Request } from "@nestjs/common";
import { TransactionDTO } from "../dto/transaction.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import express from "express";
import {
  ApiPaginationResponse,
  PathParams,
  Queries,
} from "../../../decorators";
import { ValueTransferEventDTO } from "../dto/value-transfer-event.dto";
import { PARAM_TRANSACTION_ID } from "../dto/params";
import { PaginationDTO } from "../dto/pagination.dto";
import { TransactionsService } from "./transactions.service";
import { Timestamp } from "@haechi-labs/henesis-wallet-core/lib/types";
import { TransactionStatus } from "@haechi-labs/henesis-wallet-core";
import { TransactionType } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import {
  QUERY_PAGE_OPTIONAL,
  QUERY_SIZE_OPTIONAL,
  QUERY_SORT_OPTIONAL,
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
} from "../dto/queries";

@Controller("transactions")
@ApiTags("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get("/")
  @ApiOperation({
    summary: "모든 트랜잭션 정보 조회하기",
    description: "내가 발생시킨 모든 트랜잭션의 정보를 조회합니다.",
  })
  @Queries(
    QUERY_TRANSACTIONS_ADDRESS_OPTIONAL,
    QUERY_TRANSACTIONS_TO_ADDRESS_OPTIONAL,
    QUERY_TRANSACTIONS_FROM_ADDRESS_OPTIONAL,
    QUERY_TRANSACTIONS_TRANSACTION_HASH_OPTIONAL,
    QUERY_TRANSACTIONS_START_OPTIONAL,
    QUERY_TRANSACTIONS_END_OPTIONAL,
    QUERY_TRANSACTIONS_STATUS_OPTIONAL,
    QUERY_TRANSACTIONS_STATUSES_OPTIONAL,
    QUERY_TRANSACTIONS_TYPES_OPTIONAL,
    QUERY_TRANSACTIONS_KEY_ID_OPTIONAL,
    QUERY_PAGE_OPTIONAL,
    QUERY_SIZE_OPTIONAL,
    QUERY_SORT_OPTIONAL
  )
  @ApiPaginationResponse(ValueTransferEventDTO)
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
    @Query("keyId") keyId?: string,
    @Query("page") page?: number,
    @Query("size") size?: number,
    @Query("sort") sort?: string
  ): Promise<PaginationDTO<TransactionDTO>> {
    return await this.transactionsService.getTransactions(
      request.sdk,
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
      page,
      size,
      sort
    );
  }

  @Get("/:transactionId")
  @ApiOperation({
    summary: "특정 트랜잭션 정보 조회하기",
    description: "내가 발생시킨 특정 트랜잭션의 정보를 조회합니다.",
  })
  @PathParams(PARAM_TRANSACTION_ID)
  public async getTransaction(
    @Request() request: express.Request,
    @Param("transactionId") transactionId: string
  ): Promise<TransactionDTO> {
    return await this.transactionsService.getTransaction(
      request.sdk,
      transactionId
    );
  }
}
