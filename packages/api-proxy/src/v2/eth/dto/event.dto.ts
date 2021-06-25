import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETH_KLAY_EVENT_DTO: EventDTO = {
  id: 100393,
  createdAt: "1620056478365",
  updatedAt: "1620056481504",
  status: "CONFIRMED",
  transactionHash:
    "0xb53d099ca4ad755f3c66f0d64057eae26420d946241685a6745e2f09bc81cf7e",
  walletId: "98fa482e258bbd5cbac1393acef9e0e6",
  transactionId: "2def027e99e906f8b912c691def10861",
  orgId: "575a431dc73615a9e65648180bbd4fbb",
  masterWalletId: "98fa482e258bbd5cbac1393acef9e0e6",
  confirmation: "0x3ed",
  metadata: "metadata",
};

export class EventDTO {
  @ApiModelProperty({
    description: "입출금/호출 내역의 ID",
    example: EXAMPLE_ETH_KLAY_EVENT_DTO.id,
  })
  id: number;

  @ApiModelProperty({
    description: "트랜잭션 생성 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETH_KLAY_EVENT_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "트랜잭션 상태가 마지막으로 변경된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETH_KLAY_EVENT_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelProperty({
    description: "트랜잭션 상태",
    example: EXAMPLE_ETH_KLAY_EVENT_DTO.status,
  })
  status: string;

  @ApiModelPropertyOptional({
    description: "트랜잭션 해시",
    example: EXAMPLE_ETH_KLAY_EVENT_DTO.transactionHash,
  })
  transactionHash?: string;

  @ApiModelProperty({
    description: "입출금 지갑 ID",
    example: EXAMPLE_ETH_KLAY_EVENT_DTO.walletId,
  })
  walletId: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)",
    example: EXAMPLE_ETH_KLAY_EVENT_DTO.transactionId,
  })
  transactionId?: string;

  @ApiModelPropertyOptional({
    description: "지갑이 속한 팀(Org)의 ID",
    example: EXAMPLE_ETH_KLAY_EVENT_DTO.orgId,
  })
  orgId?: string;

  @ApiModelPropertyOptional({
    description: "입출금된 지갑이 속해있는 마스터 지갑 ID",
    example: EXAMPLE_ETH_KLAY_EVENT_DTO.masterWalletId,
  })
  masterWalletId?: string;

  @ApiModelProperty({
    description: "블록 컨펌 수 (16진법)",
    example: EXAMPLE_ETH_KLAY_EVENT_DTO.confirmation,
  })
  confirmation: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: EXAMPLE_ETH_KLAY_EVENT_DTO.metadata,
  })
  metadata?: string;
}
