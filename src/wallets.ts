import { Client } from './sdk';
import { MasterWallet, MasterWalletData } from './wallet';
import { Key, KeyWithPriv, Keychains } from './keychains';
import { Blockchain } from './blockchain';

export class Wallets {
  private readonly client: Client;

  private readonly keychains: Keychains;

  private baseUrl = '/wallets';

  constructor(client: Client, keychains: Keychains) {
    this.client = client;
    this.keychains = keychains;
  }

  public async getMasterWallet(id: string): Promise<MasterWallet> {
    const walletData = await this.client.get<MasterWalletData>(
      `${this.baseUrl}/${id}`,
    );

    return new MasterWallet(
      this.client,
      walletData,
      this.keychains,
    );
  }

  public async getMasterWallets(): Promise<Array<MasterWallet>> {
    const walletDatas = await this.client.get<Array<MasterWalletData>>(
      this.baseUrl,
    );

    return walletDatas.map((x) => new MasterWallet(
      this.client,
      x,
      this.keychains,
    ));
  }

  public async createMasterWallet(
    name: string,
    blockchain: Blockchain,
    passphrase: string,
  ): Promise<MasterWallet> {
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const walletData = await this.client.post<MasterWalletData>(
      this.baseUrl,
      {
        name,
        blockchain,
        accountKey: this.removePrivateKey(accountKey),
        backupKey: this.removePrivateKey(backupKey),
      },
    );

    this.createRecoveryKit(walletData, accountKey, backupKey);

    return new MasterWallet(
      this.client,
      walletData,
      this.keychains,
    );
  }

  private createRecoveryKit(walletData: MasterWalletData, accountKey: KeyWithPriv, backupKey: KeyWithPriv) {
    return true;
  }

  private removePrivateKey(key: KeyWithPriv): Key {
    return {
      address: key.address,
      pub: key.pub,
      keyFile: key.keyFile,
    };
  }
}
