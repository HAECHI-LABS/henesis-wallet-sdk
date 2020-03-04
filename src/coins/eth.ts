import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import eth from '../contracts/Eth.json';
import { buildDataOptions, Coin } from '../coin';

export class Eth extends Coin {
  private eth: Contract;

  constructor() {
    super();
    this.eth = new new Web3().eth.Contract((eth as AbiItem[]));
  }

  static createInstance() {
    return new Eth();
  }

  getName(): string {
    return 'eth';
  }

  buildData(params: buildDataOptions): string {
    return this.eth
      .methods
      .transferEth(
        params.to,
        params.amount,
      )
      .encodeABI();
  }
}
