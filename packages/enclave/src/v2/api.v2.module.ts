import { Module } from "@nestjs/common";
import { KlayModule } from "./klay/klay.module";
import VersionController from "./version/version.controller";
import { EthModule } from "./eth/eth.module";
import { BtcModule } from "./btc/btc.module";

@Module({
  imports: [KlayModule, EthModule, BtcModule],
  controllers: [VersionController],
})
export class ApiV2Module {}
