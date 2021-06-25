import {
  FilAbstractWallet,
  FilAbstractWalletData,
  FilWalletData,
} from "./abstractWallet";
import { Client } from "../httpClient";
import { Balance, Key, PaginationOptions } from "../types";
import {
  BalanceDTO,
  DepositAddressDTO,
  PatchWalletNameRequest,
} from "../__generate__/fil";
import { convertWalletStatus, WalletStatus } from "../wallet";
import { BlockchainType } from "../blockchain";
import { FilKeychains } from "./keychains";
import { convertBalanceDtoToFilBalance } from "./utils";

export interface FilDepositAddressData
  extends Omit<FilAbstractWalletData, "encryptionKey"> {
  childNumber: number;
}

export const convertDepositAddressData = (
  data: DepositAddressDTO
): FilDepositAddressData => {
  return {
    ...data,
    blockchain: BlockchainType.FILECOIN,
    status: convertWalletStatus(WalletStatus.ACTIVE),
  };
};

export interface DepositAddressPaginationOptions extends PaginationOptions {
  name?: string;
  id?: string;
  ids?: string[];
  address?: string;
  status?: WalletStatus;
}

export class FilDepositAddress extends FilAbstractWallet {
  private readonly depositAddressData: FilDepositAddressData;

  constructor(
    client: Client,
    data: FilWalletData,
    keychains: FilKeychains,
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

  getData(): FilDepositAddressData {
    return this.depositAddressData;
  }

  async getBalance(): Promise<Balance[]> {
    const response = await this.client.get<BalanceDTO>(
      `${this.baseUrl}/balance`
    );
    return [convertBalanceDtoToFilBalance(response)];
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
