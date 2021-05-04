import { EventDTO } from "./event.dto";
import { ApiProperty } from "@nestjs/swagger";

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
