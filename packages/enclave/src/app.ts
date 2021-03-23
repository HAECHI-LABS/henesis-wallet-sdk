import express, { Express } from "express";
import { Controller, MiddleWare } from "./types";
import LRUCache from "lru-cache";
import { useAdapter } from "@type-cacheable/lru-cache-adapter";
import { RegisterRoutes as registerRoutes } from "../build/routes";

export interface AppOption {
  port?: number;
  hostname?: string;
  controllers?: Controller[];
  middleWares?: MiddleWare[];
  cache?: {
    maxSize?: number;
  };
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
    this.application.listen(this.port, this.hostname, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
