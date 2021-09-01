import { Module } from "@nestjs/common";
import { TransfersController } from "./transfers/transfers.controller";
import { WalletsController } from "./wallets/wallets.controller";
import { TransfersService } from "./transfers/transfers.service";
import { WalletsService } from "./wallets/wallets.service";
import ExtraModelController from "./extra-model.controller";

@Module({
  controllers: [TransfersController, WalletsController, ExtraModelController],
  providers: [TransfersService, WalletsService],
})
export class BchModule {}
