import express from 'express';

export type MiddleWare = (req: express.Request, resp: express.Response, next: express.NextFunction) => void;

export interface Controller {
  getRoutes(): express.Router
}
