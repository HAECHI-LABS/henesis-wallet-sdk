import TransfersController from "./transfers.controller";
import WalletsController from "./wallets.controller";

export const btcController = [
  new TransfersController(),
  new WalletsController(),
];
