import { EthDepositAddress } from "@haechi-labs/henesis-wallet-core/lib/eth/depositAddress";
import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO: DepositAddressDTO = {
  id: "a1f9e4c33ea9f51974490fd1c30efb3e",
  address: "0x70d4e4abbe12c9c5098df3b31d9ad89c99a01967",
  name: "deposit-address-1",
  blockchain: BlockchainType.ETHEREUM,
  createdAt: "1614582860091",
  updatedAt: "1614582928222",
  version: "v4",
};

export class DepositAddressDTO {
  @ApiModelProperty({
    description: "입금 주소 ID",
    example: EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "입금 주소",
    example: EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO.address,
  })
  address: string;

  @ApiModelProperty({
    description: "입금 주소 이름",
    example: EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "메인넷 종류",
    example: EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO.blockchain,
  })
  blockchain: BlockchainType;

  @ApiModelProperty({
    description: "지갑 생성 시간 (단위: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "지갑 정보 수정 시간 (단위: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelProperty({
    description: "입금 주소 버전",
    example: EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO.version,
  })
  version: string;

  static fromEthDepositAddress(address: EthDepositAddress): DepositAddressDTO {
    return {
      id: address.getId(),
      address: address.getAddress(),
      name: address.getData().name,
      blockchain: address.getData().blockchain,
      createdAt: address.getData().createdAt,
      updatedAt: address.getData().updatedAt,
      version: address.getVersion(),
    } as unknown as DepositAddressDTO;
  }
}
