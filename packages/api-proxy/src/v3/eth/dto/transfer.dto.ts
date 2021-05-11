import { ValueTransferEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import {
  EventStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";

export class TransferDTO {
  /**
   * 코인/토큰 입출금 내역의 ID
   * @example 375031
   */
  id: number;

  /**
   * 출금 주소
   * @example 0x1f10ecbd971eab345ea19e96dc237b1fbd63de96
   */
  "from": string;

  /**
   * 입금 주소
   * @example 0xdd00383e5a51166bba3e96d84c14a36d72e6c128
   */
  to: string;

  /**
   * 암호화폐의 양
   * @example 1000000000
   */
  amount: string;

  /**
   * 트랜잭션 상태
   * @example CONFIRMED
   */
  status: EventStatus;

  /**
   * 지갑이 속한 팀(Organization)의 ID
   * @example 31cafc79bd437e1b8e7b8209e399d3f3
   */
  orgId: string;

  /**
   * 암호화폐의 소수점 자릿수
   * @example 18
   */
  decimals: number;

  /**
   * 입출금 지갑 ID
   * @example ae40b1b3dd953e5592c21e58be30d807
   */
  walletId: string;

  /**
   * 입금 주소 ID
   * @example ae40b1b3dd953e5592c21e58be30d807
   */
  depositAddressId: string;

  /**
   * 암호화폐의 기호
   * @example USDT
   */
  ticker: string;

  /**
   * 입출금 타입
   * @example WITHDRAWAL
   */
  transferType: TransferType;

  /**
   * 트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)
   * @example 8c87c578d7568edc156f831cf03c3ff0
   */
  transactionId: string;

  /**
   * 트랜잭션 해시
   * @example 0xef76a243fa224f723922a1b067dd916fb1b2568aff292d2d1d183a807804922f
   */
  transactionHash: string;

  /**
   * 트랜잭션 생성 시간 (형식: ms, UNIX time)
   * @example 1612411568760
   */
  createdAt: string;

  /**
   * 트랜잭션 상태가 마지막으로 변경된 시간 (형식: ms, UNIX time)
   * @example 1612411724023
   */
  updatedAt: string;

  /**
   * 해당 내역의 지갑 또는 입금 주소의 이름
   * @example ETH 실비 정산
   */
  name: string;

  static fromValueTransferEvent(event: ValueTransferEvent): TransferDTO {
    return {
      id: event.id,
      from: event.from,
      to: event.to,
      amount: event.amount.toString(10),
      status: event.status,
      orgId: event.orgId,
      decimals: event.decimals,
      walletId: event.masterWalletId,
      depositAddressId:
        event.masterWalletId == event.walletId ? null : event.walletId,
      ticker: event.coinSymbol,
      transferType: event.transferType,
      transactionId: event.transactionId,
      transactionHash: event.transactionHash,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      name: event.walletName,
    } as TransferDTO;
  }
}
