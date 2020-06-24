import { App } from "./app";
import logger from "./middlewares/logger";
import sdkInjector from "./middlewares/sdkInjector";
import converter from "./middlewares/converter";
import { ethController } from "./controllers/eth";
import { klayController } from "./controllers/klay";
import { btcController } from "./controllers/btc";

function main() {
  try {
    const app = new App({
      middleWares: [logger, sdkInjector, converter],
      controllers: [].concat(btcController, ethController, klayController),
      port: 3000,
    });

    app.listen();
  } catch (e) {
    console.error(e);
  }
}

main();
