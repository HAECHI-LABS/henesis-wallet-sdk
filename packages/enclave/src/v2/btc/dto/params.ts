import { ApiParamOptions } from "@nestjs/swagger";

export const PARAM_WALLET_ID: ApiParamOptions = {
  name: "name",
  required: true,
  description: "지갑 ID",
};
