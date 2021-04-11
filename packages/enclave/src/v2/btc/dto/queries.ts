import { ApiQueryOptions } from "@nestjs/swagger";

export const QUERY_WALLET_NAME_OPTIONAL: ApiQueryOptions = {
  name: "name",
  required: false,
  description: "지갑 이름",
};

export const QUERY_WALLET_NAME_REQUIRED: ApiQueryOptions = {
  name: "name",
  required: true,
  description: "지갑 이름",
};

export const QUERY_DEPOSIT_ADDRESS_ID_OPTIONAL: ApiQueryOptions = {
  name: "name",
  required: false,
  description: "입금 주소 ID",
};

export const QUERY_DEPOSIT_ADDRESS_ADDRESS_OPTIONAL: ApiQueryOptions = {
  name: "name",
  required: false,
  description: "입금 주소",
};

export const QUERY_DEPOSIT_ADDRESS_NAME_OPTIONAL: ApiQueryOptions = {
  name: "name",
  required: false,
  description: "입금 주소 이름",
};

export const QUERY_DEPOSIT_ADDRESS_NAME_REQUIRED: ApiQueryOptions = {
  name: "name",
  required: true,
  description: "입금 주소 이름",
};

export const QUERY_TRANSFERS_TYPE_OPTIONAL: ApiQueryOptions = {
  name: "type",
  required: false,
  description: "거래 타입 ",
};

export const QUERY_TRANSFERS_WALLET_ID_OPTIONAL: ApiQueryOptions = {
  name: "walletId",
  required: false,
  description: "지갑 ID",
};

export const QUERY_TRANSFERS_STATUS_OPTIONAL: ApiQueryOptions = {
  name: "status",
  required: false,
  description: "거래 상태",
};

export const QUERY_TRANSFERS_ADDRESS_OPTIONAL: ApiQueryOptions = {
  name: "address",
  required: false,
  description: "입금 주소 또는 출금 주소",
};

export const QUERY_TRANSFERS_TRANSACTION_HASH_OPTIONAL: ApiQueryOptions = {
  name: "transactionHash",
  required: false,
  description: "온체인 트랜잭션 해시",
};

export const QUERY_TRANSFERS_UPDATED_AT_GTE_OPTIONAL: ApiQueryOptions = {
  name: "updatedAtGte",
  required: false,
  description:
    "전송 상태가 마지막으로 변경된 시점(updatedAt)이 특정 시점과 같거나 그보다 이후인 전송 내역 조회",
};

export const QUERY_TRANSFERS_UPDATED_AT_LT_OPTIONAL: ApiQueryOptions = {
  name: "updatedAtLt",
  required: false,
  description:
    "전송 상태가 마지막으로 변경된 시점(updatedAt)이 특정 시점보다 이전인 전송 내역 조회",
};

export const QUERY_TRANSFERS_SIZE_OPTIONAL: ApiQueryOptions = {
  name: "size",
  required: false,
  description: "한 번의 요청으로 반환되는 응답의 개수 (기본값: 15)",
};

export const QUERY_TRANSFERS_PAGE_OPTIONAL: ApiQueryOptions = {
  name: "page",
  required: false,
  description: "몇 번째 페이지를 조회할 것인지? (페이지는 0부터 시작)",
};
