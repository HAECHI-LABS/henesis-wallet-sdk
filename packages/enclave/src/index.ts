import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./middlewares/exception-handler";
import express from "express";

const API_PREFIX = "/api";

// todo: move to types.ts?
declare module "express" {
  export interface Request {
    sdk: SDK;
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enable("trust proxy");
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // swagger settings
  const config = new DocumentBuilder()
    .setTitle("api example")
    .setDescription("The Enclave API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(3000);
}

bootstrap();
