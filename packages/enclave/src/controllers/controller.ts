import express from 'express';
import { MiddleWare } from '../types';

export default abstract class AbstractController {
  protected router = express.Router();

  protected abstract initRoutes();

  protected promiseWrapper(promiseRequestHandler: Function): MiddleWare {
    const self = this;
    return function (req: express.Request, res: express.Response, next: express.NextFunction) {
      Promise.resolve(promiseRequestHandler.bind(self, req, res, next)())
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((error) => {
          let err;
          if (error instanceof Error) {
            err = error;
          } else if (typeof error === 'string') {
            err = new Error(`(string_error) ${error}`);
          } else {
            err = new Error(`(object_error) ${JSON.stringify(error)}`);
          }

          const result = { error: err.message };
          const status = err.status || 500;
          if (!(status >= 200 && status < 300)) {
            console.log('error %s: %s', status, err.message);
          }
          if (status === 500) {
            console.log(err.stack);
          }

          res.sendStatus(status).send(result);
        });
    };
  }

  public getRoutes(): express.Router {
    return this.router;
  }
}
