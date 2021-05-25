import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETH_KLAY_BALANCE_DTO: BalanceDTO = {
  coinId: 2,
  coinType: "ETHEREUM",
  amount: "0x6e59a23fd4698039",
  spendableAmount: "0x6e59a23fd4698039",
  name: "Ethereum",
  symbol: "ETH",
  aggregatedAmount: "0x6e59592eb170bcb9",
  decimals: 18,
};

export class BalanceDTO {
  @ApiModelProperty({
    description: "암호화폐 ID",
    example: EXAMPLE_ETH_KLAY_BALANCE_DTO.coinId,
  })
  coinId: number | null;

  @ApiModelProperty({
    description: "암호화폐 타입",
    example: EXAMPLE_ETH_KLAY_BALANCE_DTO.coinType,
  })
  coinType: string;

  @ApiModelProperty({
    description: "확정된 잔액 (단위: wei, peb) (16진법)",
    example: EXAMPLE_ETH_KLAY_BALANCE_DTO.amount,
  })
  amount: string;

  @ApiModelPropertyOptional({
    description:
      "출금 가능한 잔액 (= 총 잔액 - 확정되지 않은 출금 요청액)\n" +
      "(단위: wei, peb) (형식: 16진법)",
    example: EXAMPLE_ETH_KLAY_BALANCE_DTO.spendableAmount,
  })
  spendableAmount?: string;

  @ApiModelProperty({
    description: "암호화폐 이름",
    example: EXAMPLE_ETH_KLAY_BALANCE_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "암호화폐 심볼 (ticker)",
    example: EXAMPLE_ETH_KLAY_BALANCE_DTO.symbol,
  })
  symbol: string;

  @ApiModelPropertyOptional({
    description: "symbol",
    example: EXAMPLE_ETH_KLAY_BALANCE_DTO.aggregatedAmount,
  })
  aggregatedAmount?: string;

  @ApiModelProperty({
    description: "암호화폐의 소수점 자릿수",
    example: EXAMPLE_ETH_KLAY_BALANCE_DTO.decimals,
  })
  decimals: number;

  static fromBalance(balance: Balance): BalanceDTO {
    return {
      coinId: balance.coinId,
      coinType: balance.coinType,
      amount: balance.amount ? BNConverter.bnToHexString(balance.amount) : null,
      spendableAmount: balance.spendableAmount
        ? BNConverter.bnToHexString(balance.spendableAmount)
        : null,
      name: balance.name,
      symbol: balance.symbol,
      aggregatedAmount: balance.aggregatedAmount
        ? BNConverter.bnToHexString(balance.aggregatedAmount)
        : null,
      decimals: balance.decimals,
    };
  }
}
