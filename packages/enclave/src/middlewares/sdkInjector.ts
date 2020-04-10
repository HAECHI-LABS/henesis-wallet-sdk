import express from 'express';
import { SDK } from '@haechi-labs/henesis-wallet-core';

export default (req: express.Request, resp: express.Response, next: express.NextFunction) => {
  let accessToken; let secret;
  if (req.headers.authorization) {
    const authSplit = req.headers.authorization.split(' ');
    if (authSplit.length === 2 && authSplit[0].toLowerCase() === 'bearer') {
      accessToken = authSplit[1];
    }
  }

  if (req.headers['x-henesis-secret']) {
    secret = req.headers['x-henesis-secret'];
  }
  req.sdk = new SDK({
    accessToken,
    secret,
    url: "http://test.wallet.henesis.io/api/v1"
  });
  next();
};
