import aesjs from "aes-js";
import { Base64 } from "js-base64";
import * as BN from "bn.js";
import { Env } from "../sdk";
import { Client } from "../httpClient";
import { Key, Keychains, KeyWithPriv } from "../types";
import { BlockchainType } from "../blockchain";
import { RecoveryKit } from "../recoverykit";
import { EthMasterWallet, EthMasterWalletData } from "./wallet";
import { Wallets } from "../wallets";
import { toChecksum } from "./keychains";
import { keccak256s } from "./eth-core-lib/hash";
import { makeQueryString } from "../utils/url";
import { BNConverter } from "../utils/common";
import { HenesisKeys } from "./henesisKeys";

export interface MasterWalletSearchOptions {
  name?: string;
  sort?: string;
}

export class EthWallets extends Wallets<EthMasterWallet> {
  private readonly henesisKey: HenesisKeys;

  private readonly blockchain: BlockchainType;

  constructor(
    client: Client,
    keychains: Keychains,
    env: Env,
    henesisKey: HenesisKeys,
    blockchain: BlockchainType
  ) {
    super(env, client, keychains);
    this.henesisKey = henesisKey;
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
  // todo: henesis-keys
  public async createRecoveryKit(
    name: string,
    passphrase: string
  ): Promise<RecoveryKit> {
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const henesisKey: Key = await this.henesisKey.getHenesisKey();

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
        gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
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
}
