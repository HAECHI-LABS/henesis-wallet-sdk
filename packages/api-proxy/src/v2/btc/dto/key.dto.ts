export class KeyDTO {
  /**
   * Key의 주소
   * @example ETH
   */
  address?: string;

  /**
   * Key의 Pub Key 정보
   * @example ETH
   */
  pub: string;

  /**
   * Key의 Private Key를 암호화한 값
   * @example ETH
   */
  keyFile?: string;
}
