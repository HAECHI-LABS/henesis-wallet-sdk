import { Client } from "../httpClient";
import BN from "bn.js";
import {
  Balance,
  Key,
  Keychains,
  Pagination,
  PaginationOptions,
  Timestamp,
} from "../types";
import {
  address,
  networks,
  script,
  Transaction as BitcoinTransaction,
} from "bitcoinjs-lib";
import { BNConverter } from "../utils/common";
import { Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import {
  CreateDepositAddressDTO,
  DepositAddressDTO,
} from "../__generate__/btc";
import { makeQueryString } from "../utils/url";

export interface BtcTransaction {
  id: string;
  hex: string;
  feeAmount?: string;
  amount: string;
  inputs: BtcTransactionOutput[];
  output: BtcTransactionOutput[];
  createdAt: number;
}

export interface BtcEstimatedFee {
  estimatedFee: string;
}

export interface BtcBalance {
  balance: string;
  spendableBalance: string;
}

export interface BtcRawTransaction {
  inputs: BtcRawTransactionInput[];
  outputs: BtcRawTransactionOutput[];
}

export interface BtcTransactionOutput {
  transactionId: string;
  outputIndex: number;
  address: string;
  scriptPubKey: string;
  amount: string;
  spentTransactionId: string;
  spentInputIndex: number;
}

export interface BtcRawTransactionInput {
  redeemScript: string;
  transactionOutput: BtcTransactionOutput;
}

export interface BtcRawTransactionOutput {
  to: string;
  amount: string;
}

export interface BtcCreateRawTransaction {
  inputs: {
    transactionOutput: BtcTransactionOutput;
    accountSignature: string;
  }[];
  outputs: BtcRawTransactionOutput[];
  otpCode: string;
}

export interface BtcMasterWalletData extends WalletData {
  orgId: string;
  accountKey: Key;
}

export interface CreateMasterWalletResponse {
  id: string;
  name: string;
  orgId: string;
  henesisKey: Key;
  encryptionKey: string;
  createdAt: Timestamp;
}

export interface BtcTransaction {
  id: string;
  hex: string;
  inputs: BtcTransactionOutput[];
  outputs: BtcTransactionOutput[];
}

export type DepositAddress = DepositAddressDTO;

export interface DepositAddressPaginationOptions extends PaginationOptions {
  start?: Timestamp;
  end?: Timestamp;
  name?: string;
  id?: string;
  address?: string;
}

export class BtcMasterWallet extends Wallet<BtcTransaction> {
  private readonly data: BtcMasterWalletData;

  public constructor(
    data: BtcMasterWalletData,
    client: Client,
    keychains: Keychains
  ) {
    super(client, keychains);
    this.data = data;
  }

  public async transfer(
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string
  ): Promise<BtcTransaction> {
    const rawTransaction: BtcRawTransaction = await this.createRawTransaction(
      to,
      amount
    );
    const tx = new BitcoinTransaction();
    rawTransaction.inputs.forEach((input) => {
      tx.addInput(
        new Buffer(
          new Buffer(
            input.transactionOutput.transactionId,
            "hex"
          ).reverse()
        ),
        input.transactionOutput.outputIndex
      );
    });

    rawTransaction.outputs.forEach((output) => {
      tx.addOutput(
        address.toOutputScript(output.to, networks.testnet),
        new BN(output.amount.slice(2), "hex").toNumber()
      );
    });

    const accountSigs = [];
    for (let i = 0; i < rawTransaction.inputs.length; i++) {
      const sigHash: Buffer = tx.hashForSignature(
        i,
        new Buffer(rawTransaction.inputs[i].redeemScript.slice(2), "hex"),
        BitcoinTransaction.SIGHASH_ALL
      );
      const hexHash: string = this.keychains.sign(
        this.data.accountKey,
        passphrase,
        sigHash.toString("hex")
      );
      const accountSig = script.signature
        .encode(Buffer.from(hexHash, "hex"), BitcoinTransaction.SIGHASH_ALL)
        .toString("hex");
      accountSigs.push(accountSig);
    }

    const payload: BtcCreateRawTransaction = {
      inputs: [],
      outputs: [],
      otpCode: otpCode,
    };

    for (let i = 0; i < rawTransaction.inputs.length; i++) {
      payload.inputs.push({
        transactionOutput: rawTransaction.inputs[i].transactionOutput,
        accountSignature: accountSigs[i],
      });
    }

    for (let i = 0; i < rawTransaction.outputs.length; i++) {
      payload.outputs.push(rawTransaction.outputs[i]);
    }

    return await this.client.post<BtcTransaction>(
      `${this.baseUrl}/${this.data.id}/transactions`,
      payload
    );
  }

  private async createRawTransaction(
    to: string,
    amount: BN
  ): Promise<BtcRawTransaction> {
    return await this.client.post<BtcRawTransaction>(
      `${this.baseUrl}/${this.data.id}/raw-transactions`,
      {
        to,
        amount: BNConverter.bnToHexString(amount),
      }
    );
  }

  public async getEstimatedFee(): Promise<BtcEstimatedFee> {
    return await this.client.get<BtcEstimatedFee>(
      `${this.baseUrl}/${this.data.id}/estimated-fee`
    );
  }

  public async getTransactions(): Promise<Pagination<BtcTransaction[]>> {
    return await this.client.get<Pagination<BtcTransaction[]>>(
      `${this.baseUrl}/${this.data.id}/transactions`
    );
  }

  getChain(): BlockchainType {
    return BlockchainType.BitCoin;
  }

  async getBalance(): Promise<Balance[]> {
    const response: BtcBalance = await this.client.get(
      `${this.baseUrl}/${this.data.id}/balance`
    );
    return [
      {
        symbol: "BTC",
        amount: BNConverter.hexStringToBN(response.balance),
        spendableAmount: BNConverter.hexStringToBN(response.spendableBalance),
        coinType: "BTC",
        name: "비트코인",
      },
    ];
  }

  async createDepositAddress(name: string): Promise<DepositAddress> {
    const params: CreateDepositAddressDTO = { name };
    const response: DepositAddressDTO = await this.client.post(
      `${this.baseUrl}/${this.data.id}/deposit-addresses`,
      params
    );
    return response;
  }

  async getDepositAddress(depositAddressId: string): Promise<DepositAddress> {
    const response: DepositAddressDTO = await this.client.get(
      `${this.baseUrl}/${this.data.id}/deposit-addresses/${depositAddressId}`
    );
    return response;
  }

  async getDepositAddresses(
    options?: DepositAddressPaginationOptions
  ): Promise<Pagination<DepositAddress>> {
    const queryString: string = makeQueryString(options);
    return await this.client.get<Pagination<DepositAddressDTO>>(
      `${this.baseUrl}/${this.getId()}/deposit-addresses?${queryString}`
    );
  }

  getAddress(): string {
    return this.data.address;
  }

  getData(): BtcMasterWalletData {
    return this.data;
  }

  getId(): string {
    return this.data.id;
  }

  getEncryptionKey(): string {
    return this.data.encryptionKey;
  }

  getAccountKey(): Key {
    return this.data.accountKey;
  }

  updateAccountKey(key: Key) {
    this.data.accountKey = key;
  }

  async changeName(name: string) {
    const btcWalletData: BtcMasterWalletData = await this.client.patch<
      BtcMasterWalletData
    >(`${this.baseUrl}/${this.data.id}/name`, {
      name,
    });
    this.data.name = btcWalletData.name;
  }
}
