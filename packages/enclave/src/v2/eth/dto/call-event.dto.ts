import { EventDTO } from "./event.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CallEventDTO extends EventDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  fromAddress: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  toAddress: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  data: string;
}
