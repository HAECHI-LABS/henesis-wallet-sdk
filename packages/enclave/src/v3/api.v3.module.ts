import { Module } from "@nestjs/common";
import { EthModule } from "../v3/eth/eth.module";

@Module({
  imports: [EthModule],
})
export class ApiV3Module {}
