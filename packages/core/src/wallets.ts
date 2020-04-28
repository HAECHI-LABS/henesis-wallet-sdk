import CryptoJS from 'crypto-js';
import { Client, Env } from "./sdk";
import { MasterWallet, MasterWalletData } from './wallet';
import { Keychains, RecoveryKit } from './keychains';
import { BlockchainType } from './blockchain';
import { Key, KeyWithPriv } from './types';
import { ObjectConverter } from './utils';

export interface MasterWalletSearchOptions {
  name?: string;
}

export class Wallets {
  private readonly client: Client;

  private readonly keychains: Keychains;

  private readonly env: Env;

  private baseUrl = '/wallets';

  constructor(client: Client, keychains: Keychains, env: Env) {
    this.client = client;
    this.keychains = keychains;
    this.env = env;
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

  public async getMasterWallets(options?: MasterWalletSearchOptions): Promise<MasterWallet[]> {
    const queryString: string = options ? Object.keys(ObjectConverter.toSnakeCase(options))
      .filter((key) => !!options[key])
      .map((key) => `${key}=${ObjectConverter.toSnakeCase(options)[key]}`).join('&') : '';

    const walletDatas = await this.client.get<MasterWalletData[]>(
      `${this.baseUrl}?${queryString}`,
    );

    return walletDatas.map((x) => new MasterWallet(
      this.client,
      x,
      this.keychains,
    ));
  }

  public async createRecoveryKit(
    name: string,
    blockchain: BlockchainType,
    passphrase: string,
  ): Promise<RecoveryKit> {
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKey = this.createEncryptionKey(passphrase)
      .toString(CryptoJS.enc.BASE64);
    const henesisKeys = await this.client.get<any>(
      '/organizations/me',
    );
    let henesisKey : Key;
    switch (blockchain) {
      case BlockchainType.Ethereum:
        henesisKey = henesisKeys.henesisEthKey;
        break;
      case BlockchainType.Klaytn:
        henesisKey = henesisKeys.henesisKlayKey;
    }
    const encryptedPassphrase = CryptoJS.AES
      .encrypt(passphrase, encryptionKey)
      .toString(CryptoJS.enc.BASE64);
    return new RecoveryKit(
      name,
      blockchain,
      henesisKey,
      accountKey,
      backupKey,
      encryptedPassphrase,
      encryptionKey,
      this.env
    );
  }

  public async createMasterWalletWithKit(
    recoveryKit: RecoveryKit,
  ): Promise<MasterWallet> {
    const walletData = await this.client.post<MasterWalletData>(
      this.baseUrl,
      {
        name: recoveryKit.getName(),
        blockchain: recoveryKit.getBlockchain(),
        accountKey: recoveryKit.getAccountKey(),
        backupKey: recoveryKit.getBackupKey(),
        encryptionKey: recoveryKit.getEncryptionKey(),
      },
    );

    return new MasterWallet(
      this.client,
      walletData,
      this.keychains,
    );
  }

  public async createMasterWallet(
    name: string,
    blockchain: BlockchainType,
    passphrase: string,
  ): Promise<MasterWallet> {
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKey = this.createEncryptionKey(passphrase)
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

  private removePrivateKey(key: KeyWithPriv): Key {
    return {
      address: key.address,
      pub: key.pub,
      keyFile: key.keyFile,
    };
  }
}
