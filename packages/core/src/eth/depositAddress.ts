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
import {
  EthLikeWallet,
  EthWalletData,
  EthMasterWalletData,
  EthTransaction,
} from "./abstractWallet";
import { convertWalletStatus } from "../wallet";
import BN from "bn.js";
import { Coin } from "./coin";

export const transformDepositAddressData = (
  data: UserWalletDTO
): EthDepositAddressData => {
  return {
    ...data,
    blockchain: transformBlockchainType(data.blockchain),
    status: convertWalletStatus(data.status),
  };
};

export interface EthDepositAddressData
  extends Omit<EthWalletData, "encryptionKey"> {}

export class EthDepositAddress extends EthLikeWallet {
  private readonly depositWalletData: EthDepositAddressData;

  public constructor(
    client: Client,
    data: EthMasterWalletData,
    keychains: Keychains,
    depositWalletData: EthDepositAddressData,
    blockchain: BlockchainType
  ) {
    super(
      client,
      data,
      keychains,
      blockchain,
      `/wallets/${data.id}/user-wallets/${depositWalletData.id}`
    );
    this.depositWalletData = depositWalletData;
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
    return this.depositWalletData.address;
  }

  getData(): EthDepositAddressData {
    return this.depositWalletData;
  }

  getId(): string {
    return this.depositWalletData.id;
  }

  async changeName(name: string): Promise<void> {
    const request: ChangeWalletNameRequest = {
      name,
    };
    const depositWalletData = await this.client.patch<UserWalletDTO>(
      `${this.baseUrl}/name`,
      request
    );
    this.depositWalletData.name = depositWalletData.name;
  }

  transfer(
    coin: string | Coin,
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction> {
    throw new Error("unimplemented method");
  }

  contractCall(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction> {
    throw new Error("unimplemented method");
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
