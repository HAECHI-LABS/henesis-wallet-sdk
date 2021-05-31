import { Key, Keychains, KeyWithPriv } from "../types";
import { Env } from "../sdk";
import {
  getDigest,
  getChecksum,
  getPayloadSecp256K1,
  tryToPrivateKeyBuffer,
} from "./fil-core-lib/utils";
import sjcl from "../eth/eth-core-lib/sjcl";
import { PasswordInvalidError } from "../error";
import crypto from "crypto";
import { bytesToWord } from "../eth";

const base32 = require("base32");
const elliptic = require("elliptic");
const secp256k1 = new elliptic.ec("secp256k1");

export class FilKeychains implements Keychains {
  changePassword(key: Key, password: string, newPassword: string): KeyWithPriv {
    const priv = this.decrypt(key, password);

    const ecKey = secp256k1.keyFromPrivate(Buffer.from(priv.slice(2), "hex"));
    const publicKey = `0x${ecKey.getPublic(false, "hex").slice(2)}`;
    const address = this.getAddress(publicKey);
    const newKeyFile = this.encryptPrivToKeyFile(priv, newPassword);

    return {
      address,
      pub: publicKey,
      priv,
      keyFile: newKeyFile,
    };
  }

  create(password: string): KeyWithPriv {
    const ecKeyPair = secp256k1.genKeyPair();

    const privateKey = `0x${ecKeyPair.getPrivate("hex")}`;
    const publicKey = `0x${ecKeyPair.getPublic(false, "hex").slice(2)}`;
    const address = this.getAddress(publicKey);
    const keyFile = this.encryptPrivToKeyFile(privateKey, password);

    return {
      address,
      pub: publicKey,
      priv: privateKey,
      keyFile,
    };
  }

  decrypt(key: Key, password: string): string {
    try {
      return sjcl.decrypt(password, key.keyFile);
    } catch (error) {
      if (error.message.includes("ccm: tag doesn't match")) {
        error.message = `password error - ${error.message}`;
      } else if (
        error.message === "sjcl.exception.corrupt is not a constructor"
      ) {
        throw new PasswordInvalidError();
      }
      throw error;
    }
  }

  sign(key: Key, password: string, hexPayload: string): string {
    const privateKey = tryToPrivateKeyBuffer(this.decrypt(key, password));

    const messageDigest = getDigest(Buffer.from(hexPayload, "hex"));
    const signature = secp256k1.ecdsaSign(messageDigest, privateKey);

    return Buffer.concat([
      Buffer.from(signature.signature),
      Buffer.from([signature.recid]),
    ]).toString("base64");
  }

  private encryptPrivToKeyFile(privateKey: string, password: string) {
    const randomSalt = crypto.randomBytes(8);
    const randomIV = crypto.randomBytes(16);
    const encryptOptions = {
      iter: 10000,
      ks: 256,
      salt: [
        bytesToWord(randomSalt.slice(0, 4)),
        bytesToWord(randomSalt.slice(4)),
      ],
      iv: [
        bytesToWord(randomIV.slice(0, 4)),
        bytesToWord(randomIV.slice(4, 8)),
        bytesToWord(randomIV.slice(8, 12)),
        bytesToWord(randomIV.slice(12, 16)),
      ],
    };
    return sjcl.encrypt(password, privateKey, encryptOptions);
  }

  private getAddress(publicKey: string): string {
    const buffer = Buffer.from(publicKey.slice(2));
    const payload = getPayloadSecp256K1(buffer);

    const checksum = getChecksum(
      Buffer.concat([Buffer.from("01", "hex"), payload])
    );

    const prefix = Env.Prod ? "f1" : "t1";
    return (
      prefix + base32.encode(Buffer.concat([payload, checksum])).toLowerCase()
    );
  }
}
