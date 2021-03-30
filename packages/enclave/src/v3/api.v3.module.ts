import { Module } from "@nestjs/common";
import { EthModule } from "./eth/eth.module";

@Module({ imports: [EthModule] })
export class ApiV3Module {}
