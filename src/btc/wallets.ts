import { Client } from "../httpClient";
import { BtcMasterWallet, transformWalletData } from "./wallet";
import { Wallets } from "../wallets";
import aesjs from "aes-js";
import { Keychains } from "../types";
import { MasterWalletSearchOptions } from "../eth";
import { makeQueryString } from "../utils/url";
import { Env } from "../sdk";
import { BlockchainType } from "../blockchain";
import { Base64 } from "js-base64";
import { BtcRecoveryKit } from "./recoveryKit";
import { address as BitcoinAddress, networks } from "bitcoinjs-lib";
import {
  MasterWalletDTO,
  CreateInactiveMasterWalletRequest,
  CreateInactiveMasterWalletResponse,
  ActivateMasterWalletRequest,
} from "../__generate__/btc";
import { checkNullAndUndefinedParameter } from "..";

export class BtcWallets extends Wallets<BtcMasterWallet> {
  constructor(env: Env, client: Client, keychains: Keychains) {
    super(env, client, keychains);
  }

  async createMasterWallet(
    name: string,
    passphrase: string
  ): Promise<BtcMasterWallet> {
    const accountKeyWithPriv = this.keychains.create(passphrase);
    const backupKetWithPriv = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const data = await this.client.post<MasterWalletDTO>(this.baseUrl, {
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

    return new BtcMasterWallet(
      transformWalletData(data),
      this.client,
      this.keychains,
      this.env
    );
  }

  async getWallet(id: string): Promise<BtcMasterWallet> {
    const data = await this.client.get<MasterWalletDTO>(
      `${this.baseUrl}/${id}`
    );
    return new BtcMasterWallet(
      transformWalletData(data),
      this.client,
      this.keychains,
      this.env
    );
  }

  verifyAddress(address: string): boolean {
    checkNullAndUndefinedParameter({ address });
    try {
      BitcoinAddress.toOutputScript(
        address,
        this.env === Env.Prod ? networks.bitcoin : networks.testnet
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async getMasterWallets(
    options?: MasterWalletSearchOptions
  ): Promise<BtcMasterWallet[]> {
    const queryString: string = makeQueryString(options);
    const walletDatas = await this.client.get<MasterWalletDTO[]>(
      `${this.baseUrl}${queryString ? `?${queryString}` : ""}`
    );
    return walletDatas.map(
      (wallet) =>
        new BtcMasterWallet(
          transformWalletData(wallet),
          this.client,
          this.keychains,
          this.env
        )
    );
  }

  async createRecoveryKit(
    name: string,
    passphrase: string
  ): Promise<BtcRecoveryKit> {
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const params: CreateInactiveMasterWalletRequest = {
      name,
      encryptionKey: aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
    };
    const masterWalletResponse = await this.client.post<CreateInactiveMasterWalletResponse>(
      `${this.baseUrl}?type=inactive`,
      params
    );
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
    const accountKey = recoveryKit.getAccountKey();
    const backupKey = this.removeKeyFile(recoveryKit.getBackupKey());
    const params: ActivateMasterWalletRequest = {
      accountKey: {
        pub: accountKey.pub,
        keyFile: accountKey.keyFile,
      },
      backupKey: {
        pub: backupKey.pub,
        keyFile: backupKey.keyFile,
      },
    };
    const wallet = await this.client.post<MasterWalletDTO>(
      `${this.baseUrl}/${recoveryKit.getWalletId()}/activate`,
      params
    );
    return new BtcMasterWallet(
      transformWalletData(wallet),
      this.client,
      this.keychains,
      this.env
    );
  }
}
