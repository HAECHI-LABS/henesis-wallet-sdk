import { Module } from "@nestjs/common";
import { EthController } from "./eth.controller";

@Module({ controllers: [EthController] })
export class EthModule {}
