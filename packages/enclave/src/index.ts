import { App } from "./app";
import logger from "./middlewares/logger";
import sdkInjector from "./middlewares/sdkInjector";
import converter from "./middlewares/converter";
import WalletsController from "./controllers/btc/wallets.controller";
import TransfersController from "./controllers/btc/transfers.controller";

function main() {
  try {
    const app = new App({
      middleWares: [logger, sdkInjector, converter],
      controllers: [new WalletsController(), new TransfersController()],
      port: 3000,
    });

    app.listen();
  } catch (e) {
    console.error(e);
  }
}

main();
