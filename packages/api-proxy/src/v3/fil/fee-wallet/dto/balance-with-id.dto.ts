import { BalanceDTO } from "../../dto/balance.dto";
import { FilBalanceWithId } from "@haechi-labs/henesis-wallet-core/lib/fil";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_BALANCE_WITH_ID_DTO: BalanceWithIdDTO = {
  walletId: "49e129bd5e1e67eddc5e317ed2e42b4c",
  amount: "1000000000000",
  spendableAmount: "1000000000000",
  name: "Filecoin",
  ticker: "FIL",
  decimals: 18,
};

export class BalanceWithIdDTO extends BalanceDTO {
  @ApiModelProperty({
    description: "지갑 ID",
    example: EXAMPLE_FILECOIN_BALANCE_WITH_ID_DTO.walletId,
  })
  walletId: string;

  static fromBalanceWithId(balance: FilBalanceWithId): BalanceWithIdDTO {
    return {
      walletId: balance.id,
      amount: balance.amount.toString(10),
      spendableAmount: balance.spendableAmount.toString(10),
      name: balance.name,
      ticker: balance.symbol,
      decimals: balance.decimals,
    };
  }
}
