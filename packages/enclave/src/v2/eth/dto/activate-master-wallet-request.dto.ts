import { ApiProperty } from "@nestjs/swagger";
import { KeyDTO } from "./key.dto";

export class ActivateMasterWalletRequestDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  accountKey: KeyDTO;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  backupKey: KeyDTO;
}
