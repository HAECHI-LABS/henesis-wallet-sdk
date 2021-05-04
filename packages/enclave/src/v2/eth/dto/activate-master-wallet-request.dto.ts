import { KeyDTO } from "./key.dto";

export class ActivateMasterWalletRequestDTO {
  /**
   * 계정 키
   * @example KEY
   */

  accountKey: KeyDTO;

  /**
   * 백업 키
   * @example KEY
   */

  backupKey: KeyDTO;
}
