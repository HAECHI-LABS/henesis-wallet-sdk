import { App } from "./app";
import minimist from "minimist";
import logger from "./middlewares/logger";
import sdkInjector from "./middlewares/sdkInjector";
import converter from "./middlewares/converter";
import errorHandler from "./errorHandler";
import { ethController } from "../controllers-deprecated/eth";
import { klayController } from "../controllers-deprecated/klay";
import { btcController } from "../controllers-deprecated/btc";
import { versionController } from "../controllers-deprecated/version";

function main() {
  try {
    const argv = minimist(process.argv.slice(2));
    const app = new App({
      middleWares: [logger, sdkInjector, converter],
      errorHandler: errorHandler,
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
