import aesjs from "aes-js";
import { Base64 } from "js-base64";
import * as BN from "bn.js";
import Web3 from "web3";
import pbkdf2 from "pbkdf2";
import { Env } from "../sdk";
import { Client } from "../httpClient";
import { Key, Keychains, KeyWithPriv } from "../types";
import { BlockchainType } from "../blockchain";
import { RecoveryKit } from "../recoverykit";
import { EthMasterWallet, EthMasterWalletData } from "./wallet";
import { Wallets } from "../wallets";
import { EthKeychains, toChecksum } from "./keychains";
import { keccak256s } from "./eth-core-lib/hash";
import { makeQueryString } from "../utils/url";
import _ from "lodash";
import { BNConverter } from "../utils/common";

export interface MasterWalletSearchOptions {
  name?: string;
  orgId?: string;
}

export class EthWallets extends Wallets<EthMasterWallet, Keychains> {
  private readonly env: Env;

  private readonly blockchain: BlockchainType;

  constructor(
    client: Client,
    keychains: Keychains,
    env: Env,
    blockchain: BlockchainType
  ) {
    super(client, keychains);
    this.env = env;
    this.blockchain = blockchain;
  }

  public async getMasterWallet(id: string): Promise<EthMasterWallet> {
    const walletData = await this.client.get<EthMasterWalletData>(
      `${this.baseUrl}/${id}`
    );

    return new EthMasterWallet(this.client, walletData, this.keychains);
  }

  public async getMasterWallets(
    options?: MasterWalletSearchOptions
  ): Promise<EthMasterWallet[]> {
    const queryString: string = makeQueryString(options);

    const walletDatas = await this.client.get<EthMasterWalletData[]>(
      `${this.baseUrl}${queryString ? `?${queryString}` : ""}`
    );

    return walletDatas.map(
      (x) => new EthMasterWallet(this.client, x, this.keychains)
    );
  }

  public async createRecoveryKit(
    name: string,
    passphrase: string
  ): Promise<RecoveryKit> {
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const henesisKey: Key = await this.client.get<any>("/henesis-keys/me");

    const aes = new aesjs.ModeOfOperation.ctr(encryptionKeyBuffer);
    const encryptedPassphrase = aesjs.utils.hex.fromBytes(
      aes.encrypt(aesjs.utils.utf8.toBytes(passphrase))
    );

    return new RecoveryKit(
      name,
      this.blockchain,
      henesisKey,
      accountKey,
      backupKey,
      Base64.encode(encryptedPassphrase),
      aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
      this.env
    );
  }

  public async createMasterWalletWithKit(
    recoveryKit: RecoveryKit
  ): Promise<EthMasterWallet> {
    const walletData = await this.client.post<EthMasterWalletData>(
      this.baseUrl,
      {
        name: recoveryKit.getName(),
        accountKey: recoveryKit.getAccountKey(),
        backupKey: this.removeKeyFile(recoveryKit.getBackupKey()),
        encryptionKey: recoveryKit.getEncryptionKey(),
      }
    );

    return new EthMasterWallet(this.client, walletData, this.keychains);
  }

  public async createMasterWallet(
    name: string,
    passphrase: string,
    gasPrice?: BN
  ): Promise<EthMasterWallet> {
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const walletData = await this.client.post<EthMasterWalletData>(
      this.baseUrl,
      {
        name,
        blockchain: this.blockchain,
        accountKey: this.removePrivateKey(accountKey),
        backupKey: this.removeKeyFile(this.removePrivateKey(backupKey)),
        encryptionKey: aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
        gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined
      }
    );

    return new EthMasterWallet(this.client, walletData, this.keychains);
  }

  public verifyAddress(address: string): boolean {
    if (!/^(0x|0X)?[0-9a-fA-F]{40}$/i.test(address)) {
      return false;
    }

    const lowerCaseAddress = address.toLowerCase();
    const checksumAddress = toChecksum(lowerCaseAddress);
    const addressHash = keccak256s(lowerCaseAddress.slice(2));
    for (let i = 0; i < 40; i++) {
      if (
        (parseInt(addressHash[i + 2], 16) > 7 &&
          lowerCaseAddress[i + 2].toUpperCase() !== checksumAddress[i + 2]) ||
        (parseInt(addressHash[i + 2], 16) <= 7 &&
          lowerCaseAddress[i + 2].toLowerCase() !== checksumAddress[i + 2])
      ) {
        return false;
      }
    }

    return true;
  }

  private createEncryptionKey(p: string): Buffer {
    const randomHex = Web3.utils.randomHex(32);
    return pbkdf2.pbkdf2Sync(p, randomHex, 1, 256 / 8, "sha512");
  }

  private removePrivateKey(key: KeyWithPriv): Key {
    return {
      address: key.address,
      pub: key.pub,
      keyFile: key.keyFile
    };
  }

  private removeKeyFile(key: KeyWithPriv | Key): KeyWithPriv | Key {
    return _.omit(key, 'keyFile');
  }
}
