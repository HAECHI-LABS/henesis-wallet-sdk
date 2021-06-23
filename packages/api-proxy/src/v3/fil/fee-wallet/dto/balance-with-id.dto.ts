import { BalanceDTO } from "../../dto/balance.dto";
import { FilBalanceWithId } from "@haechi-labs/henesis-wallet-core/lib/fil";

export class BalanceWithIdDTO extends BalanceDTO {
  id: string;

  static fromBalanceWithId(balance: FilBalanceWithId): BalanceWithIdDTO {
    return {
      id: balance.id,
      amount: balance.amount.toString(10),
      spendableAmount: balance.spendableAmount.toString(10),
      name: balance.name,
      ticker: balance.symbol,
      decimals: balance.decimals,
    };
  }
}
