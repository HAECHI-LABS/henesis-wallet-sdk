import { ApiParamOptions, ApiQueryOptions } from "@nestjs/swagger";

export const MASTER_WALLET_NAME_OPTIONAL: ApiQueryOptions = {
  name: "name",
  required: false,
  description: "마스터 지갑 이름",
};
export const WALLET_ID_OPTIONAL: ApiQueryOptions = {
  name: "walletId",
  required: false,
  description: "마스터 지갑 혹은 입금 주소 ID",
};
export const MASTER_WALLET_ID_OPTIONAL: ApiQueryOptions = {
  name: "masterWalletId",
  required: false,
  description: "마스터 지갑 ID",
};
export const MASTER_WALLET_ID_REQUIRED: ApiParamOptions = {
  name: "masterWalletId",
  required: true,
  description: "마스터 지갑 ID",
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

export const TRANSACTION_ID_OPTIONAL: ApiQueryOptions = {
  name: "transactionId",
  required: false,
  description: "트랜잭션 ID",
};
export const TRANSACTION_HASH_OPTIONAL: ApiQueryOptions = {
  name: "transactionHash",
  required: false,
  description: "트랜잭션 해시",
};
