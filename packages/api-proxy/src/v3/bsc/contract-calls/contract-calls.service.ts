import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { EventStatus } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import { PaginationDTO } from "../../eth/dto/pagination.dto";
import { ContractCallsDTO } from "../../eth/dto/contract-calls.dto";

@Injectable()
export class ContractCallsService {
  async getCallEvents(
    sdk: SDK,
    options: {
      walletId: string;
      ticker: string;
      updatedAtGte: string;
      size: number;
      updatedAtLt: string;
      page: number;
      transactionId: string;
      transactionHash: string;
      status: EventStatus;
    }
  ): Promise<PaginationDTO<ContractCallsDTO>> {
    const result = await sdk.bsc.events.getCallEvents({
      walletId: options.walletId,
      symbol: options.ticker,
      updatedAtGte: options.updatedAtGte,
      updatedAtLt: options.updatedAtLt,
      transactionId: options.transactionId,
      transactionHash: options.transactionHash,
      status: options.status,
      size: options.size,
      page: options.page,
    });
    return {
      pagination: result.pagination,
      results: result.results.map(ContractCallsDTO.fromCallEvent),
    };
  }
}
