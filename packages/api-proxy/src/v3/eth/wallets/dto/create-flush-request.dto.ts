import { ApiPropertyOptional } from "@nestjs/swagger";
import { ApiModelPropertyOptional } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

class Target {
  /**
   * Henesis에서 부여한 Coin의 ID
   * @example 11
   */
  coinId: string;
  /**
   * 입금 주소 ID
   * @example c2bd6506cb56a6baaff32653ac77ef49
   */
  depositAddressId: string;
}

export class CreateFlushRequestDTO {
  targets: Target[];
  /**
   * 트랜잭션에 사용할 gas price (단위: wei) null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.
   * @example: 8000000000
   */
  @ApiPropertyOptional()
  gasPrice: number;
  /**
   * 트랜잭션에 사용할 gas limit (단위: wei) null일 경우, Henesis가 자동으로 설정합니다.
   * @example: 10000000000
   */
  @ApiPropertyOptional()
  gasLimit: number;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: "metadata",
    default: "metadata",
  })
  metadata?: string;
}
