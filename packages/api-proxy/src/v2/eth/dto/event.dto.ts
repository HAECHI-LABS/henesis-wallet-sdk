export class EventDTO {
  /**
   * 입출금/호출 내역의 ID
   * @example 100393
   */
  id: number;

  /**
   * 트랜잭션 생성 시간 (형식: ms, UNIX time)
   * @example 1620056478365
   */
  createdAt: string;

  /**
   * 트랜잭션 상태가 마지막으로 변경된 시간 (형식: ms, UNIX time)
   * @example 1620056481504
   */
  updatedAt: string;

  /**
   * 트랜잭션 상태
   * @example CONFIRMED
   */
  status: string;

  /**
   * 트랜잭션 해시
   * @example 0xb53d099ca4ad755f3c66f0d64057eae26420d946241685a6745e2f09bc81cf7e
   */
  transactionHash?: string;

  /**
   * 입출금 지갑 ID
   * @example 98fa482e258bbd5cbac1393acef9e0e6
   */
  walletId: string;

  /**
   * 트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)
   * @example 2def027e99e906f8b912c691def10861
   */
  transactionId?: string;

  /**
   * 지갑이 속한 팀(Org)의 ID
   * @example 575a431dc73615a9e65648180bbd4fbb
   */
  orgId?: string;

  /**
   * 입출금된 지갑이 속해있는 마스터 지갑 ID
   * @example 98fa482e258bbd5cbac1393acef9e0e6
   */
  masterWalletId?: string;

  /**
   * 블록 컨펌 수 (16진법)
   * @example 0x3ed
   */
  confirmation: string;
}
