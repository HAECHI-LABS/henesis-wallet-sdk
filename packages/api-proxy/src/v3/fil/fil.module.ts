import { Module } from "@nestjs/common";
import { WalletsController } from "./wallets/wallets.controller";
import { WalletsService } from "./wallets/wallets.service";

@Module({
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class FilModule {}
