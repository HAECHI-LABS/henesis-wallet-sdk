import { Coin } from '../coin';
import { HalfSignedTransaction } from '../wallet';

export class Omg extends Coin {
  static createInstance() {
    return new Omg();
  }

  getAddress(): string {
    return '';
  }

  getName(): string {
    return '';
  }

  signTransaction(): HalfSignedTransaction {
    return undefined;
  }
}
