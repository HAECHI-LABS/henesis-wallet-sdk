import { Client } from '../httpClient';
import { BtcKeychains } from './keychains';
import BN from 'bn.js';
import { Balance, Key, Pagination } from '../types';
import {
  address,
  Transaction as BitcoinTransaction,
  script,
  networks,
} from 'bitcoinjs-lib';
import { BNConverter, verifyCommonAddress } from '../utils';
import { WalletData, Wallet } from '../wallet';
import { BlockchainType } from "../blockchain";

export interface Transaction {
  id: string;
  hex: string;
  inputs: TransactionOutput[];
  output: TransactionOutput[];
  createdAt: number;
}

export interface RawTransaction {
  inputs: TransactionOutput[];
  outputs: RawTransactionOutput[];
}

export interface TransactionOutput {
  transactionId: string;
  outputIndex: number;
  address: string;
  scriptPubKey: string;
  amount: string;
  spentTransactionId: string;
  spentInputIndex: number;
}

export interface RawTransactionOutput {
  to: string;
  amount: string;
}

export interface CreateRawTransaction {
  inputs: {
    transactionOutput: TransactionOutput;
    accountSignature: string;
  }[];
  outputs: RawTransactionOutput[];
}

export interface BtcMasterWalletData extends WalletData {
  orgId: string;
  accountKey: Key;
  redeemScript: string;
}

export interface Transaction {
  id: string;
  hex: string;
  inputs: TransactionOutput[];
  outputs: TransactionOutput[];
}

export class BtcMasterWallet extends Wallet<Transaction, BtcKeychains> {
  private readonly data: BtcMasterWalletData;

  public constructor(
    data: BtcMasterWalletData,
    client: Client,
    keychains: BtcKeychains,
  ) {
    super(client, keychains);
    this.data = data;
  }

  public async transfer(
    ticker: string,
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string,
  ) {
    const rawTransaction: RawTransaction = await this.createRawTransaction(
      to,
      amount,
    );
    const tx = new BitcoinTransaction();
    rawTransaction.inputs.forEach((input) => {
      tx.addInput(
        new Buffer(new Buffer(input.transactionId.slice(2), 'hex').reverse()),
        input.outputIndex,
      );
    });

    rawTransaction.outputs.forEach((output) => {
      tx.addOutput(
        address.toOutputScript(output.to, networks.testnet),
        new BN(output.amount.slice(2), 'hex').toNumber(),
      );
    });

    const accountSigs = [];
    for (let i = 0; i < rawTransaction.inputs.length; i++) {
      const sigHash: Buffer = tx.hashForSignature(
        i,
        new Buffer(this.data.redeemScript.slice(2), 'hex'),
        BitcoinTransaction.SIGHASH_ALL,
      );
      const hash: Buffer = this.keychains.sign(
        this.data.accountKey,
        passphrase,
        sigHash,
      );
      const accountSig = script.signature
        .encode(hash, BitcoinTransaction.SIGHASH_ALL)
        .toString('hex');
      accountSigs.push(accountSig);
    }

    const payload: CreateRawTransaction = {
      inputs: [],
      outputs: [],
    };

    for (let i = 0; i < rawTransaction.inputs.length; i++) {
      payload.inputs.push({
        transactionOutput: rawTransaction.inputs[i],
        accountSignature: accountSigs[i],
      });
    }

    for (let i = 0; i < rawTransaction.outputs.length; i++) {
      payload.outputs.push(rawTransaction.outputs[i]);
    }

    return await this.client.post<Transaction>(
      `${this.baseUrl}/${this.data.id}/transactions`,
      payload,
    );
  }

  private async createRawTransaction(
    to: string,
    amount: BN,
  ): Promise<RawTransaction> {
    return await this.client.post<RawTransaction>(
      `${this.baseUrl}/${this.data.id}/raw-transactions`,
      {
        to,
        amount: BNConverter.bnToHexString(amount),
      },
    );
  }

  public async getTransactions(): Promise<Pagination<Transaction[]>> {
    return await this.client.get<Pagination<Transaction[]>>(
      `${this.baseUrl}/${this.data.id}/transactions`,
    );
  }

  verifyAddress(address: string): boolean {
    return verifyCommonAddress(address);
  }

  getChain(): BlockchainType {
    return this.data.blockchain;
  }

  replaceTransaction(
    transactionId: string,
    otpCode?: string,
  ): Promise<Transaction> {
    const walletId = this.getId();
    const blockchain = this.getChain();
    return this.client.post<Transaction>(`${this.baseUrl}/transactions`, {
      walletId,
      transactionId,
      blockchain,
      otpCode,
    });
  }

  contractCall(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string,
    otpCode?: string,
  ): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

  async getBalance(): Promise<Balance[]> {
    const balances = await this.client.get(
      `${this.baseUrl}/${this.data.id}/balance`,
    );
    return balances.map((balance) => ({
      symbol: balance.symbol,
      amount: BNConverter.hexStringToBN(balance.amount),
      coinType: balance.coinType,
      name: balance.name,
    }));
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

  async changeName(name: string) {
    const btcWalletData: BtcMasterWalletData = await this.client.patch<
      BtcMasterWalletData
    >(`${this.baseUrl}/${this.data.id}/name`, {
      name,
    });
    this.data.name = btcWalletData.name;
  }
}
