import { DynamicModule, Module } from "@nestjs/common";
import { KlayModule } from "./klay/klay.module";
import { EthModule } from "./eth/eth.module";
import { BtcModule } from "./btc/btc.module";

const buildSwagger: boolean =
  (process.env.BUILD_SWAGGER_SPEC?.toLowerCase() == "true" &&
    process.env.API_VERSION?.toLowerCase() == "v2") ||
  process.env.BUILD_SWAGGER_SPEC != "true";

@Module({})
export class ApiV2Module {
  static register(): DynamicModule {
    const imports = [];
    if (buildSwagger) {
      if (process.env.ENDPOINT == "klaytn") {
        imports.push(KlayModule);
      } else if (process.env.ENDPOINT == "ethereum") {
        imports.push(EthModule);
      } else if (process.env.ENDPOINT == "bitcoin") {
        imports.push(BtcModule);
      } else {
        imports.push(KlayModule, EthModule, BtcModule);
      }
    }
    return {
      module: ApiV2Module,
      imports,
    };
  }
}
