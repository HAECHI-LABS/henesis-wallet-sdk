import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import BN from 'bn.js';
import Web3 from 'web3';
import erc20 from './contracts/ERC20.json';

export interface MultiSigPayload {
  walletAddress: string;
  toAddress: string;
  value: BN;
  walletNonce: BN;
  hexData: string;
}

export abstract class Coin {
  abstract getName(): string;

  abstract buildData(to: string, amount: BN): string;

  abstract isErc20(): boolean;
}

export abstract class Erc20 extends Coin {
  private erc20: Contract;

  constructor() {
    super();
    this.erc20 = new new Web3().eth.Contract((erc20 as AbiItem[]));
  }

  abstract getAddress(): string;

  abstract getName(): string;

  buildData(to: string, amount: BN): string {
    return this.erc20
      .methods
      .transferToken(
        this.getAddress(),
        to,
        amount,
      )
      .encodeABI();
  }
}
