import { FilHenesisKey } from "@haechi-labs/henesis-wallet-core/lib/fil";

export class DefaultFeeWalletDTO {
  address: string;

  static fromDefaultFeeWallet(
    defaultFeeWallet: FilHenesisKey
  ): DefaultFeeWalletDTO {
    return {
      address: defaultFeeWallet.address,
    };
  }
}
