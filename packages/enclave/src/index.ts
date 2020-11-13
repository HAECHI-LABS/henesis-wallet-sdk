import { App } from './app';
import logger from './middlewares/logger';
import sdkInjector from './middlewares/sdkInjector';
import converter from './middlewares/converter';
import WalletController from './controllers/wallet.controller';
import CoinController from './controllers/coin.controller';
import EventController from './controllers/event.controller';
import GasUsagesController from './controllers/gasusages.controller';
import TransactionController from './controllers/transactions.controller';
import VersionController from "./controllers/version.controller";

function main() {
  try {
    const app = new App({
      middleWares: [logger, sdkInjector, converter],
      controllers: [
        new CoinController(),
        new EventController(),
        new GasUsagesController(),
        new TransactionController(),
        new WalletController(),
        new VersionController()
      ],
      port: 3000,
      hostname: '0.0.0.0',
    });

    app.listen();
  } catch (e) {
    console.error(e);
  }
}

main();
