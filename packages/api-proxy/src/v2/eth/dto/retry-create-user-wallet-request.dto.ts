import { ApiModelPropertyOptional } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class RetryCreateUserWalletRequestDTO {
  /**
   * 트랜잭션에 사용할 gas price (단위: wei, peb)
   null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.
   * @example 0x1
   */
  @ApiModelPropertyOptional({
    description: "마스터 지갑의 새로운 이름",
    example: "masterWalletName",
    default: "masterWalletName",
  })
  gasPrice?: string;
}
