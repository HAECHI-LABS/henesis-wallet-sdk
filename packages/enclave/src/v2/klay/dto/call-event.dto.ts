import { EventDTO } from "./event.dto";

export class CallEventDTO extends EventDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  fromAddress: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  toAddress: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  data: string;
}
