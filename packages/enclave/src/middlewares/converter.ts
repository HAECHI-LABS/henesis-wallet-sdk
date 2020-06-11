import express from "express";
import { ObjectConverter } from "@haechi-labs/henesis-wallet-core/lib/utils/common";

export default (
  req: express.Request,
  resp: express.Response,
  next: express.NextFunction
) => {
  req.body = ObjectConverter.toCamelCase(req.body);
  next();
};
