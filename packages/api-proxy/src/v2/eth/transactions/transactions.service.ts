import { Injectable } from "@nestjs/common";
import { SDK, TransactionStatus } from "@haechi-labs/henesis-wallet-core";
import { PaginationDTO } from "../dto/pagination.dto";
import { TransactionDTO } from "../dto/transaction.dto";
import { Timestamp } from "@haechi-labs/henesis-wallet-core/lib/types";
import { TransactionType } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import { ApiPaginationResponse } from "../../../decorators";

@Injectable()
export class TransactionsService {
  public constructor() {}

  @ApiPaginationResponse(TransactionDTO)
  public async getTransactions(
    sdk: SDK,
    address?: string,
    toAddress?: string,
    fromAddress?: string,
    transactionHash?: string,
    start?: Timestamp,
    end?: Timestamp,
    status?: TransactionStatus,
    statuses?: TransactionStatus[],
    types?: TransactionType[],
    keyId?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<PaginationDTO<TransactionDTO>> {
    const options: {
      address?: string;
      toAddress?: string;
      fromAddress?: string;
      transactionHash?: string;
      start?: Timestamp;
      end?: Timestamp;
      status?: TransactionStatus;
      statuses?: TransactionStatus[];
      types?: TransactionType[];
      keyId?: string;
      page?: number;
      size?: number;
      sort?: string;
    } = {};
    if (address) options.address = address;
    if (toAddress) options.toAddress = toAddress;
    if (fromAddress) options.fromAddress = fromAddress;
    if (transactionHash) options.transactionHash = transactionHash;
    if (start) options.start = start;
    if (end) options.end = end;
    if (status) options.status = status;
    if (statuses) options.statuses = statuses;
    if (types) options.types = types;
    if (keyId) options.keyId = keyId;
    if (page) options.page = page;
    if (size) options.size = size;
    if (sort) options.sort = sort;

    const transactions = await sdk.eth.transactions.getTransactions(options);
    return {
      pagination: transactions.pagination as any,
      results: transactions.results.map(TransactionDTO.fromTransaction),
    };
  }

  public async getTransaction(
    sdk: SDK,
    transactionId: string
  ): Promise<TransactionDTO> {
    return TransactionDTO.fromTransaction(
      await sdk.eth.transactions.getTransaction(transactionId)
    );
  }
}
