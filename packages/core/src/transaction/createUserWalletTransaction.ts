import {EthereumTransaction} from "./EthereumTransaction";
import {MultiSignaturePayload} from "../multiSignaturePayload";

export class CreateUserWalletTransaction extends EthereumTransaction {
  public build(
      masterContractAddress: string,
  ): MultiSignaturePayload {
    return this.buildRaw(
        masterContractAddress,
        0,
        this.generateData(),
    );
  }
  private generateData():string {
    return null
  }
}