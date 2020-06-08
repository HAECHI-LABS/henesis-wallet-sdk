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
import { BNConverter } from '../utils';
import { WalletData, Wallet } from '../wallet';
import { BlockchainType } from '../blockchain';

export interface BtcTransaction {
  id: string;
  hex: string;
  inputs: BtcTransactionOutput[];
  output: BtcTransactionOutput[];
  createdAt: number;
}

export interface BtcBalance {
  balance: string;
}

export interface BtcRawTransaction {
  inputs: BtcTransactionOutput[];
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
}

export interface BtcMasterWalletData extends WalletData {
  orgId: string;
  accountKey: Key;
  redeemScript: string;
}

export interface BtcTransaction {
  id: string;
  hex: string;
  inputs: BtcTransactionOutput[];
  outputs: BtcTransactionOutput[];
}

export class BtcMasterWallet extends Wallet<BtcTransaction, BtcKeychains> {
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
    const rawTransaction: BtcRawTransaction = await this.createRawTransaction(
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

    const payload: BtcCreateRawTransaction = {
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

    return await this.client.post<BtcTransaction>(
      `${this.baseUrl}/${this.data.id}/transactions`,
      payload,
    );
  }

  private async createRawTransaction(
    to: string,
    amount: BN,
  ): Promise<BtcRawTransaction> {
    return await this.client.post<BtcRawTransaction>(
      `${this.baseUrl}/${this.data.id}/raw-transactions`,
      {
        to,
        amount: BNConverter.bnToHexString(amount),
      },
    );
  }

  public async getTransactions(): Promise<Pagination<BtcTransaction[]>> {
    return await this.client.get<Pagination<BtcTransaction[]>>(
      `${this.baseUrl}/${this.data.id}/transactions`,
    );
  }

  getChain(): BlockchainType {
    return this.data.blockchain;
  }

  async getBalance(): Promise<Balance[]> {
    const response: BtcBalance = await this.client.get(
      `${this.baseUrl}/${this.data.id}/balance`,
    );
    return [
      {
        symbol: 'BTC',
        amount: BNConverter.hexStringToBN(response.balance),
        coinType: 'BTC',
        name: '비트코인',
      },
    ];
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
