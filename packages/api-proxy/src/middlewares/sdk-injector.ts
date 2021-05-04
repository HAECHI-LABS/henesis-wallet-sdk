import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { Env, SDK } from "@haechi-labs/henesis-wallet-core";

@Injectable()
export class SdkMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    let accessToken;
    let secret;
    if (req.headers.authorization) {
      const authSplit = req.headers.authorization.split(" ");
      if (authSplit.length === 2 && authSplit[0].toLowerCase() === "bearer") {
        accessToken = authSplit[1];
      }
    }

    if (req.headers["x-henesis-secret"]) {
      secret = req.headers["x-henesis-secret"];
    }

    let env: Env = Env.Prod;
    if (process.env.NODE_ENV === "development") {
      env = Env.Dev;
    }
    if (process.env.NODE_ENV === "test") {
      env = Env.Test;
    }
    if (process.env.NODE_ENV === "local") {
      env = Env.Local;
    }
    const url = process.env.URL;
    req.sdk = new SDK({
      accessToken,
      secret,
      env,
      url,
    });
    next();
  }
}
