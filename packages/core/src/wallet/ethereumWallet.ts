import {Client} from '../sdk';
import {Wallet, WalletInformation} from '../wallet';
import {HalfSignedTransaction} from '../coin';

export class EthereumWallet extends Wallet {
  constructor(client: Client, walletInformation: WalletInformation) {
    super(client, walletInformation);
  }

  static createInstance(client: Client, walletInformation: WalletInformation) {
    return new EthereumWallet(client, walletInformation);
  }

  getChain(): string {
    return '';
  }

  getSequenceId(): number {
    return 0;
  }

  isValidAddress(address: string): boolean {
    return false;
  }

  transfer() {
  }

  verifyAddress(address: string): boolean {
    return false;
  }

  contractCall(contractAddress: string, value: number, data: string, passphrase: string): HalfSignedTransaction {
    return undefined;
  }

  createUserWallet(): Wallet {
    return undefined;
  }
}
