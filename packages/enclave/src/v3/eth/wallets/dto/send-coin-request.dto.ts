import { ApiPropertyOptional } from "@nestjs/swagger";

export class SendCoinRequestDTO {
  /**
   * 암호화폐의 기호 (ticker)
   * @example ETH
   */
  ticker: string;
  /**
   * 암호화폐의 받을 지갑 주소
   * @example 0xab28d146e860e0b132695c941f706d783a158345
   */
  to: string;
  /**
   * 암호화폐의 양 (단위: wei, peb)
   * @example 100000000
   */
  amount: number;
  /**
   * 지갑의 비밀번호
   * @example passphrase
   */
  passphrase: string;
  /**
   * 트랜잭션에 사용할 gas price (단위: wei) null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.
   * @example: 8000000000
   */
  @ApiPropertyOptional()
  gasPrice: number;
}
