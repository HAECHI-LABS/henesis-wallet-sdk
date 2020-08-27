import BN from "bn.js";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import standardErc20 from "../contracts/ERC20.json";
import nonStandardErc20 from "../contracts/ERC20_NON_STANDARD_RETURN_TYPE.json";
import eth from "../contracts/Eth.json";
import klay from "../contracts/Klay.json";
import { CoinDTO } from "../__generate__/eth";
import AttributesEnum = CoinDTO.AttributesEnum;

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

  abstract getAttributes(): AttributesEnum[];
}

export class StandardErc20 extends Coin {
  private readonly standardErc20: Contract;

  constructor(coinData: CoinDTO) {
    super(coinData);
    this.standardErc20 = new new Web3().eth.Contract(
      standardErc20 as AbiItem[]
    );
  }

  getAddress(): string {
    return this.coinData.address;
  }

  getName(): string {
    return this.coinData.name;
  }

  buildTransferData(to: string, amount: BN): string {
    return this.standardErc20.methods
      .transferToken(this.getAddress(), to, amount)
      .encodeABI();
  }

  buildFlushData(targetAddresses: string[], tokenAddress: string) {
    return this.standardErc20.methods
      .flushToken(tokenAddress, targetAddresses)
      .encodeABI();
  }

  getAttributes(): CoinDTO.AttributesEnum[] {
    return this.coinData.attributes;
  }
}

export class NonStandardReturnTypeErc20 extends Coin {
  private readonly nonStandardErc20: Contract;

  constructor(coinData: CoinDTO) {
    super(coinData);
    this.nonStandardErc20 = new new Web3().eth.Contract(
      nonStandardErc20 as AbiItem[]
    );
  }

  getAddress(): string {
    return this.coinData.address;
  }

  getName(): string {
    return this.coinData.name;
  }

  buildTransferData(to: string, amount: BN): string {
    return this.nonStandardErc20.methods.transfer(to, amount).encodeABI();
  }

  buildFlushData(targetAddresses: string[], tokenAddress: string) {
    return this.nonStandardErc20.methods
      .flushToken(tokenAddress, targetAddresses)
      .encodeABI();
  }

  getAttributes(): CoinDTO.AttributesEnum[] {
    return this.coinData.attributes;
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

  getAttributes(): CoinDTO.AttributesEnum[] {
    return this.coinData.attributes;
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

  getAttributes(): CoinDTO.AttributesEnum[] {
    return this.coinData.attributes;
  }
}
