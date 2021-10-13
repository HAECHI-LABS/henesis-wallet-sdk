import { ApiParamOptions, ApiQueryOptions } from "@nestjs/swagger";

export const TICKER_OPTIONAL: ApiQueryOptions = {
  name: "ticker",
  required: false,
  description: "코인의 기호",
};
export const NFT_ID_OPTIONAL: ApiQueryOptions = {
  name: "nftId",
  required: false,
  description: "NFT 컨트랙트의 ID",
};
export const TOKEN_NAME_OPTIONAL: ApiQueryOptions = {
  name: "tokenName",
  required: false,
  description: "NFT 토큰의 이름",
};
export const TOKEN_ONCHAIN_ID_OPTIONAL: ApiQueryOptions = {
  name: "tokenOnchainId",
  required: false,
  description: "NFT 토큰의 온체인 ID",
};
export const DEPOSIT_ADDRESS_ID_OPTIONAL: ApiQueryOptions = {
  name: "depositAddressId",
  required: false,
  description: "입금 주소 ID",
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
export const MASTER_WALLET_ID_OPTIONAL: ApiParamOptions = {
  name: "masterWalletId",
  required: false,
  description: "마스터 지갑 ID",
};
export const MASTER_WALLET_ID_REQUIRED: ApiParamOptions = {
  name: "masterWalletId",
  required: true,
  description: "마스터 지갑 ID",
};
export const USER_WALLET_ID_OPTIONAL: ApiParamOptions = {
  name: "userWalletId",
  required: false,
  description: "사용자 지갑 ID",
};
export const USER_WALLET_ID_REQUIRED: ApiParamOptions = {
  name: "userWalletId",
  required: true,
  description: "사용자 지갑 ID",
};
export const TRANSACTION_ID_OPTIONAL: ApiQueryOptions = {
  name: "transactionId",
  required: false,
  description:
    "트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)",
};
export const TRANSACTION_ID_REQUIRED: ApiParamOptions = {
  name: "transactionId",
  required: true,
  description:
    "트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)",
};
export const TRANSACTION_HASH_OPTIONAL: ApiQueryOptions = {
  name: "transactionHash",
  required: false,
  description: "트랜잭션 해시",
};
export const STATUS_OPTIONAL: ApiQueryOptions = {
  name: "status",
  required: false,
  description: "트랜잭션 상태",
};
export const UPDATED_AT_GTE_OPTIONAL: ApiQueryOptions = {
  name: "updatedAtGte",
  required: false,
  description:
    "updatedAt이 해당 시점과 같거나 그보다 이후인 트랜잭션 조회 (형식: ms, UNIX time) ",
};
export const UPDATED_AT_LE_OPTIONAL: ApiQueryOptions = {
  name: "updatedAtLt",
  required: false,
  description:
    "updatedAt이 해당 시점보다 이전인 트랜잭션 조회 (형식: ms, UNIX time) ",
};
export const SIZE_OPTIONAL: ApiQueryOptions = {
  name: "size",
  required: false,
  description: "한 번의 요청으로 반환되는 응답의 개수 (기본값: 15)",
};
export const PAGE_OPTIONAL: ApiQueryOptions = {
  name: "page",
  required: false,
  description: "몇 번째 페이지를 조회할 것인지? (페이지는 0부터 시작)",
};
export const NAME_OPTIONAL: ApiQueryOptions = {
  name: "name",
  required: false,
  description: "지갑 이름",
};
export const SORT_OPTIONAL: ApiQueryOptions = {
  name: "sort",
  required: false,
  description: "결과 정렬 방식",
};
export const ADDRESS_OPTIONAL: ApiQueryOptions = {
  name: "address",
  required: false,
  description: "지갑 주소",
};
export const COIN_REQUIRED: ApiParamOptions = {
  name: "coinId",
  required: true,
  description: "Henesis에서 부여한 Coin의 ID",
};
export const TRANSFER_TYPE_OPTIONAL: ApiParamOptions = {
  name: "transferType",
  required: false,
  description: "트랜잭션의 종류(입금, 출금)",
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
  description: "해당 시점 이전의 트랜잭션 조회",
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
