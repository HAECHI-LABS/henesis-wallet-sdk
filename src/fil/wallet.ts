import { FilMasterWalletData, FilWallet } from "./abstractWallet";
import { Client } from "../httpClient";
import { Balance, Key, Keychains, Pagination } from "../types";
import { FilDepositAddress } from "./depositAddress";
import { BNConverter, checkNullAndUndefinedParameter } from "../utils/common";
import {
  BalanceDTO,
  FlushDTO,
  FlushInternalDTO,
  MasterWalletDTO,
  PatchWalletNameRequest,
} from "../__generate__/fil";
import BN from "bn.js";
import { BlockchainType } from "../blockchain";
import { transformWalletStatus } from "../wallet";
import { FilTransfer, FilTransferInternal } from "./transfers";

export const transformMasterWalletData = (
  data: MasterWalletDTO
): FilMasterWalletData => {
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

export class FilMasterWallet extends FilWallet {
  constructor(client: Client, data: FilMasterWalletData, keychains: Keychains) {
    super(client, data, keychains, `/wallets/${data.id}`);
  }

  async changeName(name: string): Promise<void> {
    checkNullAndUndefinedParameter({ name });
    const request: PatchWalletNameRequest = {
      name,
    };
    const masterWalletData = await this.client.patch<MasterWalletDTO>(
      `${this.baseUrl}/name`,
      request
    );
    this.data.name = masterWalletData.name;
  }

  getAccountKey(): Key {
    return this.data.accountKey;
  }

  getAddress(): string {
    return this.data.address;
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

  updateAccountKey(key: Key) {
    this.data.accountKey = key;
  }

  // TODO: implement me
  async createDepositAddress(
    name: string,
    passphrase?: string,
    salt?: BN,
    otpCode?: string
  ): Promise<FilDepositAddress> {
    return new FilDepositAddress(
      this.client,
      this.data,
      this.keychains,
      undefined
    );
  }

  // TODO: implement me
  async getDepositAddresses(): Promise<Pagination<FilDepositAddress[]>> {
    return null;
  }

  // TODO: implement me
  async getDepositAddress(
    depositAddressId: string
  ): Promise<FilDepositAddress> {
    return null;
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
  async flush(
    targets: Array<{ depositAddressId: string; amount: BN }>,
    passphrase: string
  ): Promise<FilFlush> {
    // TODO: build raw tx from each account key, then send those to wallet api
    return null;
  }

  // TODO: implement me
  async getFlushes(): Promise<Pagination<FilFlush>> {
    return null;
  }

  // TODO: implement me
  async getFlush(): Promise<FilFlush> {
    return null;
  }

  // TODO: implement me
  async getInternalFlushes(): Promise<Pagination<FilFlushInternal>> {
    return null;
  }

  // TODO: implement me
  async getInternalFlush(): Promise<FilFlushInternal> {
    return null;
  }
}
