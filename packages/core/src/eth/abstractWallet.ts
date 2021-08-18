import BN from "bn.js";
import { BlockchainType, transformBlockchainType } from "../blockchain";
import { Key, Keychains, Pagination, PaginationOptions } from "../types";
import {
  formatMultiSigPayload,
  MultiSigPayload,
  SignedMultiSigPayload,
} from "./transactions";
import { Client } from "../httpClient";
import BatchRequest from "./batch";
import {
  BNConverter,
  checkNullAndUndefinedParameter,
  HexConverter,
} from "../utils/common";
import { Wallet, WalletData } from "../wallet";
import { Coins } from "./coins";
import {
  BatchTransactionDTO,
  CreateMultiSigTransactionRequest,
  NftBalanceDTO,
  PaginationNftBalanceDTO,
  ReplaceTransactionRequest,
  ResendTransactionRequest,
  SignedMultiSigPayloadDTO,
  TransactionDTO,
} from "../__generate__/eth";
import _ from "lodash";
import { ValidationParameterError } from "../error";
import { Coin } from "./coin";
import { randomBytes } from "crypto";
import EthCrypto from "eth-crypto";
import { Nfts } from "./nfts";
import { makeQueryString } from "../utils/url";
import { Nft } from "./nft";
import {
  EthDepositAddress,
  transformDepositAddressData,
} from "./depositAddress";

export type EthTransaction = Omit<TransactionDTO, "blockchain"> & {
  blockchain: BlockchainType;
};

export interface NftBalancePaginationOptions extends PaginationOptions {
  tokenOnchainId?: string;
  tokenName?: string;
}

export interface EthWalletData extends WalletData {
  blockchain: BlockchainType;
  transactionId?: string | null;
  error?: string | null;
}

export interface EthMasterWalletData extends EthWalletData {
  accountKey: Key;
  encryptionKey: string;
  whitelistActivated: boolean;
}

export function convertSignedMultiSigPayloadToDTO(
  signedMultiSigPayload: SignedMultiSigPayload
): SignedMultiSigPayloadDTO {
  return {
    signature: signedMultiSigPayload.signature,
    multiSigPayload: {
      hexData: signedMultiSigPayload.multiSigPayload.hexData,
      walletNonce: BNConverter.bnToHexString(
        signedMultiSigPayload.multiSigPayload.walletNonce
      ),
      value: BNConverter.bnToHexString(
        signedMultiSigPayload.multiSigPayload.value
      ),
      toAddress: signedMultiSigPayload.multiSigPayload.toAddress,
      walletAddress: signedMultiSigPayload.multiSigPayload.walletAddress,
    },
  };
}

export function getAddressFromCompressedPub(pub: string): string {
  const pubKey = EthCrypto.publicKey.decompress(HexConverter.remove0x(pub));
  return EthCrypto.publicKey.toAddress(pubKey);
}

export type NftBalance = NftBalanceDTO;

export abstract class EthLikeWallet extends Wallet<EthTransaction> {
  protected data: EthMasterWalletData;
  protected readonly DEFAULT_CONTRACT_CALL_GAS_LIMIT: BN = new BN(1000000);
  protected readonly DEFAULT_COIN_TRANSFER_GAS_LIMIT: BN = new BN(150000);
  protected readonly DEFAULT_TOKEN_TRANSFER_GAS_LIMIT: BN = new BN(500000);
  // TODO: Implement me!
  protected readonly DEFAULT_NFT_TRANSFER_GAS_LIMIT: BN = new BN(1);

  protected readonly blockchain: BlockchainType;

  protected readonly coins: Coins;
  protected readonly nfts: Nfts;

  protected constructor(
    client: Client,
    data: EthMasterWalletData,
    keychains: Keychains,
    blockchain: BlockchainType,
    baseUrl: string
  ) {
    super(client, keychains, baseUrl);
    this.data = data;
    this.blockchain = blockchain;
    this.coins = new Coins(this.client);
  }

  getNfts(): Nfts {
    return this.nfts;
  }

  getChain(): BlockchainType {
    return this.blockchain;
  }

  getVersion(): string {
    return this.data.version;
  }

  getVersionNumber(): number {
    return parseInt(this.getVersion().substr(1));
  }

