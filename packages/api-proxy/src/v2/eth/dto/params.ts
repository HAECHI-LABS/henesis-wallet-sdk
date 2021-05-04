import { ApiParamOptions } from "@nestjs/swagger";

export const PARAM_MASTER_WALLET_ID: ApiParamOptions = {
  name: "masterWalletId",
  required: true,
  description: "마스터 지갑 ID",
};

export const PARAM_USER_WALLET_ID: ApiParamOptions = {
  name: "userWalletId",
  required: true,
  description: "유저 지갑 ID",
};

export const PARAM_TRANSACTION_ID: ApiParamOptions = {
  name: "transactionId",
  required: true,
  description: "트랜잭션 ID",
};

export const PARAM_COIN_TICKER: ApiParamOptions = {
  name: "ticker",
  required: true,
  description: "COIN TICKER",
};
