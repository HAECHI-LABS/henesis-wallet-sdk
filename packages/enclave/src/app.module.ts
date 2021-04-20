import { MiddlewareConsumer, Module } from "@nestjs/common";
import { SdkMiddleware } from "./middlewares/sdk-injector";
import { LoggerMiddleware } from "./middlewares/logger";
import { CamelCaseConvertor } from "./middlewares/camel-case-convertor";
import { RouterModule, Routes } from "nest-router";
import { routes } from "./routes";
import { VersionModule } from "./version/version.module";

// todo: cache config, port config, host name, trusty proxy?
@Module({
  imports: [RouterModule.forRoutes(routes), VersionModule.register()],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SdkMiddleware, LoggerMiddleware, CamelCaseConvertor)
      .forRoutes("*");
  }
}
