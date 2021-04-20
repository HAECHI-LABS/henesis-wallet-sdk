import { Blockchain } from "./enums/blockchain.enum";
import { Status } from "./enums/status.enum";

export class TransactionDTO {
  /**
   * 트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다, 블록체인에서 부여하는 트랜잭션 해시와 다른 개념입니다)
   * @example b549bfaaa74d1c4244ecc655738b1984
   */
  id: string;
  /**
   * 메인넷 종류
   * @example
   */
  blockchain: Blockchain;
  /**
   * 트랜잭션 해시 (트랜잭션 상태가 REQUESTED일 때는 존재하지 않습니다)
   * @example 0x8a1ef722a2884d53a86874c8ba19bcf267bb0b8a81da00c14ddc6457cf1eaf96
   */
  hash: string;
  /**
   * 트랜잭션 전송 시 발생한 에러
   * @example
   */
  error: string;
  /**
   * 트랜잭션 상태
   */
  status: Status;
  /**
   * 트랜잭션 수수료
   * @example 10000000
   */
  fee: number;
  /**
   * 트랜잭션 생성 시간 (형식: ms, UNIX time)
   * @example 1614582928222
   */
  createdAt: string;
  /**
   * 트랜잭션 상태가 변한 시간 (형식: ms, UNIX time)
   * @example 1612411724023
   */
  updatedAt: string;
}
