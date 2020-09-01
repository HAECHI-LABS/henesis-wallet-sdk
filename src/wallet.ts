import BN from "bn.js";
import { Client } from "./httpClient";
import { BlockchainType, transformBlockchainType } from "./blockchain";
import {
  Balance,
  Key,
  Keychains,
  KeyWithPriv,
  Pagination,
  PaginationOptions,
} from "./types";
import aesjs from "aes-js";
import { Base64 } from "js-base64";
import {
  ActivateAllowedAddressesRequest as BtcActivateAllowedAddressesRequest,
  AllowedAddressDTO as BtcAllowedAddressDTO,
  CreateWithdrawalPolicyRequest as BtcCreateWithdrawalPolicyRequest,
  KeyDTO as BtcKeyDTO,
  MasterWalletDTO as BtcMasterWalletDTO,
  MasterWalletDTOStatusEnum as BtcMasterWalletDTOStatusEnum,
  PaginationAllowedAddressDTO as BtcPaginationAllowedAddressDTO,
  PatchWithdrawalPolicyRequest as BtcPatchWithdrawalPolicyRequest,
  WalletWithdrawalPolicyDTOTypeEnum as BtcWalletWithdrawalPolicyDTOTypeEnum,
  CreateAllowedAddressRequest as BtcCreateAllowedAddressRequest,
  DeleteAllowedAddressRequest as BtcDeleteAllowedAddressRequest,
  InactivateAllowedAddressesRequest as BtcInactivateAllowedAddressesRequest,
  ValidateIsAllowedAddressRequest as BtcValidateIsAllowedAddressRequest,
  ValidateIsAllowedAddressResponse as BtcValidateIsAllowedAddressResponse,
  CreateWithdrawalPolicyRequestTypeEnum as BtcCreateWithdrawalPolicyRequestTypeEnum,
} from "./__generate__/btc/api";
import { BNConverter, checkNullAndUndefinedParameter } from "./utils/common";
import { makeQueryString } from "./utils/url";
import {
  ActivateAllowedAddressesRequest as EthActivateAllowedAddressesRequest,
  KeyDTO as EthKeyDTO,
  MasterWalletDTO as EthMasterWalletDTO,
  MasterWalletDTOStatusEnum as EthMasterWalletDTOStatusEnum,
  PaginationWalletWithdrawalPolicyDTO,
  PatchWithdrawalPolicyRequest as EthPatchWithdrawalPolicyRequest,
  WalletWithdrawalPolicyDTO,
  WalletWithdrawalPolicyDTOTypeEnum as EthWalletWithdrawalPolicyDTOTypeEnum,
  WalletWithdrawalPolicyDTOWalletTypeEnum as EthWalletWithdrawalPolicyDTOWalletTypeEnum,
  AllowedAddressDTO as EthAllowedAddressDTO,
  PaginationAllowedAddressDTO as EthPaginationAllowedAddressDTO,
  CreateAllowedAddressRequest as EthCreateAllowedAddressRequest,
  CreateAllowedAddressRequestWhitelistTypeEnum as EthCreateAllowedAddressRequestWhitelistTypeEnum,
  CreateAllowedAddressRequestAllowedCoinTypeEnum as EthCreateAllowedAddressRequestAllowedCoinTypeEnum,
  DeleteAllowedAddressRequest as EthDeleteAllowedAddressRequest,
  CreateWithdrawalPolicyRequest as EthCreateWithdrawalPolicyRequest,
  InactivateAllowedAddressesRequest as EthInactivateAllowedAddressesRequest,
  ValidateIsAllowedAddressRequest as EthValidateIsAllowedAddressRequest,
  ValidateIsAllowedAddressResponse as EthValidateIsAllowedAddressResponse,
  CreateWithdrawalPolicyRequestTypeEnum as EthCreateWithdrawalPolicyRequestTypeEnum,
  CreateWithdrawalPolicyRequestWalletTypeEnum as EthCreateWithdrawalPolicyRequestWalletTypeEnum,
  TransactionDTOStatusEnum,
  UserWalletDTOStatusEnum,
  MasterWalletDTO,
} from "./__generate__/eth/api";
export type InactivateAllowedAddressesRequest =
  | EthInactivateAllowedAddressesRequest
  | BtcInactivateAllowedAddressesRequest;
