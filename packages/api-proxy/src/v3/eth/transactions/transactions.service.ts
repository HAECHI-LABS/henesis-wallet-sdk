import { Injectable } from "@nestjs/common";
import {
  SDK,
  TransactionPaginationOptions,
} from "@haechi-labs/henesis-wallet-core";
import { TransactionDTO } from "../dto/transaction.dto";
import { PaginationDTO } from "../dto/pagination.dto";

@Injectable()
export class TransactionsService {
  public async getTransaction(
    transactionId: string,
    sdk: SDK
  ): Promise<TransactionDTO> {
    return TransactionDTO.fromTransaction(
      await sdk.eth.transactions.getTransaction(transactionId)
    );
  }

  async getTransactions(
    sdk: SDK,
    options: TransactionPaginationOptions
  ): Promise<PaginationDTO<TransactionDTO>> {
    const results = await sdk.eth.transactions.getTransactions(options);
    return {
      pagination: results.pagination,
      results: results.results.map(TransactionDTO.fromTransaction),
    };
  }
}
