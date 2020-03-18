import { App } from './app';
import logger from './middlewares/logger';
import AccountsController from './controllers/accounts.controller';
import sdkInjector from './middlewares/sdkInjector';
import converter from './middlewares/converter';
import WalletController from './controllers/wallet.controller';

function main() {
  try {
    const app = new App({
      middleWares: [logger, sdkInjector, converter],
      controllers: [new AccountsController(), new WalletController()],
      port: 3000,
    });

    app.listen();
  } catch (e) {
    console.error(e);
  }
}

main();
