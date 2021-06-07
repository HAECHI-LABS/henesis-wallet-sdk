import {
  FilWalletData,
  FilAbstractWallet,
  FilAccountKey,
} from "./abstractWallet";
import { Client } from "../httpClient";
import { Balance, Pagination } from "../types";
import {
  DepositAddressPaginationOptions,
  FilDepositAddress,
  transformDepositAddressData,
} from "./depositAddress";
import { BNConverter, checkNullAndUndefinedParameter } from "../utils/common";
import {
  BalanceDTO,
  FlushDTO,
  FlushInternalDTO,
  WalletDTO,
  PatchWalletNameRequest,
  PaginationDepositAddressDTO,
  DepositAddressDTO,
} from "../__generate__/fil";
import BN from "bn.js";
import { BlockchainType } from "../blockchain";
import { transformWalletStatus } from "../wallet";
import { FilTransfer, FilTransferInternal } from "./transfers";
import { makeQueryString } from "../utils/url";
import { FilKeychains } from "./keychains";
import { ApproveWithdrawal } from "../withdrawalApprovals";
import { EthTransaction } from "../eth/abstractWallet";

export const transformWalletData = (data: WalletDTO): FilWalletData => {
  return {
    ...data,
    blockchain: BlockchainType.FILECOIN,
    status: transformWalletStatus(data.status),
  };
};

export type FilFlush = FlushDTO;

export interface FilFlushInternal extends Omit<FlushInternalDTO, "transfers"> {
  transfers: FilTransferInternal[];
}

export class FilWallet extends FilAbstractWallet {
  constructor(client: Client, data: FilWalletData, keychains: FilKeychains) {
    super(client, data, keychains, `/wallets/${data.id}`);
  }

  async changeName(name: string): Promise<void> {
    checkNullAndUndefinedParameter({ name });
    const request: PatchWalletNameRequest = {
      name,
    };
    const walletData = await this.client.patch<WalletDTO>(
      `${this.baseUrl}/name`,
      request
    );
    this.data.name = walletData.name;
  }

  getAccountKey(): FilAccountKey {
    return this.data.accountKey;
  }

  getAddress(): string {
    return this.data.address;
  }

  getData(): FilWalletData {
    return this.data;
  }

  async getBalance(): Promise<Balance[]> {
    const response = await this.client.get<BalanceDTO>(
      `${this.baseUrl}/balance`
    );
    return [
      {
        coinId: null,
        symbol: "FIL",
        amount: BNConverter.hexStringToBN(String(response.balance)),
        spendableAmount: BNConverter.hexStringToBN(
          String(response.spendableBalance)
        ),
        coinType: "FIL",
        name: "Filecoin",
        decimals: 18,
      },
    ];
  }

  getEncryptionKey(): string {
    return this.data.encryptionKey;
  }

  getId(): string {
    return this.data.id;
  }

  updateAccountKey(key: FilAccountKey) {
    this.data.accountKey = key;
  }

  async createDepositAddress(
    name: string,
    passphrase?: string,
    otpCode?: string
  ): Promise<FilDepositAddress> {
    const wallet = await this.client.get<WalletDTO>(this.baseUrl);
    const depositAddressKey = this.keychains.derive(
      this.getAccountKey(),
      passphrase,
      wallet.nextChildNumber
    );
    const depositAddressData = await this.client.post(
      `${this.baseUrl}/deposit-addresses`,
      {
        name: name,
        childNumber: wallet.nextChildNumber,
        pub: depositAddressKey.pub,
        otpCode: otpCode,
      }
    );
    return new FilDepositAddress(
      this.client,
      this.data,
      this.keychains,
      depositAddressData
    );
  }

  async getDepositAddresses(
    options?: DepositAddressPaginationOptions
  ): Promise<Pagination<FilDepositAddress>> {
    const queryString = makeQueryString(options);
    const depositAddressDataList = await this.client.get<
      NoUndefinedField<PaginationDepositAddressDTO>
    >(
      `${this.baseUrl}/deposit-addresses${queryString ? `?${queryString}` : ""}`
    );

    return {
      pagination: depositAddressDataList.pagination,
      results: depositAddressDataList.results.map(
        (data) =>
          new FilDepositAddress(
            this.client,
            this.data,
            this.keychains,
            transformDepositAddressData(data)
          )
      ),
    };
  }

  async getDepositAddress(
    depositAddressId: string
  ): Promise<FilDepositAddress> {
    const depositAddressData = await this.client.get<
      NoUndefinedField<DepositAddressDTO>
    >(`${this.baseUrl}/deposit-addresses/${depositAddressId}`);
    return new FilDepositAddress(
      this.client,
      this.data,
      this.keychains,
      transformDepositAddressData(depositAddressData)
    );
  }

  // TODO: implement me
  async transfer(
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string
  ): Promise<FilTransfer> {
    return null;
  }

  // TODO: implememt me
  async flush(targets: Array<string>, passphrase: string): Promise<FilFlush> {
    // TODO: build raw tx from each account key, then send those to wallet api
    return null;
  }

  // TODO: implement me
  async getFlushes(): Promise<Pagination<FilFlush>> {
    throw new Error("this feature is not supported yet");
  }

  // TODO: implement me
  async getFlush(): Promise<FilFlush> {
    throw new Error("this feature is not supported yet");
  }

  // TODO: implement me
  async getInternalFlushes(): Promise<Pagination<FilFlushInternal>> {
    throw new Error("this feature is not supported yet");
  }

  // TODO: implement me
  async getInternalFlush(): Promise<FilFlushInternal> {
    throw new Error("this feature is not supported yet");
  }

  // TODO: implement me
  async retryCreateDepositAddress(
    walletId: string,
    gasPrice?: BN
  ): Promise<FilDepositAddress> {
    throw new Error("unimplemented method");
  }

  // TODO: implement me
  async approve(params: ApproveWithdrawal): Promise<EthTransaction> {
    throw new Error("this feature is not supported yet");
  }

  // TODO: implement me
  async reject(params: { id: string; otpCode: string }): Promise<void> {
    throw new Error("this feature is not supported yet");
  }
}
