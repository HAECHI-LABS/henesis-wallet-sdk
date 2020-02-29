import {KeyFile, KeySecret} from "../accounts";
import {MultiSignaturePayload} from "../multiSignaturePayload";

export interface DefaultSigner {
  generateSignature(multiSignaturePayload:MultiSignaturePayload, keyFile:KeyFile, passphrase:string):string;
  generateKeySecret():KeySecret;
}