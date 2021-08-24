import { Client } from "../httpClient";
import { LtcMasterWallet, transformWalletData } from "./wallet";
import { Wallets, WalletSearchOptions } from "../wallets";
import aesjs from "aes-js";
import { Keychains } from "../types";
import { makeQueryString } from "../utils/url";
import { Env } from "../sdk";
import { BlockchainType } from "../blockchain";
import { Base64 } from "js-base64";
import { LtcRecoveryKit } from "./recoveryKit";
import { address as BitcoinAddress } from "bitcoinjs-lib";
import {
  ActivateMasterWalletRequest,
  CreateInactiveMasterWalletRequest,
  CreateInactiveMasterWalletResponse,
  MasterWalletDTO,
} from "../__generate__/ltc";
import { checkNullAndUndefinedParameter } from "..";
import { InactiveWallet } from "../wallet";
import { litecoinMainnet, litecoinTestnet } from "./network";
import { convertToNewAddress, isLegacyAddress } from "./utils";

export class LtcWallets extends Wallets<LtcMasterWallet> {
  constructor(env: Env, client: Client, keychains: Keychains) {
    super(env, client, keychains);
  }

  async createMasterWallet(
    name: string,
    passphrase: string
  ): Promise<LtcMasterWallet> {
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

    return new LtcMasterWallet(
      transformWalletData(data),
      this.client,
      this.keychains,
      this.env
    );
  }

  async getWallet(id: string): Promise<LtcMasterWallet> {
    const data = await this.client.get<MasterWalletDTO>(
      `${this.baseUrl}/${id}`
    );
    return new LtcMasterWallet(
      transformWalletData(data),
      this.client,
      this.keychains,
      this.env
    );
  }

  verifyAddress(address: string): boolean {
    checkNullAndUndefinedParameter({ address });
    try {
      let addressToTest = address;
      if (isLegacyAddress(address)) {
        addressToTest = convertToNewAddress(address);
      }
      BitcoinAddress.toOutputScript(
        addressToTest,
        this.env === Env.Prod ? litecoinMainnet : litecoinTestnet
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async getMasterWallets(
    options?: WalletSearchOptions
  ): Promise<LtcMasterWallet[]> {
    const queryString: string = makeQueryString(options);
    const walletDatas = await this.client.get<MasterWalletDTO[]>(
      `${this.baseUrl}${queryString ? `?${queryString}` : ""}`
    );
    return walletDatas.map(
      (wallet) =>
        new LtcMasterWallet(
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
  ): Promise<LtcRecoveryKit> {
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

    return new LtcRecoveryKit(
      name,
      BlockchainType.LITECOIN,
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
    recoveryKit: LtcRecoveryKit
  ): Promise<LtcMasterWallet> {
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
    return new LtcMasterWallet(
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
      blockchain: BlockchainType.LITECOIN,
      henesisKey: {
        pub: masterWalletResponse.henesisKey.pub,
        keyFile: undefined,
      },
      status,
      createdAt,
    };
  }
}
