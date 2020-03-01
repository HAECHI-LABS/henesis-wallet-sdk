import express from 'express';

export default (req: express.Request, resp: express.Response, next: express.NextFunction) => {
  console.log('Request logged:', req.method, req.path);
  next();
};
