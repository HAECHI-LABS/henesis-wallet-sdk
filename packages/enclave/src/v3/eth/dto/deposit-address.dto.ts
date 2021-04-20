import { Blockchain } from "./enums/blockchain.enum";

export class DepositAddressDTO {
  /**
   * 입금 주소 ID
   * @example a1f9e4c33ea9f51974490fd1c30efb3e
   */
  id: string;
  /**
   * 입금 주소 이름
   * @example deposit-address-1
   */
  name: string;
  /**
   * 메인넷 종류
   * @example ETHEREUM
   */
  blockchain: Blockchain;
  /**
   * 지갑 생성 시간 (단위: ms, UNIX time)
   * @example 1614582860091
   */
  createdAt: string;
  /**
   * 지갑 정보 수정 시간 (단위: ms, UNIX time)
   * @example 1614582928222
   */
  updatedAt: string;
  /** 입금 주소 버전
   * @example v4
   */
  version: string;
}
