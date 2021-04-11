import { Controller, Get, Query, Request } from "@nestjs/common";
import { TransactionDTO } from "../dto/transaction.dto";
import { ApiOperation } from "@nestjs/swagger";
import { PaginationDTO } from "../../btc/dto/pagination.dto";
import express from "express";

@Controller("transactions")
export class TransactionsController {
  @Get("/")
  @ApiOperation({
    summary: "모든 트랜잭션 정보 조회하기",
    description: "내가 발생시킨 모든 트랜잭션의 정보를 조회합니다.",
  }) // todo: query / ApiPaginationResponse(ValueTransferEventDTO)
  public async getTransactions(
    @Request() request: express.Request
  ): Promise<PaginationDTO<TransactionDTO>> {
    return null;
  }

  @Get("/:transactionId")
  @ApiOperation({
    summary: "특정 트랜잭션 정보 조회하기",
    description: "내가 발생시킨 특정 트랜잭션의 정보를 조회합니다.",
  })
  public async getTransaction(
    @Request() request: express.Request
  ): Promise<TransactionDTO> {
    return null;
  }
}

// todo: delete when implementation is done
// import express from "express";
// import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
// import { Transaction } from "@haechi-labs/henesis-wallet-core";
//
// import AbstractController from "../../controller";
// import { Controller } from "../../types";
//
// export default class TransactionsController
//   extends AbstractController
//   implements Controller {
//   private path = "/api/v2/eth/transactions";
//
//   constructor() {
//     super();
//     this.initRoutes();
//   }
//
//   initRoutes(): void {
//     this.router.get(
//       `${this.path}`,
//       this.promiseWrapper(this.getAllTransactions)
//     );
//
//     this.router.get(
//       `${this.path}/:transactionId`,
//       this.promiseWrapper(this.getTransaction)
//     );
//   }
//
//   private async getAllTransactions(
//     req: express.Request
//   ): Promise<Pagination<Transaction>> {
//     const transaction = await req.sdk.eth.transactions.getTransactions(
//       req.query
//     );
//     return this.pagination<Transaction>(req, {
//       pagination: transaction.pagination,
//       results: transaction.results.map((c) => this.bnToHexString(c)),
//     });
//   }
//
//   private async getTransaction(req: express.Request): Promise<Transaction> {
//     return this.bnToHexString(
//       await req.sdk.eth.transactions.getTransaction(req.params.transactionId)
//     );
//   }
// }
