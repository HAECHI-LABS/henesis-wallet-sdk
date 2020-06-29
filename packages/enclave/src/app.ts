import express from "express";
import { Controller, MiddleWare } from "./types";

export interface AppOption {
  port?: number;
  hostname?: string;
  controllers?: Controller[];
  middleWares?: MiddleWare[];
}

export class App {
  public application: express.Application;

  public port: number;

  public hostname: string;

  constructor(params: AppOption) {
    this.application = express();
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: false }));
    this.application.enable("trust proxy");
    this.port = params.port ? params.port : 3000;
    this.hostname = params.hostname ? params.hostname : "0.0.0.0";
    if (params.middleWares) {
      this.applyMiddleWares(params.middleWares);
    }
    if (params.controllers) {
      this.routeController(params.controllers);
    }
  }

  private routeController(controllers?: Controller[]) {
    controllers.forEach((controller) => {
      this.application.use("/", controller.getRoutes());
    });
  }

  private applyMiddleWares(middleWares: MiddleWare[]) {
    middleWares.forEach((middleWare) => {
      this.application.use(middleWare);
    });
  }

  public listen() {
    this.application.listen(this.port, this.hostname, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
