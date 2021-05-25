import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateUserWalletRequestDTO {
  @ApiModelProperty({
    description: "지갑 이름",
    example: "userWalletName",
    default: "userWalletName",
  })
  name: string;

  @ApiModelProperty({
    description: "지갑 비밀번호",
    example: "passphrase",
    default: "passphrase",
  })
  passphrase: string;

  @ApiModelProperty({
    description: "트랜잭션에 사용할 gas price (단위: wei, peb)",
    example: "0x1",
    default: "0x1",
  })
  gasPrice: string;

  @ApiModelProperty({
    description: "salt",
    example: "salt",
    default: "salt",
  })
  salt: string;
}
