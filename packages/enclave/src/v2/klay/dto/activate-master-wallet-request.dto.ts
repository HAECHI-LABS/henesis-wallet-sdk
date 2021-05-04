import { ApiProperty } from "@nestjs/swagger";
import { KeyDTO } from "./key.dto";

export class ActivateMasterWalletRequestDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  accountKey: KeyDTO;

  /**
   * 지갑 ID
   * @example ETH
   */

  backupKey: KeyDTO;
}
