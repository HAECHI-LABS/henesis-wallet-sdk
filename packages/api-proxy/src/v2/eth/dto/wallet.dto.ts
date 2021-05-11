import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";
import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";

export class WalletDTO {
  /**
   * 지갑 ID
   * @example 407a31c97902faf2b5b2cd4b1fa1cfcd
   */
  id: string;

  /**
   * 지갑 이름
   * @example bit
   */
  name: string;

  /**
   * 지갑 주소
   * @example 0x2c27695429903b1e36299ce1eb89a3c1c34d115d
   */
  address: string;

  /**
   * 지갑 생성 시간 (단위: ms, UNIX time)
   * @example 1615793637580
   */
  createdAt: string;

  /**
   * 지갑 정보 수정 시간 (단위: ms, UNIX time)
   * @example 1615793656270
   */
  updatedAt: string;

  /**
   * 지갑 상태
   * @example ACTIVE
   */
  status: WalletStatus;

  /**
   * 블록체인 타입
   * @example ETHEREUM
   */
  blockchain: BlockchainType;

  /**
   * 컨트랙트 버전
   * @example v3
   */
  version?: string;

  /**
   * 지갑 생성 트랜잭션의 ID
   * @example 183365bc7837eceb5c9292e5be1655b7
   */
  transactionId?: string | null;

  /**
   * 지갑 생성 실패 시 발생한 에러
   * @example null
   */
  error?: string | null;
}
