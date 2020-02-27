import {PayloadAndSignature} from "./Iwallet";

export interface Icoin {
  transfer(
      to: string,
      value: number,
      walletAddress: string,
      passphrase: string,
      data?: any
  ): PayloadAndSignature;
}