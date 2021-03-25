import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ApiV3Module } from "./v3/api.v3.module";
import { ApiV2Module } from "./v2/api.v2.module";
import { SdkMiddleware } from "./common/sdk.middleware";

@Module({
  imports: [ApiV3Module, ApiV2Module],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SdkMiddleware).forRoutes("*");
  }
}
