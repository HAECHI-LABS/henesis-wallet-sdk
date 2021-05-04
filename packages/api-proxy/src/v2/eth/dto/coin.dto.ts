export class CoinDTO {
  /**
   * 암호화폐 ID
   * @example 576
   */
  id: number;

  /**
   * 암호화폐 이름
   * @example Ampleforth
   */
  name: string;

  /**
   * 암호화폐의 기호 (symbol)
   * @example AMPL
   */
  symbol: string;

  /**
   * 암호화폐 주소
   * @example 0x35b1dc534959fa547047a3dcdf1eb1eebd704561
   */
  address: string;

  /**
   * 암호화폐 설명
   * @example AMPL
   */
  desc?: string;

  /**
   * 암호화폐가 발행된 블록체인 플랫폼
   * @example ETHEREUM
   */
  blockchain: string;

  /**
   * 암호화폐의 소수점 자릿수
   * @example 9
   */
  decimals: number;

  /**
   * 암호화폐의 메타 데이터
   * @example ["ERC20_STANDARD", "ERC20_REBASE"]
   */
  attributes: string[];
}
