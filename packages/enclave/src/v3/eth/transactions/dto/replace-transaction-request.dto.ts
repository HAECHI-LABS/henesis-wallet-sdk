import { ApiPropertyOptional } from "@nestjs/swagger";

export class ReplaceTransactionRequestDTO {
  /**
   * 트랜잭션에 사용할 gas price (단위: wei) null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.
   * @example: 8000000000
   */
  @ApiPropertyOptional()
  gasPrice: number;
}
