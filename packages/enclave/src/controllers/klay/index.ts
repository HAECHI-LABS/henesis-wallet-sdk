import CoinsController from "./coins.controller";
import EventsController from "./events.controller";
import GasUsagesController from "./gasusages.controller";
import HenesisKeysController from "./henesisKeys.controller";
import TransactionsController from "./transactions.controller";
import WalletsController from "./wallets.controller";

export const klayController = [
  new CoinsController(),
  new EventsController(),
  new GasUsagesController(),
  new HenesisKeysController(),
  new TransactionsController(),
  new WalletsController(),
];
