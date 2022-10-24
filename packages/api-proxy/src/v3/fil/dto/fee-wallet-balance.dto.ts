import { BalanceDTO, EXAMPLE_FILECOIN_BALANCE_DTO } from "./balance.dto";
import {
  BalanceWithIdDTO,
  EXAMPLE_FILECOIN_BALANCE_WITH_ID_DTO,
} from "../fee-wallet/dto/balance-with-id.dto";
import { FilFeeWalletBalance } from "@haechi-labs/henesis-wallet-core/lib/fil";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_FEE_WALLET_BALANCE_DTO: FeeWalletBalanceDTO = {
  defaultFeeWallet: EXAMPLE_FILECOIN_BALANCE_DTO,
  proposalFeeWallets: [EXAMPLE_FILECOIN_BALANCE_WITH_ID_DTO],
};

export class FeeWalletBalanceDTO {
  @ApiModelProperty({
    description: "기본 수수료 지갑의 잔액",
    example: EXAMPLE_FILECOIN_FEE_WALLET_BALANCE_DTO.defaultFeeWallet,
  })
  defaultFeeWallet: BalanceDTO;

  @ApiModelProperty({
    description: "요청 수수료 지갑들의 잔액",
    example: EXAMPLE_FILECOIN_FEE_WALLET_BALANCE_DTO.proposalFeeWallets,
    isArray: true,
    type: BalanceWithIdDTO,
  })
  proposalFeeWallets: BalanceWithIdDTO[];

  static fromFeeWalletBalance(
    feeWalletBalance: FilFeeWalletBalance
  ): FeeWalletBalanceDTO {
    return {
      defaultFeeWallet: BalanceDTO.fromBalance(
        feeWalletBalance.defaultFeeWallet
      ),
      proposalFeeWallets: feeWalletBalance.proposalFeeWallets.map(
        (feeWalletBalance) => {
          return BalanceWithIdDTO.fromBalanceWithId(feeWalletBalance);
        }
      ),
    };
  }
}
