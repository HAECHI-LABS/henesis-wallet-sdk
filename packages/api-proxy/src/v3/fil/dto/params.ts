import { ApiQueryOptions } from "@nestjs/swagger";

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
export const UPDATED_AT_GTE_OPTIONAL: ApiQueryOptions = {
  name: "updatedAtGte",
  required: false,
  description:
    "updatedAt이 해당 시점과 같거나 그보다 이후인 데이터 조회 (형식: ms, UNIX time) ",
};
export const UPDATED_AT_LE_OPTIONAL: ApiQueryOptions = {
  name: "updatedAtLt",
  required: false,
  description:
    "updatedAt이 해당 시점보다 이전인 데이터 조회 (형식: ms, UNIX time) ",
};
