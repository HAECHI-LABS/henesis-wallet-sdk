import { Coin } from '../coin';
import { HalfSignedTransaction } from '../wallet';

export class Klay extends Coin {
  static createInstance() {
    return new Klay();
  }

  getName(): string {
    throw new Error('Method not implemented.');
  }

  signTransaction(): HalfSignedTransaction {
    throw new Error('Method not implemented.');
  }

  getAddress(): string {
    throw new Error('Method not implemented.');
  }
}
