import { Blockchain } from "./enums/blockchain.enum";
import { CoinAttributes } from "./enums/attributes.enum";

export class CoinDTO {
  /**
   * Henesis에서 부여한 Coin의 ID
   * @example 11
   */
  id: number;

  /**
   * 코인 이름
   * @example ethereum
   */
  name: string;

  /**
   * 코인의 기호
   * @example ETH
   */
  ticker: string;

  /**
   * 코인 컨트랙트 주소
   */
  address: string;

  /**
   * 코인 설명
   */
  description: string;

  /**
   * 코인의 소수점 자릿수
   * @example 18
   */
  decimals: number;

  /**
   * 코인이 발행된 블록체인 플랫폼
   */
  blockchain: Blockchain;

  /**
   * 코인이 메타 데이터
   */
  attributes: CoinAttributes;
}
