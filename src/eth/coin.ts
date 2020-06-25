import BN from "bn.js";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import erc20 from "../contracts/ERC20.json";
import eth from "../contracts/Eth.json";
import klay from "../contracts/Klay.json";
import { BlockchainType } from "../blockchain";

export interface CoinDTO {
  id: number;
  name: string;
  symbol: string;
  address: string | null;
  desc: string;
  blockchain: BlockchainType;
}

export abstract class Coin {
  protected coinData: CoinDTO;

  protected constructor(coinData: CoinDTO) {
    this.coinData = coinData;
  }

  public getCoinData(): CoinDTO {
    return this.coinData;
  }

  abstract getName(): string;

  abstract buildTransferData(to: string, amount: BN): string;

  abstract buildFlushData(
    targetAddresses: string[],
    tokenAddress?: string
  ): string;

  abstract isErc20(): boolean;
}

export class Erc20 extends Coin {
  private readonly erc20: Contract;

  constructor(coinData: CoinDTO) {
    super(coinData);
    this.erc20 = new new Web3().eth.Contract(erc20 as AbiItem[]);
  }

  getAddress(): string {
    return this.coinData.address;
  }

  getName(): string {
    return this.coinData.name;
  }

  buildTransferData(to: string, amount: BN): string {
    return this.erc20.methods
      .transferToken(this.getAddress(), to, amount)
      .encodeABI();
  }

  buildFlushData(targetAddresses: string[], tokenAddress: string) {
    return this.erc20.methods
      .flushToken(tokenAddress, targetAddresses)
      .encodeABI();
  }

  isErc20(): boolean {
    return true;
  }
}

export class Eth extends Coin {
  private eth: Contract;

  constructor(coinData: CoinDTO) {
    super(coinData);
    this.eth = new new Web3().eth.Contract(eth as AbiItem[]);
  }

  getName(): string {
    return "eth";
  }

  buildTransferData(to: string, amount: BN): string {
    return this.eth.methods.transferEth(to, amount).encodeABI();
  }

  buildFlushData(targetAddresses: string[]) {
    return this.eth.methods.flushEth(targetAddresses).encodeABI();
  }

  isErc20(): boolean {
    return false;
  }
}

export class Klay extends Coin {
  private readonly klay: Contract;

  constructor(coinData: CoinDTO) {
    super(coinData);
    this.klay = new new Web3().eth.Contract(klay as AbiItem[]);
  }

  getName(): string {
    return "klay";
  }

  buildTransferData(to: string, amount: BN): string {
    return this.klay.methods.transferKlay(to, amount).encodeABI();
  }

  buildFlushData(targetAddresses: string[]) {
    return this.klay.methods.flushKlay(targetAddresses).encodeABI();
  }

  isErc20(): boolean {
    return false;
  }
}
