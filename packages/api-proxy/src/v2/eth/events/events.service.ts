import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { PaginationDTO } from "../dto/pagination.dto";
import { ValueTransferEventDTO } from "../dto/value-transfer-event.dto";
import { CallEventDTO } from "../dto/call-event.dto";
import {
  EthEventPaginationOptions,
  EthValueTransferEventPaginationOptions,
} from "@haechi-labs/henesis-wallet-core/lib/events";
import { object } from "../../../utils/object";
import { changeUrlHost } from "../../../utils/pagination";
import express from "express";

@Injectable()
export class EventsService {
  public constructor() {}

  public async getValueTransferEvents(
    sdk: SDK,
    options: EthValueTransferEventPaginationOptions,
    request: express.Request
  ): Promise<PaginationDTO<ValueTransferEventDTO>> {
    const events = await sdk.eth.events.getValueTransferEvents(object(options));

    events.pagination.nextUrl = changeUrlHost(
      events.pagination.nextUrl,
      request
    );
    events.pagination.previousUrl = changeUrlHost(
      events.pagination.previousUrl,
      request
    );
    return {
      pagination: events.pagination,
      results: events.results.map(
        ValueTransferEventDTO.fromETHValueTransferEvent
      ),
    };
  }

  public async getCallEvents(
    sdk: SDK,
    options: EthEventPaginationOptions,
    request: express.Request
  ): Promise<PaginationDTO<CallEventDTO>> {
    const events = await sdk.eth.events.getCallEvents(object(options));

    events.pagination.nextUrl = changeUrlHost(
      events.pagination.nextUrl,
      request
    );
    events.pagination.previousUrl = changeUrlHost(
      events.pagination.previousUrl,
      request
    );
    return {
      pagination: events.pagination,
      results: events.results.map(CallEventDTO.fromETHCallEvent),
    };
  }
}
