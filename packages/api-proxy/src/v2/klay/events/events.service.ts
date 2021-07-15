import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { PaginationDTO } from "../../eth/dto/pagination.dto";
import { ValueTransferEventDTO } from "../../eth/dto/value-transfer-event.dto";
import { CallEventDTO } from "../../eth/dto/call-event.dto";
import {
  EthEventPaginationOptions,
  EthValueTransferEventPaginationOptions,
} from "@haechi-labs/henesis-wallet-core/lib/events";
import { object } from "../../../utils/object";
import { getPaginationMeta } from "../../../utils/pagination";

@Injectable()
export class EventsService {
  public constructor() {}

  public async getValueTransferEvents(
    sdk: SDK,
    options: EthValueTransferEventPaginationOptions,
    path: string
  ): Promise<PaginationDTO<ValueTransferEventDTO>> {
    const events = await sdk.klay.events.getValueTransferEvents(
      object(options)
    );
    return {
      pagination: getPaginationMeta(
        path,
        options.page,
        options.size,
        events.pagination.totalCount,
        options
      ),
      results: events.results.map(
        ValueTransferEventDTO.fromETHValueTransferEvent
      ),
    };
  }

  public async getCallEvents(
    sdk: SDK,
    options: EthEventPaginationOptions,
    path: string
  ): Promise<PaginationDTO<CallEventDTO>> {
    const events = await sdk.klay.events.getCallEvents(object(options));
    return {
      pagination: getPaginationMeta(
        path,
        options.page,
        options.size,
        events.pagination.totalCount,
        options
      ),
      results: events.results.map(CallEventDTO.fromETHCallEvent),
    };
  }
}
