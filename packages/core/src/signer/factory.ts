import {DefaultSigner} from "./defaultSigner";
import {EthereumSigner} from "./ethereumSigner";
import {KlaytnSigner} from "./klaytnSigner";

export class SignerFactory {
  private signerConstructor = new Map<string, DefaultSigner>();

  public getSigner(blockchain:string):DefaultSigner{
    const signer = this.signerConstructor.get(blockchain);
    if (signer) {
      return signer;
    } else {
      throw new Error(`unknown blockchain type: ${blockchain}`);
    }
  }
  public registerSigner(transactionType:string, ethereumTransaction:DefaultSigner):void {
    this.signerConstructor.set(transactionType, ethereumTransaction);
  }
}

export const DefaultSignerFactory:SignerFactory = new SignerFactory();

DefaultSignerFactory.registerSigner("ethereum",new EthereumSigner());
DefaultSignerFactory.registerSigner("klayn",new KlaytnSigner());