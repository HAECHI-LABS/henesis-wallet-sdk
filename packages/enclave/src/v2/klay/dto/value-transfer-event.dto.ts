import { EventDTO } from "./event.dto";

export class ValueTransferEventDTO extends EventDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  amount: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  decimals: number;

  /**
   * 지갑 ID
   * @example ETH
   */

  coinSymbol: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  from: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  to: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  transferType: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  walletName: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  walletType: string;
}
