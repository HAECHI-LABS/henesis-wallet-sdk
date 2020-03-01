import {MultiSignaturePayload} from "../multiSignaturePayload";

export class EthereumTransaction {
  private walletNonce: number;
  private isSetNonce = false;

  public setNonce(walletNonce: number) {
    this.walletNonce = walletNonce;
    this.isSetNonce = true;
    return this;
  }

  public buildRaw(
      to: string,
      value: number,
      data: string,
  ): MultiSignaturePayload {
    if (!this.isSetNonce) {
      throw Error("nonce is not setted");
    }
    return null;
  };
}