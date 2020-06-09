import express from 'express';
import { Controller, MiddleWare } from './types';

export interface AppOption {
  port?: number;
  controllers?: Controller[];
  middleWares?: MiddleWare[];
}

export class App {
  public application: express.Application;

  public port: number;

  constructor(params: AppOption) {
    this.application = express();
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: false }));
    this.port = params.port ? params.port : 3000;
    if (params.middleWares) {
      this.applyMiddleWares(params.middleWares);
    }
    if (params.controllers) {
      this.routeController(params.controllers);
    }
  }

  private routeController(controllers?: Controller[]) {
    controllers.forEach((controller) => {
      this.application.use('/', controller.getRoutes());
    });
  }

  private applyMiddleWares(middleWares: MiddleWare[]) {
    middleWares.forEach((middleWare) => {
      this.application.use(middleWare);
    });
  }

  public listen() {
    this.application.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
