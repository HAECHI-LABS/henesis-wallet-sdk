import { CacheInterceptor, CacheModule, Module } from "@nestjs/common";
import { EthModule } from "./eth/eth.module";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  imports: [
    EthModule,
    CacheModule.register({
      ttl: process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 10, // seconds
      max: process.env.CACHE_MAX ? Number(process.env.CACHE_MAX) : 100, // maximum number of items in cache
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class ApiV3Module {}
