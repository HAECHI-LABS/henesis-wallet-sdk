import { Module } from "@nestjs/common";
import { TransfersController } from "./transfers/transfers.controller";
import { WalletsController } from "./wallets/wallets.controller";
import { TransfersService } from "./transfers/transfers.service";
import { WalletsService } from "./wallets/wallets.service";

@Module({
  controllers: [TransfersController, WalletsController],
  providers: [TransfersService, WalletsService],
})
export class BtcModule {}
