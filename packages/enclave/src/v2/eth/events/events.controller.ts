import { EventsService } from "./events.service";
import { CallEventDTO, ValueTransferEventDTO } from "../../dto";
import { Controller, Get } from "@nestjs/common";

@Controller("/v2/eth/events")
export class EventsController {
  constructor(private readonly eventsController: EventsService) {}

  // todo: implement
  @Get("/value-transfer-events")
  public async getValueTransferEvents(): Promise<ValueTransferEventDTO> {
    return null;
  }

  // todo: implement
  @Get("/call-events")
  public async getCallEvents(): Promise<CallEventDTO> {
    return null;
  }
}
// todo: delete when implementation is done
// import express from "express";
// import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
// import {
//   EthCallEvent,
//   EthValueTransferEvent,
// } from "@haechi-labs/henesis-wallet-core/lib/events";
//
// import AbstractController from "../../controller";
// import { Controller } from "../../types";
//
// export default class EventsController
//   extends AbstractController
//   implements Controller {
//   private path = "/api/v2/eth";
//
//   constructor() {
//     super();
//     this.initRoutes();
//   }
//
//   initRoutes(): void {
//     this.router.get(
//       `${this.path}/call-events`,
//       this.promiseWrapper(this.getCallEvents)
//     );
//
//     this.router.get(
//       `${this.path}/value-transfer-events`,
//       this.promiseWrapper(this.getValueTransferEvents)
//     );
//   }
//
//   private async getCallEvents(
//     req: express.Request
//   ): Promise<Pagination<EthCallEvent>> {
//     return this.pagination<EthCallEvent>(
//       req,
//       await req.sdk.eth.events.getCallEvents(req.query)
//     );
//   }
//
//   private async getValueTransferEvents(
//     req: express.Request
//   ): Promise<Pagination<EthValueTransferEvent>> {
//     const events = await req.sdk.eth.events.getValueTransferEvents(req.query);
//     return this.pagination<EthValueTransferEvent>(req, {
//       pagination: events.pagination,
//       results: events.results.map((t) => this.bnToHexString(t)),
//     });
//   }
// }
