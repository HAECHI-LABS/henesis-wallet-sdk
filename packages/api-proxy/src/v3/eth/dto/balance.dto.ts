import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETHEREUM_BALANCE_DTO: BalanceDTO = {
  coinId: 11,
  amount: "1000000000000",
  spendableAmount: "1000000000000",
  name: "ethereum",
  ticker: "ETH",
  decimals: 18,
};

export const EXAMPLE_ETHEREUM_MASTER_WALLET_BALANCE_DTO: MasterWalletBalanceDTO =
  {
    coinId: 11,
    amount: "1000000000000",
    spendableAmount: "1000000000000",
    aggregatedAmount: "100000000000000",
    name: "ethereum",
    ticker: "ETH",
    decimals: 18,
  };

export const EXAMPLE_BINANCE_SMART_CHAIN_BALANCE_DTO: BalanceDTO = {
  ...EXAMPLE_ETHEREUM_BALANCE_DTO,
  name: "binance coin",
  ticker: "BNB",
  decimals: 18,
};

export const EXAMPLE_BINANCE_SMART_CHAIN_MASTER_WALLET_BALANCE_DTO: BalanceDTO =
  {
    ...EXAMPLE_ETHEREUM_MASTER_WALLET_BALANCE_DTO,
    name: "binance coin",
    ticker: "BNB",
    decimals: 18,
  };

export class BalanceDTO {
  @ApiModelProperty({
    description: "Henesis에서 부여한 Coin의 ID",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.coinId,
  })
  coinId: number;

  @ApiModelProperty({
    description: "확정된 잔액 (단위: wei, peb)",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.amount,
  })
  amount: string;

  @ApiModelProperty({
    description:
      "출금 가능한 잔액 (= 총 잔액 - 확정되지 않은 출금 요청액)(단위: wei, peb, jager)",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.spendableAmount,
  })
  spendableAmount: string;

  @ApiModelProperty({
    description: "코인 이름",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "코인의 기호",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.ticker,
  })
  ticker: string;

  @ApiModelProperty({
    description: "코인의 소수점 자릿수",
    example: EXAMPLE_ETHEREUM_BALANCE_DTO.decimals,
  })
  decimals: number;

  static fromBalance(balance: Balance): BalanceDTO {
    return {
      coinId: balance.coinId,
      amount: balance.amount.toString(10),
      spendableAmount: balance.spendableAmount.toString(10),
      name: balance.name,
      ticker: balance.symbol,
      decimals: balance.decimals,
    };
  }
}

export class MasterWalletBalanceDTO extends BalanceDTO {
  @ApiModelProperty({
    description:
      "지갑 및 하위의 입금주소 혹은 사용자 지갑의 총 합산 잔액 (단위: wei, peb, jager)",
    example: EXAMPLE_ETHEREUM_MASTER_WALLET_BALANCE_DTO.aggregatedAmount,
  })
  aggregatedAmount: string;

  static fromBalance(balance: Balance): MasterWalletBalanceDTO {
    return {
      coinId: balance.coinId,
      amount: balance.amount.toString(10),
      spendableAmount: balance.spendableAmount.toString(10),
      aggregatedAmount: balance.aggregatedAmount.toString(10),
      name: balance.name,
      ticker: balance.symbol,
      decimals: balance.decimals,
    };
  }
}
