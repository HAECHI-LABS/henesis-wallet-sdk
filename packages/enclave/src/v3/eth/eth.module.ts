import { Module } from "@nestjs/common";
import { CoinsController } from "./coins/coins.controller";
import { CallEventsController } from "./call-events/call-events.controller";
import { FeeWalletsController } from "./feewallets/fee-wallets.controller";
import { TransactionsController } from "./transactions/transactions.controller";
import { WalletsController } from "./wallets/wallets.controller";
import { CoinsService } from "./coins/coins.service";
import { FeeWalletsService } from "./feewallets/fee-wallets.service";
import { TransactionsService } from "./transactions/transactions.service";
import { WalletsService } from "./wallets/wallets.service";
import { CallEventsService } from "./call-events/call-events.service";
import { TransfersController } from "./transfers/transfers.controller";
import { TransfersService } from "./transfers/transfers.service";

@Module({
  controllers: [
    CoinsController,
    CallEventsController,
    TransfersController,
    FeeWalletsController,
    TransactionsController,
    WalletsController,
  ],
  providers: [
    CoinsService,
    CallEventsService,
    TransfersService,
    FeeWalletsService,
    TransactionsService,
    WalletsService,
  ],
})
export class EthModule {}
