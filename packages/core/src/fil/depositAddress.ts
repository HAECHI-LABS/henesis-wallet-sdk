import {
  FilMasterWalletData,
  FilWallet,
  FilWalletData,
} from "./abstractWallet";
import { Client } from "../httpClient";
import { Balance, Key, Keychains } from "../types";
import {
  BalanceDTO,
  DepositAddressDTO,
  PatchWalletNameRequest,
} from "../__generate__/fil";
import { BNConverter } from "../utils/common";

export interface FilDepositAddressData
  extends Omit<FilWalletData, "encryptionKey"> {}

export class FilDepositAddress extends FilWallet {
  private readonly depositAddressData: FilDepositAddressData;

  constructor(
    client: Client,
    data: FilMasterWalletData,
    keychains: Keychains,
    depositAddressData: FilDepositAddressData
  ) {
    super(
      client,
      data,
      keychains,
      `/wallets/${data.id}/deposit-addresses/${depositAddressData.id}`
    );
    this.depositAddressData = depositAddressData;
  }

  async changeName(name: string): Promise<void> {
    const request: PatchWalletNameRequest = {
      name,
    };
    const response = await this.client.patch<DepositAddressDTO>(
      `${this.baseUrl}/name`,
      request
    );
    this.depositAddressData.name = response.name;
  }

  getAccountKey(): Key {
    throw new Error("unimplemented method");
  }

  getAddress(): string {
    return this.depositAddressData.address;
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
    throw new Error("unimplemented method");
  }

  getId(): string {
    return this.depositAddressData.id;
  }

  updateAccountKey(key: Key) {
    throw new Error("unimplemented method");
  }
}
