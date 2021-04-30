export class DepositAddressDTO {
  /**
   * 입금 주소 ID
   * @example ETH
   */
  id: string;

  /**
   * 입금 주소 이름
   * @example ETH
   */
  name: string;

  /**
   * 입금 주소
   * @example ETH
   */
  address: string;

  /**
   * 입금 주소 공개키
   * @example ETH
   */
  pub: string;

  /**
   * 입금 주소 생성 시간 (단위: ms, UNIX time)
   * @example ETH
   */
  createdAt: string;
}
