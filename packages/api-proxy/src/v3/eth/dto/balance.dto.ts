import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";
import BN from "bn.js";
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export const EXAMPLE_ETHEREUM_BALANCE_DTO: BalanceDTO = {
  coinId: "11",
  amount: "1000000000000",
  spendableAmount: "1000000000000",
  name: "ethereum",
  ticker: "ETH",
  decimals: 18
}

export class BalanceDTO {
  @ApiModelProperty({
    description: "Henesis에서 부여한 Coin의 ID",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.coinId
  })
  coinId: string;

  @ApiModelProperty({
    description: "확정된 잔액 (단위: wei, peb)",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.amount
  })
  amount: string;

  @ApiModelProperty({
    description: "출금 가능한 잔액 (= 총 잔액 - 확정되지 않은 출금 요청액)(단위: wei, peb)",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.spendableAmount
  })
  spendableAmount: string;

  @ApiModelProperty({
    description: "코인 이름",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.name
  })
  name: string;

  @ApiModelProperty({
    description: "코인의 기호",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.ticker
  })
  ticker: string;

  @ApiModelProperty({
    description: "코인의 소수점 자릿수",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.decimals
  })
  decimals: number;

  static fromBalance(balance: Balance): BalanceDTO {
    return {
      coinId: balance.coinId.toString(),
      amount: balance.amount.toString(10),
      spendableAmount: balance.spendableAmount.toString(10),
      name: balance.name,
      ticker: balance.symbol,
      decimals: balance.decimals,
    };
  }
}
