import { NftDTO } from "../__generate__/eth";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import walletAbi from "../contracts/Wallet.json";
import { EthLikeWallet } from "./abstractWallet";
import { MultiSigPayload } from "./transactions";
import { BNConverter } from "../utils/common";

export type NftData = NftDTO;

export class Nft {
  protected nftData: NftData;
  protected readonly walletContract: Contract;

  constructor(nftData: NftData) {
    this.nftData = nftData;
    this.walletContract = new new Web3().eth.Contract(walletAbi as AbiItem[]);
  }

  protected async buildTransferMultiSigPayloadTemplate(wallet: EthLikeWallet) {
    return {
      walletNonce: wallet.getNonce(),
      value: BNConverter.hexStringToBN("0x0"),
      walletAddress: wallet.getAddress(),
    };
  }

  getId(): number {
    return this.nftData.id;
  }

  getName(): string {
    return this.nftData.name;
  }

  getAddress(): string {
    return this.nftData.address;
  }

  getSymbol(): string {
    return this.nftData.symbol;
  }

  async buildTransferMultiSigPayload(
    wallet: EthLikeWallet,
    to: string,
    tokenOnchainId: string
  ): Promise<MultiSigPayload> {
    return {
      ...(await this.buildTransferMultiSigPayloadTemplate(wallet)),
      hexData: this.walletContract.methods
        .transferNFT({
          token: this.getAddress(),
          to: to,
          tokenId: parseInt(tokenOnchainId),
        })
        .encodeABI(),
      toAddress: wallet.getAddress(),
    };
  }
}
