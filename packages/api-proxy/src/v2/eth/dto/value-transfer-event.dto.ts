import { EventDTO, EXAMPLE_ETH_KLAY_EVENT_DTO } from "./event.dto";
import { EthValueTransferEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETH_KLAY_VALUE_TRANSFER_EVENT_DTO: ValueTransferEventDTO =
  Object.assign(EXAMPLE_ETH_KLAY_EVENT_DTO, {
    amount: "0x2386f26fc10000",
    decimals: 18,
    coinSymbol: "ETH",
    from: "0xd5fcc938ad42a56f1c60e7bd41f646ad844b2273",
    to: "0xb659b6db08cdb7c24bd35b72222807c2567086f3",
    transferType: "WITHDRAWAL",
    walletName: "bit",
    walletType: "MASTER_WALLET",
  });

export class ValueTransferEventDTO extends EventDTO {
  @ApiModelProperty({
    description: "암호화폐의 양",
    example: EXAMPLE_ETH_KLAY_VALUE_TRANSFER_EVENT_DTO.amount,
  })
  amount: string;

  @ApiModelProperty({
    description: "암호화폐의 소수점 자릿수",
    example: EXAMPLE_ETH_KLAY_VALUE_TRANSFER_EVENT_DTO.decimals,
  })
  decimals: number;

  @ApiModelProperty({
    description: "암호화폐의 기호 (symbol)",
    example: EXAMPLE_ETH_KLAY_VALUE_TRANSFER_EVENT_DTO.coinSymbol,
  })
  coinSymbol: string;

  @ApiModelProperty({
    description: "출금 주소",
    example: EXAMPLE_ETH_KLAY_VALUE_TRANSFER_EVENT_DTO.from,
  })
  from: string;

  @ApiModelProperty({
    description: "입금 주소",
    example: EXAMPLE_ETH_KLAY_VALUE_TRANSFER_EVENT_DTO.to,
  })
  to: string;

  @ApiModelProperty({
    description: "입출금 타입",
    example: EXAMPLE_ETH_KLAY_VALUE_TRANSFER_EVENT_DTO.transferType,
  })
  transferType: string;

  @ApiModelProperty({
    description: "해당 내역의 지갑 이름",
    example: EXAMPLE_ETH_KLAY_VALUE_TRANSFER_EVENT_DTO.walletName,
  })
  walletName: string;

  @ApiModelProperty({
    description: "해당 내역의 지갑 종류",
    example: EXAMPLE_ETH_KLAY_VALUE_TRANSFER_EVENT_DTO.walletType,
  })
  walletType: string;

  static fromETHValueTransferEvent(
    event: EthValueTransferEvent
  ): ValueTransferEventDTO {
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
      amount: event.amount ? BNConverter.bnToHexString(event.amount) : null,
      decimals: event.decimals,
      coinSymbol: event.coinSymbol,
      from: event.from,
      to: event.to,
      transferType: event.transferType,
      walletName: event.walletName,
      walletType: event.walletType,
    };
  }
}
