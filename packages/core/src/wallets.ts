import aesjs from 'aes-js';
import pbkdf2 from 'pbkdf2';
import { Base64 } from 'js-base64';
import * as BN from 'bn.js';
import Web3 from 'web3';
import crypto from 'crypto';
import { Client, Env } from './sdk';
import { MasterWallet, MasterWalletData } from './wallet';
import { Keychains, RecoveryKit } from './keychains';
import { BlockchainType } from './blockchain';
import { Key, KeyWithPriv } from './types';
import { BNConverter, toSnakeCase } from './utils';

export interface MasterWalletSearchOptions {
  name?: string;
  orgId?: string;
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
    const queryString: string = options ? Object.keys(options)
      .filter((key) => !!options[key])
      .map((key) => `${toSnakeCase(key)}=${options[key]}`).join('&') : '';

    const walletDatas = await this.client.get<MasterWalletData[]>(
      `${this.baseUrl}${queryString ? `?${queryString}` : ''}`,
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
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
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

    const aes = new aesjs.ModeOfOperation.ctr(encryptionKeyBuffer);
    const encryptedPassphrase = aesjs.utils.hex.fromBytes(
      aes.encrypt(aesjs.utils.utf8.toBytes(passphrase)),
    );

    return new RecoveryKit(
      name,
      blockchain,
      henesisKey,
      accountKey,
      backupKey,
      Base64.encode(encryptedPassphrase),
      aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
      this.env,
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
    gasPrice?: BN,
  ): Promise<MasterWallet> {
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const walletData = await this.client.post<MasterWalletData>(
      this.baseUrl,
      {
        name,
        blockchain,
        accountKey: this.removePrivateKey(accountKey),
        backupKey: this.removePrivateKey(backupKey),
        encryptionKey: aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
        gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      },
    );

    return new MasterWallet(
      this.client,
      walletData,
      this.keychains,
    );
  }

  // generates 256bit key
  private createEncryptionKey(p: string): Buffer {
    const randomHex = Web3.utils.randomHex(32);
    return pbkdf2.pbkdf2Sync(p, randomHex, 1, 256 / 8, 'sha512');
  }

  private removePrivateKey(key: KeyWithPriv): Key {
    return {
      address: key.address,
      pub: key.pub,
      keyFile: key.keyFile,
    };
  }
}
