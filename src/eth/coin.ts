import BN from "bn.js";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import erc20 from "../contracts/ERC20.json";
import eth from "../contracts/Eth.json";
import klay from "../contracts/Klay.json";

export abstract class Coin {
  abstract getName(): string;

  abstract buildData(to: string, amount: BN): string;

  abstract isErc20(): boolean;
}

export class Erc20 extends Coin {
  private readonly erc20: Contract;

  private readonly name: string;

  private readonly address: string;

  constructor(name: string, address: string) {
    super();
    this.erc20 = new new Web3().eth.Contract(erc20 as AbiItem[]);
    this.name = name;
    this.address = address;
  }

  getAddress(): string {
    return this.address;
  }

  getName(): string {
    return this.name;
  }

  buildData(to: string, amount: BN): string {
    return this.erc20.methods
      .transferToken(this.getAddress(), to, amount)
      .encodeABI();
  }

  isErc20(): boolean {
    return true;
  }
}

export class Eth extends Coin {
  private eth: Contract;

  constructor() {
    super();
    this.eth = new new Web3().eth.Contract(eth as AbiItem[]);
  }

  getName(): string {
    return "ethereum";
  }

  buildData(to: string, amount: BN): string {
    return this.eth.methods.transferEth(to, amount).encodeABI();
  }

  isErc20(): boolean {
    return false;
  }
}

export class Klay extends Coin {
  private readonly klay: Contract;

  constructor() {
    super();
    this.klay = new new Web3().eth.Contract(klay as AbiItem[]);
  }

  getName(): string {
    return "klay";
  }

  buildData(to: string, amount: BN): string {
    return this.klay.methods.transferKlay(to, amount).encodeABI();
  }

  isErc20(): boolean {
    return false;
  }
}
