import AbstractController from "../controller";
import { Controller } from "../../types";
import express from "express";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import {
  EthCallEvent,
  EthValueTransferEvent,
} from "@haechi-labs/henesis-wallet-core/lib/events";

export default class EventsController extends AbstractController
  implements Controller {
  private path = "/api/v2/klay";

  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(
      `${this.path}/call-events`,
      this.promiseWrapper(this.getCallEvents)
    );

    this.router.get(
      `${this.path}/value-transfer-events`,
      this.promiseWrapper(this.getValueTransferEvents)
    );
  }

  private async getCallEvents(
    req: express.Request
  ): Promise<Pagination<EthCallEvent>> {
    return this.pagination<EthCallEvent>(
      req,
      await req.sdk.klay.events.getCallEvents(req.query)
    );
  }

  private async getValueTransferEvents(
    req: express.Request
  ): Promise<Pagination<EthValueTransferEvent>> {
    return this.pagination<EthValueTransferEvent>(
      req,
      await req.sdk.klay.events.getValueTransferEvents(req.query)
    );
  }
}
