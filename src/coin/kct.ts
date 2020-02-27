import {PayloadAndSignature} from "../interfaces/Iwallet";
import {Icoin} from "../interfaces/Icoin";

export class KCT implements Icoin {
  private contractAddress = "0xddd";
  private keychain: any;

  static createInstance(keychain: any) {
    return new KCT(keychain);
  }

  constructor(keychain: any) {
    this.keychain = keychain;
  }

  public transfer(
      to: string,
      value: number,
      walletAddress: string,
      passphrase: string
  ): PayloadAndSignature {
    return this.buildPayload(
        to,
        value,
        walletAddress,
        passphrase);
  }

  private buildPayload(
      to: string,
      value: number,
      walletAddress,
      passphrase: string
  ): PayloadAndSignature {
    return {
      signature: "",
      payload: null
    } as PayloadAndSignature
  }
}