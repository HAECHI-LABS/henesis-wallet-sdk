import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import klay from '../contracts/Klay.json';
import { Coin } from '../coin';

export class Klay extends Coin {
  private readonly klay: Contract;

  constructor() {
    super();
    this.klay = new new Web3().eth.Contract((klay as AbiItem[]));
  }

  getName(): string {
    return 'klay';
  }

  buildData(to: string, amount: number): string {
    return this.klay
      .methods
      .transferKlay(
        to,
        amount,
      )
      .encodeABI();
  }
}
