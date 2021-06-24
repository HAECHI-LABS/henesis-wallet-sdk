import { FilDepositAddress } from "@haechi-labs/henesis-wallet-core/lib/fil/depositAddress";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO: DepositAddressDTO = {
  id: "a1f9e4c33ea9f51974490fd1c30efb3e",
  name: "deposit-address-1",
  address: "t1tian42omo3lnk6lh7mw6k3d4muelbfvvlmhufni",
  createdAt: "1614582860091",
  updatedAt: "1614582928222",
};

export class DepositAddressDTO {
  @ApiModelProperty({
    description: "입금 주소 ID",
    example: EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "입금 주소 이름",
    example: EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "입금 주소",
    example: EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO.address,
  })
  address: string;

  @ApiModelProperty({
    description: "입금 주소 생성 시간 (단위: ms, UNIX time)",
    example: EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "입금 주소 정보 수정 시간 (단위: ms, UNIX time)",
    example: EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO.updatedAt,
  })
  updatedAt: string;

  static fromDepositAddress(depositAddress: FilDepositAddress) {
    return {
      id: depositAddress.getId(),
      name: depositAddress.getData().name,
      address: depositAddress.getAddress(),
      createdAt: depositAddress.getData().createdAt,
      updatedAt: depositAddress.getData().updatedAt,
    };
  }
}
