import { EventDTO, EXAMPLE_ETH_KLAY_EVENT_DTO } from "./event.dto";
import { EthCallEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETH_KLAY_CALL_EVENT_DTO: CallEventDTO = Object.assign(
  EXAMPLE_ETH_KLAY_EVENT_DTO,
  {
    fromAddress: "0x4c49f0ead605aca868364769c9a4ef24930810b5",
    toAddress: "0xe3d9325576bf491c2f35e92b020b7b990557f545",
    data: "0x6eea436c",
  }
);

export class CallEventDTO extends EventDTO {
  @ApiModelProperty({
    description: "호출한 스마트 컨트랙트 주소",
    example: EXAMPLE_ETH_KLAY_CALL_EVENT_DTO.fromAddress,
  })
  fromAddress: string;

  @ApiModelProperty({
    description: "호출한 스마트 컨트랙트 주소",
    example: EXAMPLE_ETH_KLAY_CALL_EVENT_DTO.toAddress,
  })
  toAddress: string;

  @ApiModelProperty({
    description: "data",
    example: EXAMPLE_ETH_KLAY_CALL_EVENT_DTO.data,
  })
  data: string;

  static fromETHCallEvent(event: EthCallEvent): CallEventDTO {
    return {
      id: event.id,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      status: event.status,
      transactionHash: event.transactionHash,
      walletId: event.walletId,
      transactionId: event.transactionId,
      orgId: event.orgId,
      masterWalletId: event.masterWalletId,
      confirmation: event.confirmation
        ? BNConverter.bnToHexString(event.confirmation)
        : null,
      fromAddress: event.fromAddress,
      toAddress: event.toAddress,
      data: event.data,
      metadata: event.metadata,
    };
  }
}
