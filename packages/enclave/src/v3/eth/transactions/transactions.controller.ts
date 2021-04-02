import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import express from "express";
import { TransactionDTO } from "../dto/transaction.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ReplaceTransactionRequestDTO } from "./dto/replace-transaction-request.dto";
import {
  TRANSACTION_ID_OPTIONAL,
  TRANSACTION_ID_REQUIRED,
} from "../dto/params";
import { PathParams } from "../../../decorators";

@Controller("transactions")
@ApiTags("transactions")
export class TransactionsController {
  constructor(private readonly transactionsServcie: TransactionsService) {}

  @Get("/:transactionId")
  @PathParams(TRANSACTION_ID_REQUIRED)
  @ApiOperation({ summary: "개별 트랜잭션 조회하기" })
  public async getTransaction(
    @Param("transactionId") transactionId: string,
    request: express.Request
  ): Promise<TransactionDTO> {
    return null;
  }

  @Post("/:transactionId/replace")
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
