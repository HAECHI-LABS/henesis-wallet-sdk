import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";
import { FilMasterWallet } from "@haechi-labs/henesis-wallet-core/lib/fil/wallet";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_MASTER_WALLET_DTO: MasterWalletDto = {
  id: "a1f9e4c33ea9f51974490fd1c30efb3e",
  name: "filecoin-wallet-1",
  address: "t2faaemofs4z3qnnpeawbrawyot43iuekkg52tjai",
  createdAt: "1614582860091",
  updatedAt: "1614582928222",
  status: WalletStatus.ACTIVE,
};

export class MasterWalletDto {
  @ApiModelProperty({
    description: "마스터 지갑 ID",
    example: EXAMPLE_FILECOIN_MASTER_WALLET_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "마스터 지갑 이름",
    example: EXAMPLE_FILECOIN_MASTER_WALLET_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "마스터 지갑 주소",
    example: EXAMPLE_FILECOIN_MASTER_WALLET_DTO.address,
  })
  address: string;

  @ApiModelProperty({
    description: "마스터 지갑 생성 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_FILECOIN_MASTER_WALLET_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "마스터 지갑 정보 수정 시간 (단위: ms, UNIX time)",
    example: EXAMPLE_FILECOIN_MASTER_WALLET_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelProperty({
    description: "마스터 지갑 상태",
    example: EXAMPLE_FILECOIN_MASTER_WALLET_DTO.status,
  })
  status: WalletStatus;

  static fromFilWallet(masterWallet: FilMasterWallet): MasterWalletDto {
    const masterWalletData = masterWallet.getData();
    return {
      id: masterWalletData.id,
      name: masterWalletData.name,
      address: masterWalletData.address,
      createdAt: masterWalletData.createdAt,
      updatedAt: masterWalletData.updatedAt,
      status: masterWalletData.status,
    } as MasterWalletDto;
  }
}
