import { ApiProperty } from "@nestjs/swagger";
import { KeyDTO } from "./key.dto";

export class ActivateMasterWalletRequestDTO {
  /**
   * 계정 키
   * @example: name
   */

  accountKey: KeyDTO;

  /**
   * 백업 키
   * @example: name
   */

  backupKey: KeyDTO;
}
