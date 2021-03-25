import { App } from "./app";
import minimist from "minimist";
import logger from "./middlewares/logger";
import sdkInjector from "./middlewares/sdkInjector";
import converter from "./middlewares/converter";
import { ethController } from "./controllers/eth";
import { klayController } from "./controllers/klay";
import { btcController } from "./controllers/btc";
import { versionController } from "./controllers/version";

function main() {
  try {
    const argv = minimist(process.argv.slice(2));
    const app = new App({
      middleWares: [logger, sdkInjector, converter],
      controllers: [].concat(
        btcController,
        ethController,
        klayController,
        versionController
      ),
      port: 3000,
      hostname: "0.0.0.0",
      cache: {
        maxSize: argv["maxCacheSize"],
      },
    });

    app.listen();
  } catch (e) {
    console.error(e);
  }
}

main();
