import { Injectable } from "@nestjs/common";
import {
  SDK,
  TransactionPaginationOptions,
} from "@haechi-labs/henesis-wallet-core";
import { TransactionDTO } from "../../eth/dto/transaction.dto";
import { PaginationDTO } from "../../eth/dto/pagination.dto";

@Injectable()
export class TransactionsService {
  public async getTransaction(
    transactionId: string,
    sdk: SDK
  ): Promise<TransactionDTO> {
    return TransactionDTO.fromTransaction(
      await sdk.bsc.transactions.getTransaction(transactionId)
    );
  }

  async getTransactions(
    sdk: SDK,
    options: TransactionPaginationOptions
  ): Promise<PaginationDTO<TransactionDTO>> {
    const results = await sdk.bsc.transactions.getTransactions(options);
    return {
      pagination: results.pagination,
      results: results.results.map(TransactionDTO.fromTransaction),
    };
  }
}
