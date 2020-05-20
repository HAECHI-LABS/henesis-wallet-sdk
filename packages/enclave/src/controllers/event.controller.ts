import AbstractController from './controller';
import { Controller } from '../types';
import {Pagination} from "@haechi-labs/henesis-wallet-core/lib/types";
import {Event, ValueTransferEvent} from "@haechi-labs/henesis-wallet-core/lib/events";
import express from 'express';

export default class EventController extends AbstractController implements Controller {
    private path = '/api/v1';

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

    private async getCallEvents(req: express.Request): Promise<Pagination<Event>> {
      return await req.sdk.events.getCallEvents(
        req.query.wallet_id as string,
        req.query,
      );
    }

    private async getValueTransferEvents(req: express.Request): Promise<Pagination<ValueTransferEvent>> {
      return await req.sdk.events.getValueTransferEvents(
        req.query.wallet_id as string,
        req.query,
      );
    }
}
