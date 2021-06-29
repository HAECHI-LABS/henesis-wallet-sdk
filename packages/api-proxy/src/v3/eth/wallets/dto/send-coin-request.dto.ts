import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_SEND_COIN_REQUEST_DTO: SendCoinRequestDTO = {
  ticker: "ETH",
  to: "0xab28d146e860e0b132695c941f706d783a158345",
  amount: "100000000",
  passphrase: "passphrase",
  gasPrice: "8000000000",
  metadata: "metadata",
};

export class SendCoinRequestDTO {
  @ApiModelProperty({
    description: "암호화폐의 기호 (ticker)",
    example: EXAMPLE_SEND_COIN_REQUEST_DTO.ticker,
  })
  ticker: string;

  @ApiModelProperty({
    description: "암호화폐를 받을 지갑 주소",
    example: EXAMPLE_SEND_COIN_REQUEST_DTO.to,
  })
  to: string;

  @ApiModelProperty({
    description: "암호화폐의 양 (단위: wei, peb)",
    example: EXAMPLE_SEND_COIN_REQUEST_DTO.amount,
  })
  amount: string;

  @ApiModelProperty({
    description: "지갑의 비밀번호",
    example: EXAMPLE_SEND_COIN_REQUEST_DTO.passphrase,
  })
  passphrase: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas price (단위: wei) null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.",
    example: EXAMPLE_SEND_COIN_REQUEST_DTO.gasPrice,
  })
  gasPrice: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: "metadata",
  })
  metadata?: string;
}
