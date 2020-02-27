import {PayloadAndSignature} from "../interfaces/Iwallet";
import {Icoin} from "../interfaces/Icoin";

export class ETH implements Icoin {
  private keychain: any;

  static createInstance(keychain: any) {
    return new ETH(keychain);
  }

  constructor(keychain: any) {
    this.keychain = keychain;
  }

  public transfer(
      to: string,
      value: number,
      walletAddress: string,
      passphrase: string,
      data?: any
  ): PayloadAndSignature {
    return this.buildPayload(
        to,
        value,
        data ? data : "0x0",
        walletAddress,
        passphrase
    );
  }

  private buildPayload(
      to: string,
      value: number,
      data: string,
      walletAddress: string,
      passphrase: string
  ): PayloadAndSignature {
    return {
      signature: "",
      payload: null
    } as PayloadAndSignature
  }
}