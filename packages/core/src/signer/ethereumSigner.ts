import {DefaultSigner} from "./defaultSigner";
import {KeyFile, KeySecret} from "../accounts";
import {MultiSignaturePayload} from "../multiSignaturePayload";
import {decryptKeyFile} from "./decrypt";

export class EthereumSigner implements DefaultSigner {
  generateKeySecret(): KeySecret {
    return undefined;
  }

  generateSignature(multiSignaturePayload:MultiSignaturePayload, keyFile:KeyFile, passphrase:string): string {
    const keySecret:KeySecret = decryptKeyFile(keyFile, passphrase);
    return this.sign(multiSignaturePayload, keySecret);
  }

  private sign(payload:MultiSignaturePayload, keySecret:KeySecret): string {
    return null;
  }
}