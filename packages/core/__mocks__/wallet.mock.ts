import { Client } from '../src/httpClient';
import { Balance, Keychains } from '../src/types';
import { EthLikeWallet, EthMasterWalletData } from '../src/eth/wallet';

export class MockEthLikeWallet extends EthLikeWallet {
  public constructor(
    client: Client,
    walletData: EthMasterWalletData,
    keychains: Keychains,
  ) {
    super(client, walletData, keychains);
  }

  async getBalance(): Promise<Balance[]> {
    return [{} as Balance];
  }

  getAddress(): string {
    return '';
  }

  getId(): string {
    return 'id';
  }

  changeName(name: string) {}
}
