import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class SendMasterWalletCoinRequestDTO {
  @ApiModelProperty({
    description: "암호화폐의 기호 (symbol)",
    example: "ETH",
    default: "ETH",
  })
  ticker: string;

  @ApiModelProperty({
    description: "암호화폐를 받을 지갑 주소",
    example: "0x2c27695429903b1e36299ce1eb89a3c1c34d115d",
    default: "0x2c27695429903b1e36299ce1eb89a3c1c34d115d",
  })
  to: string;

  @ApiModelProperty({
    description:
      "암호화폐의 양 (단위: wei, peb)\n" +
      "(16진법, 맨 앞에 반드시 '0x' 붙여야 함)",
    example: "0xDBE16A831",
    default: "0xDBE16A831",
  })
  amount: string;

  @ApiModelProperty({
    description: "마스터 지갑의 비밀번호",
    example: "passphrase",
    default: "passphrase",
  })
  passphrase: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas price (단위: wei, peb)\n" +
      "null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.",
    example: "0x1",
    default: "0x1",
  })
  gasPrice?: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas limit\n" +
      "null일 경우, Henesis가 자동으로 설정합니다.",
    example: "0x1",
    default: "0x1",
  })
  gasLimit?: string;
}
