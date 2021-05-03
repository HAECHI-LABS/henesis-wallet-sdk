import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./middlewares/all-exception-handler";
import express from "express";
import * as fs from "fs";
import * as yaml from "js-yaml";
import { HttpExceptionHandler } from "./middlewares/http-exception-handler";

// options and constants
const API_PREFIX = "/api";
const PORT = process.env.PORT ? process.env.PORT : 3000;
const BUILD_SWAGGER =
  String(process.env.BUILD_SWAGGER_SPEC).toLowerCase() == "true" ? true : false;
const NODE_ENV = process.env.NODE_ENV;

declare module "express" {
  export interface Request {
    sdk: SDK;
  }
}

async function bootstrap() {
  const app = await createApp();
  // swagger settings
  const config = new DocumentBuilder()
    .setTitle("API PROXY")
    .setDescription("The API PROXY description")
    .setVersion("1.0")
    .build();
  config.servers = [{ url: `http://localhost:${PORT}` }];
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  if (BUILD_SWAGGER) {
    fs.writeFileSync("./swagger/swagger-spec.yaml", yaml.dump(document));
    return;
  }
  await app.listen(PORT);
}

async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(API_PREFIX);
  // the latest filter apply first. ORDER IS IMPORTANT!!!
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionHandler());
  app.enable("trust proxy");
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  return app;
}

bootstrap();
