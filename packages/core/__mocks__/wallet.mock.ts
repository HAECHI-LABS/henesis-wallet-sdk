import { EthLikeWallet, MasterWalletData } from '../src/wallet';
import { Client } from '../src/sdk';
import { Keychains } from '../src/keychains';

export class MockEthLikeWallet extends EthLikeWallet {
  public constructor(
    client: Client,
    walletData: MasterWalletData,
    keychains: Keychains,
  ) {
    super(client, walletData, keychains);
  }

  async getBalance() {
    return 10;
  }

  async tokenBalance() {
    return 100;
  }
}
