import express from 'express';
import { Converter } from '@haechi-labs/henesis-wallet-core/lib/utils';

export default (req: express.Request, resp: express.Response, next: express.NextFunction) => {
  req.body = Converter.toCamelCase(req.body);
  next();
};
