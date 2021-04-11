import { ApiProperty } from "@nestjs/swagger";
import { KeyDTO } from "./key.dto";

export class ActivateMasterWalletRequestDTO {
  /**
   * 계정 키
   * @example: name
   */
  @ApiProperty()
  accountKey: KeyDTO;

  /**
   * 백업 키
   * @example: name
   */
  @ApiProperty()
  backupKey: KeyDTO;
}
