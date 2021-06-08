import { BlockchainType, transformBlockchainType } from "../blockchain";
import { Balance, Key, Keychains } from "../types";
import { Client } from "../httpClient";
import { BNConverter } from "../utils/common";
import { makeQueryString } from "../utils/url";
import {
  UserWalletDTO,
  BalanceDTO,
  ChangeWalletNameRequest,
} from "../__generate__/eth";
import _ from "lodash";
import {
  EthWalletData,
  EthLikeWallet,
  EthMasterWalletData,
} from "./abstractWallet";
import { convertWalletStatus } from "../wallet";

export const transformUserWalletData = (
  data: UserWalletDTO
): EthUserWalletData => {
  return {
    ...data,
    blockchain: transformBlockchainType(data.blockchain),
    status: convertWalletStatus(data.status),
  };
};

export interface EthUserWalletData
  extends Omit<EthWalletData, "encryptionKey"> {}

export class EthUserWallet extends EthLikeWallet {
  private readonly userWalletData: EthUserWalletData;

  public constructor(
    client: Client,
    data: EthMasterWalletData,
    keychains: Keychains,
    userWalletData: EthUserWalletData,
    blockchain: BlockchainType
  ) {
    super(
      client,
      data,
      keychains,
      blockchain,
      `/wallets/${data.id}/user-wallets/${userWalletData.id}`
    );
    this.userWalletData = userWalletData;
  }

  async getBalance(flag?: boolean, symbol?: string): Promise<Balance[]> {
    const queryString: string = makeQueryString({ flag, symbol });
    const balances = await this.client.get<BalanceDTO[]>(
      `${this.baseUrl}/balance${queryString ? `?${queryString}` : ""}`
    );

    return balances.map((balance) => ({
      coinId: balance.coinId,
      symbol: balance.symbol,
      amount: BNConverter.hexStringToBN(String(balance.amount ?? "0x0")),
      coinType: balance.coinType as any,
      spendableAmount: BNConverter.hexStringToBN(
        String(balance.spendableAmount ?? "0x0")
      ),
      name: balance.name,
      decimals: balance.decimals,
    }));
  }

  getAddress(): string {
    return this.userWalletData.address;
  }

  getData(): EthUserWalletData {
    return this.userWalletData;
  }

  getId(): string {
    return this.userWalletData.id;
  }

  async changeName(name: string): Promise<void> {
    const request: ChangeWalletNameRequest = {
      name,
    };
    const userWalletData = await this.client.patch<UserWalletDTO>(
      `${this.baseUrl}/name`,
      request
    );
    this.userWalletData.name = userWalletData.name;
  }

  changePassphrase(
    passphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void> {
    throw new Error("unimplemented method");
  }

  restorePassphrase(
    encryptedPassphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void> {
    throw new Error("unimplemented method");
  }

  verifyEncryptedPassphrase(encryptedPassphrase: string): Promise<boolean> {
    throw new Error("unimplemented method");
  }

  verifyPassphrase(passphrase: string): Promise<boolean> {
    throw new Error("unimplemented method");
  }

  getEncryptionKey() {
    return null;
  }

  getAccountKey(): Key {
    throw new Error("unimplemented method");
  }

  updateAccountKey(key: Key) {
    throw new Error("unimplemented method");
  }
}
