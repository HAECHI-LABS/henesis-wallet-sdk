import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTransactionRequestDTO {
  /**
   * 트랜잭션을 보낼 스마트 컨트랙트 주소
   * @example 0xc10f954e2be747e1d9d47948b2c15e5b71c5d9c8
   */
  to: string;
  /**
   * 트랜잭션에 담을 암호화폐의 양
   * @example 0
   */
  @ApiPropertyOptional()
  value: number;
  /**
   * 트랜잭션에 담을 데이터
   * @example 0x0
   */
  data: string;
  /**
   * 지갑의 비밀번호
   * @example passphrase
   */
  passphrase: string;
  /**
   * 트랜잭션에 사용할 gas price (단위: wei) null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.
   */
  @ApiPropertyOptional()
  gasPrice: number;
}
