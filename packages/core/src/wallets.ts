import CryptoJS from 'crypto-js';
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

  public async getMasterWallets(): Promise<MasterWallet[]> {
    const walletDatas = await this.client.get<MasterWalletData[]>(
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
    const encryptionKey = this.createEncryptionKey(passphrase)
      .toString(CryptoJS.enc.BASE64);
    const encryptedPassphrase = CryptoJS.AES
      .encrypt(passphrase, encryptionKey.toString(CryptoJS.enc.BASE64))
      .toString(CryptoJS.enc.BASE64);
    const walletData = await this.client.post<MasterWalletData>(
      this.baseUrl,
      {
        name,
        blockchain,
        accountKey: this.removePrivateKey(accountKey),
        backupKey: this.removePrivateKey(backupKey),
        encryptionKey,
      },
    );

    this.createRecoveryKit(walletData, accountKey, backupKey, encryptedPassphrase);
    return new MasterWallet(
      this.client,
      walletData,
      this.keychains,
    );
  }

  private createEncryptionKey(p: string) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    // generates 256bit key
    return CryptoJS.PBKDF2(p, salt, { keySize: 256 / 32, iterations: 1000 });
  }

  private createRecoveryKit(
    walletData: MasterWalletData,
    accountKey: KeyWithPriv,
    backupKey: KeyWithPriv,
    encryptedPassphrase: string
  ) {
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
