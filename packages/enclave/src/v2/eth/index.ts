import CoinsController from "./coins/coins.controller";
import EventsController from "./events/events.controller";
import GasUsagesController from "./gas-usages/gas-usages.controller";
import HenesisKeysController from "./henesis-keys/henesis-keys.controller";
import TransactionsController from "./transactions/transactions.controller";
import WalletsController from "./wallets/wallets.controller";

export const ethController = [
  new CoinsController(),
  new EventsController(),
  new GasUsagesController(),
  new HenesisKeysController(),
  new TransactionsController(),
  new WalletsController(),
];
