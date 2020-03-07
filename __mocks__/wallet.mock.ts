import { EthLikeWallet, WalletData } from '../src/wallet';
import { Client } from '../src/sdk';
import { Keychains } from '../src/keychains';

export class MockEthLikeWallet extends EthLikeWallet {
  public constructor(
    client: Client,
    walletData: WalletData,
    keychains: Keychains,
  ) {
    super(client, walletData, keychains);
  }
}
