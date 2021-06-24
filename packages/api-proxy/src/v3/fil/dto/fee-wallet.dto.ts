import {
  DefaultFeeWalletDTO,
  EXAMPLE_FILECOIN_DEFAULT_FEE_WALLET_DTO,
} from "./default-fee-wallet.dto";
import {
  EXAMPLE_FILECOIN_PROPOSAL_FEE_WALLET_DTO,
  ProposalFeeWalletDTO,
} from "./proposal-fee-wallet.dto";
import { FilFeeWallet } from "@haechi-labs/henesis-wallet-core/lib/fil";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_FEE_WALLET_DTO: FeeWalletDTO = {
  defaultFeeWallet: EXAMPLE_FILECOIN_DEFAULT_FEE_WALLET_DTO,
  proposalFeeWallets: [EXAMPLE_FILECOIN_PROPOSAL_FEE_WALLET_DTO],
};

export class FeeWalletDTO {
  @ApiModelProperty({
    description: "기본 수수료 지갑",
    example: EXAMPLE_FILECOIN_FEE_WALLET_DTO.defaultFeeWallet,
  })
  defaultFeeWallet: DefaultFeeWalletDTO;

  @ApiModelProperty({
    description: "요청 수수료 지갑 목록",
    example: EXAMPLE_FILECOIN_FEE_WALLET_DTO.proposalFeeWallets,
  })
  proposalFeeWallets: ProposalFeeWalletDTO[];

  static fromFeeWallet(feeWallet: FilFeeWallet) {
    return {
      defaultFeeWallet: DefaultFeeWalletDTO.fromDefaultFeeWallet(
        feeWallet.defaultFeeWallet
      ),
      proposalFeeWallets: feeWallet.proposalFeeWallets.map(
        ProposalFeeWalletDTO.fromProposalFeeWallet
      ),
    };
  }
}
