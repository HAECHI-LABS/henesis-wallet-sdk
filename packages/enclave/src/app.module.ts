import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ApiV2Module } from "./v2/api.v2.module";
import { SdkMiddleware } from "./middlewares/sdk-injector";
import { LoggerMiddleware } from "./middlewares/logger";
import { CamelCaseConvertor } from "./middlewares/camel-case-convertor";

// todo: cache config, port config, host name, trusty proxy?
@Module({
  imports: [ApiV2Module],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SdkMiddleware, LoggerMiddleware, CamelCaseConvertor)
      .forRoutes("*");
  }
}
