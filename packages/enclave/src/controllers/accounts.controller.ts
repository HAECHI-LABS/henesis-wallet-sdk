import express from 'express';
import {Controller, MiddleWare} from '../types';

export default class AccountsController implements Controller {
  private path = '/api/v1/accounts';

  private router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}/:id`, this.promiseWrapper(this.me));
  }

  private async me(req: express.Request) {
    return await req.sdk.accounts.get();
  }

  public getRoutes(): express.Router {
    return this.router;
  }

  private promiseWrapper(promiseRequestHandler: Function): MiddleWare {
    let self = this;
    return function (req: express.Request, res: express.Response, next: express.NextFunction) {
      Promise.resolve(promiseRequestHandler.bind(self, req, res, next)())
        .then(result => {
          res.status(200).send(result);
        })
        .catch(error => {
          let err;
          if (error instanceof Error) {
            err = error;
          } else if (typeof error === 'string') {
            err = new Error('(string_error) ' + error);
          } else {
            err = new Error('(object_error) ' + JSON.stringify(error));
          }

          const result = {error: err.message};
          const status = err.status || 500;
          if (!(status >= 200 && status < 300)) {
            console.log('error %s: %s', status, err.message);
          }
          if (status === 500) {
            console.log(err.stack);
          }
          res.status(status).send(result);
        });
    };
  }
}
