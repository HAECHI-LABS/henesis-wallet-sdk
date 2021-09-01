import { Key, Keychains, KeyWithPriv } from "../types";
import { ECPair } from "bitcoinjs-lib";
import { networks } from "bitcoinjs-lib";
import sjcl from "../eth/eth-core-lib/sjcl";
import crypto from "crypto";
import { bytesToWord } from "../eth";
import { BNConverter } from "../utils/common";
import { Env } from "../sdk";

export class BchKeyChains implements Keychains {
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  create(password: string): KeyWithPriv {
    const ecPair = ECPair.makeRandom({
      network: Env.Prod ? networks.bitcoin : networks.testnet,
      compressed: true,
    });

    return {
      keyFile: this.encryptECPair(ecPair, password),
      priv: `0x${ecPair.privateKey.toString("hex")}`,
      pub: `0x${ecPair.publicKey.toString("hex")}`,
    };
  }

  sign(key: Key, password: string, hexPayload: string): string {
    const ecPair = this.decryptECPair(key, password);
    return ecPair.sign(Buffer.from(hexPayload, "hex")).toString("hex");
  }

  changePassword(key: Key, password: string, newPassword: string): KeyWithPriv {
    const ecPair = this.decryptECPair(key, password);
    return {
      keyFile: this.encryptECPair(ecPair, newPassword),
      priv: `0x${ecPair.privateKey.toString("hex")}`,
      pub: `0x${ecPair.publicKey.toString("hex")}`,
    };
  }

  decrypt(key: Key, password: string): string {
    try {
      return `0x${sjcl.decrypt(password, key.keyFile)}`;
    } catch (error) {
      if (
        error.message.includes("ccm: tag doesn't match") ||
        error.message.includes("sjcl.exception.invalid is not a constructor")
      ) {
        error.message = `password error - ${error.message}`;
      } else if (
        error.message === "sjcl.exception.corrupt is not a constructor"
      ) {
        error.message = "password error";
      }
      throw error;
    }
  }

  private encryptECPair(
    ecPair: ECPair.ECPairInterface,
    password: string
  ): string {
    return this.encryptRawPrivateKey(
      ecPair.privateKey.toString("hex"),
      password
    );
  }

  private encryptRawPrivateKey(privateKey: string, password: string): string {
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

  private decryptECPair(key: Key, password: string): ECPair.ECPairInterface {
    const decryptedKey = this.decrypt(key, password);
    return ECPair.fromPrivateKey(
      Buffer.from(BNConverter.remove0x(decryptedKey), "hex"),
      {
        compressed: true,
        network: Env.Prod ? networks.bitcoin : networks.testnet,
      }
    );
  }
}
