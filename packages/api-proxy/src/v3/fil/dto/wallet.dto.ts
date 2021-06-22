import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";
import { FilWallet } from "@haechi-labs/henesis-wallet-core/lib/fil/wallet";

export class WalletDTO {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  status: WalletStatus;

  static fromFilWallet(wallet: FilWallet): WalletDTO {
    const walletData = wallet.getData();
    return {
      id: walletData.id,
      name: walletData.name,
      address: walletData.address,
      createdAt: walletData.createdAt,
      updatedAt: walletData.updatedAt,
      status: walletData.status,
    } as WalletDTO;
  }
}
