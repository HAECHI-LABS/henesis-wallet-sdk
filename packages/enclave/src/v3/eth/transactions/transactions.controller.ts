import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import express from "express";
import { TransactionDTO } from "../dto/transaction.dto";
import { ApiHeaders, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ReplaceTransactionRequestDTO } from "./dto/replace-transaction-request.dto";
import {
  TRANSACTION_ID_OPTIONAL,
  TRANSACTION_ID_REQUIRED,
} from "../dto/params";
import { PathParams } from "../../../decorators";
import { AUTHORIZATION, X_HENESIS_SECRET } from "../../../headers";

@Controller("transactions")
@ApiTags("transactions")
export class TransactionsController {
  constructor(private readonly transactionsServcie: TransactionsService) {}

  @Get("/:transactionId")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(TRANSACTION_ID_REQUIRED)
  @ApiOperation({
    summary: "개별 트랜잭션 조회하기",
    description: "내가 발생시킨 특정 트랜잭션의 정보를 조회합니다.",
  })
  public async getTransaction(
    @Param("transactionId") transactionId: string,
    request: express.Request
  ): Promise<TransactionDTO> {
    return null;
  }

  @Post("/:transactionId/replace")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(TRANSACTION_ID_REQUIRED)
  @ApiOperation({ summary: "트랜잭션 교체하기" })
  public async repalceTransaction(
    @Param("transactionId") transactionId: string,
    @Body() replaceTransactionRequest: ReplaceTransactionRequestDTO,
    request: express.Request
  ): Promise<TransactionDTO> {
    return null;
  }
}
