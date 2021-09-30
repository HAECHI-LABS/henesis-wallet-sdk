import { ApiQueryOptions } from "@nestjs/swagger";

export const TRANSFER_MASTER_WALLET_ID_OPTIONAL: ApiQueryOptions = {
  name: "walletId",
  required: false,
  description: "마스터 지갑 ID",
};
export const TRANSFER_TRANSACTION_ID_OPTIONAL: ApiQueryOptions = {
  name: "transactionId",
  required: false,
  description:
    "트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)",
};
export const TRANSFER_TRANSACTION_HASH_OPTIONAL: ApiQueryOptions = {
  name: "transactionHash",
  required: false,
  description: "트랜잭션 해시",
};
export const TRANSFER_STATUS_OPTIONAL: ApiQueryOptions = {
  name: "status",
  required: false,
  description: "입출금 상태",
};
export const TRANSFER_TYPE_OPTIONAL: ApiQueryOptions = {
  name: "transferType",
  required: false,
  description: "입출금 종류 (입금, 출금)",
};
