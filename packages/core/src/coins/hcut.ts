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
    return '0xCF3A844202Cf46d70A68aAF9b396d5820D3Aa642';
  }
}
