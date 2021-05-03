import { WalletDTO } from "./wallet.dto";
import { KeyDTO } from "./key.dto";

export class MasterWalletDTO extends WalletDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  accountKey?: KeyDTO;

  /**
   * 지갑 ID
   * @example ETH
   */

  encryptionKey?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  whitelistActivated?: boolean;
}
