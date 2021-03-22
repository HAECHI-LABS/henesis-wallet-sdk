import BN from "bn.js";
import { Client } from "./httpClient";
import { BlockchainType } from "./blockchain";
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
  PaginationAllowedAddressDTO as BtcPaginationAllowedAddressDTO,
  PatchWithdrawalPolicyRequest as BtcPatchWithdrawalPolicyRequest,
  CreateAllowedAddressRequest as BtcCreateAllowedAddressRequest,
  DeleteAllowedAddressRequest as BtcDeleteAllowedAddressRequest,
  InactivateAllowedAddressesRequest as BtcInactivateAllowedAddressesRequest,
  ValidateIsAllowedAddressRequest as BtcValidateIsAllowedAddressRequest,
  ValidateIsAllowedAddressResponse as BtcValidateIsAllowedAddressResponse,
  WalletStatus as BtcWalletStatus,
  WithdrawalPolicyType as BtcWithdrawalPolicyType,
} from "./__generate__/btc/api";
import { BNConverter, checkNullAndUndefinedParameter } from "./utils/common";
import { makeQueryString } from "./utils/url";
import {
  ActivateAllowedAddressesRequest as EthActivateAllowedAddressesRequest,
  KeyDTO as EthKeyDTO,
  PaginationWalletWithdrawalPolicyDTO,
  PatchWithdrawalPolicyRequest as EthPatchWithdrawalPolicyRequest,
  WalletWithdrawalPolicyDTO,
  AllowedAddressDTO as EthAllowedAddressDTO,
  PaginationAllowedAddressDTO as EthPaginationAllowedAddressDTO,
  CreateAllowedAddressRequest as EthCreateAllowedAddressRequest,
  DeleteAllowedAddressRequest as EthDeleteAllowedAddressRequest,
  CreateWithdrawalPolicyRequest as EthCreateWithdrawalPolicyRequest,
  InactivateAllowedAddressesRequest as EthInactivateAllowedAddressesRequest,
  ValidateIsAllowedAddressRequest as EthValidateIsAllowedAddressRequest,
  ValidateIsAllowedAddressResponse as EthValidateIsAllowedAddressResponse,
  AllowedCoinType as EthAllowedCoinType,
  WalletType as EthWalletType,
  WalletStatus as EthWalletStatus,
  WhitelistType as EthWhitelistType,
  WithdrawalPolicyType as EthWithdrawalPolicyType,
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
export import WhitelistType = EthWhitelistType;
export import AllowedCoinType = EthAllowedCoinType;
export type DeleteAllowedAddressRequest =
  | BtcDeleteAllowedAddressRequest
  | EthDeleteAllowedAddressRequest;
export type ValidateAllowedAddressRequest =
  | BtcValidateIsAllowedAddressRequest
  | EthValidateIsAllowedAddressRequest;
export type ValidateAllowedAddressResponse =
  | BtcValidateIsAllowedAddressResponse
  | EthValidateIsAllowedAddressResponse;
export type WalletData = {
  id: string;
  name: string;
  address: string;
  encryptionKey: string;
  createdAt: string;
  updatedAt: string;
  status: WalletStatus;
}

export enum PolicyType {
  DAILY = "DAILY",
  TRANSACTION = "TRANSACTION",
}

export const transformPolicyType = (
  type: BtcWithdrawalPolicyType | EthWithdrawalPolicyType
) => {
  const byPolicyType: Record<
    BtcWithdrawalPolicyType | EthWithdrawalPolicyType,
    PolicyType
  > = {
    DAILY: PolicyType.DAILY,
    TRANSACTION: PolicyType.TRANSACTION,
  };
  return byPolicyType[type];
};

export import WalletType = EthWalletType;

export type WithdrawalPolicy = {
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

export class InactiveMasterWallet {
  id: string;
  name: string;
  blockchain: BlockchainType;
  henesisKey: Key;
  status: WalletStatus;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: string,
    name: string,
    blockchain: BlockchainType,
    henesisKey: Key,
    status: WalletStatus,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.name = name;
    this.blockchain = blockchain;
    this.henesisKey = henesisKey;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

// master wallet life cycle: (INACTIVE ->) CREATING -> ACTIVE
// When activating master wallet, its status is changed to CREATING status.
export class ActivatingMasterWallet {
  id: string;
  name: string;
  blockchain: BlockchainType;
  address: string;
  status: WalletStatus;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: string,
    name: string,
    blockchain: BlockchainType,
    address: string,
    status: WalletStatus,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.name = name;
    this.blockchain = blockchain;
    this.address = address;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const transformWalletStatus = (
  status: BtcWalletStatus | EthWalletStatus
) => {
  const byWalletStatus: Record<
    BtcWalletStatus | EthWalletStatus,
    WalletStatus
  > = {
    ACTIVE: WalletStatus.ACTIVE,
    CREATING: WalletStatus.CREATING,
    FAILED: WalletStatus.FAILED,
    INACTIVE: WalletStatus.INACTIVE,
  };
  return byWalletStatus[status];
};

export type AllowedAddressesPaginationOptions = PaginationOptions & {
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
  abstract getBalance(flag?: boolean, symbol?: string): Promise<Balance[]>;
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
      walletType: walletType,
      type: policyType as any,
      coinSymbol,
      otpCode,
    };
    const data = await this.client.post<
      NoUndefinedField<WalletWithdrawalPolicyDTO>
    >(`${this.baseUrl}/withdrawal-policies`, request);
    return {
      ...data,
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
    const response: ValidateAllowedAddressResponse = await this.client.post<ValidateAllowedAddressResponse>(
      `${this.baseUrl}/allowed-addresses/validate`,
      request
    );

    return response.isValid;
  }
}
