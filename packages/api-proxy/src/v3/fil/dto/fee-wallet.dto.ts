import { DefaultFeeWalletDTO } from "./default-fee-wallet.dto";
import { ProposalFeeWalletDTO } from "./proposal-fee-wallet.dto";
import { FilFeeWallet } from "@haechi-labs/henesis-wallet-core/lib/fil";

export class FeeWalletDTO {
  defaultFeeWallet: DefaultFeeWalletDTO;
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
