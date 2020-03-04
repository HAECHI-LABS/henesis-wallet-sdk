import { Client } from './sdk';
import { Key } from './key';
import { HalfSignedTransaction } from './coin';

export interface WalletInformation {
  id: string;
  name: string;
  walletType: string;
  address: string;
  blockchain: string;
  createdAt: string;
  backupKey: Key;
  accountKey: Key;
}

export abstract class Wallet {
  private readonly client: Client;

  private readonly baseUrl = '/wallets';

  private readonly walletInformation: WalletInformation;

  protected constructor(client: Client, walletInformation: WalletInformation) {
    this.client = client;
    this.walletInformation = walletInformation;
  }

  abstract getChain(): string;

  abstract verifyAddress(address: string): boolean;

  abstract isValidAddress(address: string): boolean;

  abstract transfer();

  abstract contractCall(
    contractAddress: string,
    value: number,
    data: string,
    passphrase: string
  ): HalfSignedTransaction;

  abstract getSequenceId(): number;

  abstract createUserWallet(): Wallet;
}

export abstract class EthLikeWallet {

}