export type ActivateAllowedAddressesRequest =
  | EthActivateAllowedAddressesRequest
  | BtcActivateAllowedAddressesRequest;
export type AllowedAddressDTO = EthAllowedAddressDTO | BtcAllowedAddressDTO;
export type AllowedAddress = AllowedAddressDTO;
export type PaginationAllowedAddressDTO =
  | BtcPaginationAllowedAddressDTO
  | EthPaginationAllowedAddressDTO;
export type CreateAllowedAddressRequest =
  | BtcCreateAllowedAddressRequest
  | EthCreateAllowedAddressRequest;
export import WhitelistType = EthCreateAllowedAddressRequestWhitelistTypeEnum;
export import AllowedCoinType = EthCreateAllowedAddressRequestAllowedCoinTypeEnum;
import { BtcMasterWalletData } from "./btc/wallet";
import { EthMasterWalletData } from "./eth/wallet";
export type DeleteAllowedAddressRequest =
  | BtcDeleteAllowedAddressRequest
  | EthDeleteAllowedAddressRequest;
export type ValidateAllowedAddressRequest =
  | BtcValidateIsAllowedAddressRequest
  | EthValidateIsAllowedAddressRequest;
export type ValidateAllowedAddressResponse =
  | BtcValidateIsAllowedAddressResponse
  | EthValidateIsAllowedAddressResponse;
export interface WalletData {
  id: string;
  name: string;
  address: string;
  encryptionKey: string;
  createdAt: string;
  status: WalletStatus;
}

export enum PolicyType {
  DAILY = "DAILY",
  TRANSACTION = "TRANSACTION",
}

export const transformPolicyType = (
  type:
    | BtcWalletWithdrawalPolicyDTOTypeEnum
    | EthWalletWithdrawalPolicyDTOTypeEnum
    | BtcCreateWithdrawalPolicyRequestTypeEnum
    | EthCreateWithdrawalPolicyRequestTypeEnum
) => {
  const byPolicyType: Record<any, PolicyType> = {
    DAILY: PolicyType.DAILY,
    TRANSACTION: PolicyType.TRANSACTION,
  };
  return byPolicyType[type];
};

export enum WalletType {
  MASTERWALLET = "MASTER_WALLET",
  USERWALLET = "USER_WALLET",
}

export const transformWalletType = (
  type:
    | EthWalletWithdrawalPolicyDTOWalletTypeEnum
    | EthCreateWithdrawalPolicyRequestWalletTypeEnum
) => {
  const byWalletType: Record<
    | EthWalletWithdrawalPolicyDTOWalletTypeEnum
    | EthCreateWithdrawalPolicyRequestWalletTypeEnum,
    WalletType
  > = {
    MASTER_WALLET: WalletType.MASTERWALLET,
    USER_WALLET: WalletType.USERWALLET,
  };
  return byWalletType[type];
};

export interface WithdrawalPolicy {
  id: string;
  limitAmount: BN;
  walletType: WalletType;
  type: PolicyType;
  coinSymbol: string;
}

export enum WalletStatus {
  ACTIVE = "ACTIVE",
  CREATING = "CREATING",
  FAILED = "FAILED",
  INACTIVE = "INACTIVE",
}

export const transformWalletStatus = (
  status:
    | EthMasterWalletDTOStatusEnum
    | BtcMasterWalletDTOStatusEnum
    | UserWalletDTOStatusEnum
) => {
  const byWalletStatus: Record<
    | EthMasterWalletDTOStatusEnum
    | BtcMasterWalletDTOStatusEnum
    | UserWalletDTOStatusEnum,
    WalletStatus
  > = {
    ACTIVE: WalletStatus.ACTIVE,
    CREATING: WalletStatus.CREATING,
    FAILED: WalletStatus.FAILED,
    INACTIVE: WalletStatus.INACTIVE,
  };
  return byWalletStatus[status];
};

export interface AllowedAddressesPaginationOptions extends PaginationOptions {
  coinId?: number;
}

