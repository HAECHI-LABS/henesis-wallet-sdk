import { Module } from "@nestjs/common";
import { CoinsController } from "./coins/coins.controller";
import { EventsController } from "./events/events.controller";
import { HenesisKeysController } from "./henesis-keys/henesis-keys.controller";
import { TransactionsController } from "./transactions/transactions.controller";
import { WalletsController } from "./wallets/wallets.controller";
import { CoinsService } from "./coins/coins.service";
import { EventsService } from "./events/events.service";
import { HenesisKeysService } from "./henesis-keys/henesis-keys.service";
import { TransactionsService } from "./transactions/transactions.service";
import { WalletsService } from "./wallets/wallets.service";

@Module({
  controllers: [
    CoinsController,
    EventsController,
    HenesisKeysController,
    TransactionsController,
    WalletsController,
  ],
  providers: [
    CoinsService,
    EventsService,
    HenesisKeysService,
    TransactionsService,
    WalletsService,
  ],
})
export class EthModule {}
