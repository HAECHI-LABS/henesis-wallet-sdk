import { Erc20 } from '../coin';

export class Hib extends Erc20 {
  getName(): string {
    return 'hib';
  }

  isErc20(): boolean {
    return true;
  }

  getAddress(): string {
    return process.env.COIN_HIB_ADDRESS ? process.env.COIN_HIB_ADDRESS : '0xE06b40df899b9717b4E6B50711E1dc72d08184cF';
  }
}
