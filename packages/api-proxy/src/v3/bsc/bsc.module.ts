import { Module } from "@nestjs/common";
import { CoinsController } from "./coins/coins.controller";
import { ContractCallsController } from "./contract-calls/contract-calls.controller";
import { TransfersController } from "./transfers/transfers.controller";
import { FeeWalletController } from "./feewallet/fee-wallet.controller";
import { TransactionsController } from "./transactions/transactions.controller";
import { WalletsController } from "./wallets/wallets.controller";
import { CoinsService } from "./coins/coins.service";
import { ContractCallsService } from "./contract-calls/contract-calls.service";
import { TransfersService } from "./transfers/transfers.service";
import { FeeWalletService } from "./feewallet/fee-wallet.service";
import { TransactionsService } from "./transactions/transactions.service";
import { WalletsService } from "./wallets/wallets.service";
import { NftsController } from "./nfts/nfts.controller";
import { NftsService } from "./nfts/nfts.service";

@Module({
  controllers: [
    CoinsController,
    ContractCallsController,
    TransfersController,
    FeeWalletController,
    TransactionsController,
    WalletsController,
    NftsController,
  ],
  providers: [
    CoinsService,
    ContractCallsService,
    TransfersService,
    FeeWalletService,
    TransactionsService,
    WalletsService,
    NftsService,
  ],
})
export class BscModule {}
