import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateUserWalletRequestDTO {
  @ApiModelProperty({
    description: "지갑 이름",
    example: "userWalletName",
  })
  name: string;

  @ApiModelProperty({
    description: "지갑 비밀번호",
    example: "passphrase",
  })
  passphrase: string;

  @ApiModelPropertyOptional({
    description: "트랜잭션에 사용할 gas price (단위: wei, peb)",
    example: "0x1",
  })
  gasPrice?: string;

  @ApiModelPropertyOptional({
    description: "salt",
    example: "salt",
  })
  salt?: string;
}
