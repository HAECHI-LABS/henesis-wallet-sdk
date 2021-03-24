import CoinsController from "./coins.controller";
import EventsController from "./events.controller";
import GasUsagesController from "./gasUsages.controller";
import HenesisKeysController from "./henesisKeys.controller";
import TransactionsController from "./transactions.controller";
import WalletsController from "./wallets.controller";

export const ethController = [
  new CoinsController(),
  new EventsController(),
  new GasUsagesController(),
  new HenesisKeysController(),
  new TransactionsController(),
  new WalletsController(),
];