import { NftDTO } from "../__generate__/eth";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import walletAbi from "../contracts/Wallet.json";

export type NftData = NftDTO;

export class Nft {
  protected nftData: NftData;
  protected readonly walletContract: Contract;

  constructor(nftData: NftData) {
    this.nftData = nftData;
    this.walletContract = new new Web3().eth.Contract(walletAbi as AbiItem[]);
  }

  getName(): string {
    return this.nftData.name;
  }

  getAddress(): string {
    return this.nftData.address;
  }
}
