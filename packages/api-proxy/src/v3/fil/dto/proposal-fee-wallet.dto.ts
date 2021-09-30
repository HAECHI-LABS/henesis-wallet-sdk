import { FilProposalFeeWallet } from "@haechi-labs/henesis-wallet-core/lib/fil";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_PROPOSAL_FEE_WALLET_DTO: ProposalFeeWalletDTO = {
  walletId: "c3a43bbf3d33e94fdc1adfc2d17a63b3",
  address: "t1c4mfn5uk3kjhztosotp6eu5yh5ks5z6gja46ipy",
};

export class ProposalFeeWalletDTO {
  @ApiModelProperty({
    description: "해당 요청 수수료 지갑을 사용하는 지갑의 ID",
    example: EXAMPLE_FILECOIN_PROPOSAL_FEE_WALLET_DTO.address,
  })
  walletId: string;

  @ApiModelProperty({
    description: "요청 수수료 지갑의 주소",
    example: EXAMPLE_FILECOIN_PROPOSAL_FEE_WALLET_DTO.address,
  })
  address: string;

  static fromProposalFeeWallet(
    proposalFeeWallet: FilProposalFeeWallet
  ): ProposalFeeWalletDTO {
    return {
      walletId: proposalFeeWallet.id,
      address: proposalFeeWallet.address,
    };
  }
}
