import { EthCallEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import { EventStatus } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO: ContractCallsDTO = {
  id: "375031",
  data: "0xa9059cbb0000000000000000000000001f10ecbd971eab345ea19e96dc237b1fbd63de9600000000000000000000000000000000000000000000000000000000000f4240",
  status: EventStatus.CONFIRMED,
  walletId: "ae40b1b3dd953e5592c21e58be30d807",
  orgId: "31cafc79bd437e1b8e7b8209e399d3f3",
  transactionId: "8c87c578d7568edc156f831cf03c3ff0",
  toAddress: "0xdd00383e5a51166bba3e96d84c14a36d72e6c128",
  fromAddress: "0x1f10ecbd971eab345ea19e96dc237b1fbd63de96",
  transactionHash:
    "0xef76a243fa224f723922a1b067dd916fb1b2568aff292d2d1d183a807804922f",
  createdAt: "1612411568760",
  updatedAt: "1612411724023",
  blockchain: BlockchainType.ETHEREUM,
  metadata: "metadata",
};

export const EXAMPLE_BINANCE_SMART_CHAIN_CALLS_DTO: ContractCallsDTO = {
  ...EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO,
  blockchain: BlockchainType.BINANCE_SMART_CHAIN,
};

export class ContractCallsDTO {
  @ApiModelProperty({
    description: "스마트 컨트랙트 호출 내역의 ID",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "컨트랙트 호출시 사용된 data",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.data,
  })
  data: string;

  @ApiModelProperty({
    description: "트랜잭션 상태",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.status,
  })
  status: EventStatus;

  @ApiModelProperty({
    description: "지갑 ID",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.walletId,
  })
  walletId: string;

  @ApiModelProperty({
    description: "지갑이 속한 팀(Organization)의 ID",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.orgId,
  })
  orgId: string;

  @ApiModelProperty({
    description:
      "트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.transactionId,
  })
  transactionId: string;

  @ApiModelProperty({
    description: "호출한 스마트 컨트랙트 주소",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.toAddress,
  })
  toAddress: string;

  @ApiModelProperty({
    description: "호출한 지갑의 주소",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.fromAddress,
  })
  fromAddress: string;

  @ApiModelProperty({
    description: "트랜잭션 해시",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.transactionHash,
  })
  transactionHash: string;

  @ApiModelProperty({
    description: "트랜잭션 생성 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "트랜잭션 상태가 마지막으로 변경된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelProperty({
    description: "메인넷 종류",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.blockchain,
  })
  blockchain: BlockchainType;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO.metadata,
  })
  metadata?: string;

  public static fromCallEvent(event: EthCallEvent): ContractCallsDTO {
    return {
      id: event.id.toString(),
      data: event.data,
      status: event.status,
      walletId: event.masterWalletId,
      orgId: event.orgId,
      transactionId: event.transactionId,
      toAddress: event.toAddress,
      fromAddress: event.fromAddress,
      transactionHash: event.transactionHash,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      blockchain: BlockchainType.ETHEREUM,
      metadata: event.metadata,
    };
  }
}