export abstract class Wallet<T> {
  protected readonly client: Client;
  protected readonly withdrawalApprovalUrl: string = "/withdrawal-approvals";
  protected readonly baseUrl;
  protected readonly keychains: Keychains;
  protected constructor(client: Client, keychains: Keychains, baseUrl: string) {
    this.client = client;
    this.keychains = keychains;
    this.baseUrl = baseUrl;
  }
  abstract getChain(): BlockchainType;
  abstract getBalance(flag?: boolean): Promise<Balance[]>;
  abstract getAddress(): string;
  abstract getId(): string;
  abstract changeName(name: string);
  abstract getEncryptionKey(): string;
  abstract getAccountKey(): Key;
  abstract updateAccountKey(key: Key);
  protected recoverPassphrase(encryptedPassphrase: string): string {
    try {
      const aesCtr = new aesjs.ModeOfOperation.ctr(
        aesjs.utils.hex.toBytes(this.getEncryptionKey())
      );
      const decryptedBytes = aesCtr.decrypt(
        aesjs.utils.hex.toBytes(Base64.decode(encryptedPassphrase))
      );
      return aesjs.utils.utf8.fromBytes(decryptedBytes);
    } catch (e) {
      throw new Error("failed to recover passphrase");
    }
  }
  async changePassphrase(
    passphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void> {
    checkNullAndUndefinedParameter({
      passphrase,
      newPassphrase,
    });
    return await this.changePassphraseWithKeyFile(
      passphrase,
      newPassphrase,
      undefined,
      otpCode
    );
  }
  private async changePassphraseWithKeyFile(
    passphrase: string,
    newPassphrase: string,
    initialKey?: Key,
    otpCode?: string
  ): Promise<void> {
    const newKey: KeyWithPriv = this.keychains.changePassword(
      initialKey ? initialKey : this.getAccountKey(),
      passphrase,
      newPassphrase
    );
    const key: Key = await this.client.patch<
      BtcKeyDTO | RequireProperty<EthKeyDTO, "pub">
    >(`${this.baseUrl}/account-key`, {
      keyFile: newKey.keyFile,
      pub: newKey.pub,
      otpCode,
    });
    this.updateAccountKey(key);
  }
  async restorePassphrase(
    encryptedPassphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void> {
    const passphrase = this.recoverPassphrase(encryptedPassphrase);
    const initialKey: Key = await this.client.get<
      BtcKeyDTO | RequireProperty<EthKeyDTO, "pub">
    >(`${this.baseUrl}/initial-key`);
    await this.changePassphraseWithKeyFile(
      passphrase,
      newPassphrase,
      initialKey,
      otpCode
    );
  }
  async verifyEncryptedPassphrase(
    encryptedPassphrase: string
  ): Promise<boolean> {
    let passphrase;
    try {
      passphrase = this.recoverPassphrase(encryptedPassphrase);
    } catch (e) {
      return false;
    }
    const initialKey: Key = await this.client.get<
      BtcKeyDTO | RequireProperty<EthKeyDTO, "pub">
    >(`${this.baseUrl}/initial-key`);
    return await this.verifyPassphraseWithKeyFile(passphrase, initialKey);
  }
  async verifyPassphrase(passphrase: string): Promise<boolean> {
    return this.verifyPassphraseWithKeyFile(passphrase);
  }
  protected async verifyPassphraseWithKeyFile(
    passphrase: string,
    initialKey?: Key
  ): Promise<boolean> {
    try {
      this.keychains.decrypt(
        initialKey ? initialKey : this.getAccountKey(),
        passphrase
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  async createWithdrawalPolicy(params: {
    limitAmount: BN;
    walletType: WalletType;
    policyType: PolicyType;
    coinSymbol: string;
    otpCode?: string;
  }): Promise<WithdrawalPolicy> {
    const { limitAmount, walletType, policyType, coinSymbol, otpCode } = params;
    const request:
      | BtcCreateWithdrawalPolicyRequest
      | EthCreateWithdrawalPolicyRequest = {
      limitAmount: BNConverter.bnToHexString(limitAmount),
      walletType: walletType as any,
      type: policyType as any,
      coinSymbol,
      otpCode,
    };
    const data = await this.client.post<
      NoUndefinedField<WalletWithdrawalPolicyDTO>
    >(`${this.baseUrl}/withdrawal-policies`, request);
    return {
      ...data,
      walletType: transformWalletType(data.walletType),
      type: transformPolicyType(data.type),
      limitAmount: BNConverter.hexStringToBN(data.limitAmount),
    };
  }
  async patchWithdrawalPolicy(params: {
    id: string;
    limitAmount: BN;
    otpCode?: string;
  }): Promise<WithdrawalPolicy> {
    const { id, limitAmount, otpCode } = params;
    const request:
      | EthPatchWithdrawalPolicyRequest
      | BtcPatchWithdrawalPolicyRequest = {
      limitAmount: BNConverter.bnToHexString(limitAmount),
      otpCode,
    };
    const data = await this.client.patch<WalletWithdrawalPolicyDTO>(
      `${this.baseUrl}/withdrawal-policies/${id}`,
      request
    );
    return {
      ...data,
      walletType: transformWalletType(data.walletType),
      type: transformPolicyType(data.type),
      limitAmount: BNConverter.hexStringToBN(data.limitAmount),
    };
  }
  async getWithdrawalPolices(
    options: PaginationOptions
  ): Promise<Pagination<WithdrawalPolicy>> {
    const queryString: string = makeQueryString(options);
    const data = await this.client.get<
      NoUndefinedField<PaginationWalletWithdrawalPolicyDTO>
    >(
      `${this.baseUrl}/withdrawal-policies${
        queryString ? `?${queryString}` : ""
      }`
    );
    return {
      pagination: data.pagination,
      results: data.results.map((data) => {
        return {
          ...data,
          walletType: transformWalletType(data.walletType),
          type: transformPolicyType(data.type),
          limitAmount: BNConverter.hexStringToBN(data.limitAmount),
        };
      }),
    };
  }
  async createAllowedAddress(params: {
    address: string;
    whitelistType: WhitelistType;
    allowedCoinType: AllowedCoinType;
    otpCode: string;
    label: string | null;
    coinId: number | null;
  }): Promise<AllowedAddress> {
    const request: CreateAllowedAddressRequest = {
      address: params.address,
      label: params.label,
      coinId: params.coinId,
      whitelistType: params.whitelistType,
      allowedCoinType: params.allowedCoinType,
      otpCode: params.otpCode,
    };
    return await this.client.post<AllowedAddressDTO>(
      `${this.baseUrl}/allowed-addresses`,
      request
    );
  }
  async getAllowedAddresses(
    options?: AllowedAddressesPaginationOptions
  ): Promise<Pagination<AllowedAddress>> {
    const queryString: string = makeQueryString(options);
    return await this.client.get<PaginationAllowedAddressDTO>(
      `${this.baseUrl}/allowed-addresses${queryString ? `?${queryString}` : ""}`
    );
  }
  async getAllowedAddress(id: string): Promise<AllowedAddress> {
    return await this.client.get<AllowedAddressDTO>(
      `${this.baseUrl}/allowed-addresses/${id}`
    );
  }
  async deleteAllowedAddress(id: string, otpCode: string): Promise<void> {
    const request: DeleteAllowedAddressRequest = {
      otpCode,
    };
    await this.client.delete<void>(`${this.baseUrl}/allowed-addresses/${id}`, {
      data: request,
    });
  }
  async activateAllowedAddresses(otpCode: string): Promise<void> {
    const request: ActivateAllowedAddressesRequest = {
      otpCode,
    };
    await this.client.post<void>(
      `${this.baseUrl}/activate-allowed-addresses`,
      request
    );
  }
  async inactivateAllowedAddresses(otpCode: string): Promise<void> {
    const request: InactivateAllowedAddressesRequest = {
      otpCode,
    };
    await this.client.post<void>(
      `${this.baseUrl}/inactivate-allowed-addresses`,
      request
    );
  }

  async validateAllowedAddress(
    address: string,
    coinId?: number
  ): Promise<boolean> {
    const request: ValidateAllowedAddressRequest = {
      address,
      coinId,
    };
    const response: ValidateAllowedAddressResponse = await this.client.post<
      ValidateAllowedAddressResponse
    >(`${this.baseUrl}/allowed-addresses/validate`, request);

    return response.isValid;
  }
}
