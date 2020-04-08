import { Erc20 } from '../coin';

export class Hib extends Erc20 {
  getName(): string {
    return 'hib';
  }

  isErc20(): boolean {
    return true;
  }

  getAddress(): string {
    return '0x0e6984E470BcC67c9C008F921DCb44a7B252f298';
  }
}
