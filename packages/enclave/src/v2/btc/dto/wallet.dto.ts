import { KeyDTO } from "./key.dto";

export class WalletDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  id: string;

  /**
   * 지갑 이름
   * @example ETH
   */
  name: string;

  /**
   * 지갑 주소
   * @example ETH
   */
  address: string;

  /**
   * 지갑 비밀번호를 복구하기 위해, 암호화하는 데에 쓰인 키
   * @example ETH
   */
  encryptionKey: string;

  /**
   * 지갑 생성 시간
   * @example ETH
   */
  createdAt: string;

  /**
   * 지갑 변경 시간
   * @example ETH
   */
  updatedAt: string;

  /**
   * 지갑 상태
   * @example INACTIVE, CREATING, ACTIVE
   */
  status: string;

  /**
   * 지갑이 속한 팀(Org)의 ID
   * @example ETH
   */
  orgId: string;

  /**
   * 지갑을 서명할 때 쓰이는 Account Key 정보
   * @example ETH
   */
  accountKey: KeyDTO;

  /**
   * 출금 주소 화이트리스팅의 활성화 유무
   * @example ETH
   */
  whitelistActivated: boolean;
}
