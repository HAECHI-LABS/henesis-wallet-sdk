import {EthereumTransaction} from "./EthereumTransaction";
import {MultiSignaturePayload} from "../multiSignaturePayload";

export class Erc20TransferTransaction extends EthereumTransaction {
  public build(
   to: string,
   value: number,
   contractAddress: string,
  ): MultiSignaturePayload {
    const data = this.generateData(contractAddress, to, value);
    return this.buildRaw(
        to,
        0,
        data,
    );
  }
  private generateData(contractAddress:string, to:string, value:number): string {
    return null;
  }
}