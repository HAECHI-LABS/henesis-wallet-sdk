import { Injectable } from "@nestjs/common";
import { SDK, Transaction } from "@haechi-labs/henesis-wallet-core";
import { TransactionDTO } from "../dto/transaction.dto";
import { Wallet } from "@haechi-labs/henesis-wallet-core/lib/wallet";

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
}
