import {App} from './app';
import logger from './middlewares/logger';
import AccountsController from './controllers/accounts.controller';
import sdkInjector from './middlewares/sdkInjector';

function main() {
  try {
    const app = new App({
      middleWares: [logger, sdkInjector],
      controllers: [new AccountsController()],
      port: 3000,
    });

    app.listen();
  } catch (e) {
    console.error(e);
  }
}

main();
