import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";
import { EthWallet } from "@haechi-labs/henesis-wallet-core/lib/eth/wallet";
import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETHEREUM_WALLET_DTO: WalletDTO = {
  id: "ae40b1b3dd953e5592c21e58be30d807",
  name: "ethereum-wallet",
  address: "0xdde12e85d7f5d0003eff13f7a3cf6068b5a41454",
  blockchain: BlockchainType.ETHEREUM,
  createdAt: "1612411568760",
  updatedAt: "1612411724023",
  status: WalletStatus.ACTIVE,
  whitelistActivated: false,
  version: "v4",
};

export const EXAMPLE_BINANCE_SMART_CHAIN_WALLET_DTO: WalletDTO = {
  ...EXAMPLE_ETHEREUM_WALLET_DTO,
  name: "binance-smart-chain-wallet",
  blockchain: BlockchainType.BINANCE_SMART_CHAIN,
};

export class WalletDTO {
  @ApiModelProperty({
    description: "지갑 ID",
    example: EXAMPLE_ETHEREUM_WALLET_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "지갑 이름",
    example: EXAMPLE_ETHEREUM_WALLET_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "지갑 주소",
    example: EXAMPLE_ETHEREUM_WALLET_DTO.address,
  })
  address: string;

  @ApiModelProperty({
    description: "메인넷 종류",
    example: EXAMPLE_ETHEREUM_WALLET_DTO.blockchain,
    enum: Object.values(BlockchainType),
  })
  blockchain: BlockchainType;

  @ApiModelProperty({
    description: "지갑 생성 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_WALLET_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "지갑 정보 수정 시간 (단위: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_WALLET_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelProperty({
    description: "지갑 상태",
    example: EXAMPLE_ETHEREUM_WALLET_DTO.status,
    enum: Object.values(WalletStatus),
  })
  status: WalletStatus;

  @ApiModelPropertyOptional({
    description: "출금 주소 화이트리스팅의 활성화 유무",
    example: EXAMPLE_ETHEREUM_WALLET_DTO.whitelistActivated,
  })
  whitelistActivated?: boolean;

  @ApiModelPropertyOptional({
    description: "컨트랙트 버전",
    example: EXAMPLE_ETHEREUM_WALLET_DTO.version,
  })
  version?: string;

  static fromEthWallet(wallet: EthWallet): WalletDTO {
    const walletData = wallet.getData();
    return {
      id: wallet.getId(),
      name: walletData.name,
      address: walletData.address,
      blockchain: walletData.blockchain,
      createdAt: walletData.createdAt,
      updatedAt: walletData.updatedAt,
      status: walletData.status,
      whitelistActivated: walletData.whitelistActivated,
      version: walletData.version,
    } as WalletDTO;
  }
}
