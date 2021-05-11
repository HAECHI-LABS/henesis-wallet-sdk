import { WalletDTO } from "./wallet.dto";
import { KeyDTO } from "./key.dto";

export class MasterWalletDTO extends WalletDTO {
  /**
   * KEY
   * @example KEY
   */
  accountKey?: KeyDTO;

  /**
   * 마스터 지갑 비밀번호를 복구하기 위해 암호화하는 데 쓰인 키
   * @example f0880e48251dd2f8574a8c8a4d65311030185d5e451e8a474b89c2b473b5d953
   */
  encryptionKey?: string;

  /**
   * 출금 주소 화이트리스팅의 활성화 유무
   * @example false
   */
  whitelistActivated?: boolean;
}
