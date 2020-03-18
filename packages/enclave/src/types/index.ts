import express from 'express';
import { SDK } from '@haechi-labs/henesis-wallet-core';

declare module 'express-serve-static-core' {
  export interface Request {
    sdk: SDK;
  }
}

export type MiddleWare = (req: express.Request, resp: express.Response, next: express.NextFunction) => void;

export interface Controller {
  getRoutes(): express.Router
}
