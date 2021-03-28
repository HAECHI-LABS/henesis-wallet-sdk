import { NextFunction, Request, Response } from "express";
import { ObjectConverter } from "@haechi-labs/henesis-wallet-core/lib/utils/common";
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class CamelCaseConvertor implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.body = ObjectConverter.toCamelCase(req.body);
    next();
  }
}
