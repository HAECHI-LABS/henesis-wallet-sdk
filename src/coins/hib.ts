import { Erc20 } from '../coin';

export class Hib extends Erc20 {
  getAddress(): string {
    return '';
  }

  getName(): string {
    return 'hib';
  }
}
