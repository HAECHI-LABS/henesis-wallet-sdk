import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import express from "express";
import { TransactionDTO } from "../dto/transaction.dto";
import { ApiTags } from "@nestjs/swagger";
import { ReplaceTransactionRequestDTO } from "./dto/replace-transaction-request.dto";

@Controller("/v3/ethereum/transactions")
@ApiTags("v3/ethereum/transactions")
export class TransactionsController {
  constructor(private readonly transactionsServcie: TransactionsService) {}

  @Get("/:transactionId")
  public async getTransaction(
    @Param("transactionId") transactionId: string,
    request: express.Request
  ): Promise<TransactionDTO> {
    return null;
  }
  /* eslint-disable */
  @Post("/:transactionId/replace")
  /* eslint-enable */
  public async repalceTransaction(
    @Param("transactionId") transactionId: string,
    @Body() replaceTransactionRequest: ReplaceTransactionRequestDTO,
    request: express.Request
  ): Promise<TransactionDTO> {
    return null;
  }
}
