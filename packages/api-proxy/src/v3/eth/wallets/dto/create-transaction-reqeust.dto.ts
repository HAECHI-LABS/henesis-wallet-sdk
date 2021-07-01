import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETHEREUM_CREATE_TRANSACTION_REQUEST_DTO: CreateTransactionRequestDTO =
  {
    to: "0xc10f954e2be747e1d9d47948b2c15e5b71c5d9c8",
    value: "0",
    data: "0x0",
    passphrase: "passphrase",
    gasPrice: "10000000000",
    metadata: "metadata",
  };

export class CreateTransactionRequestDTO {
  @ApiModelProperty({
    description: "트랜잭션을 보낼 스마트 컨트랙트 주소",
    example: EXAMPLE_ETHEREUM_CREATE_TRANSACTION_REQUEST_DTO.to,
  })
  to: string;

  @ApiModelPropertyOptional({
    description: "트랜잭션에 담을 암호화폐의 양",
    example: EXAMPLE_ETHEREUM_CREATE_TRANSACTION_REQUEST_DTO.value,
  })
  value?: string;

  @ApiModelProperty({
    description: "트랜잭션에 담을 데이터",
    example: EXAMPLE_ETHEREUM_CREATE_TRANSACTION_REQUEST_DTO.data,
  })
  data: string;

  @ApiModelProperty({
    description: "지갑의 비밀번호",
    example: EXAMPLE_ETHEREUM_CREATE_TRANSACTION_REQUEST_DTO.passphrase,
  })
  passphrase: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas price (단위: wei) null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.",
    example: EXAMPLE_ETHEREUM_CREATE_TRANSACTION_REQUEST_DTO.gasPrice,
  })
  gasPrice?: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: "metadata",
  })
  metadata?: string;
}
