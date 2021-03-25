import { Module } from "@nestjs/common";
import { CoinsController } from "./coins/coins.controller";
import { CoinsService } from "./coins/coins.service";

@Module({
  controllers: [CoinsController],
  providers: [CoinsService],
})
export class EthModule {}
