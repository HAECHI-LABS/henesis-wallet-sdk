import {Contract} from 'web3-eth-contract';
import erc20 from "./contracts/ERC20.json";
import {AbiItem} from 'web3-utils';
import Web3 from 'web3';

export interface MultiSignaturePayload {
  walletAddress: string;
  toAddress: string;
  value: number;
  walletNonce: number;
  hexData: string;
}

export interface HalfSignedTransaction {
  signature: string;
  payload: MultiSignaturePayload;
}

export interface buildDataOptions {
  to: string;
  amount: number;
}

export abstract class Coin {
  abstract getName(): string;

  abstract buildData(params: buildDataOptions): string;
}

export abstract class Erc20 extends Coin {
  private erc20: Contract;

  constructor() {
    super();
    this.erc20 = new new Web3().eth.Contract((erc20 as AbiItem[]));
  }

  abstract getAddress(): string;

  abstract getName(): string;

  buildData(params: buildDataOptions): string {
    return this.erc20
      .methods
      .transferToken(
        this.getAddress(),
        params.to,
        params.amount
      )
      .encodeABI();
  }
}