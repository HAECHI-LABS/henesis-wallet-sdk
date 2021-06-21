import {
  CacheInterceptor,
  CacheModule,
  DynamicModule,
  Module,
} from "@nestjs/common";
import { EthModule } from "./eth/eth.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { BscModule } from "./bsc/bsc.module";

const buildSwagger: boolean =
  (process.env.BUILD_SWAGGER_SPEC?.toLowerCase() == "true" &&
    process.env.API_VERSION?.toLowerCase() == "v3") ||
  process.env.BUILD_SWAGGER_SPEC != "true";

@Module({})
export class ApiV3Module {
  static register(): DynamicModule {
    const imports = [];
    const providers = [];
    if (buildSwagger) {
      const cacheModule = CacheModule.register({
        ttl: process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 10, // seconds
        max: process.env.CACHE_MAX ? Number(process.env.CACHE_MAX) : 100, // maximum number of items in cache
      });

      if (process.env.ENCPOINT == "ethereum") {
        imports.push(EthModule);
      } else if (process.env.ENDPOINT == "binance-smart-chain") {
        imports.push(BscModule);
      } else {
        imports.push(EthModule, BscModule);
      }
      imports.push(cacheModule);

      providers.push({
        provide: APP_INTERCEPTOR,
        useClass: CacheInterceptor,
      });
    }
    return {
      module: ApiV3Module,
      imports,
      providers,
    };
  }
}
