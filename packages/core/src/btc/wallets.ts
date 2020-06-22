import { Client } from "../httpClient";
import {
  BtcMasterWallet,
  BtcMasterWalletData,
  CreateMasterWalletResponse,
} from "./wallet";
import { Wallets } from "../wallets";
import aesjs from "aes-js";
import { Key, Keychains } from "../types";
import { MasterWalletSearchOptions } from "../eth";
import { makeQueryString } from "../utils/url";
import { Env } from "../sdk";
import { BlockchainType } from "../blockchain";
import { Base64 } from "js-base64";
import { BtcRecoveryKit } from "./recoveryKit";
import { address as BitcoinAddress } from "bitcoinjs-lib";

export class BtcWallets extends Wallets<BtcMasterWallet> {
  public constructor(env: Env, client: Client, keychains: Keychains) {
    super(env, client, keychains);
  }

  public async createMasterWallet(
    name: string,
    passphrase: string
  ): Promise<BtcMasterWallet> {
    const accountKeyWithPriv = this.keychains.create(passphrase);
    const backupKetWithPriv = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const data: BtcMasterWalletData = await this.client.post<
      BtcMasterWalletData
    >(this.baseUrl, {
      name,
      encryptionKey: aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
      accountKey: {
        keyFile: accountKeyWithPriv.keyFile,
        pub: accountKeyWithPriv.pub,
      },
      backupKey: {
        pub: backupKetWithPriv.pub,
      },
    });

    return new BtcMasterWallet(data, this.client, this.keychains);
  }

  public async getWallet(id: string) {
    const data: BtcMasterWalletData = await this.client.get<
      BtcMasterWalletData
    >(`${this.baseUrl}/${id}`);
    return new BtcMasterWallet(data, this.client, this.keychains);
  }

  public verifyAddress(address: string): boolean {
    try {
      BitcoinAddress.toOutputScript(address);
      return true;
    } catch (e) {
      return false;
    }
  }

  async getMasterWallets(
    options?: MasterWalletSearchOptions
  ): Promise<BtcMasterWallet[]> {
    const queryString: string = makeQueryString(options);
    const walletDatas = await this.client.get<BtcMasterWalletData[]>(
      `${this.baseUrl}${queryString ? `?${queryString}` : ""}`
    );

    return walletDatas.map(
      (x) => new BtcMasterWallet(x, this.client, this.keychains)
    );
  }

  async createRecoveryKit(
    name: string,
    passphrase: string
  ): Promise<BtcRecoveryKit> {
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const masterWalletResponse: CreateMasterWalletResponse = await this.client.post<
      CreateMasterWalletResponse
    >(`${this.baseUrl}?type=inactive`, {
      name,
      encryptionKey: aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
    });
    const aes = new aesjs.ModeOfOperation.ctr(encryptionKeyBuffer);
    const encryptedPassphrase = aesjs.utils.hex.fromBytes(
      aes.encrypt(aesjs.utils.utf8.toBytes(passphrase))
    );

    return new BtcRecoveryKit(
      name,
      BlockchainType.BitCoin,
      masterWalletResponse.henesisKey,
      accountKey,
      backupKey,
      Base64.encode(encryptedPassphrase),
      aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
      this.env,
      masterWalletResponse.id
    );
  }

  async createMasterWalletWithKit(
    recoveryKit: BtcRecoveryKit
  ): Promise<BtcMasterWallet> {
    const walletData = await this.client.post<BtcMasterWalletData>(
      `${this.baseUrl}/${recoveryKit.getWalletId}/activate`,
      {
        name: recoveryKit.getName(),
        accountKey: recoveryKit.getAccountKey(),
        backupKey: this.removeKeyFile(recoveryKit.getBackupKey()),
        encryptionKey: recoveryKit.getEncryptionKey(),
      }
    );

    return new BtcMasterWallet(walletData, this.client, this.keychains);
  }
}
