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
          if (result) {
            return res.status(200).send(result);
          }
          return res.sendStatus(200);
        })
        .catch((error) => {
          const err = self.parseError(error);
          const result = self.parseErrorMessage(err.message);
          const status = err.status || 500;
          if (status === 500) {
            console.log(err.stack);
          } else if (!(status >= 200 && status < 300)) {
            console.log('error %s: %s', status, err.message);
          }

          res.status(status).json(result);
        });
    };
  }

  private parseError(error: any): any {
    if (error instanceof Error) {
      return error;
    } if (typeof error === 'string') {
      return new Error(error);
    }
    return new Error(JSON.stringify(error));
  }

  private parseErrorMessage(message: string): any {
    try {
      return JSON.parse(message);
    } catch (e) {
      return { error: message };
    }
  }

  public getRoutes(): express.Router {
    return this.router;
  }
}
