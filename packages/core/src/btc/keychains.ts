import { Key, Keychains, KeyWithPriv } from "../types";
import { ECPair } from "bitcoinjs-lib";
import { networks } from "bitcoinjs-lib";
import bip38 from "bip38";

export class BtcKeyChains implements Keychains {
  create(password: string): KeyWithPriv {
    const ecPair = ECPair.makeRandom({
      network: networks.testnet,
      compressed: true
    });

    return {
      keyFile: bip38.encrypt(ecPair.privateKey, ecPair.compressed, password),
      priv: `0x${ecPair.privateKey.toString("hex")}`,
      pub: `0x${ecPair.publicKey.toString("hex")}`
    };
  }

  sign(key: Key, password: string, hexPayload: string): string {
    const ecPair = this.decryptECPair(key, password);
    return ecPair
      .sign(Buffer.from(hexPayload, "hex"))
      .toString("hex");
  }

  changePassword(key: Key, password: string, newPassword: string): KeyWithPriv {
    const ecPair = this.decryptECPair(key, password);
    return {
      keyFile: bip38.encrypt(ecPair.privateKey, ecPair.compressed, newPassword),
      priv: `0x${ecPair.privateKey.toString("hex")}`,
      pub: `0x${ecPair.publicKey.toString("hex")}`
    };
  }

  decrypt(key: Key, password: string): string {
    const decryptedKey = this.decryptKeyFile(key.keyFile, password);
    return `0x${decryptedKey.privateKey.toString("hex")}`;
  }

  private decryptECPair(key:Key, password: string) {
    const decryptedKey = this.decryptKeyFile(key.keyFile, password);
    return ECPair.fromPrivateKey(decryptedKey.privateKey, {
      compressed: decryptedKey.compressed,
      network: networks.testnet
    });
  }

  private decryptKeyFile(keyFile: string, password: string) {
    try {
      return bip38.decrypt(keyFile, password);
    } catch (e) {
      if (e.code === "ERR_ASSERTION") {
        throw new Error("password error");
      }
      throw e;
    }
  }
}
