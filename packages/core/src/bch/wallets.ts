import { Client } from "../httpClient";
import { BchMasterWallet, transformWalletData } from "./wallet";
import { Wallets, WalletSearchOptions } from "../wallets";
import aesjs from "aes-js";
import { Keychains } from "../types";
import { makeQueryString } from "../utils/url";
import { Env } from "../sdk";
import { BlockchainType } from "../blockchain";
import { Base64 } from "js-base64";
import { BchRecoveryKit } from "./recoveryKit";
import { address as BitcoinAddress, networks } from "bitcoinjs-lib";
import {
  ActivateMasterWalletRequest,
  CreateInactiveMasterWalletRequest,
  CreateInactiveMasterWalletResponse,
  MasterWalletDTO,
} from "../__generate__/btc";
import { checkNullAndUndefinedParameter } from "..";
import { InactiveWallet } from "../wallet";

export class BchWallets extends Wallets<BchMasterWallet> {
  constructor(env: Env, client: Client, keychains: Keychains) {
    super(env, client, keychains);
  }

  async createMasterWallet(
    name: string,
    passphrase: string
  ): Promise<BchMasterWallet> {
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

    return new BchMasterWallet(
      transformWalletData(data),
      this.client,
      this.keychains,
      this.env
    );
  }

  async getWallet(id: string): Promise<BchMasterWallet> {
    const data = await this.client.get<MasterWalletDTO>(
      `${this.baseUrl}/${id}`
    );
    return new BchMasterWallet(
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
    options?: WalletSearchOptions
  ): Promise<BchMasterWallet[]> {
    const queryString: string = makeQueryString(options);
    const walletDatas = await this.client.get<MasterWalletDTO[]>(
      `${this.baseUrl}${queryString ? `?${queryString}` : ""}`
    );
    return walletDatas.map(
      (wallet) =>
        new BchMasterWallet(
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
  ): Promise<BchRecoveryKit> {
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const params: CreateInactiveMasterWalletRequest = {
      name,
      encryptionKey: aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
    };
    const masterWalletResponse =
      await this.client.post<CreateInactiveMasterWalletResponse>(
        `${this.baseUrl}?type=inactive`,
        params
      );
    // eslint-disable-next-line new-cap
    const aes = new aesjs.ModeOfOperation.ctr(encryptionKeyBuffer);
    const encryptedPassphrase = aesjs.utils.hex.fromBytes(
      aes.encrypt(aesjs.utils.utf8.toBytes(passphrase))
    );

    return new BchRecoveryKit(
      name,
      BlockchainType.BITCOIN,
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
    recoveryKit: BchRecoveryKit
  ): Promise<BchMasterWallet> {
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
    const walletId = recoveryKit.getWalletId();
    const wallet = await this.client.post<MasterWalletDTO>(
      `${this.baseUrl}/${walletId}/activate`,
      params
    );
    return new BchMasterWallet(
      transformWalletData(wallet),
      this.client,
      this.keychains,
      this.env
    );
  }

  async createInactiveMasterWallet(name: string): Promise<InactiveWallet> {
    checkNullAndUndefinedParameter({ name });
    const params: CreateInactiveMasterWalletRequest = {
      name,
      encryptionKey: this.createDummyEncryptionKey(),
    };
    const masterWalletResponse =
      await this.client.post<CreateInactiveMasterWalletResponse>(
        `${this.baseUrl}?type=inactive`,
        params
      );

    const { id, name: walletName, status, createdAt } = masterWalletResponse;
    return {
      id,
      name: walletName,
      blockchain: BlockchainType.BITCOIN,
      henesisKey: {
        pub: masterWalletResponse.henesisKey.pub,
        keyFile: undefined,
      },
      status,
      createdAt,
    };
  }
}
