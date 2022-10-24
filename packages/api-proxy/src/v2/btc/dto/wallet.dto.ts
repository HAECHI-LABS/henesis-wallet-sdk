import { EXAMPLE_KEY_DTO, KeyDTO } from "./key.dto";
import {
  BtcActivatingMasterWallet,
  BtcMasterWallet,
} from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";
import {
  InactiveMasterWallet,
  WalletStatus,
} from "@haechi-labs/henesis-wallet-core/lib/wallet";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_WALLET_DTO: WalletDTO = {
  id: "cce4f485764767f256155390873668b3",
  name: "bitcoin-wallet",
  address: "2Mx6o4HZfPyV3QrYNv26jCGMwAPpDeVzq1a",
  encryptionKey:
    "b72355635b2f8db7d603a73gd37r2460e28d93ad42df6ba85fff4b18fe374ae3",
  createdAt: "1599116198762",
  updatedAt: "1599116198962",
  status: WalletStatus.ACTIVE,
  orgId: "0u1a431da7361na9e75648180bbd4fbc",
  accountKey: EXAMPLE_KEY_DTO,
  whitelistActivated: false,
};

export class WalletDTO {
  @ApiModelProperty({
    description: "지갑 ID",
    example: EXAMPLE_WALLET_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "지갑 이름",
    example: EXAMPLE_WALLET_DTO.name,
  })
  name: string;

  @ApiModelPropertyOptional({
    description: "지갑 주소",
    example: EXAMPLE_WALLET_DTO.address,
  })
  address?: string;

  @ApiModelPropertyOptional({
    description: "지갑 비밀번호를 복구하기 위해, 암호화하는 데에 쓰인 키",
    example: EXAMPLE_WALLET_DTO.encryptionKey,
  })
  encryptionKey?: string;

  @ApiModelProperty({
    description: "지갑 생성 시간",
    example: EXAMPLE_WALLET_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "지갑 변경 시간",
    example: EXAMPLE_WALLET_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelProperty({
    description: "지갑 상태",
    example: EXAMPLE_WALLET_DTO.status,
    enum: Object.values(WalletStatus),
  })
  status: WalletStatus;

  @ApiModelPropertyOptional({
    description: "지갑이 속한 팀(Org)의 ID",
    example: EXAMPLE_WALLET_DTO.orgId,
  })
  orgId?: string;

  @ApiModelPropertyOptional({
    description: "지갑을 서명할 때 쓰이는 Account Key 정보",
    example: EXAMPLE_WALLET_DTO.accountKey,
  })
  accountKey?: KeyDTO;

  @ApiModelProperty({
    description: "출금 주소 화이트리스팅의 활성화 유무",
    example: EXAMPLE_WALLET_DTO.whitelistActivated,
  })
  whitelistActivated: boolean;

  static fromMasterWallet(wallet: BtcMasterWallet): WalletDTO {
    return wallet.getData();
  }

  static fromInactiveMasterWallet(wallet: InactiveMasterWallet): WalletDTO {
    return {
      id: wallet.id,
      name: wallet.name,
      address: null,
      encryptionKey: null,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
      status: wallet.status,
      orgId: null,
      accountKey: null,
      whitelistActivated: false,
    };
  }

  static fromBTCActivatingMasterWallet(
    wallet: BtcActivatingMasterWallet
  ): WalletDTO {
    return {
      id: wallet.id,
      name: wallet.name,
      address: wallet.address,
      encryptionKey: null,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
      status: wallet.status,
      orgId: null,
      accountKey: null,
      whitelistActivated: false,
    };
  }
}
