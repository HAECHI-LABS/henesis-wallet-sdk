import { FilProposalFeeWallet } from "@haechi-labs/henesis-wallet-core/lib/fil";

export class ProposalFeeWalletDTO {
  walletId: string;
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
