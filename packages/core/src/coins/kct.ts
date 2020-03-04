import { Coin } from '../coin';
import { HalfSignedTransaction } from '../wallet';

export class Kct extends Coin {
  static createInstance() {
    return new Kct();
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
