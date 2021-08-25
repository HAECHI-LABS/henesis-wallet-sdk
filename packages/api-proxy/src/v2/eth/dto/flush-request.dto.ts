import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class FlushRequestDTO {
  @ApiModelProperty({
    description: "옮기고자 하는 코인/토큰의 기호 (symbol)",
    example: "ETH",
  })
  ticker: string;

  @ApiModelProperty({
    description: "옮기고자 하는 사용자 지갑 ID 목록 (최대 50개)",
    example: '[ "70d1205b97eb651413d34d14ec5cb285" ]',
  })
  userWalletIds: string[];

  @ApiModelProperty({
    description: "마스터 지갑의 비밀번호",
    example: "passphrase",
  })
  passphrase: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas price (단위: wei, peb)\n" +
      "null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.",
    example: "0x1",
  })
  gasPrice?: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas limit\n" +
      "null일 경우, Henesis가 자동으로 설정합니다.",
    example: "0x1",
  })
  gasLimit?: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: "metadata",
  })
  metadata?: string;
}
