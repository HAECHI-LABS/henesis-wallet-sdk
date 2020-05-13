import { Client } from "../src/sdk";
import { Balance, Keychains } from "../src/types";
import { EthLikeWallet, MasterWalletData } from "../src/eth/wallet";

export class MockEthLikeWallet extends EthLikeWallet {
  public constructor(
    client: Client,
    walletData: MasterWalletData,
    keychains: Keychains
  ) {
    super(client, walletData, keychains);
  }

  async getBalance(): Promise<Balance[]> {
    return [{} as Balance];
  }

  getAddress(): string {
    return "";
  }

  getId(): string {
    return "id";
  }

  changeName(name: string) {
  }
}
