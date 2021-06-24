import { Module } from "@nestjs/common";
import { WalletsController } from "./wallets/wallets.controller";
import { WalletsService } from "./wallets/wallets.service";
import { FeeWalletController } from "./fee-wallet/fee-wallet.controller";
import { TransfersController } from "./transfers/transfers.controller";
import { FeeWalletService } from "./fee-wallet/fee-wallet.service";
import { TransfersService } from "./transfers/transfers.service";

@Module({
  controllers: [FeeWalletController, TransfersController, WalletsController],
  providers: [FeeWalletService, TransfersService, WalletsService],
})
export class FilModule {}
