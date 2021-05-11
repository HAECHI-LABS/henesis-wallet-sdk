import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import { Key } from "@haechi-labs/henesis-wallet-core/lib/types";
import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";

export class InactiveMasterWalletDTO {
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
   * 블록체인 타입
   * @example ETHEREUM
   */
  blockchain: BlockchainType;

  /**
   * KEY
   * @example KEY
   */
  henesisKey: Key;

  /**
   * 지갑 상태
   * @example ACTIVE
   */
  status: WalletStatus;

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
}
