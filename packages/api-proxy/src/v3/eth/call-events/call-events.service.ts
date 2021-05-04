import { Injectable } from "@nestjs/common";
import { EventStatus } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { CallEventDTO } from "../dto/call-event.dto";
import { PaginationDTO } from "../dto/pagination.dto";

@Injectable()
export class CallEventsService {
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
  ): Promise<PaginationDTO<CallEventDTO>> {
    const result = await sdk.eth.events.getCallEvents({
      walletId: options.walletId,
      symbol: options.ticker,
      updatedAtGte: options.updatedAtGte,
      updatedAtLt: options.updatedAtLt,
      transactionHash: options.transactionHash,
      status: options.status,
      size: options.size,
      page: options.page,
    });
    return {
      pagination: result.pagination,
      results: result.results.map(CallEventDTO.fromCallEvent),
    };
  }
}