  async replaceTransaction(
    transactionId: string,
    gasPrice?: BN
  ): Promise<EthTransaction> {
    checkNullAndUndefinedParameter({ transactionId });
    const request: ReplaceTransactionRequest = {
      walletId: this.getId(),
      transactionId,
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
    };
    const response = await this.client.post<TransactionDTO>(
      `/wallets/transactions/replace`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  async resendTransaction(
    transactionId: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction> {
    checkNullAndUndefinedParameter({ transactionId });
    const request: ResendTransactionRequest = {
      walletId: this.getId(),
      transactionId,
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
    };
    const response = await this.client.post<NoUndefinedField<TransactionDTO>>(
      `/wallets/transactions/resend`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  async contractCall(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    return this.sendTransaction(
      await this.buildContractCallPayload(
        contractAddress,
        value,
        data,
        passphrase
      ),
      this.getId(),
      otpCode,
      gasPrice,
      gasLimit || this.DEFAULT_CONTRACT_CALL_GAS_LIMIT,
      metadata
    );
  }

  async buildContractCallPayload(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string
  ): Promise<SignedMultiSigPayload> {
    if (_.isEmpty(data)) {
      throw new ValidationParameterError("data is empty");
    }
    checkNullAndUndefinedParameter({
      contractAddress,
      data,
      passphrase,
    });
    const multiSigPayload: MultiSigPayload = {
      hexData: data,
      walletNonce: this.getNonce(),
      value,
      toAddress: contractAddress,
      walletAddress: this.getAddress(),
    };
    return this.signPayload(multiSigPayload, passphrase);
  }

  async transfer(
    coin: string | Coin,
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    const c = typeof coin === "string" ? await this.coins.getCoin(coin) : coin;
    return this.sendTransaction(
      await this.buildTransferPayload(c, to, amount, passphrase),
      this.getId(),
      otpCode,
      gasPrice,
      gasLimit || this.getGasLimitByTicker(c),
      metadata
    );
  }

  async buildTransferPayload(
    coin: string | Coin,
    to: string,
    amount: BN,
    passphrase: string
  ): Promise<SignedMultiSigPayload> {
    checkNullAndUndefinedParameter({
      coin,
      to,
      passphrase,
    });

    const c = typeof coin === "string" ? await this.coins.getCoin(coin) : coin;
    return this.signPayload(
      await c.buildTransferMultiSigPayload(this, to, amount),
      passphrase
    );
  }

  async createRawTransaction(
    coin: string | Coin,
    to: string,
    amount: BN
  ): Promise<MultiSigPayload> {
    checkNullAndUndefinedParameter({ coin, to });
    const c = typeof coin === "string" ? await this.coins.getCoin(coin) : coin;
    return c.buildTransferMultiSigPayload(this, to, amount);
  }

  createBatchRequest(otpCode?: string): BatchRequest {
    return new BatchRequest(
      (
        signedMultiSigPayloads: SignedMultiSigPayload[]
      ): Promise<EthTransaction[]> =>
        this.sendBatchTransaction(
          this.getChain(),
          signedMultiSigPayloads,
          this.getId(),
          otpCode
        )
    );
  }

  async sendTransaction(
    signedMultiSigPayload: SignedMultiSigPayload,
    walletId: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    const request: CreateMultiSigTransactionRequest = {
      walletId,
      signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
        signedMultiSigPayload
      ),
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
      otpCode,
      metadata,
    };
    const response = await this.client.post<TransactionDTO>(
      `/wallets/transactions`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  getNonce(): BN {
    return BNConverter.hexStringToBN("0x" + randomBytes(32).toString("hex"));
  }

  async getNftBalance(
    options: NftBalancePaginationOptions
  ): Promise<Pagination<NftBalance>> {
    const queryString = makeQueryString(options);
    const data = await this.client.get<
      NoUndefinedField<PaginationNftBalanceDTO>
    >(`${this.baseUrl}/nft/balance${queryString ? `?${queryString}` : ""}`);
    return {
      pagination: data.pagination,
      results: data.results.map((data) => data as NftBalance),
    };
  }

  protected signPayload(
    multiSigPayload: MultiSigPayload,
    passphrase: string
  ): SignedMultiSigPayload {
    return {
      signature: this.keychains.sign(
        this.data.accountKey,
        passphrase,
        formatMultiSigPayload(multiSigPayload)
      ),
      multiSigPayload,
    };
  }

  protected async sendBatchTransaction(
    blockchain: BlockchainType,
    signedMultiSigPayloads: SignedMultiSigPayload[],
    walletId: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction[]> {
    const signedMultiSigPayloadDTOs = signedMultiSigPayloads.map(
      (signedMultiSigPayload) =>
        convertSignedMultiSigPayloadToDTO(signedMultiSigPayload)
    );
    const response = await this.client.post<
      NoUndefinedField<BatchTransactionDTO>[]
    >(`/wallets/batch-transactions`, {
      walletId,
      blockchain,
      signedMultiSigPayloads: signedMultiSigPayloadDTOs,
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
      otpCode,
    });
    return _.map(response, (batchTransaction) => {
      const transaction = batchTransaction.transaction;
      return {
        ...transaction,
        blockchain: transformBlockchainType(transaction.blockchain),
      };
    });
  }

  protected getGasLimitByTicker(coin: Coin): BN {
    const ticker = coin.getCoinData().symbol;
    if (ticker.toUpperCase() === "ETH" || ticker.toUpperCase() === "KLAY") {
      return this.DEFAULT_COIN_TRANSFER_GAS_LIMIT;
    }
    return this.DEFAULT_TOKEN_TRANSFER_GAS_LIMIT;
  }

  protected async buildTransferNftPayload(
    nft: Nft,
    tokenOnchainId: string,
    from: EthLikeWallet,
    to: string,
    passphrase: string
  ): Promise<SignedMultiSigPayload> {
    checkNullAndUndefinedParameter({
      nft,
      to,
      passphrase,
    });
    return this.signPayload(
      await nft.buildTransferMultiSigPayload(from, to, tokenOnchainId),
      passphrase
    );
  }

  abstract transferNft(
    nft: number | Nft,
    tokenOnchainId: string,
    to: string,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction>;

  abstract sendNftTransaction(
    signedMultiSigPayload: SignedMultiSigPayload,
    nft: Nft,
    tokenOnchainId: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction>;
}
