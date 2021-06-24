import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_BALANCE_DTO: BalanceDTO = {
  amount: "1000000000000",
  spendableAmount: "1000000000000",
  name: "Filecoin",
  ticker: "FIL",
  decimals: 18,
};

export class BalanceDTO {
  @ApiModelProperty({
    description: "확정된 잔액 (단위: attoFIL)",
    example: EXAMPLE_FILECOIN_BALANCE_DTO.amount,
  })
  amount: string;

  @ApiModelProperty({
    description:
      "출금 가능한 잔액 (= 총 잔액 - 확정되지 않은 출금 요청액) (단위: attoFIL)",
    example: EXAMPLE_FILECOIN_BALANCE_DTO.spendableAmount,
  })
  spendableAmount: string;

  @ApiModelProperty({
    description: "코인 이름",
    example: EXAMPLE_FILECOIN_BALANCE_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "코인의 기호",
    example: EXAMPLE_FILECOIN_BALANCE_DTO.ticker,
  })
  ticker: string;

  @ApiModelProperty({
    description: "코인의 소수점 자릿수",
    example: EXAMPLE_FILECOIN_BALANCE_DTO.decimals,
  })
  decimals: number;

  static fromBalance(balance: Balance): BalanceDTO {
    return {
      amount: balance.amount.toString(10),
      spendableAmount: balance.spendableAmount.toString(10),
      name: balance.name,
      ticker: balance.symbol,
      decimals: balance.decimals,
    };
  }

  static fromBalances(balances: Balance[]): BalanceDTO[] {
    return balances.map((balance: Balance): BalanceDTO => {
      return this.fromBalance(balance);
    });
  }
}
