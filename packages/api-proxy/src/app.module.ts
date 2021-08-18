import {
  Logger,
  MiddlewareConsumer,
  Module,
  OnApplicationBootstrap,
} from "@nestjs/common";
import { SdkMiddleware } from "./middlewares/sdk-injector";
import { LoggerMiddleware } from "./middlewares/logger";
import { CamelCaseConvertor } from "./middlewares/camel-case-convertor";
import { RouterModule } from "nest-router";
import { routes } from "./routes";
import { VersionModule } from "./version/version.module";

@Module({
  imports: [RouterModule.forRoutes(routes), VersionModule.register()],
})
export class AppModule implements OnApplicationBootstrap {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SdkMiddleware, LoggerMiddleware, CamelCaseConvertor)
      .forRoutes("*");
  }

  onApplicationBootstrap(): any {
    Logger.log(
      `YOU ARE NOW USING: ${printEnvironment().toUpperCase()} environment`
    );
    Logger.log(`listening port: ${printListeningPort()}`);
    Logger.log(`Activate API Version: ${printActivatedVersion()}`);
  }
}

function printEnvironment(): string {
  if (process.env.URL) {
    return process.env.URL;
  }
  switch (process.env.NODE_ENV) {
    case "test":
      return "test";
    case "development":
      return "development";
    case "local":
      return "local";
    default:
      return "production";
  }
}

function printListeningPort(): number {
  if (!process.env.PORT) {
    return 3000;
  }
  return Number(process.env.PORT);
}

function printActivatedVersion(): string {
  switch (String(process.env.API_VERSION).toUpperCase()) {
    case "V3":
      return "V3";
    case "V2":
      return "V2";
    default:
      return "V2, V3";
  }
}
