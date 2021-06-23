import { BalanceDTO } from "./balance.dto";
import { BalanceWithIdDTO } from "../fee-wallet/dto/balance-with-id.dto";
import { FilFeeWalletBalance } from "@haechi-labs/henesis-wallet-core/lib/fil";

export class FeeWalletBalanceDTO {
  defaultFeeWallet: BalanceDTO;
  proposalFeeWallet: BalanceWithIdDTO[];

  static fromFeeWalletBalance(
    feeWalletBalance: FilFeeWalletBalance
  ): FeeWalletBalanceDTO {
    return {
      defaultFeeWallet: BalanceDTO.fromBalance(
        feeWalletBalance.defaultFeeWallet
      ),
      proposalFeeWallet: feeWalletBalance.proposalFeeWallets.map(
        (feeWalletBalance) => {
          return BalanceWithIdDTO.fromBalanceWithId(feeWalletBalance);
        }
      ),
    };
  }
}
