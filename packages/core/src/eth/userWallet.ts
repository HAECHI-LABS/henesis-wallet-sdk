import { BlockchainType, transformBlockchainType } from "../blockchain";
import { Balance, Key, Keychains } from "../types";
import { Client } from "../httpClient";
import { BNConverter } from "../utils/common";
import { makeQueryString } from "../utils/url";
import {
  UserWalletDTO,
  BalanceDTO,
  ChangeWalletNameRequest,
  CreateNftMultiSigTransactionRequest,
  TransactionDTO,
} from "../__generate__/eth";
import {
  EthWalletData,
  EthLikeWallet,
  EthMasterWalletData,
  EthTransaction,
  convertSignedMultiSigPayloadToDTO,
} from "./abstractWallet";
import { convertWalletStatus } from "../wallet";
import { Nft } from "./nft";
import BN from "bn.js";
import { SignedMultiSigPayload } from "./transactions";

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

  async transferNft(
    nft: number | Nft,
    tokenOnchainId: string,
    to: string,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    const n = typeof nft === "number" ? await this.nfts.getNft(nft) : nft;
    return this.sendNftTransaction(
      await this.buildTransferNftPayload(
        n,
        tokenOnchainId,
        this,
        to,
        passphrase
      ),
      n,
      tokenOnchainId,
      to,
      otpCode,
      gasPrice,
      gasLimit || this.DEFAULT_NFT_TRANSFER_GAS_LIMIT,
      metadata
    );
  }
  async sendNftTransaction(
    signedMultiSigPayload: SignedMultiSigPayload,
    nft: Nft,
    tokenOnchainId: string,
    to: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    const request: CreateNftMultiSigTransactionRequest = {
      nftId: nft.getId(),
      tokenOnchainId,
      toAddress: to,
      signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
        signedMultiSigPayload
      ),
      gasPrice: BNConverter.bnToHexStringOrElseNull(gasPrice),
      gasLimit: BNConverter.bnToHexStringOrElseNull(gasLimit),
      otpCode,
      metadata,
    };
    const response = await this.client.post<TransactionDTO>(
      `${this.baseUrl}/nft/transactions`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }
}
