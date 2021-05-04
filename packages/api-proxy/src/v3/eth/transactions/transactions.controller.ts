import { Controller, Get, Param, Request } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import express from "express";
import { TransactionDTO } from "../dto/transaction.dto";
import { ApiBadRequestResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TRANSACTION_ID_REQUIRED } from "../dto/params";
import {
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
} from "../../../decorators";
import { TransactionIdNotFoundException } from "../dto/exceptions.dto";

@Controller("transactions")
@ApiTags("transactions")
@AuthErrorResponses()
@AuthHeaders()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get("/:transactionId")
  @PathParams(TRANSACTION_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "transaction id가 없을 때 발생합니다",
    type: TransactionIdNotFoundException,
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
}
