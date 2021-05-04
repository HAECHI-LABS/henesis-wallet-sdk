import { ApiParamOptions } from "@nestjs/swagger";

export const PARAM_WALLET_ID: ApiParamOptions = {
  name: "walletId",
  required: true,
  description: "지갑 ID",
};

export const PARAM_DEPOSIT_ADDRESS_ID: ApiParamOptions = {
  name: "depositAddressId",
  required: true,
  description: "depositAddress ID",
};
