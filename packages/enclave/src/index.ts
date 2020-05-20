import { App } from './app';
import logger from './middlewares/logger';
import sdkInjector from './middlewares/sdkInjector';
import converter from './middlewares/converter';
import WalletController from './controllers/wallet.controller';
import CoinController from './controllers/coin.controller';
import EventController from "./controllers/event.controller";
import GasUsagesController from "./controllers/gasusages.controller";

function main() {
  try {
    const app = new App({
      middleWares: [logger, sdkInjector, converter],
      controllers: [
        new CoinController(),
        new EventController(),
        new GasUsagesController(),
        new WalletController(),
      ],
      port: 3000,
    });

    app.listen();
  } catch (e) {
    console.error(e);
  }
}

main();
