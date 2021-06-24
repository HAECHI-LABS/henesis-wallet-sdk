import { ApiParamOptions, ApiQueryOptions } from "@nestjs/swagger";

export const WALLET_NAME_OPTIONAL: ApiQueryOptions = {
  name: "name",
  required: false,
  description: "지갑 이름",
};
export const WALLET_ID_OPTIONAL: ApiQueryOptions = {
  name: "walletId",
  required: false,
  description: "지갑 ID",
};
export const WALLET_ID_REQUIRED: ApiParamOptions = {
  name: "walletId",
  required: true,
  description: "지갑 ID",
};

export const DEPOSIT_ADDRESS_NAME_OPTIONAL: ApiQueryOptions = {
  name: "name",
  required: false,
  description: "입금 주소 이름",
};
export const DEPOSIT_ADDRESS_OPTIONAL: ApiQueryOptions = {
  name: "address",
  required: false,
  description: "입금 주소",
};
export const DEPOSIT_ADDRESS_ID_REQUIRED: ApiParamOptions = {
  name: "depositAddressId",
  required: true,
  description: "입금 주소 ID",
};

export const FLUSH_ID_REQUIRED: ApiParamOptions = {
  name: "flushId",
  required: true,
  description: "집금 내역 ID",
};
