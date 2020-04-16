import { Erc20 } from '../coin';

export class Hcut extends Erc20 {
  getName(): string {
    return 'hcut';
  }

  isErc20(): boolean {
    return true;
  }

  getAddress(): string {
    // TODO: check mainnet address
    return '0xd31a9d28d66a1f7e62b5565416ea14607690f788';
  }
}
