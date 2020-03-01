import express from 'express';
import { Controller } from '../types';

export default class AccountsController implements Controller {
  private path = '/api/v1/accounts';

  private router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}/:id`, this.me);
  }

  private me(req: express.Request, res: express.Response) {
    res.write('hello');
    res.end();
  }

  public getRoutes(): express.Router {
    return this.router;
  }
}
