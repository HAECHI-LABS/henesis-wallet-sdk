import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";
import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETH_KLAY_WALLET_DTO: WalletDTO = {
  id: "407a31c97902faf2b5b2cd4b1fa1cfcd",
  name: "bit",
  address: "0x2c27695429903b1e36299ce1eb89a3c1c34d115d",
  createdAt: "1615793637580",
  updatedAt: "1615793656270",
  status: WalletStatus.ACTIVE,
  blockchain: BlockchainType.ETHEREUM,
  version: "v3",
  transactionId: "183365bc7837eceb5c9292e5be1655b7",
  error: null,
};

export class WalletDTO {
  @ApiModelProperty({
    description: "지갑 ID",
    example: EXAMPLE_ETH_KLAY_WALLET_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "지갑 이름",
    example: EXAMPLE_ETH_KLAY_WALLET_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "지갑 주소",
    example: EXAMPLE_ETH_KLAY_WALLET_DTO.address,
  })
  address: string;

  @ApiModelProperty({
    description: "지갑 생성 시간 (단위: ms, UNIX time)",
    example: EXAMPLE_ETH_KLAY_WALLET_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "지갑 정보 수정 시간 (단위: ms, UNIX time)",
    example: EXAMPLE_ETH_KLAY_WALLET_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelProperty({
    description: "지갑 상태",
    example: EXAMPLE_ETH_KLAY_WALLET_DTO.status,
  })
  status: WalletStatus;

  @ApiModelProperty({
    description: "블록체인 타입",
    example: EXAMPLE_ETH_KLAY_WALLET_DTO.blockchain,
  })
  blockchain: BlockchainType;

  @ApiModelProperty({
    description: "컨트랙트 버전",
    example: EXAMPLE_ETH_KLAY_WALLET_DTO.version,
  })
  version?: string;

  @ApiModelProperty({
    description: "지갑 생성 트랜잭션의 ID",
    example: EXAMPLE_ETH_KLAY_WALLET_DTO.transactionId,
  })
  transactionId?: string | null;

  @ApiModelProperty({
    description: "지갑 생성 실패 시 발생한 에러",
    example: EXAMPLE_ETH_KLAY_WALLET_DTO.error,
  })
  error?: string | null;
}
