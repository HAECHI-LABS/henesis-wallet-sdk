import { ApiParamOptions, ApiQueryOptions } from "@nestjs/swagger";

export const QUERY_EVENT_SYMBOL_OPTIONAL: ApiQueryOptions = {
  name: "symbol",
  required: false,
  description:
    "토큰별로 필터링하여 조회하고 싶은 경우, 토큰의 symbol을 입력합니다.",
};

export const QUERY_EVENT_WALLET_ID_OPTIONAL: ApiQueryOptions = {
  name: "walletId",
  required: false,
  description: "단일 지갑을 조회하고 싶은 경우, 해당 지갑 ID를 입력합니다.",
};

export const QUERY_EVENT_MASTER_WALLET_ID_OPTIONAL: ApiQueryOptions = {
  name: "masterWalletId",
  required: false,
  description:
    "마스터 지갑 ID (해당 마스터 지갑을 포함하여 하위의 사용자 지갑 입출금 내역도 함께 조회합니다.)",
};

export const QUERY_EVENT_TRANSACTION_ID_OPTIONAL: ApiQueryOptions = {
  name: "transactionId",
  required: false,
  description:
    "트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.) ",
};

export const QUERY_EVENT_TRANSACTION_HASH_OPTIONAL: ApiQueryOptions = {
  name: "transactionHash",
  required: false,
  description: "트랜잭션 해시",
};

export const QUERY_EVENT_STATUS_OPTIONAL: ApiQueryOptions = {
  name: "status",
  required: false,
  description:
    "트랜잭션 상태\nex. PENDING_APPROVAL, REJECTED, REQUESTED, PENDING, MINED, CONFIRMED, FAILED ",
};

export const QUERY_EVENT_UPDATED_AT_GTE_OPTIONAL: ApiQueryOptions = {
  name: "updatedAtGte",
  required: false,
  description:
    "updatedAt이 해당 시점과 같거나 그보다 이후인 트랜잭션 조회 \n" +
    "(형식: ms, UNIX time) \n" +
    "ex. 1593669619000",
};

export const QUERY_EVENT_UPDATED_AT_LT_OPTIONAL: ApiQueryOptions = {
  name: "updatedAtLt",
  required: false,
  description:
    "updatedAt이 해당 시점보다 이전인 트랜잭션 조회 \n" +
    "(형식: ms, UNIX time) \n" +
    "ex. 1593670000000 ",
};

export const QUERY_EVENT_SIZE_OPTIONAL: ApiQueryOptions = {
  name: "size",
  required: false,
  description: "한 번의 요청으로 반환되는 응답의 개수 (기본값: 15) ",
};

export const QUERY_EVENT_PAGE_OPTIONAL: ApiQueryOptions = {
  name: "page",
  required: false,
  description: "몇 번째 페이지를 조회할 것인지? (페이지는 0부터 시작)",
};

export const QUERY_EVENT_TRANSFER_TYPE_OPTIONAL: ApiParamOptions = {
  name: "transferType",
  required: false,
  description: "트랜잭션의 종류(입금, 출금)",
};

export const QUERY_COIN_FLAG_OPTIONAL: ApiQueryOptions = {
  name: "flag",
  required: false,
  description: "COIN FLAG",
};

export const QUERY_COIN_TICKER_OPTIONAL: ApiQueryOptions = {
  name: "ticker",
  required: false,
  description: "암호화폐의 기호 (symbol)",
};

export const QUERY_FLAG_OPTIONAL: ApiQueryOptions = {
  name: "flag",
  required: false,
  description: "FLAG",
};

export const QUERY_SYMBOL_OPTIONAL: ApiQueryOptions = {
  name: "symbol",
  required: false,
  description:
    "토큰별로 필터링하여 조회하고 싶은 경우, 토큰의 symbol을 입력합니다.",
};

export const QUERY_WALLETS_SIZE_OPTIONAL: ApiQueryOptions = {
  name: "size",
  required: false,
  description: "한 번의 요청으로 반환되는 응답의 개수 (기본값: 15) ",
};

export const QUERY_WALLETS_PAGE_OPTIONAL: ApiQueryOptions = {
  name: "page",
  required: false,
  description: "PAGE",
};

export const QUERY_WALLETS_NAME_OPTIONAL: ApiQueryOptions = {
  name: "name",
  required: false,
  description: "지갑 이름",
};

export const QUERY_WALLETS_SORT_OPTIONAL: ApiQueryOptions = {
  name: "sort",
  required: false,
  description: "결과 정렬 방식",
};

export const QUERY_WALLETS_ADDRESS_OPTIONAL: ApiQueryOptions = {
  name: "address",
  required: false,
  description: "지갑 주소",
};

export const QUERY_TRANSACTIONS_ADDRESS_OPTIONAL: ApiQueryOptions = {
  name: "address",
  required: false,
  description: "트랜잭션 주소",
};

export const QUERY_TRANSACTIONS_TO_ADDRESS_OPTIONAL: ApiQueryOptions = {
  name: "toAddress",
  required: false,
  description: "받는 주소",
};

export const QUERY_TRANSACTIONS_FROM_ADDRESS_OPTIONAL: ApiQueryOptions = {
  name: "fromAddress",
  required: false,
  description: "보내는 주소",
};

export const QUERY_TRANSACTIONS_TRANSACTION_HASH_OPTIONAL: ApiQueryOptions = {
  name: "transactionHash",
  required: false,
  description: "트랜잭션 해시",
};

export const QUERY_TRANSACTIONS_START_OPTIONAL: ApiQueryOptions = {
  name: "start",
  required: false,
  description: "해당 시점 이후의 트랜잭션 조회",
};

export const QUERY_TRANSACTIONS_END_OPTIONAL: ApiQueryOptions = {
  name: "end",
  required: false,
  description: "해당 시점 이전의 트랜잭션 조회)",
};

export const QUERY_TRANSACTIONS_STATUS_OPTIONAL: ApiQueryOptions = {
  name: "status",
  required: false,
  description: "트랜잭션 상태",
};

export const QUERY_TRANSACTIONS_STATUSES_OPTIONAL: ApiQueryOptions = {
  name: "statuses",
  required: false,
  description: "트랜잭션 상태",
};

export const QUERY_TRANSACTIONS_TYPES_OPTIONAL: ApiQueryOptions = {
  name: "types",
  required: false,
  description: "트랜잭션 종류",
};

export const QUERY_TRANSACTIONS_KEY_ID_OPTIONAL: ApiQueryOptions = {
  name: "keyId",
  required: false,
  description: "키 ID",
};

export const QUERY_PAGE_OPTIONAL: ApiQueryOptions = {
  name: "page",
  required: false,
  description: "몇 번째 페이지를 조회할 것인지? (페이지는 0부터 시작)",
};

export const QUERY_SIZE_OPTIONAL: ApiQueryOptions = {
  name: "size",
  required: false,
  description: "한 번의 요청으로 반환되는 응답의 개수 (기본값: 15)",
};

export const QUERY_SORT_OPTIONAL: ApiQueryOptions = {
  name: "sort",
  required: false,
  description: "결과 정렬 방식",
};
