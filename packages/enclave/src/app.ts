import express from "express";
import { Controller, ErrorHandler, MiddleWare } from "./types";
import LRUCache from "lru-cache";
import { useAdapter } from "@type-cacheable/lru-cache-adapter";
import { RegisterRoutes as registerRoutes } from "../tsoa-build/routes";

export interface AppOption {
  port?: number;
  hostname?: string;
  controllers?: Controller[];
  middleWares?: MiddleWare[];
  errorHandler?: ErrorHandler;
  cache?: {
    maxSize?: number;
  };
}

export class App {
  public application: express.Application;

  public port: number;

  public hostname: string;

  public errorHandler: ErrorHandler;

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
    this.errorHandler = params.errorHandler;
    this.routeController(this.application);
    if (params.cache) {
      useAdapter(
        new LRUCache({
          max: params.cache.maxSize ? params.cache.maxSize : 500,
        }) as any
      );
    }
  }

  private routeController(application) {
    registerRoutes(application);
  }

  private applyMiddleWares(middleWares: MiddleWare[]) {
    middleWares.forEach((middleWare) => {
      this.application.use(middleWare);
    });
  }

  public listen() {
    /*
     * the error handler must be place here!!
     * because even if the error handler is not the last elements of middleware array,
     * then exception would not be handled.
     * for more information: https://stackoverflow.com/questions/29700005/express-4-middleware-error-handler-not-being-called
     */
    this.application.use(this.errorHandler);
    this.application.listen(this.port, this.hostname, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
