import { DepositAddress } from "@haechi-labs/henesis-wallet-core/lib/ltc/wallet";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_DEPOSIT_ADDRESS_DTO: DepositAddressDTO = {
  id: "94fd6a94ed199d660acf55e2f2943a7c",
  name: "lite",
  address: "QS9mDWR42bcNK5CiWe2nU5PAM6vMzdi6fV",
  pub: "0x022bf2a47ce5027831a3587ecd9f2d0d1e590a227ea576f61598ee84405e0479c1",
  createdAt: "1620041696849",
};

export class DepositAddressDTO {
  @ApiModelProperty({
    description: "입금 주소 ID",
    example: EXAMPLE_DEPOSIT_ADDRESS_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "입금 주소 이름",
    example: EXAMPLE_DEPOSIT_ADDRESS_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "입금 주소",
    example: EXAMPLE_DEPOSIT_ADDRESS_DTO.address,
  })
  address: string;

  @ApiModelProperty({
    description: "입금 주소 공개키",
    example: EXAMPLE_DEPOSIT_ADDRESS_DTO.pub,
  })
  pub: string;

  @ApiModelProperty({
    description: "입금 주소 생성 시간 (단위: ms, UNIX time)",
    example: EXAMPLE_DEPOSIT_ADDRESS_DTO.createdAt,
  })
  createdAt: string;

  static fromDepositAddress(depositAddress: DepositAddress): DepositAddressDTO {
    return depositAddress as DepositAddressDTO;
  }
}
