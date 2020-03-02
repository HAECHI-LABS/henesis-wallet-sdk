import { Coin } from '../coin';
import { HalfSignedTransaction } from '../wallet';

export class Eth extends Coin {
  static createInstance() {
    return new Eth();
  }

  getAddress(): string {
    throw new Error('Method not implemented.');
  }

  getName(): string {
    throw new Error('Method not implemented.');
  }

  signTransaction(): HalfSignedTransaction {
    throw new Error('Method not implemented.');
  }
}
