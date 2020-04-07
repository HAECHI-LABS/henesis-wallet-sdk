import { Erc20 } from '../coin';

export class Hib extends Erc20 {
  getName(): string {
    return 'hib';
  }

  isErc20(): boolean {
    return true;
  }

  getAddress(): string {
    return '0xB1CA09Fa5A1f6C7f425421c3c2cc8F8F1F13f4b9';
  }
}
