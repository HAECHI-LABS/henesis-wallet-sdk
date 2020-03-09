import { Client } from './sdk';
import {MasterWallet, MasterWalletData} from './wallet';
import {Keychains} from './keychains';

export class Wallets {
  private readonly client: Client;

  private readonly keychains: Keychains;

  private baseUrl = '/wallets';

  constructor(client: Client, keychains: Keychains) {
    this.client = client;
    this.keychains = keychains;
  }

  public async getMasterWallet(id: string): Promise<MasterWallet>{
    const walletData = await this.client.get<MasterWalletData>(
      this.baseUrl + `/${id}`
    );

    return new MasterWallet(
      this.client,
      walletData,
      this.keychains,
    )
  }
}
