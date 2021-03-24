import { Get, Route, Query, Request } from "tsoa";
import AbstractController from "../../controller";
import {
  EthCallEvent,
  EventStatus,
  Pagination,
  Timestamp,
  ValueTransferEvent,
} from "../../types";
import express from "express";
import { EthValueTransferEvent } from "@haechi-labs/henesis-wallet-core/lib/events";

@Route("/api/v2/eth/events")
export class EventsController extends AbstractController {
  @Get("/call-events")
  public async getCallEvents(
    @Request() request: express.Request,
    @Query() address?: string,
    @Query() toAddress?: string,
    @Query() fromAddress?: string,
    @Query() transactionHash?: string,
    @Query() updatedAtGte?: Timestamp,
    @Query() updatedAtLt?: Timestamp,
    @Query() status?: EventStatus,
    @Query() walletId?: string,
    @Query() orgId?: string,
    @Query() masterWalletId?: string,
    @Query() transactionId?: string,
    @Query() symbol?: string
  ): Promise<Pagination<EthCallEvent>> {
    return this.pagination<EthCallEvent>(
      request,
      await request.sdk.eth.events.getCallEvents({
        address,
        toAddress,
        fromAddress,
        transactionHash,
        updatedAtGte,
        updatedAtLt,
        status,
        walletId,
        orgId,
        masterWalletId,
        transactionId,
        symbol,
      })
    );
  }

  @Get("/value-transfer-events")
  public async getValueTransferEvents(
    @Request() request: express.Request,
    @Query() address?: string,
    @Query() toAddress?: string,
    @Query() fromAddress?: string,
    @Query() transactionHash?: string,
    @Query() updatedAtGte?: Timestamp,
    @Query() updatedAtLt?: Timestamp,
    @Query() status?: EventStatus,
    @Query() walletId?: string,
    @Query() orgId?: string,
    @Query() masterWalletId?: string,
    @Query() transactionId?: string,
    @Query() symbol?: string
  ): Promise<Pagination<ValueTransferEvent>> {
    const events = await request.sdk.eth.events.getValueTransferEvents({
      address,
      toAddress,
      fromAddress,
      transactionHash,
      updatedAtGte,
      updatedAtLt,
      status,
      walletId,
      orgId,
      masterWalletId,
      transactionId,
      symbol,
    });
    return this.pagination<EthValueTransferEvent>(request, {
      pagination: events.pagination,
      results: events.results.map((t) => this.bnToHexString(t)),
    });
  }
}
