import { Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import { Client } from "../httpClient";
import {
  AccountKeyDTO,
  SimplifiedWalletDTO,
  TransactionDTO,
} from "../__generate__/fil";
import { FilKeychains } from "./keychains";
import BN from "bn.js";
import { Key } from "../types";
import {
  convertMessageToObject,
  convertRawTransactionToMessage,
} from "./utils";
import {
  Message,
  RawTransaction,
  Signature,
  SignedTransaction,
} from "./wallet";
import {
  signedTransactionSerializeRaw,
  transactionSerialize,
  transactionSerializeRaw,
} from "./fil-core-lib/signer";
import { ProtocolIndicator } from "./fil-core-lib/constants";
import { encode, getCID } from "./fil-core-lib/utils";
import { FilTransfer } from "./transfers";

export interface FilTransaction
  extends Omit<
    TransactionDTO,
    | "nonce"
    | "amount"
    | "gasLimit"
    | "gasFeeCap"
    | "gasPremium"
    | "gasUsed"
    | "feeAmount"
  > {
  nonce: BN;
  amount: BN;
  gasLimit?: BN;
  gasFeeCap?: BN;
  gasPremium?: BN;
  gasUsed?: BN;
  feeAmount?: BN;
}

export type FilAccountKey = AccountKeyDTO;

export type FilSimplifiedWallet = SimplifiedWalletDTO;

export interface FilAbstractWalletData extends WalletData {
  blockchain: BlockchainType;
  orgId: string;
  whitelistActivated?: boolean;
  error?: string | null;
}

export interface FilWalletData extends FilAbstractWalletData {
  accountKey: FilAccountKey;
  error?: string | null;
  confirmation?: string | null;
  transaction?: TransactionDTO;
}

export abstract class FilAbstractWallet extends Wallet<FilTransaction> {
  protected data: FilWalletData;
  protected keychains: FilKeychains;

  protected readonly blockchain: BlockchainType;

  protected constructor(
    client: Client,
    data: FilWalletData,
    keychains: FilKeychains,
    baseUrl: string
  ) {
    super(client, keychains, baseUrl);
    this.data = data;
    this.blockchain = BlockchainType.FILECOIN;
  }

  getChain(): BlockchainType {
    return this.data.blockchain;
  }

  abstract async transfer(
    to: string,
    amount: BN,
    passphrase: string
  ): Promise<FilTransfer>;

  protected signRawTransaction(
    rawTransaction: RawTransaction,
    key: Key,
    passphrase: string,
    fromSeed?: boolean
  ): SignedTransaction {
    const message = convertRawTransactionToMessage(rawTransaction);
    const signature = this.createMessageSignature(
      message,
      key,
      passphrase,
      fromSeed
    );
    message.cid = this.calculateCidFromMessage(message);
    const cid = this.calculateCidFromMessageAndSignature(message, signature);
    return {
      cid,
      message,
      signature,
    };
  }

  /*
   * reference
   * - https://github.com/filecoin-shipyard/filecoin.js/blob/master/src/providers/wallet/LightWalletProvider.ts
   * - https://github.com/filecoin-shipyard/filecoin.js/blob/master/src/signers/LightWalletSigner.ts
   * - https://github.com/Zondax/filecoin-signing-tools/blob/master/signer-npm/js/src/index.js
   */
  private createMessageSignature(
    message: Message,
    key: Key,
    passphrase: string,
    fromSeed?: boolean
  ): Signature {
    const msgObject = convertMessageToObject(message);
    const serializedMsg = transactionSerialize(msgObject);
    const signature = this.keychains.sign(
      key,
      passphrase,
      serializedMsg,
      fromSeed
    );
    return {
      data: signature,
      type: ProtocolIndicator.SECP256K1,
    };
  }

  /*
   * reference
   * - https://github.com/multiformats/js-cid
   */
  private calculateCidFromMessage(message: Message): string {
    const messageObject = convertMessageToObject(message);
    return new TextDecoder()
      .decode(encode(getCID(transactionSerializeRaw(messageObject))))
      .toLocaleLowerCase();
  }

  private calculateCidFromMessageAndSignature(
    message: Message,
    signature: Signature
  ): string {
    const messageObject = convertMessageToObject(message);
    return new TextDecoder()
      .decode(
        encode(getCID(signedTransactionSerializeRaw(messageObject, signature)))
      )
      .toLocaleLowerCase();
  }
}
