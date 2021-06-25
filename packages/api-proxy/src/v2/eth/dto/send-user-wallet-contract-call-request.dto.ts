import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class SendUserWalletContractCallRequestDTO {
  @ApiModelProperty({
    description: "트랜잭션을 보낼 스마트 컨트랙트 주소",
    example: "0x2c27695429903b1e36299ce1eb89a3c1c34d115d",
    default: "0x2c27695429903b1e36299ce1eb89a3c1c34d115d",
  })
  contractAddress: string;

  @ApiModelProperty({
    description: "트랜잭션에 담을 암호화폐의 양",
    example: "0x1",
    default: "0x1",
  })
  value: string;

  @ApiModelProperty({
    description: "트랜잭션에 담을 데이터",
    example: "data",
    default: "data",
  })
  data: string;

  @ApiModelProperty({
    description: "지갑의 비밀번호",
    example: "passphrase",
    default: "passphrase",
  })
  passphrase: string;

  @ApiModelProperty({
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

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: "metadata",
    default: "metadata",
  })
  metadata?: string;
}
