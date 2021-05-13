import { DynamicModule, Module } from "@nestjs/common";
import { KlayModule } from "./klay/klay.module";
import { EthModule } from "./eth/eth.module";
import { BtcModule } from "./btc/btc.module";

@Module({})
export class ApiV2Module {
  static register(): DynamicModule {
    const imports = [];
    if (process.env.MAINNET == "klaytn") {
      imports.push(KlayModule);
    } else if (process.env.MAINNET == "ethereum") {
      imports.push(EthModule);
    } else if (process.env.MAINNET == "bitcoin") {
      imports.push(BtcModule);
    } else {
      imports.push(KlayModule, EthModule, BtcModule);
    }
    return {
      module: ApiV2Module,
      imports,
    };
  }
}
