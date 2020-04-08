import CryptoJS from 'crypto-js';
import fs from 'fs';
import { join } from 'path';
import { Client } from './sdk';
import { MasterWallet, MasterWalletData } from './wallet';
import { Keychains } from './keychains';
import { Blockchain } from './blockchain';
import { Key, KeyWithPriv } from './types';
import { generatePdf } from './keycard';

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
    const henesisKeys = await this.client.get<any>(
      '/organizations/me',
    );
    let henesisKey : Key;
    switch (blockchain) {
      case Blockchain.Ethereum:
        henesisKey = henesisKeys.henesisEthKey;
        break;
      case Blockchain.Klaytn:
        henesisKey = henesisKeys.henesisKlayKey;
    }

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

  private async createRecoveryKit(name: string, blockchain: Blockchain, accountKey: KeyWithPriv, backupKey: KeyWithPriv, henesisKey: string, encryptedPassphrase: string, pdfPath: string) : Promise<string> {
    const path = join(pdfPath, `${name}.pdf`);
    const stream = fs.createWriteStream(path);
    const docs = await generatePdf({
      name, blockchain, accountKey, backupKey, henesisKey, encryptedPassphrase,
    });
    docs.pipe(stream);
    return new Promise(((resolve, reject) => {
      stream.on('finish', () => resolve(path));
      stream.on('error', reject);
    }));
  }

  private removePrivateKey(key: KeyWithPriv): Key {
    return {
      address: key.address,
      pub: key.pub,
      keyFile: key.keyFile,
    };
  }
}
