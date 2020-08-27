import { EthLikeWallet, MasterWalletData } from "../src/wallet";
import { Client } from "../src/sdk";
import { Keychains } from "../src/keychains";
import {Balance, BlockchainType} from "../src/types";

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

  getChain(): BlockchainType {
    return BlockchainType.Ethereum;
  }

  changeName(name: string) {
  }
}
