import { WalletDTO } from "./wallet.dto";
import { ApiProperty } from "@nestjs/swagger";
import { KeyDTO } from "./key.dto";

export class MasterWalletDTO extends WalletDTO {
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
  encryptionKey: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  whitelistActivated: boolean;
}
