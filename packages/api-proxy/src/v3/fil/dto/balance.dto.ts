import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";

export class BalanceDTO {
  amount: string;
  spendableAmount: string;
  name: string;
  ticker: string;
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
