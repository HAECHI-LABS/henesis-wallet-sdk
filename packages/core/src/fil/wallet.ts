import { FilMasterWalletData, FilWallet } from "./abstractWallet";
import { Client } from "../httpClient";
import { Balance, Key, Keychains } from "../types";
import { FilDepositAddress } from "./depositAddress";
import { BNConverter, checkNullAndUndefinedParameter } from "../utils/common";
import {
  BalanceDTO,
  MasterWalletDTO,
  PatchWalletNameRequest,
} from "../__generate__/fil";
import BN from "bn.js";
import { BlockchainType } from "../blockchain";
import { transformWalletStatus } from "../wallet";

export const transformMasterWalletData = (
  data: MasterWalletDTO
): FilMasterWalletData => {
  return {
    ...data,
    blockchain: BlockchainType.FILECOIN,
    status: transformWalletStatus(data.status),
  };
};

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
}
