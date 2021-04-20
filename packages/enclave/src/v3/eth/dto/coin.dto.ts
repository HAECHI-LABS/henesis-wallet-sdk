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
   * @example 0xdd00383e5a51166bba3e96d84c14a36d72e6c128
   */
  address: string;

  /**
   * 코인 설명
   * @example 이더리움
   */
  description: string;

  /**
   * 코인의 소수점 자릿수
   * @example 18
   */
  decimals: number;

  /**
   * 코인이 발행된 메인넷
   */
  blockchain: Blockchain;

  /**
   * 코인의 메타 데이터
   */
  attributes: CoinAttributes;
}
