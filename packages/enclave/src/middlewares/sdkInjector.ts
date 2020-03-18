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

  if (req.headers['X-Henesis-Secret']) {
    secret = req.headers['X-Henesis-Secret'];
  }

  req.sdk = new SDK({
    accessToken,
    secret,
  });
  next();
};
