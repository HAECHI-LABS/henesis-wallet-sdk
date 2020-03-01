import { App } from './app';
import logger from './middlewares/logger';
import AccountsController from './controllers/accounts.controller';

function main() {
  try {
    const app = new App({
      middleWares: [logger],
      controllers: [new AccountsController()],
      port: 3000,
    });

    app.listen();
  } catch (e) {
    console.error(e);
  }
}

main();
