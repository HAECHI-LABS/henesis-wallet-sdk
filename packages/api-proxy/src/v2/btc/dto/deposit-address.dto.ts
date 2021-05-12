import { DepositAddress } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export const DEFAULT_DepositAddressDTO: DepositAddressDTO = {
  id: "94fd6a94ed199d660acf55e2f2943a7c",
  name: "bit",
  address: "2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm",
  pub: "0x022bf2a47ce5027831a3587ecd9f2d0d1e590a227ea576f61598ee84405e0479c1",
  createdAt: "1620041696849"
}

export class DepositAddressDTO {
  @ApiModelProperty({
    description: "입금 주소 ID",
    example: "94fd6a94ed199d660acf55e2f2943a7c",
    default: "94fd6a94ed199d660acf55e2f2943a7c",
  })
  id: string;

  @ApiModelProperty({
    description: "입금 주소 이름",
    example: "bit",
    default: "bit",
  })
  name: string;

  @ApiModelProperty({
    description: "입금 주소",
    example: "2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm",
    default: "2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm",
  })
  address: string;

  @ApiModelProperty({
    description: "입금 주소 공개키",
    example: "0x022bf2a47ce5027831a3587ecd9f2d0d1e590a227ea576f61598ee84405e0479c1",
    default: "0x022bf2a47ce5027831a3587ecd9f2d0d1e590a227ea576f61598ee84405e0479c1",
  })
  pub?: string;

  @ApiModelProperty({
    description: "입금 주소 생성 시간 (단위: ms, UNIX time)",
    example: "1620041696849",
    default: "1620041696849",
  })
  createdAt: string;

  static fromDepositAddress(depositAddress: DepositAddress): DepositAddressDTO {
    return depositAddress as DepositAddressDTO;
  }
}
