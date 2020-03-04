import {buildDataOptions, Coin} from '../coin';
import klay from '../contracts/Klay.json';
import {Contract} from 'web3-eth-contract';
import {AbiItem} from 'web3-utils';
import Web3 from 'web3';

export class Klay extends Coin {
  private readonly klay: Contract;

  constructor() {
    super();
    this.klay = new new Web3().eth.Contract((klay as AbiItem[]));
  }

  static createInstance() {
    return new Klay();
  }

  getName(): string {
    return 'klay';
  }

  buildData(params: buildDataOptions): string {
    return this.klay
      .methods
      .transferKlay(
        params.to,
        params.amount
      )
      .encodeABI();
  }
}