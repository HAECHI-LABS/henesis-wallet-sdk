import {Client} from '../sdk';
import {Wallet, WalletInformation} from '../wallet';
import {HalfSignedTransaction} from '../coin';

export class KlaytnWallet extends Wallet {
  constructor(
    client: Client,
    walletInformation: WalletInformation
  ) {
    super(client, walletInformation);
  }

  static createInstance(client: Client, walletInformation: WalletInformation) {
    return new KlaytnWallet(client, walletInformation);
  }

  getChain(): string {
    throw new Error('Method not implemented.');
  }

  verifyAddress(address: string): boolean {
    throw new Error('Method not implemented.');
  }

  isValidAddress(address: string): boolean {
    throw new Error('Method not implemented.');
  }

  getSequenceId(): number {
    throw new Error('Method not implemented.');
  }

  transfer() {
  }

  contractCall(contractAddress: string, value: number, data: string, passphrase: string): HalfSignedTransaction {
    return undefined;
  }

  createUserWallet(): Wallet {
    return undefined;
  }
}
