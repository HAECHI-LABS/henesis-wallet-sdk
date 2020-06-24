import express from "express";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import {
  EthCallEvent,
  EthValueTransferEvent,
} from "@haechi-labs/henesis-wallet-core/lib/events";

import AbstractController from "../controller";
import { Controller } from "../../types";

export default class EventsController extends AbstractController
  implements Controller {
  private path = "/api/v2/eth";

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
    return await req.sdk.eth.events.getCallEvents(req.query);
  }

  private async getValueTransferEvents(
    req: express.Request
  ): Promise<Pagination<EthValueTransferEvent>> {
    return await req.sdk.eth.events.getValueTransferEvents(req.query);
  }
}
