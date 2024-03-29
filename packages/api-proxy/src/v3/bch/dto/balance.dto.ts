import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_BALANCE_DTO: BalanceDTO = {
  coinType: "BCH",
  amount: "59023730737",
  spendableAmount: "59023730737",
  aggregatedAmount: "59023730737",
  name: "비트코인캐시",
  symbol: "BCH",
};

export class BalanceDTO {
  @ApiModelProperty({
    description: "암호화폐 타입",
    example: EXAMPLE_BALANCE_DTO.coinType,
  })
  coinType: string;

  @ApiModelProperty({
    description: "총 잔액 (확정된 잔액) (단위: satoshi) (형식: 10진법)",
    example: EXAMPLE_BALANCE_DTO.amount,
  })
  amount: string;

  @ApiModelPropertyOptional({
    description:
      "출금 가능한 잔액 (= 총 잔액 - 확정되지 않은 출금 요청액) (단위: satoshi) (형식: 10진법)",
    example: EXAMPLE_BALANCE_DTO.spendableAmount,
  })
  spendableAmount?: string;

  @ApiModelPropertyOptional({
    description:
      "마스터 지갑의 잔액과 하위 입금 주소들의 잔액을 모두 합한 잔액 (= 마스터 지갑 잔액 + 입금 주소 1 잔액 + 입금 주소 2 잔액 + ...) (단위: satoshi) (형식: 10진법)",
    example: EXAMPLE_BALANCE_DTO.aggregatedAmount,
  })
  aggregatedAmount?: string;

  @ApiModelProperty({
    description: "암호화폐 이름",
    example: EXAMPLE_BALANCE_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "암호화폐 심볼 (ticker)",
    example: EXAMPLE_BALANCE_DTO.symbol,
  })
  symbol: string;

  static fromBalance(balance: Balance): BalanceDTO {
    return {
      coinType: balance.coinType,
      amount: balance.amount
        ? BNConverter.bnToDecimalString(balance.amount)
        : null,
      spendableAmount: balance.spendableAmount
        ? BNConverter.bnToDecimalString(balance.spendableAmount)
        : null,
      aggregatedAmount: balance.aggregatedAmount
        ? BNConverter.bnToDecimalString(balance.aggregatedAmount)
        : null,
      name: balance.name,
      symbol: balance.symbol,
    };
  }
}
