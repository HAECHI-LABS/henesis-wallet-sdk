import { BalanceDTO } from "./balance.dto";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";

export const EXAMPLE_FILECOIN_MASTER_WALLET_BALANCE_DTO: MasterWalletBalanceDto =
  {
    amount: "1000000000000",
    spendableAmount: "1000000000000",
    aggregatedAmount: "3248100000000",
    name: "Filecoin",
    ticker: "FIL",
    decimals: 18,
  };

export class MasterWalletBalanceDto extends BalanceDTO {
  @ApiModelProperty({
    description:
      "마스터 지갑의 잔액과 하위 입금 주소들의 잔액을 모두 합한 잔액 (= 마스터 지갑 잔액 + 입금 주소 1 잔액 + 입금 주소 2 잔액 + ...) (단위: attoFIL)",
    example: EXAMPLE_FILECOIN_MASTER_WALLET_BALANCE_DTO.aggregatedAmount,
  })
  aggregatedAmount: string;

  static fromBalance(balance: Balance): MasterWalletBalanceDto {
    return {
      ...super.fromBalance(balance),
      aggregatedAmount: balance.aggregatedAmount.toString(10),
    };
  }

  static fromBalances(balances: Balance[]): MasterWalletBalanceDto[] {
    return balances.map(this.fromBalance);
  }
}
