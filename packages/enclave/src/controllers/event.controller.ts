import { Pagination } from '@haechi-labs/henesis-wallet-core/lib/types';
import {
  Event,
  ValueTransferEvent,
} from '@haechi-labs/henesis-wallet-core/lib/events';
import express from 'express';
import { Controller } from '../types';
import AbstractController from './controller';

export default class EventController extends AbstractController
  implements Controller {
  private path = '/api/v1';

  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(
      `${this.path}/call-events`,
      this.promiseWrapper(this.getCallEvents),
    );

    this.router.get(
      `${this.path}/value-transfer-events`,
      this.promiseWrapper(this.getValueTransferEvents),
    );
  }

  private async getCallEvents(
    req: express.Request,
  ): Promise<Pagination<Event>> {
    return this.pagination<Event>(
      req,
      await req.sdk.events.getCallEvents(req.query),
    );
  }

  private async getValueTransferEvents(
    req: express.Request,
  ): Promise<Pagination<ValueTransferEvent>> {
    return this.pagination<ValueTransferEvent>(
      req,
      await req.sdk.events.getValueTransferEvents(req.query),
    );
  }
}
