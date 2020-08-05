import TransfersController from "./transfers.controller";
import WalletsController from "./wallets.controller";
import WithdrawalApprovalsController from "./withdrawalApprovals.controllers";

export const btcController = [
  new TransfersController(),
  new WalletsController(),
  new WithdrawalApprovalsController(),
];
