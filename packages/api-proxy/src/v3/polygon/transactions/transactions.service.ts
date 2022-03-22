import { Injectable } from "@nestjs/common";
import {
  SDK,
  TransactionPaginationOptions,
} from "@haechi-labs/henesis-wallet-core";
import { TransactionDTO } from "../../eth/dto/transaction.dto";
import { PaginationDTO } from "../../eth/dto/pagination.dto";
import { changeUrlHost } from "../../../utils/pagination";
import express from "express";

@Injectable()
export class TransactionsService {
  public async getTransaction(
    transactionId: string,
    sdk: SDK
  ): Promise<TransactionDTO> {
    return TransactionDTO.fromTransaction(
      await sdk.polygon.transactions.getTransaction(transactionId)
    );
  }

  async getTransactions(
    sdk: SDK,
    options: TransactionPaginationOptions,
    request: express.Request
  ): Promise<PaginationDTO<TransactionDTO>> {
    const results = await sdk.polygon.transactions.getTransactions(options);

    results.pagination.nextUrl = changeUrlHost(
      results.pagination.nextUrl,
      request
    );
    results.pagination.previousUrl = changeUrlHost(
      results.pagination.previousUrl,
      request
    );
    return {
      pagination: results.pagination,
      results: results.results.map(TransactionDTO.fromTransaction),
    };
  }
}
