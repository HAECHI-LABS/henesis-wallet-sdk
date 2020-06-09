import express from 'express';
import { MiddleWare } from '../types';

export default abstract class AbstractController {
  protected router = express.Router();

  protected abstract initRoutes();

  protected promiseWrapper(
    promiseRequestHandler: Function,
    successStatusCode?: number,
  ): MiddleWare {
    const self = this;

    return function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) {
      Promise.resolve(promiseRequestHandler.bind(self, req, res, next)())
        .then((result) => {
          const status: number = successStatusCode || 200;
          if (result) {
            return res.status(status).send(result);
          }
          return res.sendStatus(status);
        })
        .catch((error) => {
          try {
            const err = self.parseError(error.response.data);
            const result = self.parseErrorMessage(err.message);
            const status = error.response.status || 500;
            if (status === 500) {
              console.log(err.stack);
            } else if (!(status >= 200 && status < 300)) {
              console.log(`Error : status ${status}
${err.message}`);
            }
            res.status(status).json(result);
          } catch (e) {
            console.log(error);
            res.status(500).json(self.parseErrorMessage(error.toString()));
          }
        });
    };
  }

  private parseError(error: any): any {
    if (error instanceof Error) {
      return error;
    }
    if (typeof error === 'string') {
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
