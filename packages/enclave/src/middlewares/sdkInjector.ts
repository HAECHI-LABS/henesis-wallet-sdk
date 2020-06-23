import express from "express";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { Env } from "@haechi-labs/henesis-wallet-core/lib/sdk";

export default (
  req: express.Request,
  resp: express.Response,
  next: express.NextFunction
) => {
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

  req.sdk = new SDK({
    accessToken,
    secret,
    env,
  });
  next();
};
