import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import eth from '../contracts/Eth.json';
import { Coin } from '../coin';

export class Eth extends Coin {
  private eth: Contract;

  constructor() {
    super();
    this.eth = new new Web3().eth.Contract((eth as AbiItem[]));
  }

  getName(): string {
    return 'eth';
  }

  buildData(to: string, amount: number): string {
    return this.eth
      .methods
      .transferEth(
        to,
        amount,
      )
      .encodeABI();
  }
}
