import { Status } from "./enums/status.enum";
import { Blockchain } from "./enums/blockchain.enum";

export class CallEventDTO {
  /**
   * 스마트 컨트랙트 호출 내역의 ID
   * @example 375031
   */
  id: string;
  /**
   * 컨트랙트 호출시 사용된 data
   * @example 0xa9059cbb0000000000000000000000001f10ecbd971eab345ea19e96dc237b1fbd63de9600000000000000000000000000000000000000000000000000000000000f4240
   */
  data: string;
  /**
   * 트랜잭션 상태
   * @example CONFIRMED
   */
  status: Status;
  /**
   * 지갑 ID
   * @example ae40b1b3dd953e5592c21e58be30d807
   */
  walletId: string;
  /**
   * 지갑이 속한 팀(Organization)의 ID
   * @example 31cafc79bd437e1b8e7b8209e399d3f3
   */
  orgId: string;
  /**
   * 트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)
   * @example 8c87c578d7568edc156f831cf03c3ff0
   */
  transactionId: string;
  /**
   * 호출한 스마트 컨트랙트 주소
   * @example 0xdd00383e5a51166bba3e96d84c14a36d72e6c128
   */
  toAddress: string;
  /**
   * 호출한 지갑의 주소
   * @example 0x1f10ecbd971eab345ea19e96dc237b1fbd63de96
   */
  fromAddress: string;

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
   * 메인넷 종류
   * @example ethereum
   */
  blockchain: Blockchain;
}
