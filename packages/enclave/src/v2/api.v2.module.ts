import { Module } from "@nestjs/common";
import { KlayModule } from "./klay/klay.module";
import { EthModule } from "./eth/eth.module";
import { BtcModule } from "./btc/btc.module";

@Module({
  imports: [KlayModule, EthModule, BtcModule],
})
export class ApiV2Module {}
