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
import { FilAccountKey } from "./abstractWallet";

const base32Encode = require("base32-encode");
const elliptic = require("elliptic");
// eslint-disable-next-line new-cap
const ec = new elliptic.ec("secp256k1");
const secp256k1 = require("secp256k1");
const bip32 = require("bip32");
const bip39 = require("bip39");

export interface FilKeyWithPriv extends KeyWithPriv {
  chainCode: string;
}

export class FilKeychains implements Keychains {
  protected readonly env: Env;

  public constructor(env: Env) {
    this.env = env;
  }

  changePassword(
    key: FilAccountKey,
    password: string,
    newPassword: string
  ): FilKeyWithPriv {
    const seed = this.decrypt(key, password);
    const priv = bip32.fromSeed(Buffer.from(seed, "hex")).privateKey;
    const ecKey = ec.keyFromPrivate(priv);
    const privateKey = `0x${ecKey.getPrivate("hex")}`;
    const publicKey = `0x${ecKey.getPublic(false, "hex").slice(2)}`;
    const address = this.getAddress(ecKey.getPublic(false, "hex"));
    const newKeyFile = this.encryptValueToKeyFile(
      priv.toString("hex"),
      newPassword
    );

    return {
      address,
      pub: publicKey,
      priv: privateKey,
      keyFile: newKeyFile,
      chainCode: key.chainCode,
    };
  }

  create(password: string): KeyWithPriv {
    const seed = this.generateRandomSeed();
    const privBuffer = bip32.fromSeed(seed).privateKey;
    const keyPair = ec.keyFromPrivate(privBuffer);
    const privateKey = `0x${keyPair.getPrivate("hex")}`;
    const publicKey = `0x${keyPair.getPublic(false, "hex").slice(2)}`;
    const address = this.getAddress(keyPair.getPublic(false, "hex"));
    const keyFile = this.encryptValueToKeyFile(
      keyPair.getPrivate("hex"),
      password
    );

    return {
      address,
      pub: publicKey,
      priv: privateKey,
      keyFile,
    };
  }

  createWithChainCode(password: string): FilKeyWithPriv {
    const seed = this.generateRandomSeed();
    const privBuffer = bip32.fromSeed(seed).privateKey;
    const chainCode = `0x${bip32.fromSeed(seed).chainCode.toString("hex")}`;
    const keyPair = ec.keyFromPrivate(privBuffer);
    const privateKey = `0x${keyPair.getPrivate("hex")}`;
    const publicKey = `0x${keyPair.getPublic(false, "hex").slice(2)}`;
    const address = this.getAddress(keyPair.getPublic(false, "hex"));
    const keyFile = this.encryptValueToKeyFile(seed.toString("hex"), password);

    return {
      address,
      pub: publicKey,
      priv: privateKey,
      keyFile,
      chainCode: chainCode,
    };
  }

  derive(
    key: FilAccountKey,
    password: string,
    childNumber: number
  ): KeyWithPriv {
    const seed = this.decrypt(key, password);
    const hdKey = bip32.fromSeed(Buffer.from(seed, "hex"));
    const childKey = hdKey.derive(childNumber);
    const childKeyPair = ec.keyFromPrivate(childKey.privateKey);

    const privateKey = `0x${childKeyPair.getPrivate("hex")}`;
    const publicKey = `0x${childKeyPair.getPublic(false, "hex").slice(2)}`;
    const address = this.getAddress(childKeyPair.getPublic(false, "hex"));
    const keyFile = this.encryptValueToKeyFile(
      childKeyPair.getPrivate("hex"),
      password
    );

    return {
      address,
      pub: publicKey,
      priv: privateKey,
      keyFile,
    };
  }

  decrypt(key: Key, password: string, isSeedEncrypted?: boolean): string {
    try {
      if (isSeedEncrypted == true) {
        const seed = sjcl.decrypt(password, key.keyFile);
        return FilKeychains.privateKeyFromSeed(seed);
      }
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

  sign(
    key: Key,
    password: string,
    hexPayload: string,
    isSeedDecrypted?: boolean
  ): string {
    const privateKey = tryToPrivateKeyBuffer(
      this.decrypt(key, password, isSeedDecrypted).slice(2)
    );

    const messageDigest = getDigest(Buffer.from(hexPayload, "hex"));
    const signature = secp256k1.ecdsaSign(messageDigest, privateKey);

    return Buffer.concat([
      Buffer.from(signature.signature),
      Buffer.from([signature.recid]),
    ]).toString("base64");
  }

  private static privateKeyFromSeed(seed: string): string {
    const privBuffer = bip32.fromSeed(Buffer.from(seed, "hex")).privateKey;
    const keyPair = ec.keyFromPrivate(privBuffer);
    return `0x${keyPair.getPrivate("hex")}`;
  }

  private encryptValueToKeyFile(value: string, password: string) {
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
    return sjcl.encrypt(password, value, encryptOptions);
  }

  /*
   * reference
   * - https://github.com/Zondax/filecoin-signing-tools/blob/master/signer-npm/js/src/extendedkey.js
   */
  private getAddress(publicKey: string): string {
    const buffer = Buffer.from(publicKey, "hex");
    const payload = getPayloadSecp256K1(buffer);
    const checksum = getChecksum(
      Buffer.concat([Buffer.from("01", "hex"), payload])
    );

    const prefix = this.env == Env.Prod ? "f1" : "t1";
    return (
      prefix +
      base32Encode(
        new Uint8Array(Buffer.concat([payload, checksum])),
        "RFC4648",
        {
          padding: false,
        }
      ).toLowerCase()
    );
  }

  private generateRandomSeed(): Buffer {
    const mnemonic = bip39.generateMnemonic(256);
    return bip39.mnemonicToSeedSync(mnemonic);
  }
}
