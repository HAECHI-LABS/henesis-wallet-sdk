import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_BITCOIN_BALANCE_DTO: BalanceDTO = {
  coinType: "BTC",
  amount: "0xDBE16A831",
  spendableAmount: "0xDBE16A831",
  name: "비트코인",
  symbol: "BTC",
};

export class BalanceDTO {
  @ApiModelProperty({
    description: "암호화폐 타입",
    example: EXAMPLE_BITCOIN_BALANCE_DTO.coinType,
  })
  coinType?: string;

  @ApiModelProperty({
    description: "총 잔액 (확정된 잔액) (단위: satoshi) (형식: 16진법)",
    example: EXAMPLE_BITCOIN_BALANCE_DTO.amount,
  })
  amount?: string;

  @ApiModelProperty({
    description:
      "출금 가능한 잔액 (= 총 잔액 - 확정되지 않은 출금 요청액) (단위: satoshi) (형식: 16진법)",
    example: EXAMPLE_BITCOIN_BALANCE_DTO.spendableAmount,
  })
  spendableAmount?: string;

  @ApiModelProperty({
    description: "암호화폐 이름",
    example: EXAMPLE_BITCOIN_BALANCE_DTO.name,
  })
  name?: string;

  @ApiModelProperty({
    description: "암호화폐 심볼 (ticker)",
    example: EXAMPLE_BITCOIN_BALANCE_DTO.symbol,
  })
  symbol?: string;

  static fromBalance(balance: Balance): BalanceDTO {
    return {
      coinType: balance.coinType,
      amount: balance.amount ? BNConverter.bnToHexString(balance.amount) : null,
      spendableAmount: balance.spendableAmount
        ? BNConverter.bnToHexString(balance.spendableAmount)
        : null,
      name: balance.name,
      symbol: balance.symbol,
    };
  }
}
